import { auth, db, storage } from "../firebase/config.mjs"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js"
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js"

const form = document.querySelector(".login-form-container");

async function register(e) {
    e.preventDefault()
    const fname = document.querySelector("#fname")
    const lname = document.querySelector("#lname")
    const password = document.querySelector("#password")
    const rpassword = document.querySelector("#rpassword")
    const email = document.querySelector("#email")
    console.log(email.value);
    const data = await createUserWithEmailAndPassword(auth,
        email.value,
        password.value
    );
    if (data) {
        let storingData = {
            first_name: fname.value,
            last_name: lname.value,
            email: email.value,
            password: password.value,
            rpassword: rpassword.value,
            uid: data.uid
        }
        try {
            const docRef = await addDoc(collection(db, "users"), {
                ...storingData
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        console.log(data);
    }
}


// Function to validate the password
function isValidPassword(password) {
    // Password must be at least 8 characters and include uppercase and lowercase letters
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
}

// Get the password input element
const passwordInput = document.getElementById('password');
const repeatPasswordInput = document.getElementById('rpassword');

// Add an input event listener to the password input for real-time validation
passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const isValid = isValidPassword(password);

    if (!isValid) {
        passwordInput.setCustomValidity('Password must be at least 8 characters and include uppercase and lowercase letters.');
    } else {
        passwordInput.setCustomValidity('');
    }
});

// Add an input event listener to the repeat password input for matching validation
repeatPasswordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    if (password !== repeatPassword) {
        repeatPasswordInput.setCustomValidity('Passwords do not match.');
    } else {
        repeatPasswordInput.setCustomValidity('');
    }
});





form.addEventListener('submit', register)