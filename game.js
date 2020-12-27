const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question: 'Which of the following is not JavaScript Data Types?',
        choice1: 'Undefined',
        choice2: 'Number',
        choice3: 'Boolean',
        choice4: 'Float',
        answer: 4,
    },

    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<head>',
        choice3: '<meta>',
        choice4: '<style>',
        answer: 1,
    },

    {
        question: 'Which of the following is the correct syntax to display "Letsfindcourse" in an alert box using JavaScript?',
        choice1: "alert-box('Letsfindcourse');",
        choice2: "confirm('Letsfindcourse');",
        choice3: "msgbox('Letsfindcourse');",
        choice4: "alert('Letsfindcourse');",
        answer: 4,
    },

    {
        question: 'The ___ method of an Array object adds and/or removes elements from an array.',
        choice1: 'slice',
        choice2: 'shift',
        choice3: 'splice',
        choice4: 'reverse',
        answer: 3,
    },

    {
        question: 'Among the following, which one is a ternary operator in JavaScript?',
        choice1: '#',
        choice2: ':',
        choice3: '&',
        choice4: '?',
        answer: 4,
    },

    {
        question: 'Which of them is not the looping structures in JavaScript?',
        choice1: 'for',
        choice2: 'while',
        choice3: 'forwhich',
        choice4: 'dowhile',
        answer: 3,
    },

    {
        question: 'What are the types of Pop up boxes available in JavaScript?',
        choice1: 'Alert',
        choice2: 'Prompt',
        choice3: 'Confirm',
        choice4: 'All of the above',
        answer: 4,
    },

    {
        question: 'Which of the following function of the String object returns the character in the string starting at the specified position via the specified position via the specified number of characters?',
        choice1: 'split()',
        choice2: 'substr()',
        choice3: 'search()',
        choice4: 'slive()',
        answer: 2,
    }

]

const score_points = 1
const max_questions = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions] //all the questions value
    getNewQuestions()
}


getNewQuestions = () => {
    if(availableQuestion.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')//Keep track the score
    }


    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${max_questions}`
    
    // Keep track where the question we are on
    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    question.innerText = currentQuestion.question

    //To know what choice we are clicking on
    choices.forEach(choice => {
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//Begin new question
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        //If the answer correct (true) we're gonna say toggle the correct CSS the green if incorrect (false) will be red. 
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if (classToApply === 'correct') {
            incrementScore(score_points) // When the user have a correct answer, the point will added or increase
    }

        selectedChoice.parentElement.classList.add(classToApply)

        //When we do click on the question right or wrong it'll have time to show us
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)

            getNewQuestions()

        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame() //call the function again



