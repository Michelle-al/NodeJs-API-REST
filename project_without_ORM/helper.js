// Fichier utilisé par old.App.js
let uniqueId = 0
exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b))
    const uniqueId = maxId + 1
    return uniqueId
}

// const uid = (() => (id = 0, () => id++))()
exports.getMyUniqueId = () => {
    let id = 13
    return id + 1
}

// exports.success = (message, data) => {
//     return {
//         message: message,
//         data: data
//     }
// }

// const success = (message, data) => {
//     return {
//         message: message,
//         data: data
//     }
// }
//
// exports.success