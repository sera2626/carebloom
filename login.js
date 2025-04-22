document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const loginError = document.getElementById("login-error");
    const successMsg = document.getElementById("login-success");
  
    if (localStorage.getItem("loggedIn") === "true") {
      window.location.href = "index.html";
      return;
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      resetMessages();
  
      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      let isValid = true;
  
      if (!validateEmail(email)) {
        showError(emailError, "Please enter a valid email.");
        isValid = false;
      }
  
      if (password.length < 6) {
        showError(passwordError, "Password must be at least 6 characters.");
        isValid = false;
      }
  
      const storedEmail = localStorage.getItem("userEmail");
      const storedPasswordHash = localStorage.getItem("userPasswordHash");
      const hashedInputPassword = hashPassword(password);
  
      if (
        isValid &&
        (email !== storedEmail || hashedInputPassword !== storedPasswordHash)
      ) {
        showError(loginError, "Wrong credentials. Please try again.");
        isValid = false;
      }
  
      if (isValid) {
        showSuccess(successMsg);
        localStorage.setItem("loggedIn", "true");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      }
    });
  
    function resetMessages() {
      [emailError, passwordError, loginError, successMsg].forEach((el) => {
        el.style.display = "none";
        el.style.opacity = 0;
        el.style.transform = "translateY(-10px)";
      });
    }
  
    function showError(element, message) {
      element.textContent = message;
      element.style.display = "block";
      requestAnimationFrame(() => {
        element.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
      });
    }
  
    function showSuccess(element) {
      element.style.display = "block";
      requestAnimationFrame(() => {
        element.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        element.style.opacity = 1;
        element.style.transform = "scale(1)";
      });
    }
  
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    }
  
    function hashPassword(password) {
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return hash.toString();
    }
  });
  
  function togglePassword(id, icon) {
    const field = document.getElementById(id);
    if (!field) return;
    const isHidden = field.type === "password";
    field.type = isHidden ? "text" : "password";
    icon.classList.toggle("fa-eye-slash", !isHidden);
    icon.classList.toggle("fa-eye", isHidden);
  }