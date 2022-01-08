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
import styles from '../styles/codingAnimation.module.css';

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

export default function CodingAnimation() {
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

    // add bodies
    var jsLogo = Bodies.rectangle(0, ch - 100, 100, 100, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture: './images/jsLogo100.png',
        },
      },
    });
    Composite.add(world, jsLogo);

    var reactLogo = Bodies.rectangle(0, ch - 100, 200, 190, {
      friction: 0,
      frictionAir: 0.15,
      render: {
        sprite: {
          texture: './images/reactLogo200190.png',
        },
      },
    });
    Composite.add(world, reactLogo);

    Composite.add(
      world,
      Bodies.rectangle(cw / 2, ch - 10, cw * 2, 20, {
        isStatic: true,
        render: {
          fillStyle: '#060a19',
        },
      })
    );

    var counter = 0;

    Events.on(runner, 'afterTick', function (event) {
      counter += 1;

      // make body move constantly
      Body.applyForce(jsLogo, jsLogo.position, {
        x: 0.001,
        y: 0,
      });

      Body.applyForce(reactLogo, reactLogo.position, {
        x: 0.01,
        y: 0,
      });

      // every 1.5 sec
      if (counter >= 60 * 1.5) {
        // reset counter
        counter = 0;
      }
    });

    // wrapping using matter-wrap plugin
    jsLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    reactLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };

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

    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      mouseConstraint.mouse.mousewheel
    );

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // stop animation on screen resize
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
      Runner.stop(render);
      Render.stop(render);
    }, 100);
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

  return <div ref={scene} className={styles.scene}></div>;
}
