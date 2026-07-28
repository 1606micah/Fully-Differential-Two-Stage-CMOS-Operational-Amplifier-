(() => {
  const triggers = document.querySelectorAll(
    ".hero-evidence, .evidence-button, .result-image"
  );

  const closeModal = () => {
    const modal = document.querySelector(".modal");
    if (!modal) return;
    modal.remove();
    document.body.classList.remove("modal-open");
  };

  const openModal = (trigger) => {
    const sourceImage = trigger.querySelector("img");
    if (!sourceImage) return;

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", sourceImage.alt || "LTspice evidence");

    const title =
      trigger.closest("article")?.querySelector("h4")?.textContent ||
      trigger.querySelector(".panel-footer strong")?.textContent ||
      trigger.querySelector(".evidence-label span")?.textContent ||
      "LTspice evidence";

    modal.innerHTML = `
      <div class="modal-panel">
        <div class="modal-header">
          <div>
            <span>LTspice evidence</span>
            <strong></strong>
          </div>
          <button type="button" aria-label="Close image">×</button>
        </div>
        <img />
      </div>
    `;

    modal.querySelector(".modal-header strong").textContent = title;
    const modalImage = modal.querySelector(".modal-panel > img");
    modalImage.src = sourceImage.src;
    modalImage.alt = sourceImage.alt;
    modal.querySelector("button").addEventListener("click", closeModal);
    modal.addEventListener("mousedown", (event) => {
      if (event.target === modal) closeModal();
    });

    document.body.appendChild(modal);
    document.body.classList.add("modal-open");
    modal.querySelector("button").focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
})();
