const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')




const app = express();
const PORT = 8000


//models base de dados 
const user = require('../model/user');
const User = require('../model/user');

// conecção com base de dados 

const database_url = 'mongodb://localhost:27017/ussd'

mongoose.connect(database_url)

const db = mongoose.connection

 db.on('error', (err)=>{
     console.log(err)
 })

 db.once('open', ()=>{
     console.log('Base de dados connectada')
 })


 // body-parser

 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:true}))

 app.get('/', (req, res) =>{
     res.send('Sucesso na CarroCell')
 })

 app.post('/', (req, res) =>{
     const {
         phoneNumber, 
         text, 
         sessionId
    } = req.body;

     let response;

     if(text===''){
        console.log('1')
        response = 'CON  Diga-nos o teu nome'
     }
     else if(text !== ''){
        let array = text.split('*')
        console.log(array)
            if(array.length===1){
                response = 'CON  Digite o seu numero Mpesa'
            }
            else if(array.length === 2){

                //ID Number
                if(parseInt(array[1])>0){

                    response = 'CON  Deseja se cadastrar no servico CarroCell\n 1.Confirm\n 2.Cancelar\n 3.Ver dados'                }

            }
            else if(array.length===3){
                
                if(parseInt(array[2])===1){
                    let data = new User()
                    data.fullname = array[0]
                    data.numberPhone = array[1]   
                    data.save(()=>{
                response = 'END Usuario cadastrado com sucesso.\n Seja bem vindo a Familia CarroCell'


            })         

       }

       else if(parseInt(array[2])===2){
        response = 'CON Ups! Ususario não registado'
           
        }
        else if(parseInt(array[2])===2){
                
                User.find({},(err, users)=>{
                    console.log(users)
                    let users_data = `${
                        users.length < 1 ?
                        `Nossos Usuarios`


                        :
                        `${
                            users.map((itme, index)=>{
                          return `${index+1}. ${item.fullname}`
                        }
                        
                        )}`
                    }`
                    response = `END Sem Dados .\n{users_data}`

                })
            }
            
        else{
            response = 'END Sem boleias disponiveis'
        }

    }
            else{
                response = 'END  Bem vindo ao servico CarroCell '

            }
       

     }






     setTimeout(() =>{
         console.log(text)
         res.send(response)
         res.end()
     }, 2000)
   
})



app.listen(PORT, ()=>{
    console.log('Bem vindo a CarroCell ' +  PORT)
})