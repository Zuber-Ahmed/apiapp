const http=require('http');

http.createServer((req,res)=>{
    console.log("Server is Running")
    res.write("I am on this port:4040");
    res.end();
}).listen(4040)