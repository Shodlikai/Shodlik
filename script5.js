const words = [
    { word: "wing", pronunciation: "wɪŋ", translation: "qanot" },
    { word: "sock", pronunciation: "sɒk", translation: "paypoq" },
    { word: "key", pronunciation: "kiː", translation: "kalit" },
    { word: "tie", pronunciation: "taɪ", translation: "bo‘yinbog‘" },
    { word: "ink", pronunciation: "ɪŋk", translation: "bo‘yoq, siyoh" },
    { word: "brown", pronunciation: "braʊn", translation: "jigarrang" },
    { word: "pie", pronunciation: "paɪ", translation: "pirog" },
    { word: "brick", pronunciation: "brɪk", translation: "g‘isht" },
    { word: "face", pronunciation: "feɪs", translation: "yuz, aft" },
    { word: "tea", pronunciation: "tiː", translation: "choy" },
    { word: "lamp", pronunciation: "læmp", translation: "lampa" },
    { word: "grass", pronunciation: "ɡrɑːs", translation: "maysa" },
    { word: "door", pronunciation: "dɔːr", translation: "eshik" },
    { word: "school", pronunciation: "skuːl", translation: "maktab" },
    { word: "tree", pronunciation: "triː", translation: "daraxt" },
    { word: "list", pronunciation: "lɪst", translation: "ro‘yxat" },
    { word: "cat", pronunciation: "kæt", translation: "mushuk" },
    { word: "blue", pronunciation: "bluː", translation: "ko‘k" },
    { word: "cake", pronunciation: "keɪk", translation: "tort" },
    { word: "lady", pronunciation: "ˈleɪdi", translation: "xonim" },
    { word: "hand", pronunciation: "hænd", translation: "qo‘l" },
    { word: "green", pronunciation: "ɡriːn", translation: "yashil" },
    { word: "knee", pronunciation: "niː", translation: "tizza" },
    { word: "road", pronunciation: "roʊd", translation: "yo‘l" },
    { word: "life", pronunciation: "laɪf", translation: "hayot" },
    { word: "giraffe", pronunciation: "dʒɪˈræf", translation: "jirafa" },
    { word: "apple", pronunciation: "ˈæpəl", translation: "olma" },
    { word: "banana", pronunciation: "bəˈnænə", translation: "banan" },
    { word: "sand", pronunciation: "sænd", translation: "qum" },
    { word: "flag", pronunciation: "flæɡ", translation: "bayroq" }
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