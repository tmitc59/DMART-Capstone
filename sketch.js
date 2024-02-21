
/*
 * screens = [title=0, study=1, rhythm_guide=2, scales=3, note_flashcards=4,
 *            play=5, song1=6,
 *                        song1_rhythm=7, song1_rhythm_practice=8,
 *                        song1_melody=9, song1_melody_practice=10,
 *                        song1_perform=11, song1_perform_practice=12,
 *            error_screen=13 ]
 * 
 * accuracy: passing = 70%
*/
let screen = 0;   //keeps track of the screens

// title screen buttons
let study_button, play_button;

// study screen buttons
let rhythm_guide_button, scales_button, notes_button, title_button;

// play screen buttons
let song1; //back = title_button

// song 1 screen
let song1_rhythm, song1_rhythm_practice, song1_melody, song1_melody_practice,
  song1_perform, song1_perform_practice; //back = play_button

function setup() {
  createCanvas(500, 500);

  if (screen == 0) {        // title screen
    study_button = createButton("title");
    study_button.position(50, 50);
    study_button.mousePressed(() => {
      removeElements();
      changeScene(1);
    });

    play_button = createButton("play");
    play_button.position(150, 150);
    play_button.mousePressed(() => {
      removeElements();
      changeScene(5);
    });
  }
  else if (screen == 1) {   // study screen 
    title_button = createButton("Back");
    title_button.position(0, 0);
    title_button.mousePressed(() => {
      removeElements();
      changeScene(0);
    });

    rhythm_guide_button = createButton("Rhythm Guide");
    rhythm_guide_button.position(50, 50);
    rhythm_guide_button.mousePressed(() => {
      removeElements();
      changeScene(2);
    });
    
    scales_button = createButton("Scales Reference");
    scales_button.position(50, 65);
    scales_button.mousePressed(() => {
      removeElements();
      changeScene(3);
    });

    notes_button = createButton("Note Flash Cards");
    notes_button.position(50, 80);
    notes_button.mousePressed(() => {
      removeElements();
      changeScene(4);
    })
  }
  else if (screen == 2) {   // rhythm guide screen
    // load rhythm image
  }
  else if (screen == 3) {   // scales reference screen
    // load scale image
  }
  else if (screen == 4) {   // note flashcards screen
    //
  }
  else if (screen == 5) {   // play screen
    //
  }
  else if (screen == 6) {   // song 1 screen
    //
  }
  else if (screen == 7) {   // song 1 rhythm screen
    //
  }
  else if (screen == 8) {   // song 1 rhythm practice screen
    //
  }
  else if (screen == 9) {   // song 1 melody screen
    //
  }
  else if (screen == 10) {  // song 1 melody practice screen
    //
  }
  else if (screen == 11) {  // song 1 performance screen
    //
  }
  else if (screen == 12) {  // song 1 performance practice screen
    //
  }
  else {
    background("red");
    textAlign(CENTER);
    text("error: setup() went outside the defined screens!", 50, 50);
  }
}

function draw() {
  if (screen == 0) {        // title screen
    background(220);
    textAlign(CENTER);
    text("title screen (wip)", 50, 50);
    // buttons (?)
  }
  else if (screen == 1) {   // study screen
    background(150);
    textAlign(CENTER);
    text("study (wip)", 50, 50);
  }
  else if (screen == 2) {   // rhythm guide screen
    // display rhythm image
  }
  else if (screen == 3) {   // scales reference screen
    //
  }
  else if (screen == 4) {   // note flashcards screen
    //
  }
  else if (screen == 5) {   // play screen
    //
  }
  else if (screen == 6) {   // song 1 screen
    //
  }
  else if (screen == 7) {   // song 1 rhythm screen
    //
  }
  else if (screen == 8) {   // song 1 rhythm practice screen
    //
  }
  else if (screen == 9) {   // song 1 melody screen
    //
  }
  else if (screen == 10) {  // song 1 melody practice screen
    //
  }
  else if (screen == 11) {  // song 1 performance screen
    //
  }
  else if (screen == 12) {  // song 1 performance practice screen
    //
  }
  else {
    background("red");
    textAlign(CENTER);
    text("error: draw() went outside the defined screens!", 50, 50);
  }
}

function changeScene(x) {
  switch (x) {
    case 0:
      screen = 0;   // go to title screen
      break;

    case 1:
      screen = 1;   // go to study screen
      break;
    case 2:
      screen = 2;   // go to rhythm guide
      break;
    case 3:
      screen = 3;   // go to scales guide
      break;
    case 4:
      screen = 4;   // go to note flashcards
      break;

    case 5:
      screen = 5;   // go to play screen
      break;
    case 6:
      screen = 6;   // go to song 1 screen
      break;
    case 7:
      screen = 7;   // go to song 1 rhythm
      break;
    case 8:
      screen = 8;   // go to song 1 rhythm practice
      break;
    case 9:
      screen = 9;   // go to song 1 melody
      break;
    case 10:
      screen = 10;   // go to song 1 melody practice
      break;
    case 11:
      screen = 11;   // go to song 1 performance
      break;
    case 12:
      screen = 12;   // go to song 1 performance practice
      break;
    default:
      screen = 13;   // go to error message
      break;
  }
}
