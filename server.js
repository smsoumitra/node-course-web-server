const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+ '/views/partials');
app.use(express.static(__dirname+ '/public'));
app.set('view-engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log("Error logging in file.");
        }
    });
    next();
});
app.use((req, res, next) =>{
    // res.render('maintenance.hbs');
    if(req.url === '/maintenance'){
        res.render('maintenance.hbs');
    } else{
        next();
    }
});
app.get('/',(req, res)=>{
    //res.type('json');
    res.send({hello: 'Hello from Node!!'});
});

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
    /* let pro = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            //res.send("From timeout resolve");
            resolve('test')
        }, 15000);
    });
    pro.then(() =>{
        res.send("Promise resolved1 ");
    }) */
    
})

app.get('/home', (req, res)=>{
    res.render('home.hbs', {
        welcomeMsg: 'Welcome home!',
        pageTitle: 'Home Page'
    })
})

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    })
})

app.get('/about2', (req, res)=> {
  
    let pro = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            //res.send("From timeout resolve");
            resolve('test')
        }, 5000);
    });
    pro.then(() =>{
        res.send("Promise resolved 2");
    })
    
})
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
});
