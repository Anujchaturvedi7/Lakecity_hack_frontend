async function handleLogin(event) {
  event.preventDefault();

  const mobile = document.getElementById("loginMobile").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
  }

  if (!password) {
      alert("Password cannot be empty.");
      return;
  }

  try {
      const response = await fetch("YOUR_API_URL_HERE", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ mobile, password })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
          if (data.role === "user") {
              window.location.href = "PATH_TO_USER_DASHBOARD.html";
          } else if (data.role === "admin") {
              window.location.href = "PATH_TO_ADMIN_DASHBOARD.html";
          } else {
              alert("Unknown user role.");
          }
      } else {
          alert(data.message || "Invalid login credentials.");
      }

  } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
  }
}
