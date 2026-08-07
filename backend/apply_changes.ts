import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

const scriptToRun = `
import mongoose from "mongoose";
import { Branch } from "./src/models/branch.models.js";
import { Product } from "./src/models/product.models.js";
import { config } from "./src/config/config.js";

async function run() {
  try {
    await mongoose.connect(config.mongodb.uri);
    
    const branchResult = await Branch.deleteMany({ name: { $regex: /Truganina/i } });
    console.log("Deleted branches:", branchResult.deletedCount);
    
    const productsToRemoveImages = [
        "Bhel Puri",
        "South Special Ragda Samosa Chaat",
        "Spicy Panner Pizza"
    ];
    
    const imgResult = await Product.updateMany(
      { name: { $in: productsToRemoveImages } },
      { $unset: { image: "" } }
    );
    console.log("Images removed from products:", imgResult.modifiedCount);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
`;

async function apply() {
  try {
    await ssh.connect({
        host: '46.250.240.83',
        username: 'root',
        password: 'WWe8b3aL9cYG8DjYg'
    });
    console.log("Connected to VPS.");
    const cmd = await ssh.execCommand(
      `cat << 'EOF' > update_db.ts\n${scriptToRun}\nEOF\nsource ~/.nvm/nvm.sh && npx tsx update_db.ts`, 
      { cwd: '/var/www/gkc/backend' }
    );
    console.log("Output:", cmd.stdout);
    if (cmd.stderr) console.error("Error:", cmd.stderr);
    ssh.dispose();
    console.log("Done updating VPS!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
apply();
