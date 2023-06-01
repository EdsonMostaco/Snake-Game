var direction
var tilesNum = 225
var tilesPerRow = Math.sqrt(tilesNum)
var rowStartLeft = new Array()
var rowStartTop = new Array()
var rowEndBottom = new Array()
var rowEndRight = new Array()
var emptyTiles = new Array()
var body = [3,2,1]
var moving
var fruitGenerator
var powerGenerator
var gameDiv = document.getElementsByClassName('game')[0]
var boxDimensions = (100/tilesPerRow).toFixed(3)
var restartButton = document.getElementById('restart__game')
var scoreSpan = document.getElementsByClassName('score')[0]
var score = 0
var speed = 0.1

restartButton.addEventListener("click", function () {
    restartGame()
}, false)

function createGrid() {
    for(let i = 1; i <= tilesNum; i++) {
        gameDiv.innerHTML = gameDiv.innerHTML + '<div class="tile" data-tile="' + i + '"style="width:' + boxDimensions + '%; height:' + boxDimensions + '%"></div>'
    }
}
function createBody(){
    for(let i = 1; i <= body.length; i++){
        if(i==3){
            document.querySelector('[data-tile ="' +i + '"]').classList.add("head", "body")
        }else if (i==1 || i==2) {
            document.querySelector('[data-tile="' + i + '"]').classList.add("body")
        }
    }
}
for (let i = tilesPerRow; i<= tilesPerRow; i++) {
    rowStartLeft.push(i)
}
for (let i = tilesPerRow; i<= tilesPerRow; i++) {
    rowStartTop.push(i)
}
for (let i = tilesPerRow; i<= tilesPerRow; i++) {
    rowEndRight.push(i)
}
for (let i = tilesPerRow; i<= tilesPerRow; i++) {
    rowEndBottom.push(i)
}
window.addEventListener("keydown",control,false)

function control(e) {
    if(e.keyCode == '39') {
        if(direction != 'r' && direction != 'l') {
            changeDirection('r')
        }
    }
    if(e.keyCode == '37') {
        if(direction != 'l' && direction != 'r') {
            changeDirection('l')
        }
    }
    if(e.keyCode == '40') {
        if(direction != 'd' && direction != 'u'){
            changeDirection('d')
        }
    }
    if(e.keyCode == '38') {
        if(direction != 'u' && direction != 'd') {
            changeDirection('u')
        }
    }
}
function changeDirection(d) {
    let directionDeciderNum,
        directionArrayInit,
        directionArrayOf
    switch (d) {
        case "r":
            directionDeciderNum = 1
            directionArrayInit = rowEndRight
            directionArrayOf = rowStartLeft
            break;
        case "l":
            directionDeciderNum = -1
            directionArrayInit = rowStartLeft
            directionArrayOf = rowEndRight
            break;
        case "d":
            directionDeciderNum = tilesPerRow
            directionArrayInit = rowEndBottom
            directionArrayOf = rowStartTop
            break;
        case "u":
            directionDeciderNum = -tilesPerRow
            directionArrayInit = rowStartTop
            directionArrayOf = rowEndBottom
            break;
    }
    clearInterval(moving)

    moving = setInterval(function () {
        direction = d
        const head = document.getElementsByClassName('head')[0]
        let nextTileNum = directionArrayInit.indexOf(parseInt(head.dataset.tile, 10)) > -1 ? directionArrayOf[directionArrayInit.indexOf(parseInt(head.dataset.tile, 10))] : parseInt(head.dataset.tile, 10) + directionDeciderNum
        if(body.indexOf(nextTileNum)>-1) {
            scoreSpan.innerHTML = +score +'. GAME OVER'
            restartGame()
        }else{
            let nextTile = document.querySelector('[data-tile ="' + nextTileNum + '"]')
            let lastTile = document.querySelector('[data-tile ="' + body[body.length -1]+ '"]')
            body.unshift(nextTileNum)

            nextTile.classList.add('head', 'body')

            if(nextTile.classList.contains('fruit')) {
                score +=1
                scoreSpan.innerHTML = score
                speed = score % 2 == 0 ? speed += 0.01 : speed
                nextTile.classList.remove('fruit')
                clearInterval(fruitGenerator)
                generateFruit()
                fruitGen()
            }else{
                lastTile.classList.remove('body')
                body.pop()
            }
            head.classList.remove('head')
        }
    }, 10 / speed)
}
function generateFruit(){
    let rand
    let fruit = document.getElementsByClassName('fruit')[0]
    if (fruit) {
        fruit.classList.remove('fruit')
    }
    do{
        rand = Math.floor(Math.random()* tilesNum)
    } while( body.indexOf(rand)> -1)
    document.querySelector('[data-tile = "' +rand + '"]').classList.add('fruit')
}
function fruitGen (){
    fruitGenerator = setInterval(function (){
        generateFruit()
    }, 3000)
}
function startGame(){
    createGrid()
    createBody()
    generateFruit()
}
function restartGame() {
    scoreSpan.innerHTML = +score + ". GAME OVER"
    clearInterval(fruitGenerator)
    clearInterval(moving)
    body = [3,2,1]
    speed = 0.1
    score = 0
    document.querySelector('.game').innerHTML = ""
    direction = ''
    startGame()
}
startGame()