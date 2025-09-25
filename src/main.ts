import p5 from "p5";
import './style.css';
// https://editor.p5js.org/brysonian/sketches/Hk28euUA-

let penSize = 1;
let penState = 0;

// Explicitly type the sketch callback
const sketch = (s: p5) => {
  s.setup = () => {
    s.createCanvas(600, 600);
    s.background(255);
  };

  s.draw = () => {
    if (s.mouseIsPressed) {
      if (penState === 0) {
        s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
      }

      if (penState === 1) {
        s.ellipse(s.mouseX, s.mouseY, 10, 10);
      }

      if (penState === 2) {
        s.line(s.mouseX - 5, s.mouseY - 5, s.mouseX + 5, s.mouseY + 5);
        s.line(s.mouseX + 5, s.mouseY - 5, s.mouseX - 5, s.mouseY + 5);
      }
    }
  };

  s.keyTyped = () => {
    if (s.key === "c") s.background(255);
    if (s.key === "r") s.stroke(255, 0, 0);
    if (s.key === "b") s.stroke(0, 0, 255);

    if (s.key === "x") penState = 2;
    if (s.key === "e") penState = 1;
    if (s.key === "l") penState = 0;
  };

  s.keyPressed = () => {
    if (s.keyCode === s.LEFT_ARROW && penSize > 1) {
      penSize -= 1;
    }
    if (s.keyCode === s.RIGHT_ARROW) {
      penSize += 1;
    }
    s.strokeWeight(penSize);
  };
};

// Create new sketch instance
new p5(sketch);
