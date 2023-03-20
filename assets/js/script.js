// This is declaring variables and assigning them to the elements in the HTML. */
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('time-left');
const questionContainer = document.getElementById('question-container');
const gameOver = document.getElementById('game-over');
const scoreDisplay = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');

let timeLeft = 100;
let timer;
let questionIndex = 0;
let score = 0;

// Questions assigned to an array. */
const questions = [
  {
    question: "In Season 3's 'Flaming Moe's,' what was the secret ingredient in the Flaming Moe/Homer cocktail?",
    answers: [
      "Gasoline", 
      "Tabasco sauce",
      "Cough syrup", 
      "Worcestershire sauce"],
    correctAnswer: 2
  },  {
    question: "In Season 6's 'Who Shot Mr. Burns? (Part One),' what item does Mr. Burns give to the school as a 'slant-drilling' compensation?",
    answers: [ 
      "A diorama of Springfield",
      "A giant 3D model of the oil derrick",
      "A set of encyclopedias",
      "A lifetime supply of oil"],
      correctAnswer: 2,
  },{
    question: "In Season 8's 'You Only Move Twice,' what is the name of Homer's new boss at the Globex Corporation?",
    answers: [
    "Hank Scorpio",
    "Max Power",
    "Lyle Lanley",
    "Karl Wiedergott"],
    correctAnswer: 0,
  },{
    question: "In Season 9's 'The Cartridge Family,' which amendment does Homer use to justify owning a gun?",
    answers: [
    "1st Amendment",
    "2nd Amendment",
    "5th Amendment",
    "10th Amendment"],
    correctAnswer: 1,
  },{
    question: "In Season 5's 'Rosebud,' what is the name of Mr. Burns' beloved childhood teddy bear?",
    answers: [
    "Booboo",
    "Bobo",
    "Beary",
    "Snuggles"],
    correctAnswer: 1,
  },{
    question: "In Season 7's 'Radioactive Man,' what is the name of the superhero's sidekick?",
    answers: [
    "Fallout Boy",
    "Radioactive Lad",
    "Atomic Boy",
    "Gamma Kid"],
    correctAnswer: 0,
  },{
    question: "In Season 10's 'Homer to the Max,' what TV character shares Homer's name and prompts him to change his name to Max Power?",
    answers: [
    "Police Chief Simpson",
    "Private Detective Simpson",
    "Doctor Simpson",
    "Lawyer Simpson"],
    correctAnswer: 0,
  },{
    question: "In Season 11's 'Behind the Laughter,' the show presents a fictionalized backstory for The Simpsons. What state is their hometown in this episode?",
    answers: [
    "Kentucky",
    "Oregon",
    "Missouri",
    "North Takoma"],
    correctAnswer: 3,
  },{
    question: "In Season 4's 'Marge vs. the Monorail,' what famous Star Treck actor guest stars?",
    answers: [
    "Leonard Nimoy",
    "William Shatner",
    "Nichelle Nichols",
    "George Takei"],
    correctAnswer: 0,
  },{
    question: "In Season 3's 'Bart the Murderer,' which organized crime boss does Bart inadvertently start working for?",
    answers: [
    "Fat Tony",
    "Legs",
    "Louie",
    "Johnny Tightlips"],
    correctAnswer: 0,
  }
];

//This is adding an event listener to the start button and the save score button. */
startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);


//The startQuiz function hides the start button, starts the timer, and displays the first question

function startQuiz() {
  startButton.style.display = 'none';
  timer = setInterval(updateTimer, 1000);
  displayQuestion();
}


//The function updateTimer() decreases the timeLeft variable by 1 second,

function updateTimer() {
  timeLeft = timeLeft - 1;
  timerDisplay.textContent = timeLeft;
  
//When the time hits 0, it calls the endGame() function.
  if (timeLeft <= 0) {
    endGame();
  }
}

// This is checking how many questions are in the array and creates a button for each choice
function displayQuestion() {
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[questionIndex];
  questionContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;
  currentQuestion.answers.forEach(function(answer,index){
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => checkAnswer(index));
    questionContainer.appendChild(button);
  });
}


//If the answer is correct, then the score increases by 1. If the answer is incorrect then the time is decreases by 10
function checkAnswer(answerIndex) {
  if (answerIndex === questions[questionIndex].correctAnswer) {
    score++;
  } else {
    timeLeft = timeLeft - 10;
  }

  questionIndex = questionIndex + 1;
  questionContainer.innerHTML = '';
  displayQuestion();
}


//The endGame function clears the timer, hides the question container, and displays the score.
function endGame() {
  clearInterval(timer);
  questionContainer.style.display = 'none';
  gameOver.removeAttribute('hidden');
  scoreDisplay.textContent = score;
}


//We get the initials from the input, then get the high scores from local storage, create a new score object, add it to the high scores array, and then save
function saveScore() {
  const initials = initialsInput.value.trim();

  console.log(initials)

  if (!initials) {
    return;
  }
  
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const newScore = { initials: initials, score: timeLeft };
  highScores.push(newScore);
  // highScores.sort(function(a, b) {
  // return b.score - a.score;
  // });

  // highScores.splice(5);
  localStorage.setItem('highScores', JSON.stringify(highScores));


  
}

// Redirect or show a message after saving the score