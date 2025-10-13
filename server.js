const dotenv = require('dotenv');
const app = require('./app');
const connectMongo = require('./config/mongodb.config');

dotenv.config();

// Connect to MongoDB
connectMongo();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
