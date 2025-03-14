const words = [
  { word: "flower", pronunciation: "ˈflaʊ.ər", translation: "gul" },
  { word: "story", pronunciation: "ˈstɔː.ri", translation: "hikoya" },
  { word: "plane", pronunciation: "pleɪn", translation: "samolyot" },
  { word: "train", pronunciation: "treɪn", translation: "poyezd" },
  { word: "fig", pronunciation: "fɪɡ", translation: "anjir" },
  { word: "watermelon", pronunciation: "ˈwɔː.təˌmel.ən", translation: "tarvuz" },
  { word: "seed", pronunciation: "siːd", translation: "urug‘" },
  { word: "plant", pronunciation: "plænt", translation: "o‘simlik" },
  { word: "bookshelf", pronunciation: "ˈbʊk.ʃelf", translation: "kitob javoni" },
  { word: "printer", pronunciation: "ˈprɪn.tər", translation: "printer" },
  { word: "shirt", pronunciation: "ʃɜːrt", translation: "ko‘ylak" },
  { word: "grape", pronunciation: "ɡreɪp", translation: "uzum" },
  { word: "hummingbird", pronunciation: "ˈhʌm.ɪŋ.bɜːrd", translation: "kolibri" },
  { word: "duck", pronunciation: "dʌk", translation: "o‘rdak" },
  { word: "goose", pronunciation: "ɡuːs", translation: "g‘oz" },
  { word: "gift", pronunciation: "ɡɪft", translation: "sovg‘a" },
  { word: "factory", pronunciation: "ˈfæk.tər.i", translation: "zavod" },
  { word: "photo", pronunciation: "ˈfoʊ.toʊ", translation: "rasm" },
  { word: "tooth", pronunciation: "tuːθ", translation: "tish" },
  { word: "dragon", pronunciation: "ˈdræɡ.ən", translation: "ajdaho" },
  { word: "fat", pronunciation: "fæt", translation: "semiz" },
  { word: "child", pronunciation: "tʃaɪld", translation: "bola" },
  { word: "truck", pronunciation: "trʌk", translation: "yuk mashinasi" },
  { word: "map", pronunciation: "mæp", translation: "xarita" },
  { word: "lolly", pronunciation: "ˈlɒl.i", translation: "xo‘rozqand" },
  { word: "fly", pronunciation: "flaɪ", translation: "pashsha" },
  { word: "umbrella", pronunciation: "ʌmˈbrel.ə", translation: "soyabon" }
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