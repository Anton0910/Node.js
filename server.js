const http = require("http");
http.createServer((request, response) =>
{

    if(request.url == "/produto")
    {
        response.end(JSON.stringify({
            message: "Rota de produto"
        }))
    }



    response.writeHead(200, { 'Content-Type': 'application/json' });

    response.end(JSON.stringify(
        {
            message: "Minha primeira aplicação"
        }
    ));
}).listen(4001, () => console.log("Servidor rodando na porta 4001"))