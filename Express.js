const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://vanshbhandaris66:<db_password>@cluster0.sdwhp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  courses: [String],
});

const Student = mongoose.model('Student', studentSchema);


app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id/courses', async (req, res) => {
  const { id } = req.params;
  const { courseName } = req.body;

  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  if (!student.courses.includes(courseName)) {
    student.courses.push(courseName);
    await student.save();
  }

  res.json(student);
});


app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
 