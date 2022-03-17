const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_react_redux_db');
const faker = require('faker')

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

Food.createRandomFood = function() {
    const name = faker.name.firstName()
    const lastName = faker.name.lastName()
    const country = faker.address.country()
    return this.create({ name: `${name} ${lastName} is from ${country}.` })
}

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