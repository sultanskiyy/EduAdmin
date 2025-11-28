// Elementlarni olish
const buttons = {
    contact: document.getElementById("btn-contact"),
    students: document.getElementById("btn-students"),
    stats: document.getElementById("btn-stats")
};

const contents = {
    contact: document.getElementById("content-contact"),
    students: document.getElementById("content-students"),
    stats: document.getElementById("content-stats")
};

// Barcha contentlarni yashirish
function hideAll() {
    Object.values(contents).forEach(content => content.classList.add("hidden"));
}

// Buttonlarni reset qilish
function resetButtons() {
    Object.values(buttons).forEach(btn => {
        btn.classList.remove("text-white");
        btn.classList.add("text-gray-400");
    });
}

// Tabni faollashtirish
function activate(tab) {
    hideAll();
    resetButtons();
    contents[tab].classList.remove("hidden");
    buttons[tab].classList.remove("text-gray-400");
    buttons[tab].classList.add("text-white");
}

// Event listenerlarni qo‘shish
buttons.contact.addEventListener("click", () => activate("contact"));
buttons.students.addEventListener("click", () => activate("students"));
buttons.stats.addEventListener("click", () => activate("stats"));

// Boshlang‘ich faollashtirish — Contact Info ochiq bo‘lsin
activate("contact");


