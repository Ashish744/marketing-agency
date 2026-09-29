  // Animate hero headline, line by line, letter by letter
  const lines = ["Your Next Big Idea", "Starts Here."];
  const h = document.getElementById('heroTitle');
  let globalDelay = 0;
  lines.forEach((line) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';
    [...line].forEach((ch) => {
      const s = document.createElement('span');
      s.textContent = ch === " " ? "\u00A0" : ch;
      s.style.animationDelay = globalDelay + 's';
      lineDiv.appendChild(s);
      globalDelay += 0.035;
    });
    h.appendChild(lineDiv);
  });

  // Scroll reveal for form card and CTA box
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  const firstNameInput = document.getElementById('firstName');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const firstNameError = document.getElementById('firstNameError');
  const phoneNumberError = document.getElementById('phoneNumberError');
    const firstNamePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    const phoneNumberPattern = /^\d+$/;

  const validateFirstName = () => {
    const firstName = firstNameInput.value.trim();
    firstNameError.textContent = !firstName
      ? 'Please enter your first name.'
      : !firstNamePattern.test(firstName)
        ? 'Use letters only for your first name.'
        : '';
    firstNameInput.setAttribute('aria-invalid', String(Boolean(firstNameError.textContent)));
    return !firstNameError.textContent;
  };

  const validatePhoneNumber = () => {
    const phoneNumber = phoneNumberInput.value.trim();
    phoneNumberError.textContent = !phoneNumber
      ? 'Please enter your phone number.'
      : !phoneNumberPattern.test(phoneNumber)
        ? 'Use digits only for your phone number.'
        : '';
    phoneNumberInput.setAttribute('aria-invalid', String(Boolean(phoneNumberError.textContent)));
    return !phoneNumberError.textContent;
  };

  document.getElementById('sendContact').addEventListener('click', () => {
    const firstNameIsValid = validateFirstName();
    const phoneNumberIsValid = validatePhoneNumber();

    if (!firstNameIsValid) firstNameInput.focus();
    else if (!phoneNumberIsValid) phoneNumberInput.focus();
    else {
      document.querySelectorAll('#contactForm input, #contactForm textarea').forEach((field) => {
        field.value = '';
      });
      firstNameError.textContent = '';
      phoneNumberError.textContent = '';
      firstNameInput.setAttribute('aria-invalid', 'false');
      phoneNumberInput.setAttribute('aria-invalid', 'false');
      window.location.href = '404.html';
    }
  });

  firstNameInput.addEventListener('input', () => {
    if (firstNameInput.getAttribute('aria-invalid') === 'true') validateFirstName();
  });
  phoneNumberInput.addEventListener('input', () => {
    if (phoneNumberInput.getAttribute('aria-invalid') === 'true') validatePhoneNumber();
  });
