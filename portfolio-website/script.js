const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const futureCards = document.querySelectorAll(".future-card");
const contactForm = document.querySelector(".contact-form");
const messageButtons = document.querySelectorAll(".message-button");
const alertButton = document.querySelector(".alert-button");
const statsUpdateButton = document.querySelector(".stats-update-button");
const messageOutput = document.querySelector("#message-output");
const statDays = document.querySelector("#stat-days");
const statPages = document.querySelector("#stat-pages");
const statProjects = document.querySelector("#stat-projects");
const statFeatures = document.querySelector("#stat-features");
const savedTheme = localStorage.getItem("kapritech-theme");

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kapritech-theme", theme);
}

applyTheme(savedTheme || "light");

const themeButton = document.createElement("button");
themeButton.className = "theme-toggle";
themeButton.type = "button";
themeButton.setAttribute("aria-label", "Toggle color theme");
themeButton.textContent = document.documentElement.dataset.theme === "dark" ? "Light" : "Dark";

const nav = document.querySelector(".nav");

if (nav) {
    nav.appendChild(themeButton);
}

themeButton.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    themeButton.textContent = nextTheme === "dark" ? "Light" : "Dark";
});

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";

        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            navToggle.setAttribute("aria-expanded", "false");
            navLinks.classList.remove("is-open");
        }
    });
}

function welcomeUser() {
    alert("Welcome to KapriTech. You are viewing the Day 10 project progress section.");
}

function updateMessage(message) {
    if (messageOutput) {
        messageOutput.textContent = message;
    }
}

function increaseNumber(element, amount) {
    if (element) {
        element.textContent = Number(element.textContent) + amount;
    }
}

messageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateMessage(button.dataset.message);
    });
});

if (alertButton) {
    alertButton.addEventListener("click", () => {
        welcomeUser();
        updateMessage("The alert button used JavaScript to show a browser message.");
    });
}

if (statsUpdateButton) {
    statsUpdateButton.addEventListener("click", () => {
        increaseNumber(statDays, 1);
        increaseNumber(statPages, 1);
        increaseNumber(statProjects, 1);
        increaseNumber(statFeatures, 1);
        updateMessage("Stats updated with DOM manipulation. The numbers changed without reloading the page.");
        statsUpdateButton.textContent = "Stats improved";
    });
}

if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach((card) => {
                const isVisible = filter === "all" || card.dataset.category === filter;
                card.hidden = !isVisible;
            });

            futureCards.forEach((card) => {
                const isVisible = filter === "all" || card.dataset.category === filter;
                card.hidden = !isVisible;
            });
        });
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.elements.name;
        const email = contactForm.elements.email;
        const message = contactForm.elements.message;
        const status = contactForm.querySelector(".form-status");
        const errors = {
            name: document.querySelector("#name-error"),
            email: document.querySelector("#email-error"),
            message: document.querySelector("#message-error"),
        };
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;

        Object.values(errors).forEach((error) => {
            error.textContent = "";
        });

        if (name.value.trim().length < 2) {
            errors.name.textContent = "Please enter your name.";
            isValid = false;
        }

        if (!emailPattern.test(email.value.trim())) {
            errors.email.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (message.value.trim().length < 10) {
            errors.message.textContent = "Please write at least 10 characters.";
            isValid = false;
        }

        if (!isValid) {
            status.textContent = "Please fix the highlighted fields.";
            return;
        }

        const subject = encodeURIComponent(`KapriTech message from ${name.value.trim()}`);
        const body = encodeURIComponent(
            `Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\n${message.value.trim()}`
        );

        status.textContent = "Opening your email app with the message ready.";
        window.location.href = `mailto:kapri.suman0023@gmail.com?subject=${subject}&body=${body}`;
    });
}
