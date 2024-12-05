
const http = require('http')
const port = 3000
const fs = require('node:fs')


fs.readFile('data.js',(err,data)=>{
    if (err) {
        throw err
    }
    const user  = JSON.parse(data)
    console.log(user)
})
const user ={
    name:"Jess",
    age:13
}
const jsonData =JSON.stringify(user,null,2)
fs.writeFile('newData.js',jsonData,(err)=>{
    if (err) {
        throw err
    }
    console.log('data written')
})
const server =http.createServer( (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello, World!\n')
})
setTimeout(()=>{
server.listen((req, res) => {
  console.log("server listening on port:", port);
});
},2000)