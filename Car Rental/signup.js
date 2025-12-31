document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("signupStatus");

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Optional: store the user email in localStorage
      localStorage.setItem("userEmail", email);

      // Show success message briefly
      status.textContent = "Signup successful! Redirecting...";
      status.style.color = "lightgreen";

      // Redirect after short delay (1 second)
      setTimeout(() => {
        window.location.href = "rental.html";
      }, 1000);
    } else {
      status.textContent = data.error || "Signup failed!";
      status.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Something went wrong!";
    status.style.color = "red";
  }
});
