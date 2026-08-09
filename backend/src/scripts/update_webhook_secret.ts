import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function updateEnv() {
  try {
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });
    
    console.log("Connected! Updating STRIPE_WEBHOOK_SECRET...");
    
    // Use sed to replace the STRIPE_WEBHOOK_SECRET line
    // Since we don't know exactly what was there before, we can replace the entire line
    const cmd1 = await ssh.execCommand(
      "sed -i 's/^STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET=whsec_9aqLZj83UlZxTtQcRtyPjqjNsNP5J3FD/g' .env",
      { cwd: '/var/www/gkc/backend' }
    );
    if (cmd1.stderr) console.error("Update Error:", cmd1.stderr);
    
    // Verify it was updated
    const cmd2 = await ssh.execCommand("grep STRIPE_WEBHOOK_SECRET .env", { cwd: '/var/www/gkc/backend' });
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
