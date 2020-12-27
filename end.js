//Data
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const max_high_scores = 8

finalScore.innerText = mostRecentScore

//Listeners
username.addEventListener('keyup', () => { //whenever we press a key this essentially is going to re-enable the Save button
    saveScoreBtn.disable = !username.value
})

saveHighScore = e => { //this allow us to click the button, it doesn't just automated up 
    e.preventDefault()

const score = {
    score: mostRecentScore,
    name: username.value
}

highScores.push(score)

highScores.sort((a,b) => {
    return b.score - a.score
})

highScores.splice(8)

localStorage.setItem('highScores', JSON.stringify(highScores))
window.location.assign('/')

}