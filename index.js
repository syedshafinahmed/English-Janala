const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data));
};
const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
};
const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    words.forEach (word =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h1 class="font-bold text-2xl">${word.word}</h1>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <p class="font-bangla text-xl font-medium">"${word.meaning} / ${word.pronunciation}"</p>
            <div class="flex justify-between items-center">
                <button class="bg-[#1A91FF10] btn rounded-md hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        levelContainer.append(btnDiv);
    }
};
loadLessons();