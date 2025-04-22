document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get input values
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const termsChecked = document.getElementById("terms").checked;

        let isValid = true;

        resetErrors();

        if (!firstName) {
            showError("first-name-error", "First Name is required.");
            isValid = false;
        } else if (/[^a-zA-Z]/.test(firstName)) { 
            showError("first-name-error", "First Name should only contain letters.");
            isValid = false;
        }

        if (!lastName) {
            showError("last-name-error", "Last Name is required.");
            isValid = false;
        } else if (/[^a-zA-Z]/.test(lastName)) { 
            showError("last-name-error", "Last Name should only contain letters.");
            isValid = false;
        }

        if (!validateEmail(email)) {
            showError("email-error", "Please enter a valid email.");
            isValid = false;
        }

        if (!email.includes(firstName.toLowerCase()) && !email.includes(lastName.toLowerCase())) {
            showError("email-error", "Email should contain both First Name and Last Name.");
            isValid = false;
        } else if (email.includes(firstName.toLowerCase()) && !email.includes(lastName.toLowerCase())) {
            showError("email-error", `Email must also contain the Last Name: ${lastName}`);
            isValid = false;
        } else if (email.includes(lastName.toLowerCase()) && !email.includes(firstName.toLowerCase())) {
            showError("email-error", `Email must also contain the First Name: ${firstName}`);
            isValid = false;
        }

        if (password.length < 8) {
            showError("password-error", "Password must be at least 8 characters.");
            isValid = false;
        }

        if (password !== confirmPassword) {
            showError("confirm-password-error", "Passwords do not match.");
            isValid = false;
        }

        if (!termsChecked) {
            showError("terms-error", "You must agree to the Terms of Use and Privacy Policy.");
            isValid = false;
        }

        if (isValid) {
            const hashedPassword = hashPassword(password); 
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPasswordHash", hashedPassword); 

            alert("Sign Up successful! Redirecting to login page...");
            window.location.href = "login.html";
        }
    });

    window.togglePassword = (id) => {
        const input = document.getElementById(id);
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    };

    function hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; 
        }
        return hash.toString();
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    function resetErrors() {
        const errors = document.querySelectorAll(".error-message");
        errors.forEach((error) => {
            error.style.display = "none";
        });
    }
});