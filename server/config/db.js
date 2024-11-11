const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => console.log(err));
