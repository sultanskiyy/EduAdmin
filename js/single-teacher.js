let path = new URLSearchParams(location.search);
let id = path.get("teacherId");
let singleTeacher = document.getElementById("single-teacher");

async function getData() {
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`);
        const teacher = res.data;

        singleTeacher.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 w-full">
            <!-- Chap panel -->
            <div class="w-full md:w-[400px] bg-gray-800 rounded-2xl border border-gray-600 p-6 flex flex-col items-center">
                <img class="w-36 h-36 rounded-full border-4 border-blue-900 object-cover" src="${teacher.avatar}" alt="">
                <h2 class="mt-4 text-xl font-semibold text-white text-center">${teacher.name}</h2>
                <p class="mt-1 px-3 py-1 bg-stone-900 text-sm rounded-full text-center">${teacher.profession}</p>
                <div class="mt-6 w-full space-y-2 text-sm text-gray-300">
                    <div class="flex justify-between"><span>Age</span><span>${teacher.age} years</span></div>
                    <div class="flex justify-between"><span>Experience</span><span>${teacher.experience} years</span></div>
                    <div class="flex justify-between"><span>Gender</span><span>${teacher.gender ? "Male" : "Female"}</span></div>
                    <div class="flex justify-between items-center">
                        <span>Rating</span>
                        <span class="flex items-center gap-1">
                            <img class="w-4 h-4 object-cover" src="../assets/image/star (1).png" alt="">
                            <span>${teacher.raiting}</span>
                        </span>
                    </div>
                    <div class="w-full bg-gray-700 h-[8px] rounded-full mt-2">
                        <div style="width: ${teacher.raiting * 20}%;" 
                        class="bg-white h-[8px] rounded-full"></div>
                    </div>
                </div>
                <div class="mt-6 w-full">
                    <button class="flex w-full justify-center items-center gap-2 bg-white text-black py-2 rounded-xl">
                        <img src="../assets/image/pencil (2).png" alt="">Edit Profile
                    </button>
                </div>
            </div>

            <div class="flex-1 w-full bg-gray-800 rounded-2xl border border-gray-600 p-6 flex flex-col">
                <div class="flex justify-center gap-4 bg-stone-900 py-1.5 rounded-xl">
                    <button id="btn1" class="px-4 py-1 text-white rounded">Contact Info</button>
                    <button id="btn2" class="px-4 py-1 text-gray-400 rounded">Assigned Students</button>
                </div>

                <div id="contact-info" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div class="flex items-center gap-3 p-3 bg-gray-700 rounded-xl w-full">
                        <img class="w-6 h-6" src="../assets/image/phone-call.png" alt="">
                        <div><p class="text-sm text-gray-400">Phone</p><p class="text-white">${teacher.phone}</p></div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-700 rounded-xl w-full">
                        <img class="w-6 h-6" src="../assets/image/envelope.png" alt="">
                        <div><p class="text-sm text-gray-400">Email</p><p class="text-white">${teacher.email}</p></div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-700 rounded-xl w-full">
                        <img class="w-6 h-6" src="../assets/image/paper-plane.png" alt="">
                        <div><p class="text-sm text-gray-400">Telegram</p><p class="text-white">@${teacher.telegram}</p></div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-700 rounded-xl w-full">
                        <img class="w-6 h-6" src="../assets/image/linkedin.png" alt="">
                        <div><p class="text-sm text-gray-400">LinkedIn</p><p class="text-white">${teacher.linkedin}</p></div>
                    </div>
                </div>

                <div id="assigned-students" class="hidden flex flex-col gap-4 mt-5 overflow-y-auto">
                </div>
            </div>
        </div>
        `;

        let res2 = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}/students`);
        let studentContainer = document.querySelector("#assigned-students");
        studentContainer.innerHTML = '';
        res2.data.forEach(el => {
            studentContainer.innerHTML += `
            <div class="flex justify-between items-center p-3 bg-gray-700 rounded-xl w-full">
                <div class="flex items-center gap-3">
                    <a href="../pages/single-student.html?studentId=${el.id}">
                    <img class="w-14 h-14 rounded-full object-cover" src="${el.avatar}" alt="">
                    </a>
                    <div>
                        <p class="text-white">${el.name}</p>
                        <p class="text-gray-400 text-sm">Grade ${el.grade} — ${el.age} y.o.</p>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <img class="w-4 h-4" src="../assets/image/star (1).png" alt="">
                    <p class="text-white">4</p>
                </div>
            </div>
            `;
        });

        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        const contactInfo = document.getElementById("contact-info");
        const assignedStudents = document.getElementById("assigned-students");

        btn1.addEventListener("click", () => {
            contactInfo.classList.remove("hidden");
            assignedStudents.classList.add("hidden");
            btn1.classList.add("text-white");
            btn1.classList.remove("text-gray-400");
            btn2.classList.remove("text-white");
            btn2.classList.add("text-gray-400");
        });

        btn2.addEventListener("click", () => {
            contactInfo.classList.add("hidden");
            assignedStudents.classList.remove("hidden");
            btn2.classList.add("text-white");
            btn2.classList.remove("text-gray-400");
            btn1.classList.remove("text-white");
            btn1.classList.add("text-gray-400");
        });

    } catch (err) {
        console.log(err);
    }
}

getData();
