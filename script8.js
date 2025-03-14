const words = [
    { word: "pilot", pronunciation: "ˈpaɪlət", translation: "uchuvchi" },
    { word: "driver", pronunciation: "ˈdraɪvər", translation: "haydovchi" },
    { word: "butcher", pronunciation: "ˈbʊtʃər", translation: "qassob" },
    { word: "barber", pronunciation: "ˈbɑːrbər", translation: "sartarosh" },
    { word: "dancer", pronunciation: "ˈdænsər", translation: "raqqos" },
    { word: "dentist", pronunciation: "ˈdɛntɪst", translation: "tish shifokori" },
    { word: "singer", pronunciation: "ˈsɪŋər", translation: "qo‘shiqchi" },
    { word: "doctor", pronunciation: "ˈdɑːktər", translation: "shifokor" },
    { word: "builder", pronunciation: "ˈbɪldər", translation: "quruvchi" },
    { word: "shepherd", pronunciation: "ˈʃɛpərd", translation: "cho‘pon" },
    { word: "teacher", pronunciation: "ˈtiːtʃər", translation: "o‘qituvchi" },
    { word: "pupil", pronunciation: "ˈpjuːpəl", translation: "o‘quvchi" },
    { word: "banker", pronunciation: "ˈbæŋkər", translation: "bankir" },
    { word: "librarian", pronunciation: "laɪˈbrɛriən", translation: "kutubxonachi" },
    { word: "gardener", pronunciation: "ˈɡɑːrdnər", translation: "bog‘bon" },
    { word: "farmer", pronunciation: "ˈfɑːrmər", translation: "fermer" },
    { word: "seller", pronunciation: "ˈsɛlər", translation: "sotuvchi" },
    { word: "buyer", pronunciation: "ˈbaɪər", translation: "xaridor" },
    { word: "coach", pronunciation: "koʊtʃ", translation: "murabbiy" },
    { word: "chef", pronunciation: "ʃɛf", translation: "bosh oshpaz" },
    { word: "judge", pronunciation: "dʒʌdʒ", translation: "sudya" },
    { word: "nurse", pronunciation: "nɜːrs", translation: "hamshira" },
    { word: "baker", pronunciation: "ˈbeɪkər", translation: "novvoy" },
    { word: "painter", pronunciation: "ˈpeɪntər", translation: "bo‘yoqchi" },
    { word: "artist", pronunciation: "ˈɑːrtɪst", translation: "rassom" },
    { word: "architect", pronunciation: "ˈɑːrkɪtɛkt", translation: "arxitektor" },
    { word: "actor", pronunciation: "ˈæktər", translation: "aktyor" },
    { word: "cleaner", pronunciation: "ˈkliːnər", translation: "farrosh" },
    { word: "waiter", pronunciation: "ˈweɪtər", translation: "ofitsiant" },
    { word: "welder", pronunciation: "ˈwɛldər", translation: "payvandchi" }
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