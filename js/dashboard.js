(function () {
  const role = document.body.dataset.role;
  let session = null;
  try { session = JSON.parse(localStorage.getItem('stacklySession')); } catch (error) {}
  if (!session || session.role !== role) {
    location.replace('signin.html');
    return;
  }

  const get = id => document.getElementById(id);
  const view = get('view');
  const menu = get('menu');
  const templates = new Map(
    Array.from(document.querySelectorAll('template[data-dashboard-view]'), template => [
      template.dataset.dashboardView,
      template
    ])
  );

  get('uname').textContent = session.name;
  get('uemail').textContent = session.email || '';
  get('avatar').textContent = session.name.charAt(0).toUpperCase();

  function toggleMenu(open) {
    document.body.classList.toggle('lock', open);
    get('side').classList.toggle('open', open);
    get('scrim').classList.toggle('on', open);
  }

  function show(name) {
    const template = templates.get(name);
    if (!template) return;

    get('title').textContent = name;
    view.replaceChildren(template.content.cloneNode(true));
    view.querySelectorAll('[data-session-value]').forEach(input => {
      input.value = session[input.dataset.sessionValue] || '';
    });
    menu.querySelectorAll('[data-v]').forEach(button => {
      button.classList.toggle('on', button.dataset.v === name);
    });
    toggleMenu(false);
  }

  menu.addEventListener('click', event => {
    const button = event.target.closest('[data-v]');
    if (button) show(button.dataset.v);
  });

  view.addEventListener('click', event => {
    const button = event.target.closest('[data-complete]');
    if (!button) return;
    button.textContent = button.dataset.complete;
    button.classList.add('ok');
  });

  view.addEventListener('input', event => {
    const searchInput = event.target.closest('[data-table-search]');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    view.querySelectorAll('tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });

  get('burger').addEventListener('click', () => toggleMenu(true));
  get('scrim').addEventListener('click', () => toggleMenu(false));
  get('logout').addEventListener('click', () => {
    localStorage.removeItem('stacklySession');
    location.href = 'signin.html';
  });

  show(menu.querySelector('[data-v]').dataset.v);
})();
