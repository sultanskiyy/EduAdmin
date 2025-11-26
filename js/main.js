let teacherCards = document.querySelector(".teacher-cards");
let addTeacherBtn = document.getElementById("add-teacher-btn");
let submitTeacher = document.getElementById("submit-teacher");
let form = document.getElementById("form");

addTeacherBtn.addEventListener("click", () => {
    submitTeacher.classList.remove("hidden");
});

submitTeacher.addEventListener("click", () => {
    submitTeacher.classList.add("hidden");
});

form.addEventListener("click", e => e.stopPropagation());

async function getData() {
    try {
        teacherCards.innerHTML = "";
        let res = await axios.get("https://692584e782b59600d723f9b8.mockapi.io/teachers");

        res.data.forEach(el => {
            teacherCards.innerHTML += `
            <div class="teacher-card max-w-[300px] w-full" data-id="${el.id}">
                <div class="group flex flex-col items-center gap-[5px] pt-[30px] bg-white dark:bg-gray-800 rounded-[15px] shadow-md p-4">

                    <img class="w-[100px] h-[100px] rounded-full border-[4px] border-blue-500 object-cover"
                        src="${el.avatar}" alt="">

                    <p class="font-semibold">${el.name}</p>

                    <p class="bg-stone-800 text-white py-[3px] px-[10px] rounded-2xl">
                        ${el.profession}
                    </p>

                    <div class="mt-[10px] max-w-[300px] w-full flex justify-center gap-[20px] px-[20px]">
                        <div class="flex gap-[5px] items-center">
                            <img src="../assets/image/briefcase.png" alt="">
                            <p>${el.experience}</p>
                        </div>
                        <div class="flex gap-[5px] items-center">
                            <img src="../assets/image/age.png" alt="">
                            <p>${el.age}</p>
                        </div>
                    </div>

                    <div class="flex flex-col w-full gap-[5px] mt-4">
                        <div class="flex gap-[10px] items-center">
                            <img class="w-[16px] h-[16px]" src="../assets/image/phone-call.png" alt="">
                            <a href="tel:${el.phone}">${el.phone}</a>
                        </div>
                        <div class="flex gap-[10px] items-center">
                            <img class="w-[16px] h-[16px]" src="../assets/image/envelope.png" alt="">
                            <a href="mailto:${el.email}">${el.email}</a>
                        </div>
                        <div class="flex gap-[10px] items-center">
                            <img class="w-[16px] h-[16px]" src="../assets/image/paper-plane.png" alt="">
                            <a href="https://t.me/${el.telegram}">@${el.telegram}</a>
                        </div>
                        <div class="flex gap-[10px] items-center">
                            <img class="w-[16px] h-[16px]" src="../assets/image/linkedin.png" alt="">
                            <a href="https://www.linkedin.com/in/${el.linkedin}">${el.linkedin}</a>
                        </div>
                    </div>

                    <div class="mt-4 flex gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 justify-center w-full">
                        <button class="flex px-[15px] border-zinc-900 rounded-lg items-center bg-zinc-800 hover:bg-zinc-900 py-[3px] border-[1px] gap-[5px] edit-btn">
                            <img class="object-cover p-[4px]" src="../assets/image/pencil (1).png" alt="">Edit
                        </button>
                        <button class="flex px-[15px] text-red-500 border-zinc-900 rounded-lg bg-zinc-800 hover:bg-red-950 items-center py-[3px] border-[1px] gap-[5px] delete-btn">
                            <img class="object-cover p-[4px]" src="../assets/image/trash (1).png" alt="">Delete
                        </button>
                    </div>

                </div>
            </div>`;
        });

    } catch (err) {
        console.log(err);
    }
}

async function addTeacher(teacherObj) {
    try {
        await axios.post("https://692584e782b59600d723f9b8.mockapi.io/teachers", teacherObj);
        submitTeacher.classList.add("hidden");
        await getData();
    } catch (err) {
        console.log(err);
    }
}

teacherCards.addEventListener("click", async e => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) return;

    e.preventDefault();

    const card = deleteBtn.closest(".teacher-card");
    const id = card.dataset.id;

    try {
        await axios.delete(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
        card.remove();
    } catch (err) {
        console.log(err);
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const teacherObj = {
        name: form[0].value,
        age: form[1].value,
        avatar: form[2].value,
        email: form[3].value,
        experience: form[4].value,
        profession: form[5].value,
        linkedin: form[6].value,
        phone: form[7].value,
        raiting: form[8].value,
        telegram: form[9].value,
        isMarried: form[10].checked
    };

    addTeacher(teacherObj);
    form.reset();
});

getData();