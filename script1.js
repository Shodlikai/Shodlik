const words = [
    { word: "zebra", pronunciation: "ˈziːbrə", translation: "zebra" },
    { word: "horse", pronunciation: "hɔːrs", translation: "ot" },
    { word: "desk", pronunciation: "desk", translation: "parta" },
    { word: "cap", pronunciation: "kæp", translation: "kepka" },
    { word: "bag", pronunciation: "bæɡ", translation: "sumka" },
    { word: "phone", pronunciation: "foʊn", translation: "telefon" },
    { word: "wall", pronunciation: "wɔːl", translation: "devor" },
    { word: "cup", pronunciation: "kʌp", translation: "piyola" },
    { word: "star", pronunciation: "stɑːr", translation: "yulduz" },
    { word: "wolf", pronunciation: "wʊlf", translation: "bo‘ri" },
    { word: "book", pronunciation: "bʊk", translation: "kitob" },
    { word: "kiwi", pronunciation: "ˈkiːwi", translation: "kivi" },
    { word: "spoon", pronunciation: "spuːn", translation: "qoshiq" },
    { word: "lesson", pronunciation: "ˈlesən", translation: "dars" },
    { word: "ball", pronunciation: "bɔːl", translation: "koptok, to‘p" },
    { word: "stick", pronunciation: "stɪk", translation: "hassa" },
    { word: "letter", pronunciation: "ˈletər", translation: "harf" },
    { word: "jam", pronunciation: "dʒæm", translation: "murabbo" },
    { word: "pencil", pronunciation: "ˈpensl", translation: "qalam" },
    { word: "table", pronunciation: "ˈteɪbl", translation: "stol" },
    { word: "forest", pronunciation: "ˈfɔːrɪst", translation: "o‘rmon" },
    { word: "bin", pronunciation: "bɪn", translation: "axlat chelak" },
    { word: "fast food", pronunciation: "fæst fuːd", translation: "tez tayyor bo‘ladigan ovqat" },
    { word: "spring", pronunciation: "sprɪŋ", translation: "bahor" },
    { word: "toy", pronunciation: "tɔɪ", translation: "o‘yinchoq" },
    { word: "car", pronunciation: "kɑːr", translation: "mashina" },
    { word: "doll", pronunciation: "dɒl", translation: "qo‘g‘irchoq" },
    { word: "word", pronunciation: "wɜːrd", translation: "so‘z" },
    { word: "meat", pronunciation: "miːt", translation: "go‘sht" },
    { word: "pot", pronunciation: "pɒt", translation: "qozon" }
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