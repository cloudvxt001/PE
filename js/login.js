function validateForm(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    const predefinedEmail = "admin@gmail.com"; // Set your email
    const predefinedPassword = "admin123"; // Set your password

    if (email === "" || password === "") {
      errorMessage.textContent = "All fields are required!";
      errorMessage.style.display = "block";
      return false;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      errorMessage.textContent = "Enter a valid email!";
      errorMessage.style.display = "block";
      return false;
    }

    if (email === predefinedEmail && password === predefinedPassword) {
      errorMessage.style.display = "none";
      setTimeout(() => {
        window.location.href = "../page/allInput.html";
      }, 1000);
      return true;
    } else {
      errorMessage.textContent = "Invalid email or password!";
      errorMessage.style.display = "block";
      return false;
    }
  }