const express = require('express')
// const crud = require('./oldApp')
//const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000






//Routes avant la mise en place de la base de données
/*
crud.getHome(app)
crud.createPokemon(app)
crud.updatePokemon(app)
crud.deletePokemonById(app)
crud.getPokemonById(app)
crud.getPokemons(app)
*/


// Création d'un middleware permettant de logger les requêtes entrantes dans l'API Rest
/* const logger = (req, res, next) => {
    console.log(`URL : ${req.url} `)
    next()
}
app.use(logger)
*/
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.statusCode} `)
    next()
})

// Utilisation des middlewares
app
    //.use(morgan('dev'))
    .use(favicon(path.join(__dirname, 'favicon.ico')))
    .use(bodyParser.json())
    // .use(favicon(__dirname + '/favicon.ico'))

// Connexion à la BDD et initialisation
sequelize.dbConnect
sequelize.initDb()
// Point de terminaison pour tester le bon déploiement de l'application
app.get('/', (req, res) => {
    res.json('Hello, Koyeb !')
})
// Points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/FindPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
    res.status(404).json(message)
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))