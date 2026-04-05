const board=document.querySelector('.board');
const start=document.querySelector('.start-btn');
const restart=document.querySelector('.restart-btn');
const modal=document.querySelector('.modal');
const startGameModal=document.querySelector('.start-game');
const gameOverModal=document.querySelector('.end-game');

const highScoreElement=document.querySelector('#high-score');
const scoreElement=document.querySelector('#score');
const timeElement=document.querySelector('#time');

let highScore=localStorage.getItem("highScore") || 0;
let score=0;
let time=`00:00`;
highScoreElement.innerHTML=highScore;

const blockHeight=30;
const blockWidth=30;

const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);

const blocks=[];
let snake=[{r:1,c:3},{r:1,c:4},{r:1,c:5}];

let intervalId=null;
let timerintervalId=null;

let food={r:Math.floor(Math.random()*rows),c:Math.floor(Math.random()*cols)};
let direction='right';

for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
        const block=document.createElement('div');
        block.classList.add('block'); 
        board.appendChild(block);
        blocks[`${r}-${c}`]=block;
        

    }
}

function display(){
     let head=null;
     blocks[`${food.r}-${food.c}`].classList.add("food");
  if(direction==='left'){
    head={r:snake[0].r,c:snake[0].c-1}; //first element of snake is head 
  }
    else if(direction==='right'){
        head={r:snake[0].r,c:snake[0].c+1};
    }
    else if(direction==='up'){
        head={r:snake[0].r-1,c:snake[0].c};
    }
    else if(direction==='down'){
        head={r:snake[0].r+1,c:snake[0].c};
    }
    if(head.r<0 || head.r>=rows || head.c<0 || head.c>=cols){
        clearInterval(intervalId);
        modal.style.display="flex";
        startGameModal.style.display="none";
        gameOverModal.style.display="flex";
        return;
    }
    if(head.r===food.r && head.c===food.c){
        blocks[`${food.r}-${food.c}`].classList.remove("food");
        food={r:Math.floor(Math.random()*rows),c:Math.floor(Math.random()*cols)};
        blocks[`${food.r}-${food.c}`].classList.add("food");
        snake.unshift(head);
        score+=10;
        scoreElement.innerHTML=score;
        if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore",highScore.toString());
            highScoreElement.innerHTML=highScore;
        }

    }
    snake.forEach(segment=>{
        blocks[`${segment.r}-${segment.c}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();
    snake.forEach(segment=>{
        blocks[`${segment.r}-${segment.c}`].classList.add("fill");
    })
}

start.addEventListener("click",()=>{
    modal.style.display="none";

    clearInterval(intervalId); 
    intervalId=setInterval(display,300);

    clearInterval(timerintervalId); 
    timerintervalId=setInterval(() => {
        let [min,sec]=time.split(":").map(Number);
        if(sec===59){
            min++;
            sec=0;
        } else{
            sec++;
        }
        time=`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; 
        timeElement.innerHTML=time;
    },1000)
})

restart.addEventListener("click",restartGame)

function restartGame(){
    clearInterval(intervalId);
    clearInterval(timerintervalId);
    blocks[`${food.r}-${food.c}`].classList.remove("food");

    snake.forEach(segment=>{
        blocks[`${segment.r}-${segment.c}`].classList.remove("fill");
    });
    score = 0;
    time = "00:00";
    direction = "right";

    scoreElement.innerHTML = score;
    timeElement.innerHTML = time;
    highScoreElement.innerHTML = highScore;

    snake = [{r:1,c:3},{r:1,c:4},{r:1,c:5}];

    food = {r: Math.floor(Math.random()*rows),c: Math.floor(Math.random()*cols)};

    blocks[`${food.r}-${food.c}`].classList.add("food");
    modal.style.display = "none";
    intervalId = setInterval(display, 300);
    timerintervalId = setInterval(() => {
        let [min,sec]=time.split(":").map(Number);
        if(sec===59){
            min++;
            sec=0;
        } else{
            sec++;
        }

        time = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
        timeElement.innerHTML = time;

    },1000);
}

addEventListener("keydown",(e)=>{
    if(e.key==="ArrowLeft"){
        direction="left";F
    }
    else if(e.key==="ArrowRight"){
        direction="right";
    }
    else if(e.key==="ArrowUp"){
        direction="up";
    }
    else if(e.key==="ArrowDown"){
        direction="down";
    }
})