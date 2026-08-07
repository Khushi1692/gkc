import { NodeSSH } from 'node-ssh';
import { execSync } from 'child_process';
import path from 'path';

const ssh = new NodeSSH();

async function syncDatabase() {
  try {
    console.log("Connecting to VPS via SSH...");
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });

    console.log("Connected successfully! Creating database backup on VPS...");
    const dumpCmd = await ssh.execCommand('mongodump --db gopikachatka --out /root/db_backup');
    console.log("Dump output:", dumpCmd.stdout || dumpCmd.stderr);

    console.log("Compressing backup...");
    const tarCmd = await ssh.execCommand('tar -czvf /root/db_backup.tar.gz -C /root db_backup');
    console.log("Tar output:", tarCmd.stdout || tarCmd.stderr);

    const localTarPath = path.join(process.cwd(), 'db_backup.tar.gz');
    console.log("Downloading backup to local computer...");
    await ssh.getFile(localTarPath, '/root/db_backup.tar.gz');
    
    console.log("Download complete. Closing SSH connection...");
    ssh.dispose();

    console.log("Extracting local backup...");
    execSync('tar -xzvf db_backup.tar.gz', { stdio: 'inherit' });

    console.log("Restoring backup to local MongoDB (this will overwrite the local DB)...");
    execSync('mongorestore --drop --db gopikachatka db_backup/gopikachatka', { stdio: 'inherit' });

    console.log("✅ Local database successfully synced with VPS!");
    
  } catch (error) {
    console.error("Error during synchronization:", error);
    process.exit(1);
  }
}

syncDatabase();
