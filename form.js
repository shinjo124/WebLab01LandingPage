const rsvpForm = document.querySelector('#rsvp-form');
const formMessage = document.querySelector('#form-message');
const submitButton = rsvpForm?.querySelector('button[type="submit"]');
const nameInput = rsvpForm?.querySelector('#name');
const emailInput = rsvpForm?.querySelector('#email');
let formState = 'idle';

function showFormState(state, message) {
  formState = state;
  rsvpForm.dataset.state = state;
  formMessage.dataset.state = state;
  formMessage.textContent = message;
  submitButton.disabled = state === 'submitting' || state === 'success';
  submitButton.firstChild.textContent = state === 'submitting'
    ? 'Saving your interest… '
    : state === 'success'
      ? 'You’re on the list '
      : 'Keep me posted ';
}

rsvpForm?.addEventListener('input', () => {
  if (formState === 'error') showFormState('idle', '');
});

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formState === 'submitting' || formState === 'success') return;

  nameInput.value = nameInput.value.trim().replace(/\s+/g, ' ');
  emailInput.value = emailInput.value.trim();

  if (!rsvpForm.reportValidity()) {
    showFormState('error', 'Check your name and email, then try again.');
    return;
  }

  showFormState('submitting', '');
  window.setTimeout(() => {
    showFormState('success', 'Thanks for your interest. This preview does not send or store signup details.');
  }, 250);
});
