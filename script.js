let cases = [];

Papa.parse("Crim Pro Cases - Quiz data(1).csv", {
download: true,
header: true,
complete: function(results) {
cases = results.data.filter(row => row.case);
showQuestion();
}
});

function getRandomCase() {
return cases[Math.floor(Math.random() * cases.length)];
}

function generateQuestion() {
const item = getRandomCase();

const types = [
"case_to_doctrine",
"doctrine_to_case",
"case_to_explanation",
"explanation_to_case"
];

const type = types[Math.floor(Math.random() * types.length)];

let questionText = "";
let correctAnswer = "";

if (type === "case_to_doctrine") {
questionText = item.case;
correctAnswer = item.doctrine;
}

if (type === "doctrine_to_case") {
questionText = item.doctrine;
correctAnswer = item.case;
}

if (type === "case_to_explanation") {
questionText = item.case;
correctAnswer = item.explanation;
}

if (type === "explanation_to_case") {
questionText = item.explanation;
correctAnswer = item.case;
}

return { questionText, correctAnswer, type, item };
}

function generateChoices(correctAnswer, type, item) {
const choices = [correctAnswer];

while (choices.length < 4) {
const randomCase = getRandomCase();

let wrongAnswer = "";

if (type === "case_to_doctrine") {
  wrongAnswer = randomCase.doctrine;

  if (randomCase.doctrine === item.doctrine) {
    continue;
  }
}

if (type === "doctrine_to_case") {
  wrongAnswer = randomCase.case;

  if (randomCase.doctrine === item.doctrine) {
    continue;
  }
}

if (type === "case_to_explanation") {
  wrongAnswer = randomCase.explanation;

  if (randomCase.explanation === item.explanation) {
    continue;
  }
}

if (type === "explanation_to_case") {
  wrongAnswer = randomCase.case;

  if (randomCase.explanation === item.explanation) {
    continue;
  }
}

if (!choices.includes(wrongAnswer)) {
  choices.push(wrongAnswer);
}

}

return choices.sort(() => Math.random() - 0.5);
}

function showQuestion() {
const q = generateQuestion();

document.getElementById("question").textContent = q.questionText;

const answersDiv = document.getElementById("answers");
answersDiv.innerHTML = "";

const choices = generateChoices(q.correctAnswer, q.type, q.item);

choices.forEach(choice => {
const btn = document.createElement("button");
btn.textContent = choice;

btn.onclick = function() {
  const allButtons = answersDiv.querySelectorAll("button");

  allButtons.forEach(b => {
    b.disabled = true;

    if (b.textContent === q.correctAnswer) {
      b.style.backgroundColor = "green";
    }
  });

  if (choice === q.correctAnswer) {
    btn.style.backgroundColor = "green";
  } else {
    btn.style.backgroundColor = "red";
  }
};

answersDiv.appendChild(btn);
answersDiv.appendChild(document.createElement("br"));

});
}

document.getElementById("next").onclick = showQuestion;
