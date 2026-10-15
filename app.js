const targetElement = document.querySelector("time[datetime]");
const countdownElement = document.querySelector("#countdown");

if (targetElement && countdownElement) {
  const targetValue = targetElement.dateTime;
  const targetTime = Date.parse(targetValue);
  const isUtcIsoTimestamp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(targetValue);

  if (!isUtcIsoTimestamp || Number.isNaN(targetTime)) {
    countdownElement.textContent = "Countdown unavailable";
  } else {
    let timer;
    const updateCountdown = () => {
      const remaining = targetTime - Date.now();

      if (remaining <= 0) {
        countdownElement.textContent = "The event has started";
        clearInterval(timer);
        return;
      }

      const seconds = Math.floor(remaining / 1000);
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;

      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${remainder}s remaining`;
    };

    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  }
}

const form = document.querySelector("#rsvp form");
const formStatus = document.querySelector("#form-status");

if (form && formStatus) {
  let state = "idle";

  const setState = (nextState, message) => {
    state = nextState;
    form.dataset.state = state;
    form.setAttribute("aria-busy", String(state === "submitting"));
    formStatus.textContent = message;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state === "submitting") return;

    for (const field of form.querySelectorAll("input, textarea")) {
      field.value = field.value.trim();
    }

    if (!form.reportValidity()) {
      setState("idle", "Please check the required fields.");
      return;
    }

    setState("submitting", "Sending your RSVP…");

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      setState("error", "RSVP could not be sent. The submission service is not configured.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("The submission service returned an error.");
      setState("success", "Your RSVP has been received.");
      form.reset();
    } catch {
      setState("error", "RSVP could not be sent. Please try again.");
    }
  });
}
