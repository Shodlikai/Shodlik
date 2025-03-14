const words = [
    { word: "dust", pronunciation: "dʌst", translation: "chang" },
    { word: "apron", pronunciation: "ˈeɪprən", translation: "fartuk, etak" },
    { word: "house", pronunciation: "haʊs", translation: "uy" },
    { word: "sentence", pronunciation: "ˈsɛntəns", translation: "gap" },
    { word: "camel", pronunciation: "ˈkæməl", translation: "tuya" },
    { word: "panda", pronunciation: "ˈpændə", translation: "panda" },
    { word: "clan", pronunciation: "klæn", translation: "katta oila" },
    { word: "hen", pronunciation: "hɛn", translation: "tovuq" },
    { word: "owl", pronunciation: "aʊl", translation: "boyo‘g‘li" },
    { word: "sofa", pronunciation: "ˈsoʊfə", translation: "divan" },
    { word: "queen", pronunciation: "kwiːn", translation: "qirolicha" },
    { word: "zipper", pronunciation: "ˈzɪpər", translation: "zamok, ilashma" },
    { word: "bicycle", pronunciation: "ˈbaɪsɪkəl", translation: "velosiped" },
    { word: "guitar", pronunciation: "ɡɪˈtɑr", translation: "gitara" },
    { word: "tomato", pronunciation: "təˈmeɪtoʊ", translation: "pomidor" },
    { word: "cucumber", pronunciation: "ˈkjuːkʌmbər", translation: "bodring" },
    { word: "lemon", pronunciation: "ˈlɛmən", translation: "limon" },
    { word: "coffee", pronunciation: "ˈkɔːfi", translation: "qahva" },
    { word: "sugar", pronunciation: "ˈʃʊɡər", translation: "shakar" },
    { word: "salt", pronunciation: "sɔːlt", translation: "tuz" },
    { word: "rice", pronunciation: "raɪs", translation: "guruch" },
    { word: "hair", pronunciation: "hɛr", translation: "soch" },
    { word: "tear", pronunciation: "tɪr", translation: "ko‘z yoshi" },
    { word: "air", pronunciation: "ɛr", translation: "havo" },
    { word: "soil", pronunciation: "sɔɪl", translation: "tuproq" },
    { word: "orange", pronunciation: "ˈɔːrɪndʒ", translation: "apelsin" },
    { word: "pumpkin", pronunciation: "ˈpʌmpkɪn", translation: "oshqovoq" },
    { word: "donkey", pronunciation: "ˈdɒŋki", translation: "eshak" },
    { word: "money", pronunciation: "ˈmʌni", translation: "pul" },
    { word: "time", pronunciation: "taɪm", translation: "vaqt" }
];
let remainingWords = shuffleArray([...words]); // So‘zlar tasodifiy tartibda
let currentWord = remainingWords.pop(); // Oxiridan birini olish
let currentLanguage = "eng"; 

const flashcard = document.getElementById("flashcard");
const wordElement = document.getElementById("word");
const translationElement = document.getElementById("translation");

// So‘zlarni random tartibda aralashtirish funksiyasi
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function loadWord() {
    if (!currentWord) return;
    if (currentLanguage === "eng") {
        wordElement.innerHTML = `${currentWord.word} <br> <small>[${currentWord.pronunciation}]</small>`;
        translationElement.innerText = currentWord.translation;
    } else {
        wordElement.innerText = currentWord.translation;
        translationElement.innerHTML = `${currentWord.word} <br> <small>[${currentWord.pronunciation}]</small>`;
    }
    flashcard.classList.remove("flipped");
}

function flipCard() {
    flashcard.classList.toggle("flipped");
}

function nextWord() {
    if (remainingWords.length === 0) {
        remainingWords = shuffleArray([...words]); // Yangi random tartibda boshlash
    }
    currentWord = remainingWords.pop();
    loadWord();
}

function setLanguage(lang) {
    currentLanguage = lang;
    loadWord();
}

function readWord() {
    if (!currentWord) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}

// Dastlabki so‘zni yuklash
loadWord();