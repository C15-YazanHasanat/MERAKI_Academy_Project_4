const mongoose = require("mongoose");
require("dotenv").config(); 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Ready To Use");
})
.catch((err) => {
  console.error("DB Connection Error:", err);
});
