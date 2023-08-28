import { auth } from "../firebase/config.mjs"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js"

const form = document.querySelector(".login-form-container");

async function login(e) {
    e.preventDefault()
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const data = await signInWithEmailAndPassword(auth, email.value,
        password.value);
    if (data) {
     window.location.href = '/pages/login/dashbord.html';
    } else {
        console.log(data);
     }
}

form.addEventListener('submit', login)



if (successfulLogin) {
    // Redirect the user to the dashboard page
    window.location.href = '/pages/login/dashbord.html'; // Update the path accordingly
} else {
    // Show an error message or perform other actions for unsuccessful login
    Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
    });
}
















// function loginUser() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // Perform your login validation here (e.g., check against a database)

//     // For the sake of this example, let's assume a successful login
//     const successfulLogin = true;

//     if (successfulLogin) {
//         // Redirect the user to the dashboard page
//         window.location.href = './dashboard.html'; // Update the path accordingly
//     } else {
//         // Show an error message or perform other actions for unsuccessful login
//         Swal.fire({
//             icon: 'error',
//             title: 'Login Failed',
//             text: 'Invalid email or password. Please try again.',
//         });
//     }
// }

// // Add an event listener to the login button
// const loginButton = document.querySelector('.login-form-container button');
// loginButton.addEventListener('click', (event) => {
//     event.preventDefault(); // Prevent form submission
//     loginUser(); // Call the login function
// });
