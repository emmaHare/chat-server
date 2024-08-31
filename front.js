let msgInput = document.getElementById('msg-input');

let firstModal = document.getElementById('first-modal');
let signupModal = document.getElementById('signup-modal');
let loginModal = document.getElementById('login-modal');

let msgBtn = document.getElementById('msg-btn');
let loginBtn = document.getElementById('login-btn');
let signupBtn = document.getElementById('signup-btn');
let signupSubmit = document.getElementById('signup-submit');

let userInput = document.getElementById('user-input');
let emailInput = document.getElementById('email-input');
let pwordInput = document.getElementById('pword-input');
let pwordConfirm = document.getElementById('pword-confirm')

firstModal.showModal();

loginBtn.addEventListener('click', function() {
    loginModal.showModal();
});

signupBtn.addEventListener('click', function() {
    signupModal.showModal();
});



