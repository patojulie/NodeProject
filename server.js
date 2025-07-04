const express = require('express');
const connectDB = require('./src/config/database');
const dotenv = require('dotenv');
dotenv.config();
const productRoute = require('./src/routes/productRoute');
const userRoute = require('./src/routes/userRoute');
const auth = require('./src/middlewares/auth');
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.json());
// const corsOptions = {
//     origin 
// }

app.use('/products',auth,productRoute);
app.use('/users',userRoute);

connectDB();

app.listen(PORT,()=>{
    console.log(`Le serveur est lancé sur le port ${PORT}`);
})