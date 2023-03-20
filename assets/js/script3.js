var mainEl = document.querySelector('main')
var startBtnEl = document.querySelector('#start-btn')
var timerEl = document.querySelector('#time-el')

var interval; 
var time = 100
var questionIndex = 0

var question = [
  {
    questionText: "What is your favorite color?",
    questionChoices: ["red", "white", "blue"],
    correctAnswer: 0
  },
  {
    questionText: "What is your favorite food?",
    questionChoices: ["ice cream", "pizza", "pasta"],
    correctAnswer: 1
  }
]

function displayQuestion() {
mainEl.innerHTML = "";

var h1El = document.getElementById('h1');
h1El.textContent = question[questionIndex].questionText
mainEl.appendChild(h1El)

var btnDivEl = document.createElement('div')
mainEl.appendChild(btnDiv)

btnDivEl.addEventListener("click",function (event){
  var target = event.target

})

for (var i = 0; i < question[questionIndex].questionChoices.length; i++){
  var buttonEl = document.createElement('button')
  buttonEl.textContent = question[questionIndex].questionChoices[i]
  buttonEl.setAttribute('class', 'btn')
  buttonEl.setAttribute('data-index', i)
  btnDivEl.appendChild(buttonEl)
}

//question[questionIndex].questionChoices
}

startBtnEl.addEventListener("click", function(event) {
  mainEl.innerHTML= "";

  interval = setInterval(function(){
    time--;
    timerEl.textContent = `Time: ${time}`;


    if(time <= 0) {
      clearInterval(interval)
      endGame()
      return;
    }
  }, 1000);

  displayQuestion()
})

mainEl.addEventListener('click', function(event){
  var target = event.target;

  if()

})
function endGame(){

}