import express from 'express';
import mongoose from 'mongoose';
import  logger  from './middleware/logger';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import { MONGO_URI, PORT } from './config/environment'; // Already imported from environment.ts

const app = express();


// Check if MONGO_URI is defined
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}


// Middlewares and Routes
app.use(logger); // From ./middleware/logger.ts 
app.use(express.json());
app.use('/books', bookRoutes);
app.use(errorHandler); // From ./middleware/errorHandler.ts



if (process.env.NODE_ENV !== 'test') { 

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err: unknown) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);

  });

  // Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

}


export default app;