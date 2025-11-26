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

async function getData(content , page) {
    try {

        let res = await axios.get(
            `https://692584e782b59600d723f9b8.mockapi.io/teachers?page=${page}&limit=10`
        );
        let allRes = await axios.get(
            "https://692584e782b59600d723f9b8.mockapi.io/teachers"
        );
        let pages = Math.ceil(allRes.data.length / 10);

        paganation.innerHTML = ""

        paganation.innerHTML +=
            `
        <li onClick="changePage(${page - 1})" class="${page === 1 ? "hidden" : ""} flex items-center cursor-pointer justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none">Previous</li>
        `

        for(let i =1; i <= pages; i++){
            paganation.innerHTML += `<li onClick="changePage(${i})" class="flex cursor-pointer items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none">${i}</li>`
        }

        paganation.innerHTML += `<li onClick="changePage(${page + 1})"
                 class="${page === pages ? "hidden" : ""} flex items-center justify-center cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none">Next
        </li>`

        content.innerHTML = ""
        res.data.map((el) => {
            content.innerHTML += `
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
        console.log(err);
    }
}

getData(teacherCards , page);

function changePage(i){
    getData(teacherCards , i)
}


async function editTeacher(id) {
    outerModal.classList.remove("hidden");
    selected = id;
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
        console.log(res.data);

        form[0].value = res.data.name
        form[1].value = res.data.age
        form[2].value = res.data.avatar
        form[3].value = res.data.email
        form[4].value = res.data.experience
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
            await axios.put(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${selected}`, teacherObj, outerModal.classList.add("hidden"));
        } else {
            await axios.post("https://692584e782b59600d723f9b8.mockapi.io/teachers", teacherObj, outerModal.classList.add("hidden"));
        }
        outerModal.classList.add("hidden");
        selected = null;
        getData(teacherCards , page)
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
        await axios.delete(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
        getData(teacherCards , page)
    } catch (err) {
        console.log(err);
    }
}




