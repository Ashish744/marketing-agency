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
  const workEmailInput = document.getElementById('workEmail');
  const companyNameInput = document.getElementById('companyName');
  const phoneNumberInput = document.getElementById('phoneNumber');
  const requirementsInput = document.getElementById('requirements');
  const firstNameError = document.getElementById('firstNameError');
  const workEmailError = document.getElementById('workEmailError');
  const companyNameError = document.getElementById('companyNameError');
  const phoneNumberError = document.getElementById('phoneNumberError');
  const requirementsError = document.getElementById('requirementsError');
    const firstNamePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    const phoneNumberPattern = /^\d+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const validateWorkEmail = () => {
    const workEmail = workEmailInput.value.trim();
    workEmailError.textContent = !workEmail
      ? 'Please enter your work email.'
      : !emailPattern.test(workEmail)
        ? 'Please enter a valid email address.'
        : '';
    workEmailInput.setAttribute('aria-invalid', String(Boolean(workEmailError.textContent)));
    return !workEmailError.textContent;
  };

  const validateCompanyName = () => {
    companyNameError.textContent = companyNameInput.value.trim()
      ? ''
      : 'Please enter your company name.';
    companyNameInput.setAttribute('aria-invalid', String(Boolean(companyNameError.textContent)));
    return !companyNameError.textContent;
  };

  const validateRequirements = () => {
    requirementsError.textContent = requirementsInput.value.trim()
      ? ''
      : 'Please tell us about your requirements.';
    requirementsInput.setAttribute('aria-invalid', String(Boolean(requirementsError.textContent)));
    return !requirementsError.textContent;
  };

  document.getElementById('sendContact').addEventListener('click', () => {
    const firstNameIsValid = validateFirstName();
    const workEmailIsValid = validateWorkEmail();
    const companyNameIsValid = validateCompanyName();
    const phoneNumberIsValid = validatePhoneNumber();
    const requirementsAreValid = validateRequirements();

    if (!firstNameIsValid) firstNameInput.focus();
    else if (!workEmailIsValid) workEmailInput.focus();
    else if (!companyNameIsValid) companyNameInput.focus();
    else if (!phoneNumberIsValid) phoneNumberInput.focus();
    else if (!requirementsAreValid) requirementsInput.focus();
    else {
      document.querySelectorAll('#contactForm input, #contactForm textarea').forEach((field) => {
        field.value = '';
      });
      firstNameError.textContent = '';
      workEmailError.textContent = '';
      companyNameError.textContent = '';
      phoneNumberError.textContent = '';
      requirementsError.textContent = '';
      firstNameInput.setAttribute('aria-invalid', 'false');
      workEmailInput.setAttribute('aria-invalid', 'false');
      companyNameInput.setAttribute('aria-invalid', 'false');
      phoneNumberInput.setAttribute('aria-invalid', 'false');
      requirementsInput.setAttribute('aria-invalid', 'false');
      window.location.href = '404.html';
    }
  });

  firstNameInput.addEventListener('input', () => {
    if (firstNameInput.getAttribute('aria-invalid') === 'true') validateFirstName();
  });
  workEmailInput.addEventListener('input', () => {
    if (workEmailInput.getAttribute('aria-invalid') === 'true') validateWorkEmail();
  });
  companyNameInput.addEventListener('input', () => {
    if (companyNameInput.getAttribute('aria-invalid') === 'true') validateCompanyName();
  });
  phoneNumberInput.addEventListener('input', () => {
    if (phoneNumberInput.getAttribute('aria-invalid') === 'true') validatePhoneNumber();
  });
  requirementsInput.addEventListener('input', () => {
    if (requirementsInput.getAttribute('aria-invalid') === 'true') validateRequirements();
  });
