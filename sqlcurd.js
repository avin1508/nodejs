const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'students'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

    const CREATE_TABLE_QUERY = `
        CREATE TABLE IF NOT EXISTS data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            registerNumber VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            department VARCHAR(255) NOT NULL,
            year INT NOT NULL
        )
    `;
    connection.query(CREATE_TABLE_QUERY, (error, results) => {
        if (error) {
            console.error('Error creating table:', error);
            return;
        }
        console.log('Table "data" created or already exists');
    });
});

app.post('/students', (req, res) => {
    const { registerNumber, name, department, year } = req.body;
    const INSERT_QUERY = `INSERT INTO data (registerNumber, name, department, year) VALUES (?, ?, ?, ?)`;
    connection.query(INSERT_QUERY, [registerNumber, name, department, year], (error, results) => {
        if (error) {
            console.error('Error inserting student:', error);
            res.status(500).json({ error: 'Failed to insert student' });
            return;
        }
        res.status(201).json({ message: 'Student inserted successfully' });
    });
});

app.get('/students', (req, res) => {
    const SELECT_QUERY = `SELECT * FROM data`;
    connection.query(SELECT_QUERY, (error, results) => {
        if (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ error: 'Failed to fetch students' });
            return;
        }
        res.json(results);
    });
});

app.put('/students/:id', (req, res) => {
    const { name, department, year } = req.body;
    const id = req.params.id;
    const UPDATE_QUERY = `UPDATE data SET name=?, department=?, year=? WHERE id=?`;
    connection.query(UPDATE_QUERY, [name, department, year, id], (error, results) => {
        if (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ error: 'Failed to update student' });
            return;
        }
        res.json({ message: 'Student updated successfully' });
    });
});

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const DELETE_QUERY = `DELETE FROM data WHERE id=?`;
    connection.query(DELETE_QUERY, [id], (error, results) => {
        if (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ error: 'Failed to delete student' });
            return;
        }
        res.json({ message: 'Student deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
