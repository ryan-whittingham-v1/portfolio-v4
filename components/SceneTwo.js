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

function SceneTwo() {
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

    // Add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Add ceiling and floor
    let floor = Bodies.rectangle(cw / 2, ch, cw, 5, {
      isStatic: true,
      chamfer: 10,
      render: { fillStyle: '#060a19' },
    });
    Composite.add(world, floor);

    //paddle
    var paddle = Bodies.circle(cw / 2, 500, 40, {
      isStatic: true,
      chamfer: 10,
      render: { fillStyle: '#060a19' },
    });

    // Control paddle movement with mouse
    Events.on(mouseConstraint, 'mousemove', function (event) {
      Body.setPosition(paddle, {
        x: event.mouse.position.x,
        y: event.mouse.position.y,
      });
    });

    Composite.add(world, paddle);

     // Add balls
    let maxBalls = 1;
    let currentBalls = 0;
    let colors = ['hotpink', 'aqua', 'yellow', 'black'];

    Events.on(engine, 'beforeUpdate', function (event) {
      if (
        event.timestamp % (5000 * Common.random() < Common.random() * 100) &&
        currentBalls < maxBalls
      ) {
        let ball = Bodies.circle(Common.random(0, cw), ch / 2, cw / 100 + 10, {
          render: {
            fillStyle: Common.choose(colors),
          },
          density: 100,
          mass: 100,
          frictionAir: 0,
        });

        // allow balls to wrap to opposite screen edge
        ball.plugin.wrap = {
          min: { x: render.bounds.min.x, y: render.bounds.min.y },
          max: { x: render.bounds.max.x, y: render.bounds.max.y },
        };
        Composite.add(world, ball);
        currentBalls = currentBalls + 1;
      }
    }); */

    let ball = Bodies.circle(cw / 2, ch / 2, 20, {
      render: {
        fillStyle: 'black',
      },
    });

    Composite.add(world, ball);
    /* 
    // Add trail to ball
    let trail = [];
    Events.on(render, 'afterRender', function () {
      var bodies = Composite.allBodies(engine.world);

      for (var i = 1; i < bodies.length; i++) {
        trail.push(['']);
        var body = bodies[i];
        trail[i]?.unshift({
          position: Vector.clone(body.position),
          speed: body.speed,
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.3;

        for (var j = 0; j < trail[i]?.length; j += 1) {
          var point = trail[i][j].position,
            speed = trail[i][j].speed;

          render.context.fillStyle = 'grey';
          render.context.fillRect(point?.x, point?.y, 5, 5);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail[i]?.length > 50) {
          trail[i].pop();
        }
      }
    });

    // Change object colors when collision
    Events.on(engine, 'collisionStart', function (event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        pair.bodyA.render.fillStyle = Common.choose(colors);
        pair.bodyB.render.fillStyle = Common.choose(colors);
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
    };
  }, [dimensions]);

  return <div ref={scene} className={styles.scene} />;
}

export default SceneTwo;
