import React, { useEffect, useState } from 'react';

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} ({student.email}) - Courses: {student.courses.join(', ') || 'None'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsList;
