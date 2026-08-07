import { NodeSSH } from 'node-ssh';
import mongoose from 'mongoose';
import { Product } from '../models/product.models';
import { Category } from '../models/category.models';
import { Branch } from '../models/branch.models';
import { config } from '../config/config';

const ssh = new NodeSSH();

async function syncDatabase() {
  try {
    console.log("Connecting to VPS via SSH...");
    await ssh.connect({
      host: '46.250.240.83',
      username: 'root',
      password: 'WWe8b3aL9cYG8DjYg'
    });

    console.log("Connected! Pulling latest scripts on VPS...");
    await ssh.execCommand('git pull origin main', { cwd: '/var/www/gkc' });
    
    console.log("Running export script on VPS...");
    const cmd = await ssh.execCommand('source ~/.nvm/nvm.sh && npx tsx src/scripts/export_menu.ts', { cwd: '/var/www/gkc/backend' });
    
    ssh.dispose();

    const output = cmd.stdout;
    const startIndex = output.indexOf("JSON_START") + 10;
    const endIndex = output.indexOf("JSON_END");
    
    if (startIndex < 10 || endIndex === -1) {
       console.error("Failed to parse JSON. Output:", output, "Stderr:", cmd.stderr);
       process.exit(1);
    }
    
    const jsonStr = output.substring(startIndex, endIndex).trim();
    const { products, categories, branches } = JSON.parse(jsonStr);

    console.log(`Fetched ${products.length} products, ${categories.length} categories, and ${branches.length} branches from VPS!`);

    console.log("Connecting to local MongoDB...");
    await mongoose.connect(config.mongodb.uri);

    console.log("Clearing local collections...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Branch.deleteMany({});

    console.log("Inserting data into local database...");
    if (categories.length > 0) await Category.insertMany(categories);
    if (products.length > 0) await Product.insertMany(products);
    if (branches.length > 0) await Branch.insertMany(branches);

    console.log("✅ Local menu database successfully synced with the VPS!");
    process.exit(0);
  } catch (error) {
    console.error("Error during synchronization:", error);
    process.exit(1);
  }
}

syncDatabase();
