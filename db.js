const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_redux_db');

const Employee = sequelize.define('employee', {
    name: {
        type: Sequelize.STRING,
    },
    profession: {
        type: Sequelize.STRING
    }
})

const Food = sequelize.define('food', {
    name: Sequelize.STRING
})

const syncAndSeed = async() => {
    await sequelize.sync({ force: true })

    await Promise.all([
        Employee.create({ name: 'Allison', profession: 'Head Chef' }),
        Employee.create({ name: 'Alex', profession: 'Sous Chef' }),
        Employee.create({ name: 'Amanda', profession: 'Pastry Chef' }),
        Employee.create({ name: 'Anthony', profession: 'Prep Cook' }),
    ]),
    await Promise.all([
        Food.create({ name: 'Caprese Salad'}),
        Food.create({ name: 'Beignet'}),
        Food.create({ name: 'Filet Mignon'}),
        Food.create({ name: 'Eggs Benedict'}),
    ])
}

module.exports = {
    syncAndSeed,
    models: {
        Employee,
        Food
    }
}