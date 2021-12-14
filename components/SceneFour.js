import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import MatterWrap from 'matter-wrap';
import {
  Engine,
  Render,
  Body,
  Bodies,
  Composites,
  Composite,
  Common,
  Events,
  Constraint,
  Runner,
  Mouse,
  MouseConstraint,
  World,
  Vertices,
  Vector,
} from 'matter-js';
import styles from '../styles/scene.module.css';

Matter.use(MatterWrap);

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function SceneFour() {
  const scene = useRef();

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  // create matter.js engine
  let engine = Engine.create(),
    world = engine.world;

  // create matter.js runner
  let runner = Runner.create();

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = window.innerHeight;
    const puckSize = 20 + cw * 0.04;
    const puckMass = 2 + cw * 0.02;
    const paddleSize = 20 + cw * 0.05;
    const paddleMass = 20 + cw * 0.04;
    const cpuSpeed = -0.00002 * cw;
    const wallThickness = 20;
    // create renderer
    var render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });
    Render.run(render);

    // floor
    let floor = Bodies.rectangle(cw / 2, ch, cw + 50, wallThickness, {
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // ceiling
    let ceiling = Bodies.rectangle(cw / 2, 0, cw + 50, wallThickness, {
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // rightwallTop
    let rightWallTop = Bodies.rectangle(
      cw,
      ch * 0.15,
      wallThickness,
      ch * 0.3,
      {
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );

    // rightWallBottom
    let rightWallBottom = Bodies.rectangle(
      cw,
      ch * 0.85,
      wallThickness,
      ch * 0.3,
      {
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );

    // leftWallTop
    let leftWallTop = Bodies.rectangle(0, ch * 0.15, wallThickness, ch * 0.3, {
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // leftWallBottom
    let leftWallBottom = Bodies.rectangle(
      0,
      ch * 0.85,
      wallThickness,
      ch * 0.3,
      {
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );
    //----------------------------------------Vert Boundaries

    let vertFloorLeft = Bodies.rectangle(
      cw * 0.15,
      ch,
      cw * 0.3,
      wallThickness,
      {
        mass: 100,
        density: 100,
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );
    let vertFloorRight = Bodies.rectangle(
      cw * 0.85,
      ch,
      cw * 0.3,
      wallThickness,
      {
        mass: 100,
        density: 100,
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );

    let vertCeilingLeft = Bodies.rectangle(
      cw * 0.15,
      0,
      cw * 0.3,
      wallThickness,
      {
        mass: 100,
        density: 100,
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );

    let vertCeilingRight = Bodies.rectangle(
      cw * 0.85,
      0,
      cw * 0.3,
      wallThickness,
      {
        mass: 100,
        density: 100,
        isStatic: true,
        render: {
          fillStyle: 'black',
        },
      }
    );

    let vertRightWall = Bodies.rectangle(cw, ch / 2, wallThickness, ch, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    let vertLeftWall = Bodies.rectangle(0, ch * 0.5, wallThickness, ch, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // puck
    let puck = Bodies.circle(cw / 2, ch / 2, puckSize, {
      render: {
        fillStyle: 'blue',
      },
      frictionAir: 0.001,
      restitution: 1,
      mass: puckMass,
    });

    //userPaddle
    var userPaddle = Bodies.circle(cw * 0.15, ch * 0.5, paddleSize, {
      render: { fillStyle: 'black' },
      restitution: 0,
      mass: paddleMass,
    });

    //cpuPaddle
    var cpuPaddle = Bodies.circle(cw * 0.85, ch * 0.5, paddleSize, {
      render: { fillStyle: 'black' },
      mass: paddleMass,
    });

    Composite.add(world, [puck, cpuPaddle, userPaddle]);

    if (cw < ch) {
      Body.setPosition(userPaddle, { x: cw * 0.5, y: ch * 0.85 });
      Body.setPosition(cpuPaddle, { x: cw * 0.5, y: ch * 0.15 });
      Composite.add(world, [
        vertCeilingLeft,
        vertCeilingRight,
        vertFloorLeft,
        vertFloorRight,
        vertLeftWall,
        vertRightWall,
      ]);
    } else {
      Composite.add(world, [
        ceiling,
        floor,
        leftWallTop,
        leftWallBottom,
        rightWallTop,
        rightWallBottom,
      ]);
    }

    let gravity = engine.gravity;
    gravity.y = 0;
    gravity.x = 0;

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          damping: 1.6,
          render: {
            visible: false,
          },
        },
      });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // puck limits
    Events.on(engine, 'afterUpdate', function (event) {
      if (puck.position.x < 0 || puck.position.y > ch) {
        setCpuScore(cpuScore + 1);
        Body.setPosition(puck, {
          x: cw * 0.25,
          y: ch / 2,
        });
        Body.setVelocity(puck, {
          x: 0,
          y: 0,
        });
      }
      if (puck.position.x > cw || puck.position.y < 0) {
        setUserScore(userScore + 1);
        Body.setPosition(puck, {
          x: cw * 0.75,
          y: ch / 2,
        });
        Body.setVelocity(puck, {
          x: 0,
          y: 0,
        });
      }
    });

    // cpuPaddle movement
    let interval = setInterval(() => {
      Body.applyForce(cpuPaddle, cpuPaddle.position, {
        x: (cpuPaddle.position.x - puck.position.x) * cpuSpeed,
        y: (cpuPaddle.position.y - puck.position.y) * cpuSpeed,
      });
    }, 1000);

    // cpuPaddle limits
    Events.on(engine, 'afterUpdate', function (event) {
      if (cw > ch) {
        if (cpuPaddle.position.x < cw * 0.5) {
          Body.setPosition(cpuPaddle, {
            x: cw / 2,
            y: cpuPaddle.position.y,
          });
        }
        if (cpuPaddle.position.x > cw) {
          Body.setPosition(cpuPaddle, {
            x: cw,
            y: cpuPaddle.position.y,
          });
        }
      } else {
        if (cpuPaddle.position.y > ch * 0.5) {
          Body.setPosition(cpuPaddle, {
            x: cpuPaddle.position.x,
            y: ch * 0.5,
          });
        }
        if (cpuPaddle.position.x < 0) {
          Body.setPosition(cpuPaddle, {
            x: cpuPaddle.position.x,
            y: 0,
          });
        }
      }
    });

    // userPaddle limits
    Events.on(engine, 'afterUpdate', function (event) {
      if (cw > ch) {
        if (userPaddle.position.x > cw - puckSize) {
          Body.setPosition(userPaddle, {
            x: cw - puckSize,
            y: userPaddle.position.y,
          });
        }
        if (userPaddle.position.x < 0 + puckSize) {
          Body.setPosition(userPaddle, {
            x: 0 + puckSize,
            y: userPaddle.position.y,
          });
          Body.setVelocity(userPaddle, {
            x: 0,
            y: 0,
          });
        }
        if (userPaddle.position.y < 0 + puckSize) {
          Body.setPosition(userPaddle, {
            x: userPaddle.position.x,
            y: 0 + puckSize,
          });
          Body.setVelocity(userPaddle, {
            x: 0,
            y: 0,
          });
        }
        if (userPaddle.position.y > ch - puckSize) {
          Body.setPosition(userPaddle, {
            x: userPaddle.position.x,
            y: ch - puckSize,
          });
          Body.setVelocity(userPaddle, {
            x: 0,
            y: 0,
          });
        }
      } else {
        if (userPaddle.position.y < 0) {
          Body.setPosition(userPaddle, {
            x: userPaddle.position.x,
            y: 0,
          });
        }
        if (userPaddle.position.y > ch) {
          Body.setPosition(userPaddle, {
            x: userPaddle.position.x,
            y: ch,
          });
        }
      }
    });

    //limit puck speed
    Events.on(engine, 'collisionEnd', function (event) {
      if (Math.abs(puck.velocity.x) > 50 || Math.abs(puck.velocity.y) > 50) {
        Body.setVelocity(puck, {
          x: 0.75 * puck.velocity.x,
          y: 0.75 * puck.velocity.y,
        });
      }
    });

    // stop animation on screen resize
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      Runner.stop(render);
      Render.stop(render);
    }, 1000);
    window.addEventListener('resize', debouncedHandleResize);

    // start physics
    Runner.run(runner, engine);

    // cleanup
    return () => {
      Render.stop(render);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      window.removeEventListener('resize', debouncedHandleResize);
      clearInterval(interval);
    };
  }, [dimensions, userScore, cpuScore]);

  return (
    <div ref={scene} className={styles.scene}>
      <h1 className={styles.scoreboard}>
        {userScore} | {cpuScore}
      </h1>
    </div>
  );
}

export default SceneFour;
