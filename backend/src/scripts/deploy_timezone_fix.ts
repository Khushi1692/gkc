import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function deployFix() {
  try {
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });
    
    console.log("Connected to VPS! Pulling latest changes...");
    
    const pullCmd = await ssh.execCommand("git pull origin main", { cwd: '/var/www/gkc' });
    console.log(pullCmd.stdout);
    
    console.log("Building backend...");
    const buildCmd = await ssh.execCommand("source ~/.nvm/nvm.sh && npm run build", { cwd: '/var/www/gkc/backend' });
    console.log(buildCmd.stdout);
    if (buildCmd.stderr) console.log("Build warnings:", buildCmd.stderr);

    console.log("Restarting PM2...");
    const restartCmd = await ssh.execCommand("source ~/.nvm/nvm.sh && pm2 restart gkc-backend", { cwd: '/var/www/gkc/backend' });
    console.log(restartCmd.stdout);
    
    console.log("Timezone fix deployed successfully!");
    
    ssh.dispose();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

deployFix();
