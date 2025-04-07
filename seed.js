const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vanshbhandaris66:<vanshbhandaris66@cluster0.sdwhp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
 name: String,
 age: Number,
 email: String,
 courses: [String],
});

const courseSchema = new mongoose.Schema({
  courseName: String,
});

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);

async function seedData() {
  await Student.deleteMany({});
  await Course.deleteMany({});

  const students = [
    { name: 'Alice Johnson', age: 22, email: 'alice@example.com', courses: [] },
    { name: 'Bob Smith', age: 20, email: 'bob@example.com', courses: [] },
  ];

  const courses = [
    { courseName: 'Web Development' },
    { courseName: 'Data Science' },
  ];

  await Student.insertMany(students);
  await Course.insertMany(courses);

  console.log('Data seeded!');
  mongoose.disconnect();
}

seedData();
