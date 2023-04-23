const express = require('express')
const address=require("address");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactZumba');
}
const bodyparser = require("body-parser")
const port= 8000;

//define mongoose scheema 
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
});
  var Contact = mongoose.model('contact',contactSchema );

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))// for serving static file 
app.use(express.urlencoded())
// FOR PUG SPECIFIC STUFF   
app.set('view engine','pug')// set the engine template
app.set('views',path.join(__dirname,'views'))// set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("your data has been recorded")
    }).catch(()=>{
        res.status(400).send("Saving Failed")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})