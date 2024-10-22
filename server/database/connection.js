// const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://nehapawar161005:neha@123@cluster0.ip1fc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const connectDB = async () => {
//     try{
//         // mongodb connection string
//         const con = await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         })

//         console.log(`MongoDB connected : ${con.connection.host}`);
//     }catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// }

// module.exports = connectDB

const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://jadhavviraj270:gVGYBImb84ngbses@cluster0.ip1fc.mongodb.net/test?retryWrites=true&w=majority";

// const mongoURI = "mongodb+srv://nehapawar161005:neha%40123@cluster0.ip1fc.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const con = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
