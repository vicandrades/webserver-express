const express = require('express');
const app = express();
const hbs = require('hbs');

require('./hbs/helpers');

const port = process.env.PORT || 3000;

//hacer publico un directorio, todo lo que se sirva en esta carpeta va a ser de dominio publico
//url para acceder a cada documento localhost:puerto/nombredeldocumentoenlaruta.html
//si se coloco unicamente localhost:puerto => va directo al index de la carpeta si existe
app.use(express.static(__dirname + '/public'));

// Express HBS engine
//aca esta la ruta que usara el engine de hbs para buscar los bloques de codigo html que se repiten o comunes, que mostrara en la pagina 
hbs.registerPartials(__dirname + '/views/parciales', function(err) {});


app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'victor'
    });
});

app.get('/about', (req, res) => {

    res.render('about');

});


//de esta manera se pueden crear servicios que responden un json 
app.get('/service', (req, res) => {
    let salida = {
        nombre: 'victor',
        edad: 23,
        url: req.url
    }
    res.send(salida);
});

//este servicio responde una salida text/html
app.get('/data', (req, res) => {
    res.send('Hola data');
});

app.listen(port, () => {
    console.log(`escuchando peticiones por el puerto ${port}`);
})