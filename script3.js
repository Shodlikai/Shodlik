const words = [
    { word: "Paris", pronunciation: "ˈpærɪs", translation: "Parij" },
    { word: "home", pronunciation: "hoʊm", translation: "uy" },
    { word: "field", pronunciation: "fiːld", translation: "dala" },
    { word: "park", pronunciation: "pɑːrk", translation: "bog‘, hiyobon" },
    { word: "hotel", pronunciation: "hoʊˈtɛl", translation: "mehmonxona" },
    { word: "college", pronunciation: "ˈkɒlɪdʒ", translation: "kollej" },
    { word: "city", pronunciation: "ˈsɪti", translation: "shahar" },
    { word: "village", pronunciation: "ˈvɪlɪdʒ", translation: "qishloq" },
    { word: "camp", pronunciation: "kæmp", translation: "lager" },
    { word: "kitchen", pronunciation: "ˈkɪtʃɪn", translation: "oshxona" },
    { word: "bedroom", pronunciation: "ˈbɛdruːm", translation: "yotoqxona" },
    { word: "table", pronunciation: "ˈteɪbəl", translation: "stol" },
    { word: "shop", pronunciation: "ʃɒp", translation: "do‘kon" },
    { word: "mall", pronunciation: "mɔːl", translation: "yirik savdo markazi" },
    { word: "teapot", pronunciation: "ˈtiːˌpɒt", translation: "choynak" },
    { word: "classroom", pronunciation: "ˈklæsˌruːm", translation: "sinfxona" },
    { word: "earth", pronunciation: "ɜːrθ", translation: "yer" },
    { word: "river", pronunciation: "ˈrɪvər", translation: "daryo" },
    { word: "sea", pronunciation: "siː", translation: "dengiz" },
    { word: "London", pronunciation: "ˈlʌndən", translation: "London" },
    { word: "ocean", pronunciation: "ˈoʊʃən", translation: "okean" },
    { word: "hospital", pronunciation: "ˈhɒspɪtl", translation: "kasalxona" },
    { word: "bakery", pronunciation: "ˈbeɪkəri", translation: "novvoyxona" },
    { word: "subway", pronunciation: "ˈsʌbˌweɪ", translation: "metro" },
    { word: "bank", pronunciation: "bæŋk", translation: "bank" },
    { word: "railway", pronunciation: "ˈreɪlˌweɪ", translation: "temir yo‘l" },
    { word: "station", pronunciation: "ˈsteɪʃən", translation: "bekat" },
    { word: "stadium", pronunciation: "ˈsteɪdiəm", translation: "stadion" },
    { word: "stone", pronunciation: "stoʊn", translation: "tosh" },
    { word: "pencil case", pronunciation: "ˈpɛnsəl keɪs", translation: "qalamdon" }
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