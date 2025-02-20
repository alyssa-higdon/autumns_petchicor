const userForm = document.getElementById('userForm') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const ageInput = document.getElementById('age') as HTMLInputElement;
const usersList = document.getElementById('usersList') as HTMLUListElement;

const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    usersList.innerHTML = ''; // Clear the list before rendering
    users.forEach((user: { id: number, name: string, age: number }) => {
      const li = document.createElement('li');
      li.textContent = `Name: ${user.name}, Age: ${user.age}`;
      usersList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const addUser = async (name: string, age: number) => {
  try {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age }),
    });
    fetchUsers();  // Reload the list after adding a new user
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const age = parseInt(ageInput.value, 10);
  if (name && age) {
    addUser(name, age);
    nameInput.value = '';
    ageInput.value = '';
  }
});

fetchUsers();  // Load users initially when the page is loaded
