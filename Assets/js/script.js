var scoreEl = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var input = document.getElementById("textinput");
var startBtn = document.getElementById("startbutton");
var resultMsg = document.getElementById("message");
var choice1ht = document.querySelectorAll(".choice1");
// var choice2ht = document.getElementById("choice2");
// var choice3ht = document.getElementById("choice3");
var choices = document.getElementById("choices");
var j = 0;
var i = 0;


var questionList = [
    {
        question: "What is the name of our instructor ?",
        answers:[
            {
                text: "Brian",
                correct: true
            },
            {
                text: "Jane",
                correct: false
            },
            {
                text: "Tom",
                correct: false
            },
        ]
    },
    {
        question: "What is the name of our instructor ?",
        answers:[
            {
                text: "Brian",
                correct: true
            },
            {
                text: "Jane",
                correct: false
            },
            {
                text: "Tom",
                correct: false
            },
        ]
    }
];

// var quiz =[{
//     question:"What is the name of our instructor ?",
//     choice1:"Brian",
//     choice2:"Jane",
//     choice3:"Tom",
//     correctAnswer:"Brian",
// }];

 var countdown = function(){
     var timeleft = 100;
     var timeInterval = setInterval(function(){
         timeleft--;
         timerEl.textContent = timeleft + " seconds";
         if(timeleft === 0){
             clearInterval(timeInterval);
             timerEl.style.display = "none";
         };
     },1000);
 };


 var displayQs = function(){
    input.textContent = questionList[j].question;
    choices.style.display = "block";
    for (var i=0;i<questionList[j].answers.length; i++){
        choice1ht.textContent=questionList[j].answers[i].text;
    }
 };


function answerCheck(){
    if(questionList[j].correctAnswer){
        console.log(correctAnswer);
        resultMsg.textContent = "Correct!!";
    }
    displayQs();
};


startBtn.addEventListener("click",function(){
     startBtn.style.display = "none";
     displayQs();
     countdown();
 });

choices.addEventListener("click",function(){
    answerCheck();
    console.log("click");
});
