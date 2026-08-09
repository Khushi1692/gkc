import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function updateEnv() {
  try {
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });
    
    console.log("Connected! Updating ADMIN_EMAIL...");
    
    // Replace crestedith@hotmail.com with kathrotiyakhushi@gmail.com
    const cmd1 = await ssh.execCommand(
      "sed -i 's/ADMIN_EMAIL=crestedith@hotmail.com/ADMIN_EMAIL=kathrotiyakhushi@gmail.com/g' .env",
      { cwd: '/var/www/gkc/backend' }
    );
    if (cmd1.stderr) console.error("Update Error:", cmd1.stderr);
    
    // Verify it was updated
    const cmd2 = await ssh.execCommand("grep ADMIN_EMAIL .env", { cwd: '/var/www/gkc/backend' });
    console.log("Verified .env:", cmd2.stdout);
    
    // Restart PM2 to apply changes
    console.log("Restarting PM2...");
    const cmd3 = await ssh.execCommand("source ~/.nvm/nvm.sh && pm2 restart gkc-backend", { cwd: '/var/www/gkc/backend' });
    if (cmd3.stderr) console.error("PM2 Error:", cmd3.stderr);
    console.log("Done!");
    
    ssh.dispose();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateEnv();
