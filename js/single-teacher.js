let path = new URLSearchParams(location.search);
let id = path.get("teacherId");
let teacherStudent = document.querySelector(".teacher-students")

console.log(id);


async function getData() {
    try {
        let res = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}`)

        let res2 = await axios.get(`https://692584e782b59600d723f9b8.mockapi.io/teachers/${id}/students`);
        res2.data.map((el) => {
            teacherStudent.innerHTML +=
                `
            <div class="max-w-[800px] flex justify-between py-[20px] px-[25px] rounded-xl bg-gray-700 items-center gap-[20px]">
                <div class="flex items-center gap-[15px]">
                    <img class="w-[60px] rounded-full h-[60px] object-cover" src=${el.avatar} alt="">
                    <div>
                        <p>${el.name}</p>
                    <div class="flex gap-[5px] text-[14px] text-[gray]">
                        <p>Grade ${el.grade}</p>-
                        <p>${el.age} years old</p>
                        </div>
                    </div>
                     </div>
                    <div class="flex items-center gap-[8px]">
                        <img src="../assets/image/star (1).png" alt="">
                        <p>4</p>
                </div>
            </div>
            `
        })
    } catch (err) {
        console.log(err);
    }
}
getData();

