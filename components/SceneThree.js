import React, { useEffect, useState, useRef } from 'react';
import Matter from 'matter-js';
import styles from '../styles/scene.module.css';

const STATIC_DENSITY = 15;
const PARTICLE_SIZE = 6;
const PARTICLE_BOUNCYNESS = 0.9;

export default function SceneThree() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [constraints, setContraints] = useState();
  const [scene, setScene] = useState();

  const [someStateValue, setSomeStateValue] = useState(false);

  const handleResize = () => {
    setContraints(boxRef.current.getBoundingClientRect());
  };

  const handleClick = () => {
    setSomeStateValue(!someStateValue);
  };

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        background: 'transparent',
        wireframes: false,
      },
    });

    const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    });

    World.add(engine.world, [floor]);

    var rows = 18,
      yy = 600 - 25 - 40 * rows;

    var stack = Matter.Composites.stack(
      0.88 * cw,
      yy,
      2,
      rows,
      0,
      0,
      function (x, y) {
        return Bodies.rectangle(x, y, 40, 40, {
          mass: 0.5,
          restitution: 0.9,
          frictionAir: 0.1,
          render: {
            fillStyle: '#000000',
          },
        });
      }
    );

    World.add(engine.world, [stack]);

    Engine.run(engine);
    Render.run(render);

    setContraints(boxRef.current.getBoundingClientRect());
    setScene(render);

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      let { width, height } = constraints;

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Dynamically update floor
      const floor = scene.engine.world.bodies[0];

      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + STATIC_DENSITY / 2,
      });

      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 0, y: height + STATIC_DENSITY },
      ]);
    }
  }, [scene, constraints]);

  useEffect(() => {
    // Add a new "ball" everytime `someStateValue` changes
    if (scene) {
      let { width } = constraints;
      let randomX = Math.floor(Math.random() * -width) + width;
      Matter.World.add(
        scene.engine.world,
        Matter.Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
          restitution: PARTICLE_BOUNCYNESS,
        })
      );
    }
  }, [someStateValue]);

  return (
    <div className={styles.scene}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          rowGap: '16px',
          marginBottom: '32px',
        }}
      ></div>

      <button
        style={{
          cursor: 'pointer',
          display: 'block',
          textAlign: 'center',
          marginBottom: '16px',
          width: '90vw',
        }}
        onClick={() => handleClick()}
      >
        Checkout
      </button>

      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
