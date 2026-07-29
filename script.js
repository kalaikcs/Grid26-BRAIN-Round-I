// ===============================
// MEMORY CHALLENGE GAME
// script.js
// ===============================

// 30 Words

const words = [

"Apple","Book","Car","Dog","Elephant",
"Flower","Guitar","House","Ice","Jacket",
"Laptop","Mobile","Table","Chair","Bottle",
"Clock","Window","Pencil","School","Garden",
"Computer","River","Mountain","Camera",
"Telephone","Television","Keyboard",
"Mouse","Hospital","Rainbow"

];

let gameWords = [];

let memorizeTime = 60;

let answerTime = 120;

// -----------------------------

const rulesPage = document.getElementById("rulesPage");
const registerPage = document.getElementById("registerPage");
const gamePage = document.getElementById("gamePage");
const answerPage = document.getElementById("answerPage");
const resultPage = document.getElementById("resultPage");

// -----------------------------
// RULES → REGISTER
// -----------------------------

document.getElementById("showRegister").onclick = function(){

    rulesPage.style.display = "none";

    registerPage.style.display = "block";

};

// -----------------------------
// REGISTRATION
// -----------------------------

document.getElementById("registerForm").addEventListener("submit", function(e){

    e.preventDefault();

    document.getElementById("playerName").innerHTML =
        document.getElementById("name").value;

    document.getElementById("playerClass").innerHTML =
        document.getElementById("class").value;

    document.getElementById("playerSystem").innerHTML =
        document.getElementById("systemNo").value;

    registerPage.style.display = "none";

    gamePage.style.display = "block";

    startGame();

});

// -----------------------------
// SHUFFLE WORDS
// -----------------------------

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        let j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

// -----------------------------
// START GAME
// -----------------------------

function startGame(){

    gameWords=[...words];

    shuffle(gameWords);

    document.getElementById("wordBox").innerHTML=
        gameWords.join(", ");

    memorizeTimer();

}

// -----------------------------
// MEMORIZE TIMER
// -----------------------------

function memorizeTimer(){

    const timer=document.getElementById("timer");

    let interval=setInterval(function(){

        let min=Math.floor(memorizeTime/60);

        let sec=memorizeTime%60;

        timer.innerHTML=
            "🧠 Memorize : "+
            String(min).padStart(2,"0")+":"+
            String(sec).padStart(2,"0");

        memorizeTime--;

        if(memorizeTime<0){

            clearInterval(interval);

            gamePage.style.display="none";

            answerPage.style.display="block";

            answerTimer();

        }

    },1000);

}

// -----------------------------
// ANSWER TIMER
// -----------------------------

function answerTimer(){

    const timer=document.getElementById("answerTimer");

    let interval=setInterval(function(){

        let min=Math.floor(answerTime/60);

        let sec=answerTime%60;

        timer.innerHTML=
            "✍ Answer : "+
            String(min).padStart(2,"0")+":"+
            String(sec).padStart(2,"0");

        answerTime--;

        if(answerTime<0){

            clearInterval(interval);

            calculateScore();

        }

    },1000);

}

// -----------------------------
// SUBMIT BUTTON
// -----------------------------

document.getElementById("submitBtn").onclick=function(){

    calculateScore();

};

// -----------------------------
// SCORE
// -----------------------------

function calculateScore(){

    answerPage.style.display="none";

    resultPage.style.display="block";

    let input=document.getElementById("answerBox").value
        .toLowerCase();

    let answers=input
        .split(",")

        .map(w=>w.trim())

        .filter(w=>w!="");

    answers=[...new Set(answers)];

    let score=0;

    gameWords.forEach(function(word){

        if(answers.includes(word.toLowerCase())){

            score++;

        }

    });

    document.getElementById("scoreText").innerHTML=

        "Your Score : "+score+" / 30";

    let msg="";

    if(score>=18){

        msg="🌟 Excellent Memory!";

    }

    else if(score>=14){

        msg="👏 Very Good!";

    }

    else if(score>=10){

        msg="👍 Good Job!";

    }

    else{

        msg="💪 Keep Practicing!";

    }

    document.getElementById("performance").innerHTML=msg;

}