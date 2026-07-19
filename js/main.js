// Menu mobile
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Formulaire de contact — envoi via Web3Forms (AJAX)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = document.getElementById('formSubmit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  status.textContent = 'Envoi en cours…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    const result = await response.json();

    if (result.success) {
      status.textContent = 'Merci ! Votre demande a bien été envoyée. Nous revenons vers vous rapidement.';
      form.reset();
    } else {
      status.textContent = "L'envoi a échoué. Vous pouvez nous écrire directement à contact@infrarch.fr.";
    }
  } catch (err) {
    status.textContent = "L'envoi a échoué (connexion). Vous pouvez nous écrire directement à contact@infrarch.fr.";
  } finally {
    submitBtn.disabled = false;
  }
});
