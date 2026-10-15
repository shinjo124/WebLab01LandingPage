const countdownClock = document.querySelector('#countdown-clock');
const eventDate = document.querySelector('#event-date');
const countdownMessage = document.querySelector('#countdown-message');
const countdownParts = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds'),
};

function updateCountdown() {
  const target = Date.parse(eventDate.dateTime);

  if (!Number.isFinite(target)) {
    countdownMessage.textContent = 'Set a valid event date in the page markup.';
    return false;
  }

  eventDate.textContent = new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(target);

  const remaining = target - Date.now();
  if (remaining <= 0) {
    Object.values(countdownParts).forEach((part) => {
      part.value = '00';
    });
    countdownMessage.textContent = 'The event has started or the countdown has ended.';
    return false;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  Object.entries(values).forEach(([unit, value]) => {
    countdownParts[unit].value = String(value).padStart(2, '0');
  });
  countdownMessage.textContent = '';
  return true;
}

if (countdownClock && eventDate && countdownMessage) {
  if (updateCountdown()) {
    const countdownInterval = window.setInterval(() => {
      if (!updateCountdown()) window.clearInterval(countdownInterval);
    }, 1000);
  }
}
