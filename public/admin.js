fetch('/pass')
  .then(response => response.json())
  .then(data => {
    const correctUsername = data.name; // Az adatbázisból lekért felhasználónév
    const correctPassword = data.password; // Az adatbázisból lekért jelszó

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Űrlap elküldésének megakadályozása

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const enteredUsername = usernameInput.value;
      const enteredPassword = passwordInput.value;

      // Ellenőrzés, hogy a megadott felhasználónév és jelszó megfelelő-e
      if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // Ha az admin a felhasználónév, akkor az admin.html-re irányít
        if (enteredUsername === 'admin') {
          window.location.href = 'admin.html';
        } if (enteredUsername === 'bar') {
          window.location.href = 'pos.html'; // Egyébként a pos.html-re irányít
        }
      } else {
        alert('Hibás felhasználónév vagy jelszó! Kérem próbálja újra.');
        passwordInput.value = ''; // Jelszómező törlése
      }
    });
  })
  .catch(error => console.error('Error fetching username and password:', error));
