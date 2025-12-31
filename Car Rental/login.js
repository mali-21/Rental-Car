document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const statusEl = document.getElementById('loginStatus');

  if (!email || !password) {
    statusEl.textContent = "Please enter valid email and password.";
    statusEl.style.color = "red";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      const loginTime = new Date().toLocaleString();
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loginTime", loginTime);

      statusEl.style.color = "lightgreen";
      statusEl.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "rental.html";
      }, 1000);
    } else {
      statusEl.textContent = data.error || "Login failed!";
      statusEl.style.color = "red";
    }
  } catch (error) {
    console.error("Error during login:", error);
    statusEl.textContent = "Something went wrong. Please try again.";
    statusEl.style.color = "red";
  }
});
