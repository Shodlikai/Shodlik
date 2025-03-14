const words = [
    { word: "zebra", translation: "zebra" },
    { word: "horse", translation: "ot" },
    { word: "desk", translation: "parta" },
    { word: "cap", translation: "kepka" },
    { word: "bag", translation: "sumka" },
    { word: "phone", translation: "telefon" },
    { word: "wall", translation: "devor" },
    { word: "cup", translation: "piyola" },
    { word: "star", translation: "yulduz" },
    { word: "wolf", translation: "bo‘ri" },
    { word: "book", translation: "kitob" },
    { word: "kiwi", translation: "kivi" },
    { word: "spoon", translation: "qoshiq" },
    { word: "lesson", translation: "dars" },
    { word: "ball", translation: "koptok, to‘p" },
    { word: "stick", translation: "hassa" },
    { word: "letter", translation: "harf" },
    { word: "jam", translation: "murabbo" },
    { word: "pencil", translation: "qalam" },
    { word: "table", translation: "stol" },
    { word: "forest", translation: "o‘rmon" },
    { word: "bin", translation: "axlat chelak" },
    { word: "fast food", translation: "tez tayyor bo‘ladigan ovqat" },
    { word: "spring", translation: "bahor" },
    { word: "toy", translation: "o‘yinchoq" },
    { word: "car", translation: "mashina" },
    { word: "doll", translation: "qo‘g‘irchoq" },
    { word: "word", translation: "so‘z" },
    { word: "meat", translation: "go‘sht" },
    { word: "pot", translation: "qozon" }
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