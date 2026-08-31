/* =========================================================
   YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header = document.querySelector(".header");

function updateHeader() {
  if (!header) return;

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".links");

if (menuButton && navigation) {

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {

    navigation.classList.toggle("active");

    const isOpen = navigation.classList.contains("active");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.textContent = isOpen ? "×" : "☰";
  });


  /* Close menu after clicking a navigation link */

  navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navigation.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.textContent = "☰";
    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", event => {

    const clickedInside =
      navigation.contains(event.target) ||
      menuButton.contains(event.target);

    if (!clickedInside) {

      navigation.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.textContent = "☰";
    }
  });
}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
  ".section, .skill-card, .project, .explore-item, .journey-list > div, .contact-box"
);

revealElements.forEach(element => {
  element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);
    });

  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  }
);


revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================================================
   STAGGER EFFECT FOR CARDS
========================================================= */

document
  .querySelectorAll(".skill-grid, .explore-grid")
  .forEach(grid => {

    Array.from(grid.children).forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 70}ms`;

    });

  });


/* =========================================================
   PROFILE CARD 3D TILT
========================================================= */

const profileCard =
  document.querySelector(".security-card");


if (
  profileCard &&
  window.matchMedia("(pointer: fine)").matches
) {

  profileCard.addEventListener("mousemove", event => {

    const rect =
      profileCard.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const rotateY =
      (x - 0.5) * 8;

    const rotateX =
      (0.5 - y) * 8;

    profileCard.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(8px)
    `;
  });


  profileCard.addEventListener("mouseleave", () => {

    profileCard.style.transform =
      "rotateX(0deg) rotateY(0deg) translateZ(0)";
  });

}


/* =========================================================
   PROJECT MODALS
========================================================= */

const projectButtons =
  document.querySelectorAll("[data-modal]");

const projectModals =
  document.querySelectorAll(".project-modal");

const closeButtons =
  document.querySelectorAll(".modal-close");


function openModal(modalName) {

  const modal =
    document.getElementById(`${modalName}-modal`);

  if (!modal) return;

  modal.classList.add("active");

  document.body.classList.add("modal-open");

}


function closeModal(modal) {

  if (!modal) return;

  modal.classList.remove("active");

  document.body.classList.remove("modal-open");

}


/* Open modal */

projectButtons.forEach(button => {

  button.addEventListener("click", () => {

    const modalName =
      button.dataset.modal;

    openModal(modalName);

  });

});


/* Close with X button */

closeButtons.forEach(button => {

  button.addEventListener("click", () => {

    const modal =
      button.closest(".project-modal");

    closeModal(modal);

  });

});


/* Close by clicking outside modal */

projectModals.forEach(modal => {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal(modal);
    }

  });

});


/* Close with Escape key */

document.addEventListener("keydown", event => {

  if (event.key !== "Escape") return;

  const activeModal =
    document.querySelector(".project-modal.active");

  if (activeModal) {
    closeModal(activeModal);
  }

});


/* =========================================================
   PROJECT CARD KEYBOARD ACCESSIBILITY
========================================================= */

document.querySelectorAll(".project").forEach(project => {

  project.setAttribute("tabindex", "0");

  project.addEventListener("keydown", event => {

    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    const button =
      project.querySelector("[data-modal]");

    if (!button) return;

    event.preventDefault();

    button.click();

  });

});


/* =========================================================
   INTERNAL SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


/* =========================================================
   PHOTO FALLBACK
========================================================= */

const profilePhoto =
  document.querySelector(".ring img");


if (profilePhoto) {

  profilePhoto.addEventListener("error", () => {

    const ring =
      profilePhoto.closest(".ring");

    if (!ring) return;

    profilePhoto.remove();

    const fallback =
      document.createElement("div");

    fallback.textContent = "RS";

    fallback.style.cssText = `
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #111718;
      color: #d9ff52;
      font-family: "Space Grotesk", sans-serif;
      font-size: 42px;
      font-weight: 700;
    `;

    ring.appendChild(fallback);

  });

}
.links a.active {
  color: var(--accent);
}

/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
  document.querySelectorAll("main section[id]");

const navLinks =
  document.querySelectorAll(
    '.links a[href^="#"]'
  );


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id =
          entry.target.getAttribute("id");

        navLinks.forEach(link => {

          link.classList.remove("active");

          if (
            link.getAttribute("href") ===
            `#${id}`
          ) {
            link.classList.add("active");
          }

        });

      });

    },
    {
      threshold: 0.35,
      rootMargin: "-10% 0px -45% 0px"
    }
  );


sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================================================
   BUTTON ARROW MICRO-INTERACTION
========================================================= */

document
  .querySelectorAll(".btn")
  .forEach(button => {

    button.addEventListener("mouseenter", () => {

      const arrow =
        button.querySelector("span");

      if (arrow) {
        arrow.style.transform =
          "translate(3px, -3px)";
      }

    });


    button.addEventListener("mouseleave", () => {

      const arrow =
        button.querySelector("span");

      if (arrow) {
        arrow.style.transform =
          "translate(0, 0)";
      }

    });

  });
