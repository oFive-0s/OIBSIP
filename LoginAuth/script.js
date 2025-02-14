// Simulated database
let users = [];

// Show Register Form
function showRegister() {
  document.getElementById('register-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('secured-page').style.display = 'none';
}

// Show Login Form
function showLogin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('secured-page').style.display = 'none';
}

// Register Function
function register() {
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;

  if (username && password) {
    const userExists = users.some(user => user.username === username);
    if (!userExists) {
      users.push({ username, password });
      alert('Registration successful! Please login.');
      showLogin();
    } else {
      alert('Username already exists.');
    }
  } else {
    alert('Please fill in all fields.');
  }
}

// Login Function
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('secured-page').style.display = 'block';
  } else {
    alert('Invalid username or password.');
  }
}

// Logout Function
function logout() {
  document.getElementById('secured-page').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}