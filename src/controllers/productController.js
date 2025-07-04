const product = require('../models/produit');
const jwt = require('jsonwebtoken');
const addProduct = async(req,res)=>{
    try {
        const data = req.body;
        const product = await product.create(data);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({"error":error,"message":"erreur lors de l'enregistrement"});
    }
}

const getAllProduct = async(req,res)=>{
   
    try {
        const products = await product.find().sort;
        res.status(200).json({
            "status":200,
            "products":products,
            "message":"recuperation des products faites avec succes"
        });
    } catch (error) {
        res.status(404).json("error",error);
    }
}

const getAllProductByUserId = async(req,res)=>{

    const userId = req.query.id;
    console.log(userId);
    if(!userId){
        return res.status(400).json({message:"userId is required"});
    }
    const tokenHeader = req.headers.authorization;
    console.log("headerToken",tokenHeader);
    if(!tokenHeader){
        return res.status(403).json({message:'token is invalid'});
    }
    const token_list = tokenHeader.split(' ');
    if(token_list[0]!=="Bearer"){
        return res.status(403).json({message:'token should be a bearer'});
    }
    console.log('Token split:',token_list);
    const token = token_list[1];
     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.id!==userId){
            res.status(403).json({message:"le userId doesn't not match"});
        }
        console.log("decoded:",decoded);
     } catch (error) {
        res.status(403).json({"error":error.message});
     }
    //  if(!decoded){
    //     return res.status(403).json({message:'invalid token'});
    //  }
    try {
        const products = await product.find().sort;
        res.status(200).json({
            "status":200,
            "products":products,
            "message":"recuperation des products faites avec succes"
        });
    } catch (error) {
        res.status(404).json("error",error);
    }
}

// const getProductById = async(req,res)=>{
//     try {
//         const id = req.params;
//         const produit  = await product.findById(id);
//         if(!produit){
//             return res.status(404).Json({"status":404,"error":"not found","message":"le produit avec ce id n'exixte pas"});
//         }
//         return res.status(200).json(produit);
//     } catch (error) {
//         return res.status(500).json({"status":500,"error":error})
//     }
// }
const updateProduct = async(req,res)=>{
    try {
       const id = req.params.id;
       const updateData = req.body;
       const produit = await product.findById(id);
       if(!produit){
            return res.status(404).Json({"status":404,"error":"not found","message":"le produit avec ce id n'exixte pas"});
       }
       const productUpdate = await product.findByIdAndUpdate(id,updateData,{new: true});
       res.status(200).json(productUpdate);
    } catch (error) {
        res.status(500).json({"error":error});
    }   
}

const deleteProduct =async (req,res)=>{
    try {
        const id = req.params.id;
       const produit = await product.findById(id);
       if(!produit){
           return res.status(404).Json({"status":404,"error":"not found","message":"le produit avec ce id n'exixte pas"});
       }
       await product.findByIdAndDelete(id);
       res.status(204).json({"status":204,"message":"no content"});
    } catch (error) {
        res.status(500).json({"status":204,"error":error});
    }
}

const insertManyProducts = async (req,res)=>{
    try {
        const data = req.body;
        const products = await product.insertMany(data,{ordered:true,upsert:true});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = {addProduct,getAllProduct,updateProduct,deleteProduct,insertManyProducts,getAllProductByUserId}