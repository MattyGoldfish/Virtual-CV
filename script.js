const themeButton = document.querySelector("#themeButton");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.querySelector("#currentYear");

// Set the footer year automatically.
currentYear.textContent = new Date().getFullYear();

// Dark/light theme.
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const darkModeEnabled = document.body.classList.contains("dark-theme");
    themeButton.textContent = darkModeEnabled ? "Light mode" : "Dark mode";

    localStorage.setItem("darkMode", darkModeEnabled);
});

// Restore the user's theme choice.
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "Light mode";
}

// Mobile navigation.
menuButton.addEventListener("click", () => {
    const menuIsOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(menuIsOpen));
});

// Close the mobile menu after selecting a link.
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Project filtering.
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach((card) => {
            const matchesFilter =
                selectedFilter === "all" ||
                card.dataset.category === selectedFilter;

            card.classList.toggle("hidden", !matchesFilter);
        });
    });
});

// Reveal sections while scrolling.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
    }
);

revealElements.forEach((element) => observer.observe(element));
