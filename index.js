const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data));
};
const removeActive = () =>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    })
}
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
};
const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (word) =>{
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    // detailsBox.innerHTML = `
    // `;
    document.getElementById("word_modal").showModal();
}
const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="col-span-full flex flex-col  items-center text-center space-y-5 py-10">
            <img src="assets/alert-error.png" alt="">
            <p class="font-bangla text-[#79716B] text-base">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-medium font-bangla text-[#292524] text-3xl">নেক্সট Lesson এ যান</h1>
        </div>`;
        wordContainer.append()
    }
    words.forEach (word =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h1 class="font-bold text-2xl">${word.word ? word.word :"পাওয়া যায় নি"}</h1>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <p class="font-bangla text-xl font-medium">"${word.meaning ? word.meaning :"পাওয়া যায় নি" } / ${word.pronunciation ? word.pronunciation : "পাওয়া যায় নি"}"</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF10] btn rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="bg-[#1A91FF10] btn rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>`;
        wordContainer.append(card);
    })
}
const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        levelContainer.append(btnDiv);
    }
};
loadLessons();