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
let img;          //image var

// title screen buttons
let study_button, play_button;

// study screen buttons
let rhythm_guide_button, scales_button, notes_button, title_button;

// play screen buttons
let song1_button; //back = title_button

// song 1 button
let song1_rhythm, song1_rhythm_practice, song1_melody, song1_melody_practice,
  song1_perform, song1_perform_practice; //back = play_button

// rhythm & rhythm practice buttons
let rhythm_hit;

function setup() {
  createCanvas(500, 500);

  if (screen == 0) {        // title screen
    study_button = createButton("Study");
    study_button.position(150, 200);
    study_button.mousePressed(() => {
      hideElements(0);
      changeScene(1);
    });

    play_button = createButton("Play");
    play_button.position(300, 200);
    play_button.mousePressed(() => {
      hideElements(0);
      changeScene(5);
    });
  }
  else if (screen == 1) {   // study screen 
    title_button = createButton("Back");
    title_button.position(50, 50);
    title_button.mousePressed(() => {
      hideElements(1);
      changeScene(0);     // back to title screen
    });

    rhythm_guide_button = createButton("Rhythm Guide");
    rhythm_guide_button.position(100, 50);
    rhythm_guide_button.mousePressed(() => {
      hideElements(1);
      changeScene(2);
    });

    scales_button = createButton("Scales Reference");
    scales_button.position(50, 65);
    scales_button.mousePressed(() => {
      hideElements(1);
      changeScene(3);
    });

    notes_button = createButton("Note Flash Cards");
    notes_button.position(50, 80);
    notes_button.mousePressed(() => {
      hideElements(1);
      changeScene(4);
    });
  }
  else if (screen == 2) {   // rhythm guide screen
    study_button = createButton("Back");
    study_button.position(0, 0);
    study_button.mousePressed(() => {
      hideElements(2);
      changeScene(1);     // back to study screen
    });
    // cred: teacherspayteachers.com
    img = loadImage('assets/time-sig.jpg');
  }
  else if (screen == 3) {   // scales reference screen
    study_button = createButton("Back");
    study_button.position(0, 0);
    study_button.mousePressed(() => {
      hideElements(3);
      changeScene(1);     // back to study screen
    });
    // cred: https://pianosecrets.com/wp-content/uploads/2019/10/330xNxnotes.png.pagespeed.ic_.XQb0I4IFUy.png
    img = loadImage('assets/c scale.png');
  }
  else if (screen == 4) {   // note flashcards screen
    // TODO: flashcards
    study_button = createButton("Back");
    study_button.position(0, 0);
    study_button.mousePressed(() => {
      hideElements(4);
      changeScene(1);     // back to study screen
    });
  }
  else if (screen == 5) {   // play screen
    title_button = createButton("Back");
    title_button.position(50, 50);
    title_button.mousePressed(() => {
      hideElements(5);
      changeScene(0);     // back to title screen
    });

    song1_button = createButton("Song 1");
    song1_button.position(50, 200);
    song1_button.mousePressed(() => {
      hideElements(5);
      changeScene(6);
    });
  }
  else if (screen == 6) {   // song 1 screen
    play_button = createButton("Back");
    play_button.position(0, 0);
    play_button.mousePressed(() => {
      hideElements(6);
      changeScene(5);     // back to play screen
    });

    song1_rhythm = createButton("Rhythm (Level 1)");
    song1_rhythm.position(50, 50);
    song1_rhythm.mousePressed(() => {
      hideElements(6);
      changeScene(7);
    });
    song1_rhythm_practice = createButton("Practice");
    song1_rhythm_practice.position(100, 50);
    song1_rhythm_practice.mousePressed(() => {
      hideElements(6);
      changeScene(8);
    });

    // TODO: figure out how to lock things
    song1_melody = createButton("Melody (not locked yet)");
    song1_melody.position(50, 65);
    song1_melody.mousePressed(() => {
      hideElements(6);
      changeScene(9);
    });
    song1_melody_practice = createButton("Practice");
    song1_melody_practice.position(100, 65);
    song1_melody_practice.mousePressed(() => {
      hideElements(6);
      changeScene(10);
    });

    song1_perform = createButton("Perform (not locked yet)");
    song1_perform.position(50, 80);
    song1_perform.mousePressed(() => {
      hideElements(6);
      changeScene(11);
    });
    song1_perform_practice = createButton("Practice");
    song1_perform_practice.position(100, 80);
    song1_perform_practice.mousePressed(() => {
      hideElements(6);
      changeScene(12);
    });
  }
  else if (screen == 7) {   // song 1 rhythm screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(7);
      changeScene(5);     // back to song 1 screen
    });

    rhythm_hit = createButton("");
    rhythm_hit.position(250, 450);
    rhythm_hit.mousePressed(() => {
      console.log('not implemented yet');
    });
  }
  else if (screen == 8) {   // song 1 rhythm practice screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(8);
      changeScene(5);     // back to song 1 screen
    });
  }
  else if (screen == 9) {   // song 1 melody screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(9);
      changeScene(5);     // back to song 1 screen
    });
  }
  else if (screen == 10) {  // song 1 melody practice screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(10);
      changeScene(5);     // back to song 1 screen
    });
  }
  else if (screen == 11) {  // song 1 performance screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(11);
      changeScene(5);     // back to song 1 screen
    });
  }
  else if (screen == 12) {  // song 1 performance practice screen
    song1_button = createButton("Back");
    song1_button.position(25, 25);
    song1_button.mousePressed(() => {
      hideElements(12);
      changeScene(5);     // back to song 1 screen
    });
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
    text("title screen (wip)", 50, 25);
  }
  else if (screen == 1) {   // study screen
    background(200);
    textAlign(CENTER);
    text("Study (wip)", 35, 25);
  }
  else if (screen == 2) {   // rhythm guide screen
    // TODO: display rhythm image
    background(180);
    textAlign(CENTER);
    text("rhythm guide (wip)", 50, 25);
  }
  else if (screen == 3) {   // scales reference screen
    // TODO: display scales reference
    background(160);
    textAlign(CENTER);
    text("scales ref (wip)", 50, 25);
    image(img, 75, 50, 100, 100);
  }
  else if (screen == 4) {   // note flashcards screen
    // TODO: flashcards
    background(140);
    textAlign(CENTER);
    text("note ref (wip)", 50, 25);
  }
  else if (screen == 5) {   // play screen
    background(120);
    textAlign(CENTER);
    text("Play (wip)", 30, 25);
  }
  else if (screen == 6) {   // song 1 screen
    background(100);
    textAlign(CENTER);
    text("Song 1 (wip)", 50, 25);
  }
  else if (screen == 7) {   // song 1 rhythm screen
    background(80);
    textAlign(CENTER);
    text("song 1 rhythm (wip)", 50, 25);
  }
  else if (screen == 8) {   // song 1 rhythm practice screen
    background(80);
    textAlign(CENTER);
    text("song 1 rhythm practice (wip)", 50, 25);
  }
  else if (screen == 9) {   // song 1 melody screen
    background(60);
    textAlign(CENTER);
    text("song 1 melody (wip)", 50, 25);
  }
  else if (screen == 10) {  // song 1 melody practice screen
    background(60);
    textAlign(CENTER);
    text("song 1 melody practice (wip)", 50, 25);
  }
  else if (screen == 11) {  // song 1 performance screen
    background(40);
    textAlign(CENTER);
    text("song 1 performance (wip)", 50, 25);
  }
  else if (screen == 12) {  // song 1 performance practice screen
    background(40);
    textAlign(CENTER);
    text("song 1 performance practice (wip)", 50, 25);
  }
  else {
    background("red");
    textAlign(CENTER);
    text("error: draw() went outside the defined screens!", 50, 25);
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

function hideElements(x) {
  switch (x) {
    case 0:          // hide elements from title screen
      study_button.hide();
      play_button.hide();
      break;

    case 1:          // hide elements from study screen
      title_button.hide();
      rhythm_guide_button.hide();
      scales_button.hide();
      notes_button.hide();
      break;
    case 2:          // hide elements from rhythm guide
      study_button.hide();
      img.hide();
      break;
    case 3:          // hide elements from scales guide
      study_button.hide();
      img.hide();
      break;
    case 4:          // hide elements from note flashcards
      study_button.hide();
      break;

    case 5:          // hide elements from play screen
      title_button.hide();
      song1_button.hide();
      break;
    case 6:          // hide elements from song 1 screen
      play_button.hide();
      song1_rhythm.hide();
      song1_rhythm_practice.hide();
      song1_melody.hide();
      song1_melody_practice.hide();
      song1_perform.hide();
      song1_perform_practice.hide();
      break;
    case 7:          // hide elements from song 1 rhythm
      song1_button.hide();
      rhythm_hit.hide();
      break;
    case 8:          // hide elements from song 1 rhythm practice
      song1_button.hide();
      break;
    case 9:          // hide elements from song 1 melody
      song1_button.hide();
      break;
    case 10:         // hide elements from song 1 melody practice
      song1_button.hide();
      break;
    case 11:         // hide elements from song 1 performance
      song1_button.hide();
      break;
    case 12:         // hide elements from song 1 performance practice
      song1_button.hide();
      break;
    default:         // hide elements from error message
      song1_button.hide();
      break;
  }
}
