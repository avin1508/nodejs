const express = require('express');
const app = express();
const PORT = 3000;


let students = [
  { id: '1', name: 'Avinash', age: 20, grade: 'A' },
  { id: '2', name: 'Abhishek', age: 21, grade: 'B' },
  { id: '3', name: 'aayan', age: 19, grade: 'A' },
  { id: '4', name: 'rohit', age: 22, grade: 'C' },
  { id: '5', name: 'banty', age: 20, grade: 'B' }
];

app.use(express.json());


app.get('/students', (req, res) => {
  res.json(students);
});


app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});


app.post('/students', (req, res) => {
  const { id, name, age, grade } = req.body;
  const newStudent = { id, name, age, grade };
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.put('/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    res.json(students[studentIndex]);
  } else {
    res.status(404).send('Student not found');
  }
});

app.delete('/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex !== -1) {
    const deletedStudent = students.splice(studentIndex, 1)[0];
    res.json(deletedStudent);
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server Listening at PORT: ${PORT}`);
});
