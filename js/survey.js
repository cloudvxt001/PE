document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("surveyForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate Form
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const agree = document.getElementById("agree").checked;

        if (name === "" || email === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (!agree) {
            alert("You must agree to submit your responses.");
            return;
        }

        // Show Success Message
        successMessage.classList.remove("hidden");

        // Reset Form
        form.reset();

        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 3000);
    });
});