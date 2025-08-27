const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.querySelector('.toggle-password');
const passwordStrengthMeter = document.querySelector('.strength-meter-fill');
const passwordStrengthText = document.querySelector('.strength-text span');
const successMessage = document.getElementById('successMessage');

const errorElements = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError')
};

const passwordStrength = {
    0: { text: 'Very Weak', color: '#e74c3c', width: '20%' },
    1: { text: 'Weak', color: '#f39c12', width: '40%' },
    2: { text: 'Fair', color: '#f1c40f', width: '60%' },
    3: { text: 'Good', color: '#2ecc71', width: '80%' },
    4: { text: 'Strong', color: '#27ae60', width: '100%' }
};

function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        showError('name', 'Name is required');
        return false;
    }
    if (name.length < 3) {
        showError('name', 'Name must be at least 3 characters');
        return false;
    }
    showSuccess('name');
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError('email', 'Email is required');
        return false;
    }
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }
    showSuccess('email');
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{10}$/;
    
    if (phone === '') {
        showError('phone', 'Phone number is required');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        return false;
    }
    showSuccess('phone');
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (password === '') {
        showError('password', 'Password is required');
        return false;
    }
    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        return false;
    }
    
const strength = checkPasswordStrength(password);
    updatePasswordStrengthMeter(strength);
    
    if (strength < 2) {
        showError('password', 'Please choose a stronger password');
        return false;
    }
    
    showSuccess('password');
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        showError('confirmPassword', 'Please confirm your password');
        return false;
    }
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    }
    showSuccess('confirmPassword');
    return true;
}

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    
    if (/[a-z]/.test(password)) strength++;
    
    if (/[A-Z]/.test(password)) strength++;
    
    if (/\d/.test(password)) strength++;
    
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
}

function updatePasswordStrengthMeter(strength) {
    const { text, color, width } = passwordStrength[strength];
    passwordStrengthMeter.style.width = width;
    passwordStrengthMeter.style.backgroundColor = color;
    passwordStrengthText.textContent = text;
    passwordStrengthText.style.color = color;
}

function showError(field, message) {
    const errorElement = errorElements[field];
    const inputGroup = document.getElementById(field).parentElement;
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
}

function showSuccess(field) {
    const errorElement = errorElements[field];
    const inputGroup = document.getElementById(field).parentElement;
    
    errorElement.classList.remove('show');
    inputGroup.classList.remove('error');
    inputGroup.classList.add('success');
}

function showSuccessMessage() {
    successMessage.textContent = 'Account created successfully!';
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

function setupEventListeners() {
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            console.log('Form submitted successfully!', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                password: passwordInput.value
});
            
            showSuccessMessage();
            form.reset();
            passwordStrengthMeter.style.width = '0%';
            passwordStrengthText.textContent = 'Weak';
            passwordStrengthText.style.color = '';
                       document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
            Object.values(errorElements).forEach(element => {
                element.classList.remove('show');
            });
        } else {
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    const inputs = [nameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            switch(input.id) {
                case 'name': validateName(); break;
                case 'email': validateEmail(); break;
                case 'phone': validatePhone(); break;
                case 'password': validatePassword(); break;
                case 'confirmPassword': validateConfirmPassword(); break;
            }
        });
    });
}
setupEventListeners();
