import React from 'react';
import Matter from 'matter-js';
import styles from '../styles/scene.module.css';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sceneRef = React.createRef();
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Composites = Matter.Composites,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Runner = Matter.Runner;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    const cw = window.innerWidth;
    const ch = window.innerHeight;

    var render = Render.create({
      element: this.sceneRef.current,
      // element: document.body,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add balls
    var rows = 18,
      yy = 600 - 25 - 40 * rows;

    var stack = Composites.stack(0.88 * cw, yy, 2, rows, 0, 0, function (x, y) {
      return Bodies.rectangle(x, y, 40, 40, {
        mass: 0.5,
        restitution: 0.9,
        frictionAir: 0.3,
        render: {
          fillStyle: '#000000',
        },
      });
    });

    Composite.add(world, [
      stack,
      Bodies.rectangle(cw / 2, ch, cw, 30, { isStatic: true }),
    ]);

    var ball = Bodies.circle(400, 5, 55, {
      density: 1,
      mass: 200,
      restitution: 0.9,
      frictionAir: 0.01,
      render: {
        fillStyle: '#000000',
      },
    });

    Composite.add(world, ball);
    Composite.add(
      world,
      Constraint.create({
        pointA: { x: cw / 1.5, y: 0 },
        bodyB: ball,
      })
    );

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

    Runner.run(engine);
  }

  render() {
    return <div ref={this.sceneRef} className={styles.scene} />;
  }
}
export default Scene;
