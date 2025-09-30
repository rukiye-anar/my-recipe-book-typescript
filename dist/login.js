"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitLogin = document.getElementById('submit');
    const signupUsername = document.getElementById('signup-username');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const submitSignup = document.getElementById('submit-signup');
    if (!loginForm || !signupForm || !emailInput || !passwordInput || !submitLogin ||
        !signupUsername || !signupEmail || !signupPassword || !submitSignup) {
        console.error("Gerekli form elementlerinden biri veya birkaçı DOM'da bulunamadı.");
        return;
    }
    const checkInputsLogin = () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        submitLogin.disabled = !(emailRegex.test(email) && password.length >= 6);
    };
    const checkInputsSignup = () => {
        const username = signupUsername.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        submitSignup.disabled = !(username !== "" && emailRegex.test(email) && password.length >= 6);
    };
    emailInput.addEventListener('input', checkInputsLogin);
    passwordInput.addEventListener('input', checkInputsLogin);
    signupUsername.addEventListener('input', checkInputsSignup);
    signupEmail.addEventListener('input', checkInputsSignup);
    signupPassword.addEventListener('input', checkInputsSignup);
    checkInputsLogin();
    checkInputsSignup();
    const params = new URLSearchParams(window.location.search);
    const action = params.get('login');
    if (action === 'Signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
    else {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    }
});
