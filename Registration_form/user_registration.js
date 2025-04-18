document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
  
    if (!name || !mobile || !email || !password) {
      message.textContent = "All fields are required.";
      message.style.color = "red";
      return;
    }
  
    if (!/^\d{10}$/.test(mobile)) {
      message.textContent = "Mobile number must be 10 digits.";
      message.style.color = "red";
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = "Invalid email format.";
      message.style.color = "red";
      return;
    }
  
    if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters.";
      message.style.color = "red";
      return;
    }
  
    const userData = {
      name,
      mobile,
      email,
      password,
      timestamp: new Date().toISOString()
    };
  
    // Convert to JSON and trigger download
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_data.json";
    a.click();
    URL.revokeObjectURL(url);
  
    message.textContent = "Registered successfully. Data downloaded as JSON file.";
    message.style.color = "green";
    document.getElementById("register-form").reset();
  });
  