const { syncAndSeed, models: { Employee, Food } } = require('./db')
const express = require('express');
const app = express()
const { static } = express;
const path = require('path');

app.use(express.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/employees', async(req, res, next) => {
    try {
        res.send(await Employee.findAll())
    }
    catch(ex) {
        next(ex);
    }
})

app.get('/api/foods', async(req, res, next) => {
    try {
        res.send(await Food.findAll())
    }
    catch   (ex) {
        next(ex)
    }
})

app.post('/api/foods', async(req, res, next) => {
    try {
        res.status(201).send(await Food.create(req.body))
    }
    catch(ex) {
        next(ex)
    }
})

app.delete('/api/foods/:id', async(req, res, next) => {
    try {
        const foods = await Food.findByPk(req.params.id)
        await foods.destroy();
        res.sendStatus(204)
    }
    catch(ex) {
        next(ex)
    }
})

const init = async() => {
    try {
        await syncAndSeed()

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));

    }
    catch(ex) {
        console.log(ex)
    }
}

init()