const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth,(req, res) => {
        if(req.query.name) {

            // const limit = (req.query.limit) ? Number(req.query.limit) : 5;
            const limit = parseInt(req.query.limit) || 5;
            const name = req.query.name

            if(name.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caractères'
                res.status(400).json({ message })
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: { // 'name est la propriété du modèle pokemon
                        [Op.like]: `%${name}%` // 'name est le critère de recherche
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
                    res.json({ message, data: rows })
                })
                .catch(error => {
                    const message = 'La liste des pokémons correspondant à votre recherche n\'a pas pu être récupérée. Veuillez réessayer dans quelques instants.'
                    res.status(500).json({ message, data: error})
                })


        } else {
            Pokemon.findAll({ order: ['name']})
                .then(pokemons => {
                    const message = `La liste des ${pokemons.length} pokémons a bien été récupérée.`
                    res.status(200).json({ message, data: pokemons })
                })
                .catch(error => {
                    const message = 'La liste des pokémons n\'a pas pu être récupérée. Veuillez réessayer dans quelques instants.'
                    res.status(500).json({ message, data: error })
                })
        }

    })
}