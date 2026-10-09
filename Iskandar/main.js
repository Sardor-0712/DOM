const menuButton = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".nav-links");

        menuButton.addEventListener("click", () => {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Menyuni ochish" : "Menyuni yopish");
            menu.classList.toggle("is-open", !isOpen);
        });

        menu.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Menyuni ochish");
                menu.classList.remove("is-open");
            }
        });

        document.querySelector("#year").textContent = new Date().getFullYear();
