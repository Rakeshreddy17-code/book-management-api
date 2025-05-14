import dotenv from 'dotenv';

// Load variables from .env into process.env
dotenv.config();

// Validate and export required environment variables
export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT || 3000;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in the .env file");
}

if (!PORT) {
  throw new Error("❌ PORT is not defined in the .env file");
}

console.log("✅ Environment variables loaded successfully");

export default {
  MONGO_URI,
  PORT,
};

