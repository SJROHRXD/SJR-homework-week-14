const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const pwd = document.querySelector('#password-login').value.trim();

    if (email && pwd) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, pwd }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
        alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const user_name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const pwd = document.querySelector('#password-signup').value.trim();

    if (user_name && email && pwd) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ user_name, email, pwd }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);