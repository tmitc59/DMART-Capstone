
/*
 * screens = [title=0, study=1, study1=2, study2=3, study3=4,
 *                   play=6, song1=7, etc.]
*/
let screen = 0;

function setup() {
  createCanvas(500, 500);

  // go to title screen
  let title_button = createButton("screen change test");
  title_button.position(150, 150);
  title_button.mousePressed(() => {
    title_button.remove();
    changeScene(1);
  });
}

function draw() {
  if (screen == 0) {        // blank screen
    background(220);
  }
  else if (screen == 1) {  // switch to title screen
    background(150);
    textAlign(CENTER);
    text("title screen!", 50, 50);
  }
}

function changeScene(x) {
  switch (x) {
    case 0:
      screen = 0;
      break;
    case 1:
      screen = 1;
      break;
    default:
      break;
  }
}