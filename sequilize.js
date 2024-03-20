const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('students', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
});

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

app.use(bodyParser.json());


app.post('/students', async (req, res) => {
    try {
        const { name, department, year } = req.body;
        const student = await Student.create({ name, department, year });
        res.status(201).json(student);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});


sequelize.sync()
    .then(() => {
        console.log('Models synchronized with database.');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to synchronize models with database:', err);
    });
