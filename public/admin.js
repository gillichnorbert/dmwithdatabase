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

      // Ellenőrzés, hogy a megadott felhasználónév és jelszó megfelelő-e
      const user = users.find(user => user.name === enteredUsername && user.password === enteredPassword);
      if (user) {
        // Ha az admin a felhasználónév, akkor az admin.html-re irányít
        if (enteredUsername === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'pos.html'; // Egyébként a pos.html-re irányít
        }
      } else {
        alert('Hibás felhasználónév vagy jelszó! Kérem próbálja újra.');
        passwordInput.value = ''; // Jelszómező törlése
      }
    });
  })
  .catch(error => console.error('Error fetching username and password:', error));
