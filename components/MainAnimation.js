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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function MainAnimation() {
  const scene = useRef();

  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  // create matter.js engine
  let engine = Engine.create(),
    world = engine.world;

  // create matter.js runner
  let runner = Runner.create();

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = window.visualViewport.height;

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

    // add bodies
    var stackRed = Composites.pyramid(
      -200,
      ch * 0.5,
      30,
      30,
      10,
      10,
      function (x, y) {
        return Bodies.rectangle(x, y, 10, 10, {
          friction: 0.0000002,
          frictionAir: 0.0005,
          restitution: 0.5,
          density: 0.001,
          force: { x: 0.002, y: 0 },
          render: { fillStyle: 'grey', opacity: 1 },
        });
      }
    );

    var stackBlue = Composites.pyramid(
      cw,
      ch * 0.5,
      30,
      30,
      10,
      10,
      function (x, y) {
        return Bodies.rectangle(x, y, 12, 12, {
          friction: 0.0000001,
          frictionAir: 0.0002,
          restitution: 0.5,
          density: 0.001,
          force: { x: -0.002, y: 0 },
          render: { fillStyle: 'ltblack', opacity: 1 },
        });
      }
    );

    Composite.rotate(stackRed, Math.PI * 2.5, { x: 0, y: 200 });
    Composite.rotate(stackBlue, Math.PI * -2.5, { x: cw, y: 500 });

    Composite.add(world, [stackRed, stackBlue]);

    // add mouse control
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

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // Change gravity
    let gravity = engine.gravity;
    gravity.y = 0.0;
    gravity.x = 0.0;

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

    // an example of using collisionStart event on an engine
    Events.on(engine, 'collisionStart', function (event) {
      var pairs = event.pairs;

      // change object colours to show those starting a collision
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        pair.bodyA.render.fillStyle = 'hotpink';
        pair.bodyB.render.fillStyle = 'cyan';
      }
    });

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

  return <div ref={scene} className={styles.scene}></div>;
}

export default MainAnimation;
