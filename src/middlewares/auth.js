const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req,res,next)=>{
   const tokenHeader = req.headers.authorization;
    console.log("headerToken",tokenHeader);
    if(!tokenHeader){
        return res.status(403).json({message:'token is require'});
    }
    const token_list = tokenHeader.split(' ');
    if(token_list[0]!=="Bearer"){
        return res.status(403).json({message:'token should be a bearer'});
    }
    console.log('Token split:',token_list);
    const token = token_list[1];
     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:",decoded);
     } catch (error) {
        res.status(403).json({"error":error.message});
     }
     next();
};

module.exports = auth;