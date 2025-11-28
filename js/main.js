let teacherCards = document.querySelector(".teacher-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTeacherBtn = document.getElementById("add-teacher-btn");
let selected = null;
let pagination = document.getElementById("paganation");
let page = 1;
let sortName = document.getElementById("sortName");
let sortNameValue = "default";
let search = document.getElementById("search");
let searchValue = "";
let filterProfession = document.getElementById("filterProfession");
let filterProfessionValue = "";
let filterGender = document.getElementById("filterGender");
let filterGenderValue = "";
let filterExperience = document.getElementById("filterExperience");
let filterRating = document.getElementById("filterRating");
let experienceValue = "";
let ratingValue = "";

async function loadProfessions() {
    try {
        const res = await axios.get("https://692584e782b59600d723f9b8.mockapi.io/teachers");
        const professions = [...new Set(res.data.map(t => t.profession))].sort();
        filterProfession.innerHTML = `<option value="">All Profession</option>`;
        professions.forEach(p => {
            filterProfession.innerHTML += `<option value="${p}">${p}</option>`;
        });
    } catch (err) { console.log(err); }
}
loadProfessions();

search.addEventListener("input", () => { searchValue = search.value.trim(); page = 1; getData(); });
filterProfession.addEventListener("change", () => { filterProfessionValue = filterProfession.value; page = 1; getData(); });
filterGender.addEventListener("change", () => { filterGenderValue = filterGender.value; page = 1; getData(); });

filterExperience.addEventListener("change", () => {
    experienceValue = filterExperience.value;
    page = 1;
    getData();
});

filterRating.addEventListener("change", () => {
    ratingValue = filterRating.value;
    page = 1;
    getData();
});

sortName.addEventListener("change", () => { sortNameValue = sortName.value; page = 1; getData(); });

addTeacherBtn.addEventListener("click", () => {
    outerModal.classList.remove("hidden");
    form.reset();
    selected = null;
});

outerModal.addEventListener("click", () => outerModal.classList.add("hidden"));
form.addEventListener("click", e => e.stopPropagation());

async function getData() {
    try {
        let url = `https://692584e782b59600d723f9b8.mockapi.io/teachers?page=${page}&limit=10`;

        if (sortNameValue === "asc" || sortNameValue === "desc") url += `&sortBy=name&order=${sortNameValue}`;
        if (searchValue) url += `&search=${encodeURIComponent(searchValue)}`;
        if (filterProfessionValue) url += `&profession=${encodeURIComponent(filterProfessionValue)}`;
        if (filterGenderValue === "male") url += "&gender=true";
        if (filterGenderValue === "female") url += "&gender=false";

        if (experienceValue) {
            if (experienceValue === "0-5") url += "&experience>=0&experience<=5";
            else if (experienceValue === "6-10") url += "&experience>=6&experience<=10";
            else if (experienceValue === "11-20") url += "&experience>=11&experience<=20";
            else if (experienceValue === "20+") url += "&experience>=20";
        }

        if (ratingValue) {
            url += `&raiting>=${ratingValue}`;
        }

        const res = await axios.get(url);
        const allRes = await axios.get("https://692584e782b59600d723f9b8.mockapi.io/teachers");
        const pages = Math.ceil(allRes.data.length / 10);

        pagination.innerHTML = `
            <li onclick="changePage(${page - 1})" class="${page === 1 ? "hidden" : ""} flex items-center justify-center cursor-pointer text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9">Previous</li>
            <h1>${page} / ${pages}</h1>
            <li onclick="changePage(${page + 1})" class="${page === pages ? "hidden" : ""} flex items-center justify-center cursor-pointer text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9">Next</li>
        `;

        teacherCards.innerHTML = "";
        if (res.data.length === 0) {
            teacherCards.innerHTML = `<p class="col-span-full text-center text-gray-500 text-2xl py-20">Hech narsa topilmadi</p>`;
            return;
        }

        res.data.forEach(el => {
            teacherCards.innerHTML += `
            <div class="teacher-card max-w-[300px] w-full" data-id="${el.id}">
                <div class="group flex flex-col items-center gap-[5px] pt-[30px] bg-white dark:bg-gray-800 rounded-[15px] shadow-md p-4">
                    <a href="../pages/single-teacher.html?teacherId=${el.id}">
                        <img class="w-[100px] h-[100px] rounded-full border-[4px] border-blue-500 object-cover"
                            src="${el.avatar}" alt="">
                    </a>
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
                        <button onClick="editTeacher(${el.id})" class="flex px-[15px] border-zinc-900 rounded-lg items-center bg-zinc-800 hover:bg-zinc-900 py-[3px] border-[1px] gap-[5px] edit-btn">
                            <img class="object-cover p-[4px]" src="../assets/image/pencil (1).png" alt="">Edit
                        </button>
                        <button onClick="deleteTeacher(${el.id})" class="flex px-[15px] text-red-500 border-zinc-900 rounded-lg bg-zinc-800 hover:bg-red-950 items-center py-[3px] border-[1px] gap-[5px] delete-btn">
                            <img class="object-cover p-[4px]" src="../assets/image/trash (1).png" alt="">Delete
                        </button>
                    </div>
                </div>
            </div>`;
        });

    } catch (err) {
        console.error(err);
        teacherCards.innerHTML = `<p class="text-red-600 text-center">Ma'lumot yuklanmadi</p>`;
    }
}

getData();

function changePage(i) {
    if (i < 1) return;
    page = i;
    getData();
}

async function editTeacher(id) {
    selected = id;
    outerModal.classList.remove("hidden");
    const res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
    form[0].value = res.data.name;
    form[1].value = res.data.age;
    form[2].value = res.data.avatar;
    form[3].value = res.data.email;
    form[4].value = res.data.experience;
    form[5].value = res.data.profession;
    form[6].value = res.data.linkedin;
    form[7].value = res.data.phone;
    form[8].value = res.data.raiting || 5;
    form[9].value = res.data.telegram;
    form[10].checked = res.data.gender === true;
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const obj = {
        name: form[0].value,
        age: +form[1].value,
        avatar: form[2].value,
        email: form[3].value,
        experience: +form[4].value,
        profession: form[5].value,
        linkedin: form[6].value,
        phone: form[7].value,
        raiting: +form[8].value,
        telegram: form[9].value,
        gender: form[10].checked
    };

    if (selected) {
        await axios.put(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${selected}`, obj);
    } else {
        await axios.post("https://692584e782b59600d723f9b8.mockapi.io/teachers", obj);
    }
    outerModal.classList.add("hidden");
    selected = null;
    page = 1;
    getData();
    loadProfessions();
});

async function deleteTeacher(id) {
        await axios.delete(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
        getData();
}