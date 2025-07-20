const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./config/connect');
const path = require("path");
const fs = require('fs');

const app = express();

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
DBConnection();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Routes
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

// ✅ Start server using .env PORT
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
