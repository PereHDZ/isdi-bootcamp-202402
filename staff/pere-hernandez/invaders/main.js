var ship = document.getElementById("ship")
var enemies = document.getElementById("enemies")
var shot = document.getElementsByClassName("shot")
//Assign vars to every div or img

var shipX = 0
var shipY = 90
var enemiesX = 10
var enemiesY = 0
var shotX = 89
let shots = []
//Vars to specify the X and Y axis of every moving div

let nEnemies = 50
//Assign the amount of enemies there will be.

var directionRight = true
//Bool to determine if we want enemies to move right (true) or left (false)

ship.style.left = shipX + "vw"
//Assign initial ship position

let movement = true
//Create a bool to determine wether or not we want our ship to be movable

function spawnEnemies(num){
    for (let i = 0; i < num; i++){
        enemies.innerHTML += `
        <img class="enemy" id="enemy${i}" src="images/enemy.png"></img>`  
    }
}
//Injects an img with an enemy to the HTML and assigns them an id 'i'

spawnEnemies(nEnemies)
//Spawn enemies

let aliens = document.querySelectorAll(".enemy")
//Creates an array with all the img.enemy we just spawned

document.onkeydown = function(event){
    if (event.key === "ArrowLeft" && shipX > 0 && enemiesY < 55 && movement === true)
        shipX = shipX - 1
    else if (event.key === "ArrowRight" && shipX <= 90 && enemiesY < 55 && movement === true)
        shipX = shipX + 1
    else if (event.key === "ArrowUp" && shipY > 0 && enemiesY < 55 && movement === true)
        shipY = shipY - 1
    else if (event.key === 'ArrowDown' && shipY < 90 && enemiesY < 55 && movement === true)
        shipY = shipY + 1
    else if (event.key === " " && movement === true){
        shoot()
    }      
    ship.style.left = shipX + "vw"
    ship.style.top = shipY + 'vh'
}
//Event to detect which keyboard key is pressed and implement different functions accordingly. It makes sure they only work as long enemies don't reach the Game Over position in axis Y

function enemiesMovement(){    
    if (enemiesY < 55){
        if (directionRight === true && enemiesX < 20 && movement === true)
            enemiesX = enemiesX + 1
        else if (directionRight === true && enemiesX >= 20 && movement === true) {
            directionRight = false
            enemiesY = enemiesY + 5
        } else if (directionRight === false && enemiesX > 0 && movement === true)
            enemiesX = enemiesX - 1
        else if (directionRight === false && enemiesX === 0 && movement === true){
            directionRight = true
            enemiesY = enemiesY + 5
        }            
        enemies.style.left = enemiesX + "vw"
        enemies.style.top = enemiesY + "vh"
    } else {
        gameOver()
    }   
}
//Function to determine the movement of enemies and pop the Game Over img when they reach the Game Over position in axis Y

function shoot(){
    if (enemiesY < 55){
        const shot = document.createElement("div")
        shot.classList.add("shot")
        document.getElementById('space').appendChild(shot)
        shot.style.left = shipX + 3.95 + "vw" 
        shot.style.top = shipY - 1 + "vh"
        shots.push(shot)
    }        
}
//Function to create a shot in the same position in axis X as ship. It only works as long as enemies haven't reached the Game Over position in axis Y

function bulletMovement() {
    shots.forEach((shot) => {
        var shotRect = shot.getBoundingClientRect()
    shot.style.top = shotRect.y - 20 + 'px'
    if (shotRect.top < 0)
        shot.remove()
    })   
}
//Function to make each shot move 20px up

function checkContact(){
    let shipRect = ship.getBoundingClientRect()
    aliens.forEach((enemy) => {
        let enemyRect = enemy.getBoundingClientRect()
        if (
            shipRect.x + shipRect.width > enemyRect.x &&
            shipRect.x < enemyRect.x + enemyRect.width &&
            shipRect.y + shipRect.height > enemyRect.y &&
            shipRect.y < enemyRect.y + enemyRect.height) {
                ship.src = 'images/boom.png'
                enemy.src = 'images/boom.png'
                movement = false
                setTimeout(gameOver, 2000) 
            }
    })    
}
//Function to check if the imgs in our array 'aliens' are in contact with the img 'ship' and change their src if they do

function shotContact(){
    shots.forEach((shot) => {
        let shotRect = shot.getBoundingClientRect()
        aliens.forEach((enemy) => {
            let enemyRect = enemy.getBoundingClientRect()
            if (
                shotRect.x + shotRect.width > enemyRect.x &&
                shotRect.x < enemyRect.x + enemyRect.width &&
                shotRect.y + shotRect.height > enemyRect.y &&
                shotRect.y < enemyRect.y + enemyRect.height
                ) {
                    enemy.src = 'images/boom.png'
                    shot.remove()
                    setTimeout(function () {
                        enemy.style.display = 'none'
                    }, 1000) 
                }
        })
    })
    
}

function gameOver(){
    const end = document.createElement("div")
    end.classList.add("gameOver")
    document.body.appendChild(end)
    console.log("GAME OVER")
}
//Function to make the GAME OVER div appear

setInterval(enemiesMovement, 100)
//Set enemies to move every 0.1s

setInterval(checkContact, 100)
//Check if ship contacts any img.enemy every 100ms

setInterval(bulletMovement, 100)
//Check if shot contacts any img.enemy every 0.1s

setInterval(shotContact, 100)
//Make shot move up every 0.1s