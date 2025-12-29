fetch("programs.json")
  .then(res => res.json())
  .then(programs => {
    const grid = document.getElementById("programGrid");

    programs.forEach(program => {
      const card = document.createElement("div");
      card.className = "program-card fade-in";

      card.innerHTML = `
        <div class="program-icon">
        <i class="fa-solid ${program.icon}"></i>
        </div>
        <h3>${program.title}</h3>
        <p>${program.description}</p>
        <ul>
          ${program.focus.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;

      grid.appendChild(card);
    });
  });


  /* STAGGERED IMPLEMENTATION STEPS REVEAL */
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".implementation-step");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.classList.add("show");
          }, index * 700); // delay between each step
        });
        observer.disconnect(); // run once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById("implementation"));
});
