 module.exports = () => {
     const mongoose = require('mongoose');
     mongoose.connect(`mongodb://${process.env.DB}`,{ keepAlive: true, keepAliveInitialDelay: 300000,  useNewUrlParser: true,useUnifiedTopology: true });
     return mongoose;
 };