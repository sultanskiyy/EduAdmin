let teacherCards = document.querySelector(".teacher-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTeacherBtn = document.getElementById("add-teacher-btn");
let selected = null;
let paganation = document.getElementById("paganation");
let page = 1;

addTeacherBtn.addEventListener("click", function () {
    outerModal.classList.remove("hidden");
    for (let el of form) {
        el.value = "";
        el.checked = false;
    }
})

outerModal.addEventListener("click", function () {
    outerModal.classList.add("hidden")
    selected = null;
})

form.addEventListener("click", function (e) {
    e.stopPropagation()
})

async function getData(content, page) {
    try {

        let res = await axios.get(
            `https://692584e782b59600d723f9b8.mockapi.io/students?page=${page}&limit=10`
        );
        let allRes = await axios.get(
            "https://692584e782b59600d723f9b8.mockapi.io/students"
        );
        let pages = Math.ceil(allRes.data.length / 10);

        paganation.innerHTML = ""

        paganation.innerHTML +=
            `
        <li onClick="changePage(${page - 1})" class="${page === 1 ? "hidden" : ""} flex items-center cursor-pointer justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none">Previous</li>
        `


        paganation.innerHTML += `<h1>${page} / ${pages}</h1>`

        paganation.innerHTML += `<li onClick="changePage(${page + 1})"
                 class="${page === pages ? "hidden" : ""} flex items-center justify-center cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none">Next
        </li>`

        content.innerHTML = ""
        res.data.map((el) => {
            content.innerHTML +=
                `
                <div class="teacher-card max-w-[300px] w-full" data-id="${el.id} transition-transform duration-300 hover:-translate-y-[5px]">
                    <div class="group flex flex-col items-center bg-gray-800 rounded-[20px] border border-gray-700 p-6 shadow-lg">

                        <a href="../pages/single-student.html?studentId=${el.id}">
                        <img class="w-[100px] h-[100px] rounded-full border-[4px] border-blue-500 object-cover"
                            src="${el.avatar}" alt="">
                        </a>

                        <p class="text-white line-clamp-1 text-xl font-semibold mt-3">${el.name}</p>

                        <div class="flex items-center gap-2 mt-1">
                            <span class="border-[1px] border-blue-600 text-blue-600 text-sm px-3 py-[2px] rounded-lg">
                                ${el.grade}
                            </span>
                            <span class="text-gray-300">${el.age}</span>
                        </div>

                        <div class="flex items-center gap-2 mt-3 text-yellow-400">
                            ⭐ <span class="text-white">${el.raiting}</span>
                            <span class="text-gray-300">• ${el.coins}</span>
                        </div>

                        <div class="w-full bg-gray-700 h-[8px] rounded-full mt-2">
                            <div
                            style="width: ${el.raiting}%"
                            class="bg-white h-[8px] rounded-full""></div>
                        </div>

                        <div class="text-gray-300 mt-4 space-y-2 w-full">
                            <div class="flex gap-3 items-center">
                                <img class="w-5" src="../assets/image/phone-call.png">
                                <a href="tel:${el.phone}">${el.phone}</a>
                            </div>

                            <div class="flex gap-3 items-center">
                                <img class="w-5" src="../assets/image/envelope.png">
                                <a href="mailto:${el.email}">${el.email}</a>
                            </div>

                            <div class="flex gap-3 items-center">
                                <img class="w-5" src="../assets/image/paper-plane.png">
                                <a href="https://t.me/${el.telegram}">@${el.telegram}</a>
                            </div>

                            <div class="flex gap-3 items-center">
                                <img class="w-5" src="../assets/image/linkedin.png">
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
            </div>

            `;
        });

    } catch (err) {
        console.log(err);
    }
}

getData(teacherCards, page);

function changePage(i) {
    getData(teacherCards, i)
}


async function editTeacher(id) {
    outerModal.classList.remove("hidden");
    selected = id;
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/students/${id}`);
        console.log(res.data);

        form[0].value = res.data.name
        form[1].value = res.data.age
        form[2].value = res.data.avatar
        form[3].value = res.data.email
        form[4].value = res.data.grade
        form[5].value = res.data.profession
        form[6].value = res.data.linkedin
        form[7].value = res.data.phone
        form[8].value = res.data.raiting
        form[9].value = res.data.telegram
        form[10].checked = res.data.gender
    } catch (err) {
        console.log(err);
    }
}


async function addTeacher(teacherObj) {
    try {

        if (selected) {
            await axios.put(`https://692584e782b59600d723f9b8.mockapi.io/students/${selected}`, teacherObj, outerModal.classList.add("hidden"));
        } else {
            await axios.post("https://692584e782b59600d723f9b8.mockapi.io/students", teacherObj, outerModal.classList.add("hidden"));
        }
        outerModal.classList.add("hidden");
        selected = null;
        getData(teacherCards, page)
    } catch (err) {
        console.log(err);
    }
}


form.addEventListener("submit", function (e) {
    e.preventDefault();
    const teacherObj = {}
    teacherObj.name = form[0].value;
    teacherObj.age = form[1].value;
    teacherObj.avatar = form[2].value;
    teacherObj.email = form[3].value;
    teacherObj.experience = form[4].value;
    teacherObj.profession = form[5].value;
    teacherObj.linkedin = form[6].value;
    teacherObj.phone = form[7].value;
    teacherObj.raiting = form[8].value;
    teacherObj.telegram = form[9].value
    teacherObj.isMarried = form[10].checked;

    console.log(teacherObj);
    addTeacher(teacherObj);
    selected = null;
})


async function deleteTeacher(id) {
    try {
        await axios.delete(`https://692584e782b59600d723f9b8.mockapi.io/students/${id}`);
        getData(teacherCards, page)
    } catch (err) {
        console.log(err);
    }
}




