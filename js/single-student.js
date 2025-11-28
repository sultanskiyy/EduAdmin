let path = new URLSearchParams(location.search);
let id = path.get("studentId");
let singleStudent = document.getElementById("single-student");

async function getData() {
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/students/${id}`);
        const student = res.data;
        let res2 = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${student.teacherId}`);
        const teacher = res2.data;

        singleStudent.innerHTML = `
        <div class="max-w-[400px] w-full bg-gray-800 rounded-2xl border border-gray-600 p-6 flex-shrink-0 flex flex-col items-center md:items-stretch">
            <div class="flex justify-center items-center">
                <img class="w-[150px] h-[150px] border-4 border-blue-900 object-cover rounded-full" src="${student.avatar}" alt="Avatar">
            </div>

            <div class="flex flex-col gap-2 justify-center items-center my-4 text-center">
                <p class="text-white font-semibold text-lg">${student.name}</p>
                <p class="px-3 py-1 text-blue-500 border-blue-500 text-[12px] border font-medium rounded-xl">Grade ${student.grade}</p>
            </div>

            <div class="grid text-[14px] gap-2 w-full">
                <div class="flex justify-between text-gray-300"><p>Age</p><p>${student.age}</p></div>
                <div class="flex justify-between text-gray-300"><p>Gender</p><p>${student.gender ? "Male" : "Female"}</p></div>
                <div class="flex justify-between text-gray-300"><p>Rating</p><p class="flex items-center gap-2"><img class="w-4 h-4" src="../assets/image/star (1).png" alt="">${student.raiting}</p></div>
                <div class="w-full bg-gray-700 h-[8px] rounded-full mt-2"><div style="width:${student.raiting * 20}%" class="bg-white h-[8px] rounded-full"></div></div>
                <div class="flex justify-between text-gray-300"><p>Coins</p><p class="flex items-center gap-2"><img class="w-4 h-4" src="../assets/image/coins.png" alt="">${student.coins}</p></div>
                <div class="w-full bg-gray-700 h-[8px] rounded-full mt-2"><div style="width:${(student.coins * 100)/1000}%" class="bg-white h-[8px] rounded-full"></div></div>
            </div>
        </div>

        <div class="flex-1 max-w-[800px] w-full bg-gray-800 rounded-2xl border border-gray-600 p-6 flex flex-col">
            <div class="bg-stone-900 w-full flex justify-between rounded-2xl px-4 py-2 mb-4">
                <button id="btn-contact" class="text-white cursor-pointer transition duration-200">Contact Info</button>
                <button id="btn-teacher" class="text-gray-400 cursor-pointer transition duration-200">Teacher</button>
                <button id="btn-stats" class="text-gray-400 cursor-pointer transition duration-200">Statistics</button>
            </div>

            <div id="contact-info" class="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
                <div class="flex w-full items-center gap-4 bg-gray-700 p-3 rounded-xl">
                    <img class="w-6 h-6" src="../assets/image/phone-call.png" alt="">
                    <div>
                        <p class="text-gray-400 text-sm">Phone</p>
                        <p class="text-white">${student.phone}</p>
                    </div>
                </div>
                <div class="flex w-full items-center gap-4 bg-gray-700 p-3 rounded-xl">
                    <img class="w-6 h-6" src="../assets/image/envelope.png" alt="">
                    <div>
                        <p class="text-gray-400 text-sm">Email</p>
                        <p class="text-white">${student.email}</p>
                    </div>
                </div>
                <div class="flex w-full items-center gap-4 bg-gray-700 p-3 rounded-xl">
                    <img class="w-6 h-6" src="../assets/image/paper-plane.png" alt="">
                    <div>
                        <p class="text-gray-400 text-sm">Telegram</p>
                        <p class="text-white">${student.telegram}</p>
                    </div>
                </div>
                <div class="flex w-full items-center gap-4 bg-gray-700 p-3 rounded-xl">
                    <img class="w-6 h-6" src="../assets/image/linkedin.png" alt="">
                    <div>
                        <p class="text-gray-400 text-sm">LinkedIn</p>
                        <p class="text-white">${student.linkedin}</p>
                    </div>
                </div>
            </div>

            <div id="teacher-info" class="hidden mt-4">
            <div class="flex justify-between items-center p-3 bg-gray-700 rounded-xl w-full">
                <div class="flex items-center gap-3">
                <a href="../pages/single-teacher.html?teacherId=${teacher.id}">
                    <img class="w-14 h-14 rounded-full object-cover" src="${teacher.avatar}" alt="">
                </a>
                    <div>
                        <p class="text-white">${teacher.name}</p>
                        <p class="text-gray-400 text-sm">${teacher.profession}</p>
                        <p class="text-gray-400 text-sm">${teacher.experience} years of experience</p>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <img class="w-4 h-4" src="../assets/image/star (1).png" alt="">
                    <p class="text-white">4</p>
                </div>
            </div>
            </div>


            <div id="stats-info" class="hidden grid gap-4 grid-cols-1 sm:grid-cols-2 w-full mt-4">
            <div class="w-full bg-gradient-to-br from-blue-950 to-blue-700 transition items-center gap-4 bg-gray-700 p-3 rounded-xl">
                                <div class="flex justify-between">
                                <p>Performance Rating</p>
                                <img class="w-6 h-6 object-cover" src="../assets/image/star (1).png" alt="">
                                </div>
                                <div class="flex gap-[1px] text-[30px] items-center">
                                    <p class="text-gray-400">${student.raiting}</p>
                                    <p class="text-gray-400">/</p>
                                    <p id="teacher-phone" class="text-gray-400">5.0</p>
                                </div>
                                <div class="w-full bg-gray-800 h-[8px] rounded-full mt-2"><div style="width:${student.raiting * 20}%" class="bg-white h-[8px] rounded-full"></div></div>
                            </div>

                            <div class="w-full bg-gradient-to-br from-orange-800 to-orange-400 transition items-center gap-4 bg-gray-700 p-3 rounded-xl">
                                <div class="flex justify-between">
                                <p>Performance Rating</p>
                                <img class="w-6 h-6 object-cover" src="../assets/image/coins.png" alt="">
                                </div>
                                <div class="flex gap-[1px] text-[30px] items-center">
                                    <p class="text-gray-400">${student.coins}</p>
                                    <p class="text-gray-400">/</p>
                                    <p id="teacher-phone" class="text-gray-400">1000</p>
                                </div>
                                <div class="w-full bg-gray-800 h-[8px] rounded-full mt-2"><div style="width:${(student.coins*100)/1000}%" class="bg-white h-[8px] rounded-full"></div></div>
                            </div>

                            <div class="w-full bg-gradient-to-br from-green-950 to-green-700 transition items-center gap-4 bg-gray-700 p-3 rounded-xl">
                                <div class="flex justify-between">
                                <p>Geade Level</p>
                                <img class="w-6 h-6 object-cover" src="../assets/image/badge.png" alt="">
                                </div>
                                <div class="flex gap-[1px] text-[30px] items-center">
                                    <p class="text-gray-400">Grade ${student.grade}</p>
                                </div>
                            </div>

                            <div class="w-full bg-gradient-to-br from-purple-950 to-purple-700 transition items-center gap-4 bg-gray-700 p-3 rounded-xl">
                                <div class="flex justify-between">
                                <p>Progress Trend</p>
                                <img class="w-6 h-6 object-cover" src="../assets/image/chart-histogram.png" alt="">
                                </div>
                                <div class="flex gap-[1px] text-[30px] items-center">
                                    <p class="text-gray-400">Improving</p>
                                </div>
                            </div>
            </div>
        </div>
        `;

        const sections = {
            contact: document.getElementById("contact-info"),
            teacher: document.getElementById("teacher-info"),
            stats: document.getElementById("stats-info")
        };

        const buttons = {
            contact: document.getElementById("btn-contact"),
            teacher: document.getElementById("btn-teacher"),
            stats: document.getElementById("btn-stats")
        };

        function hideSections() {
            Object.values(sections).forEach(s => s.classList.add("hidden"));
        }

        function resetButtons() {
            Object.values(buttons).forEach(b => {
                b.classList.remove("text-white");
                b.classList.add("text-gray-400");
            });
        }

        function activate(tab) {
            hideSections();
            resetButtons();
            sections[tab].classList.remove("hidden");
            buttons[tab].classList.add("text-white");
            buttons[tab].classList.remove("text-gray-400");
        }

        buttons.contact.addEventListener("click", () => activate("contact"));
        buttons.teacher.addEventListener("click", () => activate("teacher"));
        buttons.stats.addEventListener("click", () => activate("stats"));

    } catch (err) {
        console.log(err);
    }
}

getData();
