const express = require('express');
const app = express();
const port = 5000;


const products = [
    {"id":1,"name":"savon","price":3500,"category":"costemetique","createdat":new Date()},
    {"id":2,"name":"savon","price":2500,"category":"chaussure","createdat":new Date()},
    {"id":3,"name":"habit","price":4000,"category":"vetements","createdat":new Date()},
    {"id":4,"name":"jupe","price":1700,"category":"vetements","createdat":new Date()},
    {"id":5,"name":"pomade","price":5000,"category":"costemetique","createdat":new Date()},
]

app.use(express.json());
//methode get
//recuperer tous les produits
app.get('/products',(req,res)=>{
    res.status(300).send({
        "status":200,
        "products":products});
});

//recuperer le produits avec parametre
 app.get('/products/:id',(req,res)=>{
    const id = req.params.id;
    const product = products.find(product=>product.id==parseInt(id));
    if(!product){
        res.status(405).send({
            "status":404,
            "error":"not found",
            "message":"product not found"
        })
    }
    res.status(200).send(product);
 });

 app.get('/produits/:name',(req,res)=>{
    const name = req.params.name;
    const id = req.query.id;
    if(!id){
         const product = products.filter(product=>product.name===name);
         res.status(200).send(product);
     }else{
         const produit = products.filter(product=>product.name===name && product.id===parseInt(id));
        res.status(200).send(produit);
     }
 });

 app.get('/product-info/:id',(req,res)=>{
    const id = req.params.id;
    const quantite = req.query.quantite;
    const product = products.find(product=>product.id==parseInt(id));
    const prixTotal = product.price*quantite;
    if(!product){
        res.status(405).send({
            "status":404,
            "error":"not found",
            "message":"product not found"
        })
    }
    product["quantite"] = quantite;
    product["prixTotal"] = prixTotal +" fcfa";
    res.status(200).send({
        "products":product,
    });
 });

 app.post("/products", (req, res) => {
    const data = req.body;

    // Vérifie si les données sont présentes
    if (!data || !data.name || !data.price || !data.category) {
        return res.status(400).send({
            status: 400,
            error: "Bad request",
            message: "Les champs name, price et category sont requis"
        });
    }

    // Vérifie que le prix est un nombre valide et supérieur à 0
    if (typeof data.price !== "number" || data.price <= 0) {
        return res.status(400).send({
            status: 400,
            error: "Bad request",
            message: "Le prix est requis et doit être un nombre supérieur à 0"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: data.name,
        price: data.price,
        category: data.category,
        createdAt: new Date()
    };
    products.push(newProduct);
    return res.status(201).send({
        status: 201,
        data: products,
        message: "Le produit a été ajouté avec succès"
    });
});
 
app.post('/products/bulk',(req,res)=>{
    const data = req.body;
    const invalidList =[];
    if(data.length != null){
        data.forEach(element => {
            if(element.name && element.price && element.category){
                element.id = products.length +1;
                element.createdAt = new Date();
                products.push(element);
            }else{
                console.log(element);
                invalidList.push(element);
                console.log(invalidList);
               return res.send({
                    "data":invalidList,
                    "message":"l'ement"+ element['name'] +" presente un probleme",
                })
            //  return res.status(400).send({
            //     "status":400,
            //     "error":"bad request",
            //     "message":"les elements name,price,et category sont requis"
            //  });
            }
        });
        return res.status(201).send({
            "status":201,
            "data":products,
            "message":"les produits ajouter avec succes"
        });
    }
});

app.put('/products/:id',(req,res)=>{
        const id = req.params.id;
        const data = req.body;
        const product = products.find(product=>product.id===parseInt(id));
        if(!product){
            return res.status(404).send({
                "status":404,
                "error":"not found",
                "message":"le produit ayant ce id n'existe pas"
            });
        }
        if(data.name && data.price && data.category){
            const newProduct = {
                id:products['id'],
                name:data.name,
                price:data.price,
                category:data.category
            }
            products.push(newProduct);
           return res.status(200).send({
                "status":200,
                "data":products,
                "message":"le produit a ete bien enregistrer"
            });
        }else{
        }
});
app.patch('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const patchUpdate = req.body;
    if(!products[id]){
        return res.status(404).send("le product avec ce id n'esxiste pas");
    }
    products[id]={...products[id],...patchUpdate};
    return res.status(200).send({
        "status":200,
        "data":products[id],
        "messages":"le update a ete fait avec succes"
    });
});

app.delete('/products/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const product = products.find(product=>product.id===id);
    if(!product){
        res.status(404).send({
            "status":404,
            "error":"not found",
            "message":"le produit n'est pas trouve"
        });    
    }else{
        products.pop(product);
     res.status(204).send({
        "data":products
     });
    }
});

app.listen(port,()=>{
    console.log(`serveur is running on port ${port}`);
});