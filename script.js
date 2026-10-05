const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const successMessage = document.getElementById("successMessage");

function showError(input, errorElement, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    errorElement.textContent = message;
}

function showValid(input, errorElement) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorElement.textContent = "";
}

function validateName() {
    const name = nameInput.value.trim();
    const namePattern = /^[A-Za-z]+(?:[ ]+[A-Za-z]+)*$/;

    if (name === "") {
        showError(nameInput, nameError, "Name is required.");
        return false;
    }

    if (name.length < 2) {
        showError(nameInput, nameError, "Name must contain at least 2 characters.");
        return false;
    }

    if (!namePattern.test(name)) {
        showError(nameInput, nameError, "Name can contain only letters and spaces.");
        return false;
    }

    showValid(nameInput, nameError);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError(emailInput, emailError, "Email is required.");
        return false;
    }

    if (!emailPattern.test(email)) {
        showError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }

    showValid(emailInput, emailError);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();

    if (phone === "") {
        showError(phoneInput, phoneError, "Phone number is required.");
        return false;
    }

    if (!/^\d{10}$/.test(phone)) {
        showError(phoneInput, phoneError, "Phone number must contain exactly 10 digits.");
        return false;
    }

    showValid(phoneInput, phoneError);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        showError(passwordInput, passwordError, "Password is required.");
        return false;
    }

    if (password.length < 8) {
        showError(passwordInput, passwordError, "Password must contain at least 8 characters.");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        showError(passwordInput, passwordError, "Password must contain at least one uppercase letter.");
        return false;
    }

    if (!/[a-z]/.test(password)) {
        showError(passwordInput, passwordError, "Password must contain at least one lowercase letter.");
        return false;
    }

    if (!/\d/.test(password)) {
        showError(passwordInput, passwordError, "Password must contain at least one number.");
        return false;
    }

    showValid(passwordInput, passwordError);
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Please confirm your password."
        );
        return false;
    }

    if (confirmPassword !== password) {
        showError(
            confirmPasswordInput,
            confirmPasswordError,
            "Passwords do not match."
        );
        return false;
    }

    showValid(confirmPasswordInput, confirmPasswordError);
    return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", function () {
    validatePassword();
    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();

    if (
        validName &&
        validEmail &&
        validPhone &&
        validPassword &&
        validConfirmPassword
    ) {
        successMessage.textContent =
            "Registration successful! All inputs are valid.";
    } else {
        successMessage.textContent = "";
    }
});
