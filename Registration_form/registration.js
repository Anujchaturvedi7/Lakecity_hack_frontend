const API_URL = 'http://localhost:8000/register'; // Replace with your actual FastAPI API URL

function showForm(type) {
    document.getElementById('userForm').style.display = type === 'user' ? 'flex' : 'none';
    document.getElementById('adminForm').style.display = type === 'admin' ? 'flex' : 'none';
}

// User form submission
function validateUserForm() {
    let name = document.getElementById('userName').value.trim();
    let mobile = document.getElementById('userMobile').value.trim();
    let email = document.getElementById('userEmail').value.trim();
    let password = document.getElementById('userPassword').value;

    if (!/^\d{10}$/.test(mobile)) {
        alert("User mobile number must be 10 digits.");
        return false;
    }

    if (email.includes("admin")) {
        alert("You are not allowed to register as Admin from the User form!");
        return false;
    }

    const userData = {
        name,
        mobile,
        email,
        password
        // No passkey → automatically a user
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || "User registered!");
    })
    .catch(err => {
        alert("User registration failed!");
        console.error(err);
    });

    return false;
}

// Admin form submission
function validateAdminForm() {
    let name = document.getElementById('adminName').value.trim();
    let mobile = document.getElementById('adminMobile').value.trim();
    let email = document.getElementById('adminEmail').value.trim();
    let passkey = document.getElementById('adminPasskey').value.trim();
    let password = document.getElementById('adminPassword').value;

    if (!/^\d{10}$/.test(mobile)) {
        alert("Admin mobile number must be 10 digits.");
        return false;
    }

    if (email.includes("user")) {
        alert("You are not allowed to register as User from the Admin form!");
        return false;
    }

    if (passkey !== '1234') {
        alert("Invalid Admin Passkey!");
        return false;
    }

    const adminData = {
        name,
        mobile,
        email,
        password,
        passkey  // Backend will recognize this as admin
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(adminData)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || "Admin registered!");
    })
    .catch(err => {
        alert("Admin registration failed!");
        console.error(err);
    });

    return false;
}
