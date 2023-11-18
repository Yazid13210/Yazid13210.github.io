// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Qui a réalisé le film Interstellar ?",
        imgSrc : "assets/interstellar.jpeg",
        choiceA : "Christopher Nolan",
        choiceB : "Quentin Tarantino",
        choiceC : "Stanley Kubrick",
        choiceD : "Steven Spielberg",
        correct : "A"

    },{
        question : "Quels acteurs ont joué dans le film The Dark Knight ?",
        imgSrc : "assets/batman.jpeg",
        choiceA : "Christian Bale",
        choiceB : "Heath Ledger",
        choiceC : "Tom Hardy",
        choiceD : "Robert Pattinson",
        correct : "A"
    },{
        question : "Le film Forrest Gump est basé sur une histoire vraie.",
        imgSrc : "assets/gump.jpeg",
        choiceA : "Vrai",
        choiceB : "Faux",
        choiceC : "",
        choiceD : "",
        correct : "A"
      },{
        question : "Quels acteurs a joué dans le film Ocean's Eleven?",
        imgSrc : "assets/ocean.jpeg",
        choiceA : "George Clooney ",
        choiceB : "Brad Pitt",
        choiceC : "Tom Cruise",
        choiceD : " Tom Hardy",
        correct : "A"
      },{
        question : "La série Stranger Things se déroule dans les années 1980.",
        imgSrc : "assets/stranger.jpeg",
        choiceA : "Vrai",
        choiceB : "Faux",
        choiceC : "",
        choiceD : "",
        correct : "A"
      },{
        question:  "Créateur de la série The Simpsons :",
        imgSrc : "assets/simpsons.jpeg",
        choiceA : "Seth MacFarlane",
        choiceB : "Trey Parker",
        choiceC : "Matt Stone",
        choiceD : "Matt Groening",
        correct : "D"
      },{
        question:  "Acteurs de la trilogie Le seigneur des anneaux :",
        imgSrc : "assets/lsa.jpeg",
        choiceA : " Elijah Wood ",
        choiceB : " Orlando Bloom ",
        choiceC : "Hugh Jackman",
        choiceD : "Ian McKellen ",
        correct : "A"
      },{
        question:  "Acteurs de la trilogie Matrix :",
        imgSrc : "assets/matrix.jpeg",
        choiceA : "Johnny Depp",
        choiceB : "Carrie-Anne Moss ",
        choiceC : "Laurence Fishburne",
        choiceD : "Keanu Reeves ",
        correct : "D"
      },{
        question:  "Réalisateur du film Inception :",
        imgSrc : "assets/inception.jpeg",
        choiceA : "Steven Spielberg",
        choiceB : "Quentin Tarantino",
        choiceC : "Martin Scorsese",
        choiceD : "Christopher Nolan",
        correct : "D"
      },{
        question:  "Acteurs de la série Breaking Bad :",
        imgSrc : "assets/bb.jpeg",
        choiceA : "Matthew McConaughey",
        choiceB : "Bryan Cranston",
        choiceC : "Aaron Paul",
        choiceD : "Anna Gunn ",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
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

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
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

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "assets/5.png" :
              (scorePerCent >= 60) ? "assets/4.png" :
              (scorePerCent >= 40) ? "assets/3.png" :
              (scorePerCent >= 20) ? "assets/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}