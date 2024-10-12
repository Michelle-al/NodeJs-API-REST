/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // todo check right message for unique name
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Ce nom est déjà pris.'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas être vide'},
                notNull: { msg: 'Le nom est une propriété requise'}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez des nombres entiers pour les points de vie'},
                notNull: { msg: 'Les points de vie sont une propriété requise'},
                min: {
                    args: [0],
                    msg: 'La valeur minimale est 0'
                },
                max: {
                    args: [99],
                    msg: 'La valeur maximale est 99'
                },
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez des nombres entiers pour les points de dégât'},
                notNull: { msg: 'Les points de dégât sont une propriété requise'},
                min: {
                    args: [0],
                    msg: 'La valeur minimale est 0'
                },
                max: {
                    args: [999],
                    msg: 'La valeur maximale est 999'
                },
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Saisissez une URL pour ce champ'},
                notNull: {msg: 'La propriété "picture" est requise'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                if(this.getDataValue('types')){
                    return this.getDataValue('types').split(',')
                }
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypeValid(value) {
                    if(!value) {
                        throw new Error('Un pokémon doit avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peux pas avoir pls de trois types')
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    })
                },
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}