const words = [
    { word: "morning", pronunciation: "ˈmɔːrnɪŋ", translation: "ertalab, tong" },
    { word: "leg", pronunciation: "lɛɡ", translation: "oyoq" },
    { word: "bird", pronunciation: "bɜːrd", translation: "qush" },
    { word: "boat", pronunciation: "boʊt", translation: "qayiq" },
    { word: "milk", pronunciation: "mɪlk", translation: "sut" },
    { word: "street", pronunciation: "striːt", translation: "ko‘cha" },
    { word: "day", pronunciation: "deɪ", translation: "kun" },
    { word: "wind", pronunciation: "wɪnd", translation: "shamol" },
    { word: "cow", pronunciation: "kaʊ", translation: "sigir" },
    { word: "water", pronunciation: "ˈwɔːtər", translation: "suv" },
    { word: "egg", pronunciation: "ɛɡ", translation: "tuxum" },
    { word: "snow", pronunciation: "snoʊ", translation: "qor" },
    { word: "rain", pronunciation: "reɪn", translation: "yomg‘ir" },
    { word: "melon", pronunciation: "ˈmɛlən", translation: "qovun" },
    { word: "rabbit", pronunciation: "ˈræbɪt", translation: "quyon" },
    { word: "wood", pronunciation: "wʊd", translation: "yog‘och" },
    { word: "sun", pronunciation: "sʌn", translation: "quyosh" },
    { word: "bread", pronunciation: "brɛd", translation: "non" },
    { word: "farm", pronunciation: "fɑːrm", translation: "ferma" },
    { word: "garden", pronunciation: "ˈɡɑːrdn", translation: "bog‘" },
    { word: "trap", pronunciation: "træp", translation: "tuzoq" },
    { word: "prey", pronunciation: "preɪ", translation: "o‘lja" },
    { word: "dog", pronunciation: "dɔːɡ", translation: "it" },
    { word: "reason", pronunciation: "ˈriːzən", translation: "sabab" },
    { word: "group", pronunciation: "ɡruːp", translation: "guruh" },
    { word: "fox", pronunciation: "fɒks", translation: "tulki" },
    { word: "neck", pronunciation: "nɛk", translation: "bo‘yin" },
    { word: "bookmark", pronunciation: "ˈbʊkmɑːrk", translation: "xatcho‘p" },
    { word: "travel", pronunciation: "ˈtrævəl", translation: "sayohat" },
    { word: "pillow", pronunciation: "ˈpɪloʊ", translation: "yostiq" }
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