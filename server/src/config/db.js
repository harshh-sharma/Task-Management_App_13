const mongoose = require("mongoose");

const connectToDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        if(connection){
            console.log("Db successfully connected");
        }
    } catch (error) {
        console.error("Error while connecting database", error);
        process.exit(1);
    }
}

module.exports = connectToDb;