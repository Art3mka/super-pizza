const sequelize = require('../db.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Pizza = sequelize.define('pizza', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DOUBLE, unique: false, allowNull: false},
    img: {type: DataTypes.STRING, unique: false, allowNull: false},
})

const PizzaInfo = sequelize.define('pizza_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

Pizza.hasMany(PizzaInfo, {as: 'info'})
PizzaInfo.belongsTo(Pizza)

module.exports = {
    User,
    Pizza,
    PizzaInfo,
}