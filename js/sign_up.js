// Form Submission Handling
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs (basic example)
    if (username && email && password) {
        alert(`Sign Up Successful!\nUsername: ${username}\nEmail: ${email}`);
        // You can add AJAX or fetch() to send data to a server here
    } else {
        alert('Please fill out all fields.');
    }
    });