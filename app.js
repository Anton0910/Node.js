const express = require("express");
const {randomUUID} = require("crypto");
const { response } = require("express");
const fs = require("fs");
const app= express();



app.use(express.json())

let products = [];

fs.readFile("products.json", "utf-8", (err, data)=>{
    if(err){
        console.log(err);
    }else{
        products = JSON.parse(data);
    }
});

// POST = Inserir um Dado
// GET = Buscar um/mais dados
// Put = Alterar um dados
// DELETE = Remover um dado

/**
 * Tipos de parametros
 * 
 * Request Body = Sempre que eu quiser enviar dados para a aplicação
 * Query Params = /product/23131 -> sao os parametros de rota
 * Params = /product?id=123123&value=123123 
 * 
 */



app.post("/products", (request,response) =>{
    //nome e preço

    const {name , price} = request.body;

    const product = {
        name: "Peixe",
        price: 3,
        id: randomUUID(),
    }

    products.push(product);

    ProductFile();

    return response.json(product);
} );


app.get("/products", (request, response) =>{
    return response.json(products);
})


app.get("/products/:id", (request,response) => {
    const { id } = request.params;
    const product = products.find((product) => product.id ===id);
    return response.json(product);

});


app.put("/products/:id", (request,response) =>{
    const { id } = request.params;
    const {name , price} = request.body;

    const productIndex = products.findIndex((product) => product.id === id);

    products[productIndex] = {
        id: products[productIndex].id,
        name,
        price,
    };

    ProductFile();

    return response.json({message: "produto alterado com sucesso"});

});


app.delete("/products/:id",(request,response) =>{
    const { id } = request.params;
    const productIndex = products.findIndex((product) => product.id === id);

    products.splice(productIndex, 1);
    ProductFile();
    return response.json({message : "produto ecluido com sucesso"})
})

function ProductFile(){
    fs.writeFile("products.json",JSON.stringify(products),(err) =>{
        if (err) {
            console.log(err);
        }else{
            console.log("Produto inserido");
        }
    })
}


app.listen(4002, () => console.log("Rodando na porta 4002"));