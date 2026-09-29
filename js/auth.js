/* Sign in / Sign up — animates the headline letter by letter.
   The text comes from the heading's data-text attribute. */
const headline = document.getElementById('headline');
if (headline) {
  [...headline.dataset.text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (i * 0.05) + 's';
    headline.appendChild(s);
  });
}

document.querySelectorAll('[data-password-toggle]').forEach(button => {
  const input = document.getElementById(button.dataset.passwordToggle);
  if (!input) return;

  button.addEventListener('click', () => {
    const isVisible = input.type === 'password';
    const label = button.closest('.field').querySelector('label').textContent.trim().toLowerCase();
    const action = isVisible ? 'Hide' : 'Show';
    input.type = isVisible ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(isVisible));
    button.setAttribute('aria-label', `${action} ${label}`);
    button.title = `${action} ${label}`;
    input.focus();
  });
});

/* Demo auth: pick role + validate, then open that dashboard.
   Front-end only (localStorage) — replace with a real backend before launch. */
(function () {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  const $ = id => document.getElementById(id);
  const isSignup = document.body.dataset.page === 'signup';
  const msg = $('formMsg');
  let role = null;

  document.querySelectorAll('.role-btn').forEach(b => b.addEventListener('click', () => {
    role = b.dataset.role;
    document.querySelectorAll('.role-btn').forEach(x => x.classList.toggle('on', x === b));
    msg.textContent = '';
  }));

  function fail(id, text) {
    document.querySelectorAll('.field').forEach(f => f.classList.remove('err'));
    if (id) $(id).closest('.field').classList.add('err');
    msg.textContent = text; return false;
  }

  function submit() {
    const email = $('email').value.trim(), pass = $('pass').value;
    if (!role) return fail(null, 'Please choose Public or Admin first.');
    if (isSignup && $('name').value.trim().length < 2) return fail('name', 'Enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail('email', 'Enter a valid email address.');
    if (pass.length < 8) return fail('pass', 'Password must be at least 8 characters.');
    if (isSignup && pass !== $('pass2').value) return fail('pass2', 'Passwords do not match.');
    const name = isSignup ? $('name').value.trim() : email.split('@')[0];
    localStorage.setItem('stacklySession', JSON.stringify({ role, email, name }));
    location.href = role === 'admin' ? 'dashboard-admin.html' : 'dashboard-public.html';
  }
  btn.addEventListener('click', submit);
  document.querySelectorAll('.field input').forEach(i => i.addEventListener('keydown', e => e.key === 'Enter' && submit()));
})();
