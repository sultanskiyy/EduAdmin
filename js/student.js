let teacherCards = document.querySelector(".teacher-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTeacherBtn = document.getElementById("add-teacher-btn");
let selected = null;
let paganation = document.getElementById("paganation");
let page = 1;

// Add Student tugmasi
addTeacherBtn.addEventListener("click", function () {
    outerModal.classList.remove("hidden");
    for (let el of form) {
        el.value = "";
        el.checked = false;
    }
});

// Modal yopish
outerModal.addEventListener("click", function () {
    outerModal.classList.add("hidden");
    selected = null;
});

// Form ichida klikni bloklash
form.addEventListener("click", function (e) {
    e.stopPropagation();
});

// Data olish
async function getData(content, page) {
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/students?page=${page}&limit=10`);
        let allRes = await axios.get("https://692584e782b59600d723f9b8.mockapi.io/students");
        let pages = Math.ceil(allRes.data.length / 10);

        // Pagination
        paganation.innerHTML = `
            <li onClick="changePage(${page - 1})" class="${page === 1 ? "hidden" : ""} flex items-center cursor-pointer justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none">Previous</li>
            <h1>${page} / ${pages}</h1>
            <li onClick="changePage(${page + 1})" class="${page === pages ? "hidden" : ""} flex items-center justify-center cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none">Next</li>
        `;

        content.innerHTML = "";
        res.data.forEach((el) => {
            content.innerHTML += `
                <div class="teacher-card max-w-[300px] w-full transition-transform duration-300 hover:-translate-y-[5px]" data-id="${el.id}">
                    <div class="group flex flex-col items-center bg-gray-800 rounded-[20px] border border-gray-700 p-6 shadow-lg">
                        <a href="../pages/single-student.html?studentId=${el.id}">
                            <img class="w-[100px] h-[100px] rounded-full border-[4px] border-blue-500 object-cover" src="${el.avatar}" alt="">
                        </a>
                        <p class="text-white line-clamp-1 text-xl font-semibold mt-3">${el.name}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="border-[1px] border-blue-600 text-blue-600 text-sm px-3 py-[2px] rounded-lg">Grade ${el.grade}</span>
                            <span class="text-gray-300">${el.age}</span>
                        </div>
                        <div class="flex items-center gap-2 mt-3 text-yellow-400">
                            ⭐ <span class="text-white">${el.raiting}</span>
                            <span class="text-gray-300">• ${el.coins}</span>
                        </div>
                        <div class="w-full bg-gray-700 h-[8px] rounded-full mt-2">
                            <div style="width: ${el.raiting * 20}%" class="bg-white h-[8px] rounded-full"></div>
                        </div>
                        <div class="text-gray-300 mt-4 space-y-2 w-full">
                            <div class="flex gap-3 items-center"><img class="w-5" src="../assets/image/phone-call.png"><a href="tel:${el.phone}">${el.phone}</a></div>
                            <div class="flex gap-3 items-center"><img class="w-5" src="../assets/image/envelope.png"><a href="mailto:${el.email}">${el.email}</a></div>
                            <div class="flex gap-3 items-center"><img class="w-5" src="../assets/image/paper-plane.png"><a href="https://t.me/${el.telegram}">@${el.telegram}</a></div>
                            <div class="flex gap-3 items-center"><img class="w-5" src="../assets/image/linkedin.png"><a href="https://www.linkedin.com/in/${el.linkedin}">${el.linkedin}</a></div>
                        </div>
                        <div class="mt-4 flex gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 justify-center w-full">
                            <button onClick="editTeacher(${el.id})" class="flex px-[15px] border-zinc-900 rounded-lg items-center bg-zinc-800 hover:bg-zinc-900 py-[3px] border-[1px] gap-[5px] edit-btn">
                                <img class="object-cover p-[4px]" src="../assets/image/pencil (1).png" alt="">Edit
                            </button>
                            <button onClick="deleteTeacher(${el.id})" class="flex px-[15px] text-red-500 border-zinc-900 rounded-lg bg-zinc-800 hover:bg-red-950 items-center py-[3px] border-[1px] gap-[5px] delete-btn">
                                <img class="object-cover p-[4px]" src="../assets/image/trash (1).png" alt="">Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.log(err);
    }
}

function changePage(i) {
    if (i < 1) return;
    page = i;
    getData(teacherCards, page);
}

async function editTeacher(id) {
    outerModal.classList.remove("hidden");
    selected = id;
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/students/${id}`);
        form[0].value = res.data.name;
        form[1].value = res.data.age;
        form[2].value = res.data.avatar;
        form[3].value = res.data.email;
        form[4].value = res.data.grade;
        form[5].value = res.data.profession;
        form[6].value = res.data.linkedin;
        form[7].value = res.data.phone;
        form[8].value = res.data.raiting;
        form[9].value = res.data.telegram;
        form[10].checked = res.data.gender;
    } catch (err) {
        console.log(err);
    }
}

async function addTeacher(teacherObj) {
    try {
        if (selected) {
            await axios.put(`https://692584e782b59600d723f9b8.mockapi.io/students/${selected}`, teacherObj);
        } else {
            await axios.post("https://692584e782b59600d723f9b8.mockapi.io/students", teacherObj);
        }
        outerModal.classList.add("hidden");
        selected = null;
        getData(teacherCards, page);
    } catch (err) {
        console.log(err);
    }
}

form.addEventListener("submit", function (e) {
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
        gender: form[10].checked
    };
    addTeacher(teacherObj);
});

async function deleteTeacher(id) {
        try {
            // ID shu yerga qo'shilayotganiga ishonch hosil qiling
            await axios.delete(`https://692584e782b59600d723f9b8.mockapi.io/students/${id}`);
            // ...
        } catch (err) {
            // ...
        }
}




window.deleteTeacher = deleteTeacher;
window.editTeacher = editTeacher;
window.changePage = changePage;
window.getData = getData;

getData(teacherCards, page);
