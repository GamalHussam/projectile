// import anime from './lib/anime.es';
/**
 * User Inputs:
 *      d is the distance.
 *      theta is the firing angle.
 *      v0 is the initial velocity.
 * 
 * Indicator:
 *      t1 is the time to reach the max height.
 *      h_max is the max height.
 *      t2 is the time to reach the goal.
 *      h_goal is the ball height at goal plane arrival point.
*/

let d;
let theta;
let v0;
let t1;
let h_max;
let t2;
let h_goal;

const distance = document.querySelector("#distance");
const angle = document.querySelector("#angle");
const velocity = document.querySelector("#velocity");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const log1 = document.querySelector("#log1");
const log2 = document.querySelector("#log2");
const log3 = document.querySelector("#log3");
// const anime = require('animejs');


/* Distance Slider*/
distance.addEventListener("input", ()=> {
    log1.textContent = distance.value;
    d = distance.value;
    
    // max distance = 100 m but in pixels = 700px
    // distance in px = 700 * distance / 100

    anime({
        targets: ".ball",
        translateX: 700 * (distance.value / 100),
        duration: 10,
        easing: 'linear',
    });
});

/* Angle Slider*/
angle.addEventListener("input", ()=> {
    log2.textContent = angle.value;
    theta = angle.value;
});

/* Velocity Slider*/
velocity.addEventListener("input", ()=> {
    log3.textContent = velocity.value;
    v0 = velocity.value;
});

/* Start Function */
function startAnimation()
{
    theta = theta * (Math.PI / 180);
    t1 = v0 * Math.sin(theta) / 9.8;
    h_max = v0 * Math.sin(theta) * t1 - 0.5 * 9.8 * t1 ** 2;
    t2 = d / (v0 * Math.cos(theta));
    h_goal = h_max - 0.5 * 9.8 * (t2 - t1) **2;

    // for checking
    // console.log(`time: ${t1}, max.Height: ${h_max}`);
    // console.log(`time: ${t2}, ball.Height: ${h_goal}`);
}

/* Start Button */
start.addEventListener("click", startAnimation);

/* Reset Button */
reset.addEventListener("click", ()=> {
    velocity.value = 0;
    distance.value = 0;
    angle.value = 0;
    log1.textContent = distance.value;
    log2.textContent = angle.value;
    log3.textContent = velocity.value;
    v0 = velocity.value;
    theta = angle.value;
    d = distance.value;

    anime({
        targets: ".ball",
        translateX: 0,
        duration: 10,
        easing: 'linear',
    });
});
