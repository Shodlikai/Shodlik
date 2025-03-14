const words = [
 { word: "ill", translation: "kasal" },
    { word: "polite", translation: "odobli" },
    { word: "ugly", translation: "xunuk" },
    { word: "handsome", translation: "kelishgan" },
    { word: "pretty", translation: "chiroyli" },
    { word: "tall", translation: "novcha" },
    { word: "thin", translation: "oriq, nozik" },
    { word: "busy", translation: "band" },
    { word: "fat", translation: "semiz" },
    { word: "boring", translation: "zerikarli" },
    { word: "sad", translation: "g‘amgin" },
    { word: "short", translation: "pakana" },
    { word: "foolish", translation: "ahmoq" },
    { word: "gentle", translation: "yuvosh" },
    { word: "strong", translation: "kuchli" },
    { word: "black", translation: "qora" },
    { word: "red", translation: "qizil" },
    { word: "poor", translation: "kambag‘al" },
    { word: "positive", translation: "pozitiv" },
    { word: "happy", translation: "baxtli, xursand" },
    { word: "rich", translation: "boy" },
    { word: "calm", translation: "bosiq" },
    { word: "good", translation: "yaxshi" },
    { word: "sly", translation: "ayyor" },
    { word: "angry", translation: "jaxldor" },
    { word: "wise", translation: "dono" },
    { word: "brave", translation: "jasur, mard" },
    { word: "new", translation: "yangi" },
    { word: "smart", translation: "ziyrak" },
    { word: "bad", translation: "yomon" }
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