const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log("MongoDB URI:", process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware

app.use(express.json());
app.use(cors());

//Connect to mOngoDB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,

}).then(() => console.log("MongoDB Connected"))
   .catch(err => console.log(err));


app.get("/", (req, res) => {
   res.send("Server Running");
})

app.listen(PORT, () => {
   console.log(`Server Running on port ${PORT}`);
});