const isLoggedIn = false;
const isLoggedInToAdmin = false;
fetch('/pass')
  .then(response => response.json())
  .then(data => {
    const users = data; // Az adatbázisból lekért felhasználók tömbje

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Űrlap elküldésének megakadályozása

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const enteredUsername = usernameInput.value;
      const enteredPassword = passwordInput.value;

      const user = users.find(user => user.name === enteredUsername && user.password === enteredPassword);
      if (user) {
        if (enteredUsername === 'admin') {
          window.location.href = 'admin.html';
          isLoggedInToAdmin = true;
        } if (enteredUsername === 'bar') {
          window.location.href = 'pos.html';
          isLoggedIn = true;

        }
      } else {
        alert('Hibás felhasználónév vagy jelszó! Kérem próbálja újra.');
        passwordInput.value = '';
      }
    });
  })
  .catch(error => console.error('Error fetching username and password:', error));
