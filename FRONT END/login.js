const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

const users = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" }
];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const found = users.find(user => 
    user.username === username && user.password === password
  );

  if (found) {
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Username atau Password salah!";
  }
});
