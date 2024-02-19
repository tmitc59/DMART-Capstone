// SCENES DON'T WORK
// https://mveteanu.github.io/p5.SceneManager/
// https://p5play.org/learn/sprite.html?page=10
// https://www.codecademy.com/learn/learn-p5js/modules/p5js-interaction/cheatsheet

function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
  
    let button = createButton("click me!");
    button.position(150, 150);
    button.mousePressed(() => {
      // clear();
      titleScreen();
      console.log("pressed!");
    });
  }
  
  function titleScreen() {
    clear();
    background("blue");
    text("title screen", 50, 50);
  }
  