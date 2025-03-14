const words = [
    { word: "ill", pronunciation: "ɪl", translation: "kasal" },
    { word: "polite", pronunciation: "pəˈlaɪt", translation: "odobli" },
    { word: "ugly", pronunciation: "ˈʌɡli", translation: "xunuk" },
    { word: "handsome", pronunciation: "ˈhænsəm", translation: "kelishgan" },
    { word: "pretty", pronunciation: "ˈprɪti", translation: "chiroyli" },
    { word: "tall", pronunciation: "tɔːl", translation: "novcha" },
    { word: "thin", pronunciation: "θɪn", translation: "oriq, nozik" },
    { word: "busy", pronunciation: "ˈbɪzi", translation: "band" },
    { word: "fat", pronunciation: "fæt", translation: "semiz" },
    { word: "boring", pronunciation: "ˈbɔːrɪŋ", translation: "zerikarli" },
    { word: "sad", pronunciation: "sæd", translation: "g‘amgin" },
    { word: "short", pronunciation: "ʃɔːrt", translation: "pakana" },
    { word: "foolish", pronunciation: "ˈfuːlɪʃ", translation: "ahmoq" },
    { word: "gentle", pronunciation: "ˈdʒɛntl", translation: "yuvosh" },
    { word: "strong", pronunciation: "strɒŋ", translation: "kuchli" },
    { word: "black", pronunciation: "blæk", translation: "qora" },
    { word: "red", pronunciation: "red", translation: "qizil" },
    { word: "poor", pronunciation: "pʊr", translation: "kambag‘al" },
    { word: "positive", pronunciation: "ˈpɒzɪtɪv", translation: "pozitiv" },
    { word: "happy", pronunciation: "ˈhæpi", translation: "baxtli, xursand" },
    { word: "rich", pronunciation: "rɪtʃ", translation: "boy" },
    { word: "calm", pronunciation: "kɑːm", translation: "bosiq" },
    { word: "good", pronunciation: "ɡʊd", translation: "yaxshi" },
    { word: "sly", pronunciation: "slaɪ", translation: "ayyor" },
    { word: "angry", pronunciation: "ˈæŋɡri", translation: "jaxldor" },
    { word: "wise", pronunciation: "waɪz", translation: "dono" },
    { word: "brave", pronunciation: "breɪv", translation: "jasur, mard" },
    { word: "new", pronunciation: "njuː", translation: "yangi" },
    { word: "smart", pronunciation: "smɑːrt", translation: "ziyrak" },
    { word: "bad", pronunciation: "bæd", translation: "yomon" }
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