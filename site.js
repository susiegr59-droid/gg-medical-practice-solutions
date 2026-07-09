const qaToggle = document.querySelector(".qa-toggle");
const qaPlanPanel = document.querySelector("#qa-plan-panel");

if (qaToggle && qaPlanPanel) {
  qaToggle.addEventListener("click", () => {
    const isHidden = qaPlanPanel.hasAttribute("hidden");
    qaPlanPanel.toggleAttribute("hidden", !isHidden);
    qaToggle.setAttribute("aria-expanded", String(isHidden));
    qaToggle.textContent = isHidden ? "Hide Q&A options" : "View Q&A options";
  });
}

const consultationForm = document.querySelector("#consultation-form");

if (consultationForm) {
  const formStatus = document.querySelector("#form-status");
  const submitButton = consultationForm.querySelector('button[type="submit"]');
  const serviceSelect = consultationForm.querySelector('select[name="service"]');
  const selectedQaPlan = document.querySelector("#selected-qa-plan");
  const formInterest = document.querySelector("#form-interest");
  const messageField = consultationForm.querySelector('textarea[name="message"]');
  const params = new URLSearchParams(window.location.search);
  const planMap = {
    "quick-help": "Quick Help - 1 question/month ($35)",
    support: "Support - 3 questions/month ($85)",
    priority: "Priority Q&A - 5 questions/month ($125)",
  };

  if (params.get("service") === "forms") {
    formInterest.value = "Office forms library";
    serviceSelect.value = "Office forms and policies";
    messageField.value = "I am interested in office forms and policy templates for my practice.";
  }

  if (params.get("service") === "qa") {
    const plan = planMap[params.get("plan")] || "";
    selectedQaPlan.value = plan;
    serviceSelect.value = "Q&A subscription";
    messageField.value = plan
      ? `I am interested in the ${plan} Q&A subscription plan.`
      : "I am interested in Q&A subscription support.";
  }

  consultationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(consultationForm);
    formStatus.textContent = "Sending your request...";
    submitButton.disabled = true;

    fetch(consultationForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        consultationForm.reset();
        formStatus.textContent = "Thank you. Your request has been sent.";
      })
      .catch(() => {
        formStatus.innerHTML = 'Something went wrong. Please email <a href="mailto:Info@ggmedpro.com">Info@ggmedpro.com</a>.';
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}
