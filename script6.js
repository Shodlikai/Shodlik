const words = [
    { word: "dress", pronunciation: "dres", translation: "ko‘ylak" },
    { word: "ship", pronunciation: "ʃɪp", translation: "kema" },
    { word: "root", pronunciation: "ruːt", translation: "ildiz" },
    { word: "white", pronunciation: "waɪt", translation: "oq" },
    { word: "watch", pronunciation: "wɒʧ", translation: "qo‘l soat" },
    { word: "sail", pronunciation: "seɪl", translation: "yelkan" },
    { word: "nut", pronunciation: "nʌt", translation: "yong‘oq" },
    { word: "place", pronunciation: "pleɪs", translation: "joy" },
    { word: "in", pronunciation: "ɪn", translation: "ichida" },
    { word: "on", pronunciation: "ɒn", translation: "ustida" },
    { word: "at", pronunciation: "æt", translation: "oldida, yonida" },
    { word: "cheese", pronunciation: "ʧiːz", translation: "pishloq" },
    { word: "ant", pronunciation: "ænt", translation: "chumoli" },
    { word: "brain", pronunciation: "breɪn", translation: "miya" },
    { word: "fork", pronunciation: "fɔːrk", translation: "sanchqi, vilka" },
    { word: "page", pronunciation: "peɪdʒ", translation: "sahifa" },
    { word: "mug", pronunciation: "mʌɡ", translation: "krujka" },
    { word: "worm", pronunciation: "wɜːrm", translation: "chuvalchang" },
    { word: "bitter", pronunciation: "ˈbɪtər", translation: "achchiq" },
    { word: "king", pronunciation: "kɪŋ", translation: "qirol" },
    { word: "basket", pronunciation: "ˈbæskɪt", translation: "savat" },
    { word: "style", pronunciation: "staɪl", translation: "uslub" },
    { word: "help", pronunciation: "hɛlp", translation: "yordam" },
    { word: "golf", pronunciation: "ɡɒlf", translation: "golf o‘yini" },
    { word: "stage", pronunciation: "steɪdʒ", translation: "sahna" },
    { word: "jacket", pronunciation: "ˈdʒækɪt", translation: "jiket" },
    { word: "paper", pronunciation: "ˈpeɪpər", translation: "qog‘oz" },
    { word: "earphones", pronunciation: "ˈɪrfəʊnz", translation: "quloqchinlar" },
    { word: "speaker", pronunciation: "ˈspiːkər", translation: "kalonka" },
    { word: "charger", pronunciation: "ˈʧɑːrdʒər", translation: "quvvatlagich" },
    { word: "travel", pronunciation: "-", translation: "sayohat" },
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