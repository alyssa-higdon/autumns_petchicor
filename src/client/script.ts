// src/client/script.ts
const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const users = await response.json();
  displayUsers(users);
};

const addUser = async (name: string, age: number) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, age }),
  });
  const result = await response.json();
  console.log(result.message);
  fetchUsers(); // Re-fetch users after adding a new one
};

const fetchCourses = async () => {
  const response = await fetch('/api/courses');
  const courses = await response.json();
  displayCourses(courses);
};

const addCourse = async (name: string, instructor: string, credits: number, semester: string) => {
  const response = await fetch('/api/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, instructor, credits, semester }),
  });
  const result = await response.json();
  console.log(result.message);
  fetchCourses(); // Re-fetch courses after adding a new one
};

// Display functions
function displayUsers(users: { name: string, age: number }[]) {
  const usersContainer = document.getElementById('usersContainer');
  if (usersContainer) {
    usersContainer.innerHTML = users.map(user => `<div>${user.name}, ${user.age} years old</div>`).join('');
  }
}

function displayCourses(courses: { name: string, instructor: string, credits: number, semester: string }[]) {
  const coursesContainer = document.getElementById('courseesContainer');
  if (coursesContainer) {
    coursesContainer.innerHTML = courses.map(cls => 
      `<div>${cls.name} - ${cls.instructor}, ${cls.credits} credits (${cls.semester})</div>`
    ).join('');
  }
}

// Event Listeners
document.getElementById('userForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = (document.getElementById('userName') as HTMLInputElement).value;
  const age = parseInt((document.getElementById('userAge') as HTMLInputElement).value);
  addUser(name, age);
});

document.getElementById('courseForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = (document.getElementById('courseName') as HTMLInputElement).value;
  const instructor = (document.getElementById('instructorName') as HTMLInputElement).value;
  const credits = parseInt((document.getElementById('credits') as HTMLInputElement).value);
  const semester = (document.getElementById('semester') as HTMLInputElement).value;
  addCourse(name, instructor, credits, semester);
});

// Initial fetches
fetchUsers();
fetchCourses();