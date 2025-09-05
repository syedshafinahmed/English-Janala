function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn text-base font-light">${el}</span>`);
    return htmlElements.join(" ");
};
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");

    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}
const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data));
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    })
}
const loadLevelWord = (id) => {
    manageSpinner(true);
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
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                <div class="space-y-2">
                    <h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h1>
                    <p class="text-lg font-semibold">Meaning</p>
                    <p class="font-bangla font-medium text-lg">${word.meaning}</p>
                    <p class="text-lg font-semibold">Example</p>
                    <p class="text-base ">${word.sentence}</p>
                    <p class="font-bangla text-lg font-semibold">সমার্থক শব্দ গুলো</p>
                    <div>${createElements(word.synonyms)}</div>
                    <button class="btn bg-[#422AD5] w-full text-white text-center mt-4">Continue Learning</button>
                </div>`;
    document.getElementById("word_modal").showModal();
}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="col-span-full flex flex-col  items-center text-center space-y-5 py-10">
            <img src="assets/alert-error.png" alt="">
            <p class="font-bangla text-[#79716B] text-base">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-medium font-bangla text-[#292524] text-3xl">নেক্সট Lesson এ যান</h1>
        </div>`;
        manageSpinner(false);
        return;
        wordContainer.append()
    }
    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h1 class="font-bold text-2xl">${word.word ? word.word : "পাওয়া যায় নি"}</h1>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <p class="font-bangla text-xl font-medium">"${word.meaning ? word.meaning : "পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "পাওয়া যায় নি"}"</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF10] btn rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="bg-[#1A91FF10] btn rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-low"></i></button>
            </div>
        </div>`;
        wordContainer.append(card);
    })
    manageSpinner(false);
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


document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
            displayLevelWord(filterWords);
        });
})