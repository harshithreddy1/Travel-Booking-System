document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 User Registration page loaded");

    const form = document.getElementById("registerForm");
    const nameInput = document.getElementById("regName");
    const emailInput = document.getElementById("regEmail");
    const passwordInput = document.getElementById("regPass");
    const termsCheckbox = document.getElementById("agreeTerms");
    const submitBtn = form.querySelector(".auth-submit");

    // MAIN REGISTRATION HANDLER
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("📝 User registration form submitted");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        if (!termsCheckbox.checked) {
            alert("Please accept the Terms & Privacy Policy.");
            return;
        }

        // Show loading
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

        try {
            console.log("🌐 Sending user registration request...");

            // IMPORTANT — your backend LB URL with correct port (4001)
            const backendUrl =
                "http://a0f7c2b6f150049c7987c4c56a4c01b4-750988963.us-east-1.elb.amazonaws.com:4001/api/users/register";

            const res = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await res.json();
            console.log("📦 Backend response:", data);

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
            submitBtn.style.background = "var(--success)";

            alert("Registration successful! Redirecting to login...");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } catch (err) {
            console.error("❌ Registration error:", err);
            alert(err.message);

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = "";
        }
    });
});
