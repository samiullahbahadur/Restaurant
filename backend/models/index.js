import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize } from "sequelize";
import process from "process";
import configFile from "../config/config.js"; // your config.js file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Create sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

// Automatically import all models in this folder
const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

for (const file of modelFiles) {
  // Convert Windows path to file:// URL for dynamic import
  const modelUrl = pathToFileURL(path.join(__dirname, file)).href;
  const module = await import(modelUrl);
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Apply associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
