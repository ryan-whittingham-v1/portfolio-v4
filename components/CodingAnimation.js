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
    const ch = document.documentElement.clientHeight * 0.3;

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
    var jsLogo = Bodies.rectangle((cw * 1) / 5, ch - 100, 100, 100, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture:
            'https://res.cloudinary.com/whittingham-io/image/upload/c_scale,w_100/v1641881874/portfolio/480px-Unofficial_JavaScript_logo_2.svg_itge80.png',
        },
      },
    });
    Composite.add(world, jsLogo);

    var reactLogo = Bodies.rectangle((cw * 2) / 5, ch - 100, 100, 90, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture:
            'https://res.cloudinary.com/whittingham-io/image/upload/c_scale,w_100/v1641881942/portfolio/react-logo-7B3CE81517-seeklogo.com_a5qiti.png',
        },
      },
    });
    Composite.add(world, reactLogo);

    var htmlLogo = Bodies.rectangle((cw * 3) / 5, ch - 100, 100, 100, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture:
            'https://res.cloudinary.com/whittingham-io/image/upload/c_scale,w_100/v1642309046/portfolio/5847f5bdcef1014c0b5e489c_oxa5ab.png',
        },
      },
    });
    Composite.add(world, htmlLogo);

    var vscLogo = Bodies.rectangle((cw * 4) / 5, ch - 100, 100, 100, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture:
            'https://res.cloudinary.com/whittingham-io/image/upload/c_scale,w_100/v1641882114/portfolio/800px-Visual_Studio_Code_1.35_icon.svg_xrhosf.png',
        },
      },
    });
    Composite.add(world, vscLogo);

    var cssLogo = Bodies.rectangle((cw * 5) / 5, ch - 100, 100, 100, {
      friction: 0.01,
      frictionAir: 0.01,
      mass: 2,
      restitution: 0.1,
      render: {
        sprite: {
          texture:
            'https://res.cloudinary.com/whittingham-io/image/upload/c_scale,w_100/v1642309166/portfolio/css3-logo-svg-vector_gzn7hs.png',
        },
      },
    });
    Composite.add(world, cssLogo);

    let floorLeft = Bodies.rectangle(0, ch - 10, cw, 5, {
      isStatic: true,
      render: {
        fillStyle: 'none',
      },
    });

    let floorRight = Bodies.rectangle(cw, ch - 10, cw, 5, {
      isStatic: true,
      render: {
        fillStyle: 'none',
      },
    });

    Composite.add(world, [floorLeft, floorRight]);

    Events.on(engine, 'beforeUpdate', function (event) {
      var px = 1;

      // body is static so must manually update velocity for friction to work
      Body.setVelocity(floorLeft, { x: px, y: 0 });
      Body.setPosition(floorLeft, {
        x: floorLeft.position.x + px,
        y: floorLeft.position.y,
      });
      Body.setVelocity(floorRight, { x: px, y: 0 });
      Body.setPosition(floorRight, {
        x: floorRight.position.x + px,
        y: floorRight.position.y,
      });
    });

    // wrapping using matter-wrap plugin
    floorLeft.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    floorRight.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    htmlLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    cssLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    jsLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    reactLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };
    vscLogo.plugin.wrap = {
      min: { x: render.bounds.min.x, y: render.bounds.min.y },
      max: { x: render.bounds.max.x, y: render.bounds.max.y },
    };

    // add mouse control
    /* var mouse = Mouse.create(render.canvas),
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
    render.mouse = mouse; */

    // stop animation on screen resize
    const debouncedHandleResize = debounce(function handleResize() {
      if (cw !== document.body.clientWidth) {
        setDimensions({
          //height: window.innerHeight,
          width: document.body.clientWidth,
        });
        Runner.stop(render);
        Render.stop(render);
      }
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
