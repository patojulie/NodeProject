const express =require ('express');
const app = express();
const port = 3000;

const users = [
    {id:1,name:'john',email:'john@gmail.com'},
    {id:2,name:'john',email:'john@gmail.com'},
    {id:3,name:'john',email:'john@gmail.com'},
    {id:4,name:'john',email:'julie@gmail.com'}
 ]
app.get('/',(req,res)=>{
    res.send("hello julie cmt vas tu?");
});
 app.get('/users',(req,res)=>{
    res.send({"users":users});
 });
 app.get('/articles',(req,res)=>{
    res.send("recuperer les articles des produits ");
 });
 app.post('/posts',(req,res)=>{
    res.send('posts');
 });
app.get('/users/:id',(req,res)=>{
     const Id = req.params.id;
     console.log(req.params);
    const user = users.find(user=>user.id==parseInt(Id));
    if(Id){
        res.send(user);
    }else{
        res.status(404).send({
            "status":404,
            "error":"not found",
            "message":"user not found"
        });
    }
    
});

app.get('/names/:name',(req,res)=>{
     const name = req.params.name;
     console.log(req.params);
    const user = users.filter(user=>user.name==name);
    res.send({"users":user});
});

app.get('/noms/:name',(req,res)=>{
     const name = req.params.name;
     const id = req.query.id;
     if(!name && !id){
        res.status(404).send({
            "status":404
            // "error":"Not found",
            // "message":"User not found"
        });
     }
     if(!id){
         const user = users.filter(user=>user.name==name);
        res.send({"users":user});
     }
     console.log(req.params);
    const user = users.filter(user=>user.name==name && user.id==id);
    res.status(200).send(user);
});

// app.get('/noms/:name',(req,res)=>{
//     const name = req.params.name;
//      const id = req.query.id;
//      if(!id){
//          const user = users.filter(user=>user.name==name);
//         res.send({"users":user});
//      }
//      console.log(req.params);
//     const user = users.filter(user=>user.name==name && user.id==id);
//     res.send(user);
// })

app.listen(port,()=>{
    console.log(`serveur is running on port ${port}`);
});
