/**
 * VUPC Code Harbor Season 5 - Frontend Logic & Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const modal = document.getElementById('successModal');
  const modalDetails = document.getElementById('modalDetails');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Mobile Navbar Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Form Validation and Submission Simulation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      clearErrors();

      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        studentId: document.getElementById('studentId').value.trim(),
        batch: document.getElementById('batch').value,
        department: document.getElementById('department').value,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        ojHandle: document.getElementById('ojHandle').value.trim() || 'N/A',
        timestamp: new Date().toLocaleString()
      };

      let isValid = true;

      // Validation Rules
      if (formData.fullName.length < 3) {
        showError('fullNameError', 'Please enter a valid full name.');
        isValid = false;
      }

      if (!/^\d{6,12}$/.test(formData.studentId)) {
        showError('studentIdError', 'Please enter a valid Student ID.');
        isValid = false;
      }

      if (!formData.email.includes('@')) {
        showError('emailError', 'Please provide a valid email address.');
        isValid = false;
      }

      if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
        showError('phoneError', 'Enter a valid 11-digit mobile number.');
        isValid = false;
      }

      if (isValid) {
        modalDetails.innerHTML = `
          <strong>Candidate:</strong> ${formData.fullName}<br>
          <strong>ID:</strong> ${formData.studentId} | <strong>Batch:</strong> ${formData.batch}<br>
          <strong>Dept:</strong> ${formData.department}<br>
          <strong>Email:</strong> ${formData.email}<br>
          <strong>Timestamp:</strong> ${formData.timestamp}
        `;
        
        modal.style.display = 'flex';
        form.reset();
      }
    });
  }
});

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
}

function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) modal.style.display = 'none';
}