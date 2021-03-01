var scoreEl = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var input = document.getElementById("textinput");
var startBtn = document.getElementById("startbutton");
var resultMsg = document.getElementById("message");
var choices = document.getElementById("choices");
var title = document.getElementById("title");
var form = document.getElementById("resultrecorder");
var submitBtn = document.getElementById("submitbtn");
var scorePage = document.getElementById("highrecord");
var userInitial = document.querySelector("#user-initial");
var resetBtn = document.getElementById("reset");
var clearBtn = document.getElementById("clear");
var storage = document.getElementById("clearStrg");
var questioncount = 0;
var score = 0;
var timeleft = 100;

var quizList = [
    {
        question: "What do you use to build website structure ?",
        answer: ["HTML", "CSS", "Javascript"],
        correctAnswer: "HTML",
    },
    {
        question: "Who is our instructor ?",
        answer: ["Brian", "Tom", "Jan"],
        correctAnswer: "Brian",
    },
    {
        question: "What is var stands for ?",
        answer: ["Loop", "Variable", "Syntax"],
        correctAnswer: "Variable",
    },
    {
        question: "which of the following syntax is function ?",
        answer: ["Let", "Const", "timeInterval()"],
        correctAnswer: "timeInterval()",
    },
    {
        question: "What are the ways to layout your page ?",
        answer: ["Flexbox", "Bootstrap", "All above"],
        correctAnswer: "All above",
    }];

initialInput();

var countdown = function () {
    timeInterval = setInterval(function () {
        if (timeleft > 0) {
            timeleft--;
            timerEl.textContent = timeleft + " seconds";
            // if (timeleft === 0) {
            //     clearInterval(timeInterval);
            //     timerEl.style.display = "none"
            // };
        } else {
            timerFinish();
            quizOver();
        };

    }, 1000);
};

function timerFinish(){
    clearInterval(timeInterval);
    timerEl.textContent = "Count Down Ends.";
}

var displayQs = function () {
    resultMsg.textContent = "";
    var entireQuestion = quizList[questioncount];

    input.textContent = entireQuestion.question;

    choices.innerHTML = "";

    for (var i = 0; i < entireQuestion.answer.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", entireQuestion.answer[i]);
        choiceBtn.setAttribute("class", "btns")
        choiceBtn.textContent = entireQuestion.answer[i];
        choiceBtn.onclick = answerCheck;
        choices.appendChild(choiceBtn);
    }
};

function highScore() {
    scoreEl.textContent = "Score: " + score;
};

function answerCheck() {
    console.log(quizList[questioncount].correctAnswer);
    if (this.value !== quizList[questioncount].correctAnswer) {
        // resultMsg.textContent = "Wrong!!";
        timeleft -= 20;
    } else if (this.value === quizList[questioncount].correctAnswer) {
        // resultMsg.textContent = "Correct!!";
        score += 20;
        scoreEl.textContent = "Score: "+ score;
    }
    questioncount++;
    if (questioncount === quizList.length) {
        quizOver();
        timerFinish();
    } else {
        displayQs();
    }
};

function quizOver() {
    clearInterval(timeInterval);
    title.textContent = "Quiz Over!!"
    input.style.display = "none";
    choices.style.display = "none";
    form.removeAttribute("style", "block");
    highScore();
}

function initialInput() {
    var initial = localStorage.getItem("initial");

    if (!initial) {
        return;
    }
    userInitial.textContent = initial + ", Score: " + score;
}

function setInitial(){
    var initial = document.querySelector("#record").value;

    if (initial === "") {
        displayMessage("error", "initial cannot be blank");
    } else {
        displayMessage("success", "Input successfully");

        localStorage.setItem("initial", initial);
        initialInput();
    };
}

function displayMessage(type, message) {
    resultMsg.textContent = message;
    resultMsg.setAttribute("class", type);
}

function restart(){
    clearInterval(timeInterval);
    score = 0;
    questioncount = 0;
    timeleft = 100;
}


startBtn.addEventListener("click", function () {
    startBtn.style.display = "none";
    choices.style.display = "block";
    displayQs();
    countdown();
});

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scorePage.style.display = "block";
    form.style.display = "none";
    title.style.display = "none";
    clearBtn.style.display = "block";
    resetBtn.style.display = "block";
    setInitial();
})

clearBtn.addEventListener("click",function(){
    restart();
    localStorage.clear();
    storage.style.display = "none";
    resultMsg.style.display = "none";
})

resetBtn.addEventListener("click",function(){
    resetBtn.style.display = "none";
    clearBtn.style.display = "none";
    scorePage.style.display = "none";
    resultMsg.style.display = "none";
    title.style.display = "block";
    input.style.display = "block";
    startBtn.style.display = "block";
    title.textContent = "Code Quiz!!";
    scoreEl.textContent = "Score Result";
    timerEl.textContent = "Timer";
    input.textContent = "This is a quiz to quiz your knowledge of our class :)";
    restart();
})
