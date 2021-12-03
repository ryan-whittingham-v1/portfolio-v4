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

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create runner
  var runner = Runner.create();

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const [userScore, setUserScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = window.innerHeight;

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
    let floor = Bodies.rectangle(cw / 2, ch, cw, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // ceiling
    let ceiling = Bodies.rectangle(cw / 2, 0, cw, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // rightwallTop
    let rightWallTop = Bodies.rectangle(cw, ch * 0.167, 20, ch * 0.3, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // rightWallBottom
    let rightWallBottom = Bodies.rectangle(cw, ch * 0.833, 20, ch * 0.3, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // leftWallTop
    let leftWallTop = Bodies.rectangle(0, ch * 0.167, 20, ch * 0.3, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // leftWallBottom
    let leftWallBottom = Bodies.rectangle(0, ch * 0.833, 20, ch * 0.3, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });
    //----------------------------------------Vert Boundaries
    // floor
    let vertFloorLeft = Bodies.rectangle(cw * 0.2, ch, cw * 0.37, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });
    let vertFloorRight = Bodies.rectangle(cw * 0.8, ch, cw * 0.37, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // ceiling
    let vertCeilingLeft = Bodies.rectangle(cw * 0.2, 0, cw * 0.37, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    let vertCeilingRight = Bodies.rectangle(cw * 0.8, 0, cw * 0.37, 20, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // rightwallTop
    let vertRightWall = Bodies.rectangle(cw, ch / 2, 20, ch, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // leftWall
    let vertLeftWall = Bodies.rectangle(0, ch * 0.5, 20, ch, {
      mass: 100,
      density: 100,
      isStatic: true,
      render: {
        fillStyle: 'black',
      },
    });

    // puck
    let puck = Bodies.circle(cw / 2, ch / 2, cw * 0.05, {
      render: {
        fillStyle: 'blue',
      },
      frictionAir: 0.01,
      restitution: 1,
    });
    Composite.add(world, puck);

    // puck trail
    /*  var trail = [];

    Events.on(render, 'afterRender', function () {
      trail.unshift({
        position: Vector.clone(puck.position),
        speed: puck.speed,
      });

      Render.startViewTransform(render);
      render.context.globalAlpha = 0.5;

      for (var i = 0; i < trail.length; i += 1) {
        var point = trail[i].position;

        render.context.fillStyle = 'blue';
        render.context.fillRect(point.x, point.y, 5, 5);
      }

      render.context.globalAlpha = 1;
      Render.endViewTransform(render);

      if (trail.length > 50) {
        trail.pop();
      }
    }); */

    //userPaddle
    var userPaddle = Bodies.circle(cw * 0.15, ch * 0.5, cw * 0.06, {
      render: { fillStyle: 'black' },
    });

    //cpuPaddle
    var cpuPaddle = Bodies.circle(cw * 0.85, ch * 0.5, cw * 0.06, {
      render: { fillStyle: 'black' },
    });

    //---------------------- vert paddles

    //userPaddle
    var vertUserPaddle = Bodies.circle(cw * 0.5, ch * 0.85, cw * 0.06, {
      render: { fillStyle: 'black' },
    });

    //cpuPaddle
    var vertCpuPaddle = Bodies.circle(cw * 0.5, ch * 0.15, cw * 0.06, {
      render: { fillStyle: 'black' },
    });

    if (cw < ch) {
      Composite.add(world, [
        vertCeilingLeft,
        vertCeilingRight,
        vertFloorLeft,
        vertFloorRight,
        vertLeftWall,
        vertRightWall,
        vertCpuPaddle,
        vertUserPaddle,
      ]);
    } else {
      Composite.add(world, [
        ceiling,
        floor,
        leftWallTop,
        leftWallBottom,
        rightWallTop,
        rightWallBottom,
        cpuPaddle,
        userPaddle,
      ]);
    }

    // add gyro control
    if (typeof window !== 'undefined') {
      var updateGravity = function (event) {
        var orientation =
            typeof window.orientation !== 'undefined' ? window.orientation : 0,
          gravity = engine.gravity;

        if (orientation === 0) {
          gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
          gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
          gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
          gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
          gravity.x = Common.clamp(event.beta, -90, 90) / 90;
          gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
          gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
          gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
      };

      window.addEventListener('deviceorientation', updateGravity);
    }

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
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

    let interval;
    if (cw > ch) {
      // cpuPaddle movement
      interval = setInterval(() => {
        Body.applyForce(cpuPaddle, cpuPaddle.position, {
          x: (cpuPaddle.position.x - puck.position.x) * -0.000000004 * cw * cw,
          y: (cpuPaddle.position.y - puck.position.y) * -0.000000004 * cw * cw,
        });
      }, 1000);
    } else {
      // cpuPaddle vert movement
      interval = setInterval(() => {
        Body.applyForce(vertCpuPaddle, vertCpuPaddle.position, {
          x:
            (vertCpuPaddle.position.x - puck.position.x) *
            -0.000000004 *
            cw *
            cw,
          y:
            (vertCpuPaddle.position.y - puck.position.y) *
            -0.000000004 *
            cw *
            cw,
        });
      }, 1000);
    }
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
        if (vertCpuPaddle.position.y > ch * 0.5) {
          Body.setPosition(vertCpuPaddle, {
            x: vertCpuPaddle.position.x,
            y: ch * 0.5,
          });
        }
        if (vertCpuPaddle.position.x < 0) {
          Body.setPosition(vertCpuPaddle, {
            x: vertCpuPaddle.position.x,
            y: 0,
          });
        }
      }
    });

    // userPaddle limits
    Events.on(engine, 'afterUpdate', function (event) {
      if (cw > ch) {
        if (userPaddle.position.x > cw * 0.5) {
          Body.setPosition(userPaddle, {
            x: cw / 2,
            y: userPaddle.position.y,
          });
        }
        if (userPaddle.position.x < 0) {
          Body.setPosition(userPaddle, {
            x: 0,
            y: userPaddle.position.y,
          });
        }
      } else {
        if (vertUserPaddle.position.y < ch * 0.5) {
          Body.setPosition(vertUserPaddle, {
            x: vertUserPaddle.position.x,
            y: ch * 0.5,
          });
        }
        if (vertUserPaddle.position.y > ch) {
          Body.setPosition(vertUserPaddle, {
            x: vertUserPaddle.position.x,
            y: ch,
          });
        }
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
