const byId = (id) => document.getElementById(id);

document.querySelectorAll("[data-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = byId(button.dataset.toggle);
    if (!input) return;
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.textContent = showing ? "Show" : "Hide";
    button.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
});

function setError(inputId, message) {
  const input = byId(inputId);
  const error = document.querySelector(`[data-error-for="${inputId}"]`);
  if (input) input.closest(".field-wrap")?.classList.toggle("invalid", Boolean(message));
  if (error) error.textContent = message || "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const signinForm = byId("signin-form");
if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = byId("email").value.trim();
    const password = byId("password").value;
    setError("email", !email ? "Enter your email address." : !validEmail(email) ? "Enter a valid email address." : "");
    setError("password", !password ? "Enter your password." : "");
    if (!email || !validEmail(email) || !password) return;
    showMessage("This form is ready for backend integration. Sign-in is not connected yet.", "success");
  });
  byId("forgot-link")?.addEventListener("click", (event) => {
    event.preventDefault();
    showMessage("Password reset will be available once the authentication backend is connected.", "error");
  });
}

const signupForm = byId("signup-form");
if (signupForm) {
  const passwordInput = byId("signup-password");
  passwordInput.addEventListener("input", () => {
    const hint = byId("password-hint");
    hint.textContent = passwordInput.value.length >= 8 ? "Good length." : "Use at least 8 characters.";
    hint.style.color = passwordInput.value.length >= 8 ? "#21966B" : "";
  });

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = byId("full-name").value.trim();
    const email = byId("signup-email").value.trim();
    const password = passwordInput.value;
    const confirm = byId("confirm-password").value;
    const terms = byId("terms").checked;

    setError("full-name", !name ? "Enter your name." : "");
    setError("signup-email", !email ? "Enter your email address." : !validEmail(email) ? "Enter a valid email address." : "");
    setError("signup-password", !password ? "Create a password." : password.length < 8 ? "Use at least 8 characters." : "");
    setError("confirm-password", !confirm ? "Confirm your password." : confirm !== password ? "Passwords do not match." : "");
    const termsError = document.querySelector('[data-error-for="terms"]');
    if (termsError) termsError.textContent = terms ? "" : "Please agree before creating an account.";

    if (!name || !email || !validEmail(email) || password.length < 8 || confirm !== password || !terms) return;
    showMessage("Your details look valid. Account creation is not connected to a backend yet.", "success");
  });
}

function showMessage(message, type) {
  const target = byId("form-message");
  if (!target) return;
  target.textContent = message;
  target.className = `form-message ${type}`;
}
