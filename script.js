// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const gameTime = document.getElementById ("gameTime");


//Gametime
// var gameTime = 180;
// function tick(){
//   console.log('tick');
//   gameTime -= 1;
//   if(gameTime === 0){ 
//     alert('Boom');
//   } else {
//     document.body.innerHTML = gameTime;
//     window.setTimeout(tick, 1000);
//   }
// };

// create our questions
let questions = [
    {
        question : "Which country hosted the 1994 FIFA World Cup?",
        imgSrc : "images/worldcup1994.jpg",
        choiceA: "Brazil",
        choiceB: "South Africa",
        choiceC: "United States",
        choiceD: "England",
        correct: "C"

    },{
        question: "What country does Christiano Ronaldo plays for?",
        imgSrc: "images/ronaldo.jpg",
        choiceA: "France",
        choiceB: "Portugal",
        choiceC: "Brazil",
        choiceD: "Argentina",
        correct: "B"

    },{
        question: "Who was the only African player voted as the world's best soccer player?",
        imgSrc: "images/weah.jpeg",
        choiceA: "Roger Milla",
        choiceB: "Abedi Pele",
        choiceC: "George Weah",
        choiceD: "Samuel Eto",
        correct: "C"

    },{
        question: "What's a brace?",
        imgSrc: "images/brace.jpg",
        choiceA: "Scored 1 goal",
        choiceB: "Scored 2 goals",
        choiceC: "Scored 3 goals",
        choiceD: "Scored 4 goals",
        correct: "B"

    },{
        question: "What's a hat-trick?",
        imgSrc: "images/hattrick.jpg",
        choiceA: "Scored 1 goal",
        choiceB: "Scored 2 goals",
        choiceC: "Scored 3 goals",
        choiceD: "Scored 4 goals",
        correct: "C"

    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const secondsLeft = 60; // 60s
const gaugeWidth = 300; // 150px
const gaugeUnit = gaugeWidth / secondsLeft;
let TIMER = setInterval(renderCounter,1000); // 1000ms = 1s;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= secondsLeft){
        counter.innerHTML = count;
        timeGauge.style.width = count ;
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // Image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "images/goldtrophy.jpeg" :
              (scorePerCent >= 60) ? "images/silvertrophy.jpg"  :
              (scorePerCent >= 40) ? "images/goldenboots.jpg" :
              (scorePerCent >= 20) ? "images/goldengloves.jpg" :
              (scorePerCent <= 20) ? "images/4thplacemedal.jpg" :
              "";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


