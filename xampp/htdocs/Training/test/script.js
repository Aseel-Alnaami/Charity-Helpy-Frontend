
// fetch("data.json")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(jsonData) {
//         data = jsonData;
//         fillTable();
//     })
//     .catch(function(error) {
//         console.error('Error fetching the JSON data:', error);
//     });


    //////////////

const question = [
    {
        "Question": "What value is given for the left margin: margin: 5px 10px 3px 8px?",
        "Answers": [
            {"text": "5px", "YON": "False"},
            {"text": "10px", "YON": "False"},
            {"text": "3px", "YON": "False"},
            {"text": "8px", "YON": "True"}
        ]
    },
    {
        "Question": "Inside which HTML element do we put the JavaScript?",
        "Answers": [
            {"text": "script", "YON": "True"},
            {"text": "JS", "YON": "False"},
            {"text": "link", "YON": "False"},
            {"text": "html", "YON": "False"}
        ]
    },
    {
        "Question": "Which doctype is correct for HTML5?",
        "Answers": [
            {"text": "!DOCTYPE HTML5", "YON": "False"},
            {"text": "!DOCTYPE html", "YON": "True"},
            {"text": "!DOCTYPE", "YON": "False"},
            {"text": "HTML", "YON": "False"}
        ]
    },
    {
        "Question": "The # symbol specifies that the selector is?",
        "Answers": [
            {"text": "tag", "YON": "False"},
            {"text": "first", "YON": "False"},
            {"text": "class", "YON": "False"},
            {"text": "id", "YON": "True"}
        ]
    },
    {
        "Question": "How can you print information to the console?",
        "Answers": [
            {"text": "console(info)", "YON": "False"},
            {"text": "print(info)", "YON": "False"},
            {"text": "console.log(info)", "YON": "True"},
            {"text": "console.info", "YON": "False"}
        ]
    }
];

const qelement = document.getElementById("question");
const answerbtn = document.getElementById("answers");
const nbttn = document.getElementById("Nbttn");

let currentQ = 0;
let scor = 0;

function startQuiz() {
    currentQ = 0;
    scor = 0;
    nbttn.innerHTML = "Next";
    desplyquiz();
}
// to remove all preveus answer 

function reststate() {
    nbttn.style.display = "none";
    while (answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function desplyquiz() {
    reststate();
    let currentQuestion = question[currentQ];//0
    let qnum = currentQ + 1;
    qelement.innerHTML = qnum + ". " + currentQuestion.Question;//1.2 ----------


    currentQuestion.Answers.forEach(answer => {
        const button = document.createElement("button");//create btn
        button.innerHTML = answer.text; //DATA
        button.classList.add("bttn");
        answerbtn.appendChild(button);//desply this in the html page

        if (answer.YON === "True") {
            button.dataset.YON = answer.YON;
        }

        button.addEventListener("click", selectans);// selectans is fun
    });
}

function selectans(a) {
    const selectbtn = a.target;
    const isYON = selectbtn.dataset.YON === "True";
    if (isYON) {
        selectbtn.classList.add("correct");
        scor++;
    } else {
        selectbtn.classList.add("incorrect");
    }

        // ceack in the answers 

    Array.from(answerbtn.children).forEach(button => {
        if (button.dataset.YON === "True") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nbttn.style.display = "block";
}

function showscor() {
    reststate();
    qelement.innerHTML = `You scored ${scor} out of ${question.length}!`;
    nbttn.innerHTML = "Play Again";
    nbttn.style.display = "block";
}

function handleNextbut() {
    currentQ++;
    if (currentQ < question.length) {
        desplyquiz();
    } else {
        showscor();
    }
}

nbttn.addEventListener("click", () => {
    if (currentQ < question.length) {
        handleNextbut();
    } else {
        startQuiz();
    }
});

startQuiz();
