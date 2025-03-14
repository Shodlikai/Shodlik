const words = [
  { word: "morning", translation: "tong" },
  { word: "leg", translation: "oyoq" },
  { word: "bird", translation: "qush" },
  { word: "boat", translation: "qayiq" },
  { word: "milk", translation: "sut" },
  { word: "street", translation: "ko‘cha" },
  { word: "day", translation: "kun" },
  { word: "wind", translation: "shamol" },
  { word: "cow", translation: "sigir" },
  { word: "water", translation: "suv" },
  { word: "egg", translation: "tuxum" },
  { word: "snow", translation: "qor" },
  { word: "rain", translation: "yomg‘ir" },
  { word: "melon", translation: "qovun" },
  { word: "rabbit", translation: "quyon" },
  { word: "wood", translation: "yog‘och" },
  { word: "sun", translation: "quyosh" },
  { word: "bread", translation: "non" },
  { word: "farm", translation: "ferma" },
  { word: "garden", translation: "bog‘" },
  { word: "trap", translation: "tuzoq" },
  { word: "prey", translation: "o‘lja" },
  { word: "dog", translation: "it" },
  { word: "reason", translation: "sabab" },
  { word: "group", translation: "guruh" },
  { word: "fox", translation: "tulki" },
  { word: "neck", translation: "bo‘yin" },
  { word: "bookmark", translation: "xatcho‘p" },
  { word: "travel", translation: "sayohat" },
  { word: "pillow", translation: "yostiq" }
]
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