
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const gamesGrid = document.getElementById("gamesGrid");
const gameCards = [...document.querySelectorAll(".game-card")];
const gameCount = document.getElementById("gameCount");
const emptyState = document.getElementById("emptyState");

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

const dialog = document.getElementById("gameDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const officialSearch = document.getElementById("officialSearch");

let activeFilter = "all";
let searchTerm = "";

// Yilni avtomatik yangilash
document.getElementById("year").textContent = new Date().getFullYear();

// O'yinlarni qidirish va filtrlash
function filterGames() {
    let visibleCount = 0;

    gameCards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category;
        const description = card.dataset.description.toLowerCase();

        const matchesSearch =
            name.includes(searchTerm) ||
            description.includes(searchTerm);

        const matchesCategory =
            activeFilter === "all" || category === activeFilter;

        const isVisible = matchesSearch && matchesCategory;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    gameCount.textContent = `${String(visibleCount).padStart(2, "0")} TA O'YIN`;
    emptyState.hidden = visibleCount !== 0;
}

// Qidiruv
searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    filterGames();
});

// Kategoriyalar
filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");

    if (!button) return;

    activeFilter = button.dataset.filter;

    filters.querySelectorAll(".filter-btn").forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
    });

    filterGames();
});

// Dark va light rejimi
themeBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    themeBtn.textContent = isLight ? "☾" : "☼";
    themeBtn.setAttribute(
        "aria-label",
        isLight ? "Qorong'i rejimga o'tish" : "Yorug' rejimga o'tish"
    );
});

// Mobil menyu
menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Sevimli o'yinlar
document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const isFavorite = button.classList.toggle("is-favorite");

        button.textContent = isFavorite ? "♥" : "♡";
        button.setAttribute("aria-pressed", String(isFavorite));

        const gameName = button
            .closest(".game-card")
            .dataset.name;

        button.setAttribute(
            "aria-label",
            isFavorite
                ? `${gameName} sevimlilardan olib tashlash`
                : `${gameName} sevimlilarga qo'shish`
        );
    });
});

// O'yin haqida ma'lumot oynasi
gamesGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".game-link");

    if (!button) return;

    const card = button.closest(".game-card");
    const name = card.dataset.name;
    const description = card.dataset.description;

    dialogTitle.textContent = name;
    dialogDescription.textContent = description;

    officialSearch.href =
        "https://www.google.com/search?q=" +
        encodeURIComponent(name + " official game website");

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    }
});

document.getElementById("dialogClose").addEventListener("click", () => {
    dialog.close();
});

// Oyna tashqarisini bosganda yopish
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

// Dastlabki holat
filterGames();