import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkLogs() {
  try {
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });

    const cmd = await ssh.execCommand('source ~/.nvm/nvm.sh && pm2 logs gkc-backend --lines 200 --nostream | grep -i "webhook\\|stripe\\|payment"');
    console.log(cmd.stdout);
    console.log(cmd.stderr);
    ssh.dispose();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkLogs();
