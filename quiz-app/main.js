let counter = 0
let score = 0
let maxpoint = 5
var timer = 5000
let container = document.querySelector('.container')
const log = console.log

fetch('./data.json')
.then((responce) => responce.json())
.then((data) => {
    timerfunction(data)
    maxpoint = data.length
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains("submit")){
            correction(data[counter-1]['correctAnswer'], data)
        }
    })
})


// function to controll the apperence of the data with time
function timerfunction(data){
    // interval for switching between the question
    if (counter == 0){
        counter ++
        loopjson(data)
        counterfunction(5)
        interval = setInterval(timerfunction, 5000, data)
    }else if(counter < data.length){
        clearInterval(intime)
        clearInterval(interval)
        counter ++
        loopjson(data)
        counterfunction(5)
        interval = setInterval(timerfunction, 5000, data)
    }
    else{
        clearInterval(intime)
        clearInterval(interval)
        outresult(score)
    }
    
}

// loop all the element in the json file and apply the function to create them
function loopjson(data){
    data.forEach(element => {
        // console.log(parseInt (element['number']))
        if(parseInt (element['number']) == counter){
            // create all the element
            createAllElement(element['question'])
            // loop throught all the answers and create them
            for (let i = 0 ; i < element['odds'] ; i++){
                // append the element in the box
                createanswers(element[`answer${i+1}`], `answer${i+1}`, i)
            }
            // append the foot of the box
            createfoot()
            container.replaceChildren(div)
        }
    });
}

// to create the principle componenet of the box
function createAllElement(title){
    // crete the element for question
    div = document.createElement("div")
    h2 = document.createElement('h2')
    answers = document.createElement('div')

    let text = document.createTextNode(title)
    h2.appendChild(text)

    // add classes and attributes
    div.classList.add('box')
    answers.classList.add('answers')


    // append the principal element in the box
    div.appendChild(h2)
    div.appendChild(answers)
}

// create the answers in the box for every question
function createanswers(answervalue, forwhat, i){

    // cretet the principal component of the answers
    answer = document.createElement('div')
    radio = document.createElement('input')
    labe = document.createElement('label')

    // createt he text of the answer
    let text = document.createTextNode(answervalue)

    // add classes to the elements
    answer.classList.add('answer')
    radio.setAttribute('type', 'radio')
    radio.setAttribute('name', 'answer')
    radio.setAttribute('id', forwhat)
    radio.setAttribute('data-value', answervalue)
    labe.setAttribute('for', forwhat)

    // append the element
    labe.appendChild(text)
    answer.appendChild(radio)
    answer.appendChild(labe)
    answers.appendChild(answer)

    // to make the first element checker per default
    if (i == 0){
        radio.checked = true
    }
}

// crete the bottom part of the box
function createfoot() {
    // cretet the footer of the box
    foot = document.createElement('div')
    timer = document.createElement('div')
    span = document.createElement('span')
    button = document.createElement('button')

    // add classes to these element
    foot.classList.add('foot')
    timer.classList.add('timer')
    button.classList.add('submit')

    // append the footer in the box
    text = document.createTextNode("Time:")
    time = document.createTextNode("5")
    btntext  = document.createTextNode("Submit")

    timer.appendChild(text)
    span.appendChild(time)
    timer.appendChild(span)
    button.appendChild(btntext)

    // put the timer and the button in the foot
    foot.appendChild(timer)
    foot.appendChild(button)
    // put the foot in the botton of the container
    div.appendChild(foot)
}

// check if it has the corrent answer
function correction(correctanswer, data){
    let all = document.querySelectorAll('.box input')
    all.forEach((e) => {
        if(e.checked){
            if(e.dataset['value'] == correctanswer){
                score ++
            }
            clearInterval(interval)
            timerfunction(data)
        }
        
    })
}

// fuction timer
function counterfunction(number){
    let timespan = document.querySelector('.timer span')
    timespan.innerHTML = number
    intime = setInterval(() =>{
        number --
        timespan.innerHTML = number
    }, 1000)
    if(number == 0){
        clearInterval(intime)
    }
}

// output the result
function outresult(finalscore) {
    finabox = document.createElement('div')
    h2 = document.createElement('h2')
    finaspan = document.createElement('span')
    
    if (finalscore < maxpoint/2){
        finaspan.classList.add("loser")
        var finaltext = document.createTextNode(`you lose :( your score => `)
    }else{
        finaspan.classList.add("winner")
        var finaltext = document.createTextNode(`you win :) your score => `)
    }
    let points = document.createTextNode(`${finalscore}/${maxpoint}`)
    finabox.classList.add("finalbox")
    finabox.appendChild(finaltext)
    finaspan.appendChild(finaltext)
    finaspan.appendChild(points)
    finabox.appendChild(finaspan)

    container.replaceChildren(finabox)
}