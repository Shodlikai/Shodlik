const words = [
    { word: "pilot", translation: "uchuvchi" },
    { word: "driver", translation: "haydovchi" },
    { word: "butcher", translation: "qassob" },
    { word: "barber", translation: "sartarosh" },
    { word: "dancer", translation: "raqqos" },
    { word: "dentist", translation: "tish shifokori" },
    { word: "singer", translation: "qo‘shiqchi" },
    { word: "doctor", translation: "shifokor" },
    { word: "builder", translation: "quruvchi" },
    { word: "shepherd", translation: "cho‘pon" },
    { word: "teacher", translation: "o‘qituvchi" },
    { word: "pupil", translation: "o‘quvchi" },
    { word: "banker", translation: "bankir" },
    { word: "librarian", translation: "kutubxonachi" },
    { word: "gardener", translation: "bog‘bon" },
    { word: "farmer", translation: "fermer" },
    { word: "seller", translation: "sotuvchi" },
    { word: "buyer", translation: "xaridor" },
    { word: "coach", translation: "murabbiy" },
    { word: "chef", translation: "bosh oshpaz" },
    { word: "judge", translation: "sudya" },
    { word: "nurse", translation: "hamshira" },
    { word: "baker", translation: "novvoy" },
    { word: "painter", translation: "bo‘yoqchi" },
    { word: "artist", translation: "rassom" },
    { word: "architect", translation: "arxitektor" },
    { word: "actor", translation: "aktyor" },
    { word: "cleaner", translation: "farrosh" },
    { word: "waiter", translation: "ofitsiant" },
    { word: "welder", translation: "payvandchi" }
];

let remainingWords = [...words]; 
let currentWord = null;
let totalAttempts = 0;
let correctAnswers = 0;
let timeLeft = 15;
let timer;
let timeMode = false;
let attemptsLeft = 2; // Har bir so‘z uchun 2 urinish

// **So‘zni yuklash**
function loadWord() {
    clearInterval(timer);

    if (remainingWords.length === 0) {
        remainingWords = [...words]; // So‘zlar tugasa, qayta boshlanadi
    }

    currentWord = remainingWords.pop();
    attemptsLeft = 2; // Har bir yangi so‘z uchun urinishlarni qayta o‘rnatamiz

    document.getElementById("question").innerText = `"${currentWord.translation}" so‘zining inglizchasini yozing`;
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";

    if (timeMode) startTimer();
}

// **Taymer boshlash**
function startTimer() {
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

// **Javobni Enter bilan tekshirish**
document.getElementById("answer").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// **Javobni tekshirish**
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    
    totalAttempts++;

    if (userAnswer === currentWord.word) {
        correctAnswers++;

        document.getElementById("result").innerText = "✅ To‘g‘ri!";
        document.getElementById("result").style.color = "green";

        updateStats();

        setTimeout(() => {
            loadWord(); // Yangi so‘z avtomatik chiqadi
        }, 1000);
    } else {
        attemptsLeft--;

        if (attemptsLeft > 0) {
            document.getElementById("result").innerText = `❌ Xato! Yana urinib ko‘ring (${attemptsLeft} ta imkoniyat qoldi)`;
            document.getElementById("result").style.color = "red";
        } else {
            showCorrectAnswer();
        }
    }
}

// **To‘g‘ri javobni ko‘rsatish**
function showCorrectAnswer() {
    clearInterval(timer);
    document.getElementById("result").innerText = `ℹ️ To‘g‘ri javob: ${currentWord.word}`;
    document.getElementById("result").style.color = "blue";

    setTimeout(() => {
        loadWord();
    }, 2000);
}

// **Statistikani yangilash**
function updateStats() {
    let percentage = totalAttempts > 0 ? ((correctAnswers / totalAttempts) * 100).toFixed(2) : 0;
    document.getElementById("attempts").innerText = totalAttempts;
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("percentage").innerText = percentage + "%";
}

// **Time Mode toggleni sozlash**
document.getElementById("toggleMode").addEventListener("click", function() {
    timeMode = !timeMode;
    const elements = document.getElementById("timeModeElements");

    if (timeMode) {
        elements.style.display = "block";
        this.innerText = "⏳ Time Mode: Yoqilgan";
    } else {
        elements.style.display = "none";
        this.innerText = "⏳ Time Mode: O‘chiq";
    }
});

// **O‘yinni boshlash**
loadWord();