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

/* ----------------------------------------------------------------- */

/* Engine Setup */

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Vector = Matter.Vector,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options:{
        height: 500,
        wireframes: false,
        background: "black",
    }
});


var ball = Bodies.circle(30, 420, 20, {
    friction: 0, 
    frictionAir:0, 
    inverseInertia: 0,
    render: {
        fillStyle: "white",
    }
});

var ground = Bodies.rectangle(400, 470, 800, 60, { 
    isStatic: true,
    render: {
        lineWidth: 2,
        strokeStyle: "white",
        fillStyle: "black"
    }
});

engine.world.gravity.y = 1;
// console.log(ball);

/* ---------------------------------------------------------------------- */
let d;
let theta;
var v0;
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
const item = document.querySelector(".item-2");
const canvas = document.querySelector("canvas");

item.appendChild(canvas);


/* Distance Slider*/

distance.addEventListener("input", ()=> {
    log1.textContent = distance.value;
    d = distance.value;

    // max distance = 100 m but in pixels = 700px
    // distance in px = 700 * distance / 100

    Body.setPosition(ball, {x: 30 + distance.value * 7, y: 420});

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

    let vx, vy;
    vx = v0 * (Math.cos(theta));
    vy = v0 * (Math.sin(theta));
    // ball.isStatic = false;
    Body.setVelocity(ball, {x: vx, y: vy});

    console.log(ball);

    // adding path
    var trail = [];

    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(ball.position),
            speed: ball.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 2000) {
            trail.pop();
        }
    });
    

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
    
    Body.setPosition(ball, {x: 30, y: 420});
});

Composite.add(engine.world, [ball, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);