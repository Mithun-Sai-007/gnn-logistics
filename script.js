// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .visual-card, .stat').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Form validation
function submitForm() {
  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('serviceError').textContent = '';
  document.getElementById('messageError').textContent = '';

  if (!name) { document.getElementById('nameError').textContent = 'Name is required.'; valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('emailError').textContent = 'Enter a valid email.'; valid = false; }
  if (!service) { document.getElementById('serviceError').textContent = 'Please select a service.'; valid = false; }
  if (!message) { document.getElementById('messageError').textContent = 'Message is required.'; valid = false; }

  if (valid) {
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxaeI3G_lxBclH2IoKy6IkI6aSE3vCJmLokvlhbAvLhQ34ogwGwKYM6rK_oWmx0tlVWZw/exec';

  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      company: document.getElementById('company').value.trim(),
      service: document.getElementById('service').value,
      message: document.getElementById('message').value.trim()
    })
  });

  const msg = document.getElementById('successMsg');
  msg.textContent = '✅ Thank you! We will get back to you within 24 hours.';
  msg.style.display = 'block';
  ['name','email','company','service','message'].forEach(id => document.getElementById(id).value = '');
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
}