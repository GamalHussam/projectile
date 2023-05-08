# Sports project.
### Designing a simulation program and UI (user interface) on Web:

| Variables     | Units         |
| ------------- |:-------------:|
| Distance      | m             | 
| Velocity      | m/s           |  
| Angle         | degree        |  

##### By using sliders to take the input from the unser and calculate:
1. Max Height.
2. New Time.
3. Height from the goal.

```javascript
theta = theta * (Math.PI / 180);
t1 = v0 * Math.sin(theta) / 9.8;
h_max = v0 * Math.sin(theta) * t1 - 0.5 * 9.8 * t1 ** 2;
t2 = d / (v0 * Math.cos(theta));
h_goal = h_max - 0.5 * 9.8 * (t2 - t1) **2;
```
##### Using matter.js library for simulation
Trying to emulate the reality by using Physics Engine. and inside our Engine we create the world which consists of:
. Static Ground
. Ball
By rendering and running that world, we could simulate the projectile of the ball like reality.
```javascript
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
Composite.add(engine.world, [ball, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
```
By **Neglecting** the firction the ball will continue moving. and **Neglecting** anyother forces act on the ball.
