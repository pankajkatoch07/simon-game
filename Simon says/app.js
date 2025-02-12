let gameseq = [];
let userseq = [];

let btns = ["blue","red","yellow","green"]

let started = false;

let level = 0;

let h3 = document.querySelector("h3");

let btnss = document.querySelectorAll(".btn")

let p = document.querySelector("p");

let highest_score = 0; // stores the value of level 

document.addEventListener("keypress",function(){
    if (started == false){
        console.log("game has started");
        started = true;

        levelup()
    }
}) 

function btnflash(btn){
    let ogcolor = btn.style.backgroundColor;
    btn.style.backgroundColor = "white"
    setTimeout(function() {
        btn.style.backgroundColor = ogcolor
    }, 250);
}

function userflash(btn){
    let ogcolor = btn.style.backgroundColor;
    btn.style.backgroundColor = "orange"
    setTimeout(function() {
        btn.style.backgroundColor = ogcolor
    }, 250);
}

function levelup() {
    userseq = [];
    level++; 
    h3.innerText = `level ${level}`;

    let randomnum = Math.floor((Math.random())*3);
    let randcolor = btns[randomnum];
    let randbtn = document.querySelector(`#${randcolor}`);
    gameseq.push(randcolor)
    console.log("gameseq",gameseq);
    btnflash(randbtn)  
}

function checkAns(idx) {
    console.log("current level:", level)
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup,1000);
        }
    }else {
        // updates the highest score if upgraded
        if (highest_score < level){
            highest_score = level;
        }
        h3.innerHTML = `GAME OVER! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        p.innerHTML = `HIGHEST SCORE: ${highest_score}`;
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn)

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log("userseq",userseq);
    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn")
for (let btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}



