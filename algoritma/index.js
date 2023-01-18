const express = require('express') //import express
const bodyParser = require('body-parser')
const app = express() //deklarasi variabel express
const port = 1945 //deklarasi port

app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => {
        for(let i = 1; i <=5; i++){
            let value = i + 1
            let s = value +"";
            for(let j = 0; j <=5; j++){
                value += 5 -j
                s+= value + " ";
            }
            console.log(s)
        }
    })



app.listen(port, () => {
    console.log(`Server di port ${port}`)
    })