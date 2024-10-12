// Fichier app.js avant la mise en place de sequelize

// const express = require('express')
// const app = express()
let pokemons = require("../src/db/mock-pokemon")

// Affectation déstructurée permet d'importer unique la méthode success du module helper
const { success, getUniqueId } = require('./helper')


exports.getHome = (app) => { app.get('/', (req, res) => res.send('Hello, Express!')) }


exports.getPokemonById = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const pokemon = pokemons.find(pokemon => pokemon.id === id)
        const message = 'Un pokémon a bien été trouvé'
        // res.send(`Vous avez demandé le pokémon ${pokemon.name}.`)
        res.json(success(message, pokemon))
    })
}

// Number of pokemons
exports.getPokemons = (app) => {
    app.get('/api/pokemons', (req, res) => {
        const message = `La liste des ${pokemons.length} pokémons ont bien été récupérés.`
        // res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
        res.json(success(message, pokemons))
    })
}

exports.createPokemon = (app) => {
    app.post('/api/pokemons', (req, res) => {
        const id = getUniqueId(pokemons)
        const pokemonCreated = {...{id: id, ...(req.body), created: new Date()}}
        pokemons.push(pokemonCreated)
        console.log(pokemonCreated)
        const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
        res.json(success(message, pokemonCreated))
    })
}

exports.updatePokemon = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const pokemonUpdated = {id: id, ...req.body}
        let pokemonName = ""
        pokemons = pokemons.map(pokemon => {
            pokemonName = pokemon.name
            return pokemon.id === id ? pokemonUpdated : pokemon
        })
        const message = `Le pokemon ${pokemonName} a bien été modifié.`
        res.json(success(message, pokemonUpdated))
    })
}

exports.deletePokemonById = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
        pokemons = pokemons.filter(pokemon => pokemon.id !== id)

        const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`
        res.json(success(message, pokemonDeleted))
    })
}

// Exemple de récupération de paramètre dans l'URL
/* app.get('/api/pokemons/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Le pokemon n°${id} est ${name}!`)
    })
*/
