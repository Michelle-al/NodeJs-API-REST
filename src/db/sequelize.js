/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')


// const sequelize = new Sequelize(
//     'pokedex',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2'
//         },
//         logging: false
//     }
// )

// const sequelize = new Sequelize('pokedex', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// })

let sequelize

if(process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('postgres://koyeb-adm:FqvaMjU9R3tx@ep-calm-truth-a2bbacny.eu-central-1.pg.koyeb.app/koyebdb', {
        "dialectOptions": {
            "ssl": true
        }
    })

} else {

    sequelize = new Sequelize('postgres://postgres:root@localhost/pokedex')
}


// on instancie les modèles
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize,DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })

        bcrypt.hash('pikachu', 10)
            .then( hash => User.create({
                    username: 'pikachu',
                    password: hash
                })
            )

            .then(user => console.log(user.toJSON()))
        //console.log('La base de donnée a bien été initialisée !')
    })
}

const dbConnect = sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = {
    initDb, Pokemon, User, dbConnect
}