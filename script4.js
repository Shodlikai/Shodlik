const words = [
    { word: "capital", pronunciation: "ˈkæpɪtl", translation: "poytaxt" },
    { word: "cave", pronunciation: "keɪv", translation: "g‘or" },
    { word: "fish", pronunciation: "fɪʃ", translation: "baliq" },
    { word: "nose", pronunciation: "noʊz", translation: "burun" },
    { word: "bee", pronunciation: "biː", translation: "ari" },
    { word: "island", pronunciation: "ˈaɪlənd", translation: "orol" },
    { word: "mouse", pronunciation: "maʊs", translation: "sichqon" },
    { word: "tiger", pronunciation: "ˈtaɪɡər", translation: "yo‘lbars" },
    { word: "baby", pronunciation: "ˈbeɪbi", translation: "chaqaloq" },
    { word: "bus", pronunciation: "bʌs", translation: "avtobus" },
    { word: "taxi", pronunciation: "ˈtæksi", translation: "taksi" },
    { word: "fruit", pronunciation: "fruːt", translation: "meva" },
    { word: "string", pronunciation: "strɪŋ", translation: "arqon" },
    { word: "melon", pronunciation: "ˈmɛlən", translation: "qovun" },
    { word: "event", pronunciation: "ɪˈvɛnt", translation: "hodisa" },
    { word: "lake", pronunciation: "leɪk", translation: "ko‘l" },
    { word: "uncle", pronunciation: "ˈʌŋkəl", translation: "tog‘a, amaki" },
    { word: "set", pronunciation: "sɛt", translation: "to‘plam" },
    { word: "chair", pronunciation: "tʃɛr", translation: "stul" },
    { word: "desk", pronunciation: "dɛsk", translation: "parta" },
    { word: "mango", pronunciation: "ˈmæŋɡoʊ", translation: "mango" },
    { word: "monkey", pronunciation: "ˈmʌŋki", translation: "maymun" },
    { word: "pear", pronunciation: "pɛr", translation: "nok" },
    { word: "knife", pronunciation: "naɪf", translation: "pichoq" },
    { word: "oil", pronunciation: "ɔɪl", translation: "yog‘" },
    { word: "carrot", pronunciation: "ˈkærət", translation: "sabzi" },
    { word: "parrot", pronunciation: "ˈpærət", translation: "to‘ti" },
    { word: "radish", pronunciation: "ˈrædɪʃ", translation: "rediska" },
    { word: "dream", pronunciation: "driːm", translation: "orzu" },
    { word: "cartoon", pronunciation: "kɑrˈtun", translation: "multfilm" }
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