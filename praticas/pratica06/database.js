import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "agenda";

if (!uri) {
  console.error("❌ MONGODB_URI não encontrado no .env");
  process.exit(1);
}

const client = new MongoClient(uri, {});

export async function conectarDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
    console.log("✅ Conectado ao MongoDB Atlas.");
  }
  return client.db(dbName);
}
