


const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const fs = require('fs');




app.use(bodyParser.urlencoded({ extended: false }))


let data = [];
// these is for message
app.get('/', (req, res, next) => {

    fs.readFile('message.txt', (err, data) => {
        if (err) {
            console.log(err);
        }else if(data == []){
            data.push("No Chat Exists")
        }

        res.send(`${data} <form  action="/" onsubmit=" document.getElementById('username').value = localStorage.getItem('username')" method="POST">

        <input  id="username" type="hidden" name="title" placeholder="Name">
    
        <input id="message" type="text" name="title" placeholder="Type-Message">
    
        <button type="submit">submit</button>
    </form>`)

    })

})

app.post('/', (req, res, next) => {

    // console.log(req.body)
    // console.log(req.body.title[0]) ///userName
    // console.log(req.body.title[1]) ///message

    data.push( `${req.body.title[0]}: ${req.body.title[1]}`)
    // console.log(data);

    // fs.writeFile("message.txt", `${req.body.title[0]}: ${req.body.title[1]}`, (error) => error ? console.log(error) : res.redirect('/'));

    fs.writeFile("message.txt", `${data}`, (error) => error ? console.log(error) : res.redirect('/'));

})


// these for user name
app.get('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/login" method="POST">

    <input id="message" type="hidden" name="title" placeholder="Type-Message">

	<input id="username" type="text" name="title" placeholder="Name">
	<button type="submit">login</button>
</form>`)
})

app.post('/login', (req, res, next) => {
    res.redirect('/')
})


app.listen(4000)


