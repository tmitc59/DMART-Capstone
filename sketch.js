/**
 * accuracy: passing = 70%
 * 
 * TODO LIST
 * - connect buttons to sound (rhythm & play mode)
 * - connect buttons to interaction (rhythm & play mode)
 * - more note flashcards
 * - save state / login?
 * 
 * for future reference:
 * - p5 button types: https://editor.p5js.org/jeffThompson/sketches/dmG6fvuWi
 * - hover text box: https://editor.p5js.org/xinxin/sketches/WEFVlnvSg
 * - headings: header2 = createElement('h2', 'what is your name?');
 * - song ex: https://p5js.org/examples/hello-p5-song.html
*/

/** the states (aka screens or scenes) in the app */
const scenes = Object.freeze({
  title: 0,
  study: 1,
  rhythm_guide: 2,
  scales_ref: 3,
  note_flashcards: 4,
  play: 5,
  song1: 6,
  s1rhythm: 7,
  s1rhythm_practice: 8,
  s1melody: 9,
  s1melody_practice: 10,
  s1perform: 11,
  s1perform_practice: 12,
  error: 13
});

/** current state / screen */  let screen;
let time_sig_img, scale_img;   //image vars
let melodyLocked = true;       //if melody is locked (for progression)
let performLocked = true;      //if performance is locked
let font;

// title screen buttons //
let study_button, play_button;

// back buttons //
let study_back_button, rg_back_button, sr_back_button, nf_back_button,
  play_back_button, s1_back_button, s1r_back_button, s1rp_back_button,
  s1m_back_button, s1mp_back_button, s1p_back_button, s1pp_back_button;

// study screen buttons //
let rhythm_guide_button, scales_button, notes_button, title_button;

// play screen buttons //
let song1_button;

// song 1 buttons //
let song1_rhythm, song1_rhythm_practice, song1_melody,
  song1_melody_practice, song1_perform, song1_perform_practice;

// note buttons (melody & performance) //
let c, c_sharp, d, d_sharp, e, f, f_sharp, g, g_sharp, a, a_sharp, b;

// rhythm button //
let rhythm_hit;

// note flashcards vars //
let cardWidth = 200, cardHeight = 150, frontColor = 100, backColor = 130;
let isFlipped = false, flipAngle = 0, flipSpeed = 10;
var flashcards = Object.freeze([
  {
    id: 0,
    front: 'C',
    back: 'C on the staff'
  },
  {
    id: 1,
    front: 'C#',
    back: 'C# on the staff'
  },
  {
    id: 2,
    front: 'D',
    back: 'D on the staff'
  },
  {
    id: 3,
    front: 'D#',
    back: 'D# on the staff'
  },
  {
    id: 4,
    front: 'E',
    back: 'E on the staff'
  },
  {
    id: 5,
    front: 'F',
    back: 'F on the staff'
  },
  {
    id: 6,
    front: 'F#',
    back: 'F# on the staff'
  },
  {
    id: 7,
    front: 'G',
    back: 'G on the staff'
  },
  {
    id: 8,
    front: 'A',
    back: 'A on the staff'
  },
  {
    id: 9,
    front: 'A#',
    back: 'A# on the staff'
  },
  {
    id: 10,
    front: 'B',
    back: 'B on the staff'
  }
]);

function preload() {
  font = loadFont('assets/inconsolata.otf');
  // cred: teacherspayteachers.com
  time_sig_img = loadImage('assets/time-sig.jpg');
  // cred: https://pianosecrets.com/wp-content/uploads/2019/10/330xNxnotes.png.pagespeed.ic_.XQb0I4IFUy.png
  scale_img = loadImage('assets/c_scale.png');
}

function setup() {
  createCanvas(500, 500, WEBGL);
  textAlign(CENTER);
  textFont(font);
  textSize(15);
  screen = 0;

  if (screen == 0) {        // title screen
    study_button = createButton("Study");
    study_button.position(150, 200);
    study_button.mousePressed(() => {
      hideElements(screen);
      changeScene(scenes.study);
      showElements(screen);
    });

    play_button = createButton("Play");
    play_button.position(300, 200);
    play_button.mousePressed(() => {
      hideElements(screen);
      changeScene(scenes.play);
      showElements(screen);
    });
  } else if (screen = scenes.error || screen >= 13) {// error screen msg
    console.log(`error: setup() went outside the defined scenes! screen = ${screen}`);
    screen = 0;
  }

  ///////////////////////////////////////////////////////////////
  //// STUDY SCENE BUTTONS ////
  study_back_button = createButton("Back");
  study_back_button.position(30, 25);
  study_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.title);     // back to title screen
    showElements(screen);
  });

  rhythm_guide_button = createButton("Rhythm Guide");
  rhythm_guide_button.position(150, 150);
  rhythm_guide_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.rhythm_guide);
    showElements(screen);
  });

  scales_button = createButton("Scales Reference");
  scales_button.position(150, 175);
  scales_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.scales_ref);
    showElements(screen);
  });

  notes_button = createButton("Note Flash Cards");
  notes_button.position(150, 200);
  notes_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.note_flashcards);
    showElements(screen);
  });

  hideElements(1);

  ///////////////////////////////////////////////////////////////
  //// RHYTHM GUIDE SCENE BUTTONS ////
  rg_back_button = createButton("Back");
  rg_back_button.position(30, 25);
  rg_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.study);     // back to study screen
    showElements(screen);
  });
  hideElements(2);

  ///////////////////////////////////////////////////////////////
  //// SCALES REFERENCE SCENE BUTTONS ////
  sr_back_button = createButton("Back");
  sr_back_button.position(30, 25);
  sr_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.study);     // back to study screen
    showElements(screen);
  });
  hideElements(3);

  ///////////////////////////////////////////////////////////////
  //// NOTE FLASHCARDS SCENE BUTTONS ////
  nf_back_button = createButton("Back");
  nf_back_button.position(30, 25);
  nf_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.study);     // back to study screen
    showElements(screen);
  });
  hideElements(4);

  ///////////////////////////////////////////////////////////////
  //// PLAY SCENE BUTTONS ////
  play_back_button = createButton("Back");
  play_back_button.position(30, 25);
  play_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.title);     // back to title screen
    showElements(screen);
  });

  song1_button = createButton("Song 1");
  song1_button.position(240, 200);
  song1_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);
    showElements(screen);
  });
  hideElements(5);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 SCENE BUTTONS ////
  s1_back_button = createButton("Back");
  s1_back_button.position(30, 25);
  s1_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.play);     // back to play screen
    showElements(screen);
  });

  song1_rhythm = createButton("Rhythm");
  song1_rhythm.position(185, 200);
  song1_rhythm.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1rhythm);
    showElements(screen);
  });
  song1_rhythm_practice = createButton("Practice");
  song1_rhythm_practice.position(270, 200);
  song1_rhythm_practice.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1rhythm_practice);
    showElements(screen);
  });

  // TODO: get rid of dev note?
  song1_melody = createButton(melodyLocked ? "Melody 🔒" : "Melody 🔓");
  song1_melody.position(185, 220);
  song1_melody.mousePressed(() => {
    if (melodyLocked) {
      alert('Melody is locked until Rhythm has been completed.');
      console.log('dev note: press d to unlock.');
    } else {
      hideElements(screen);
      changeScene(scenes.s1melody);
      showElements(screen);
    }
  });
  song1_melody_practice = createButton("Practice");
  song1_melody_practice.position(270, 221);
  song1_melody_practice.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1melody_practice);
    showElements(screen);
  });

  song1_perform = createButton(performLocked ? "Perform 🔒" : "Perform 🔓");
  song1_perform.position(185, 242);
  song1_perform.mousePressed(() => {
    if (performLocked) {
      alert('Perform is locked until Melody has been completed.');
      console.log('dev note: press d to unlock');
    } else {
      hideElements(screen);
      changeScene(scenes.s1perform);
      showElements(screen);
    }
  });
  song1_perform_practice = createButton("Practice");
  song1_perform_practice.position(270, 241);
  song1_perform_practice.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1perform_practice);
    showElements(screen);
  });

  hideElements(6);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 RHYTHM SCENE BUTTONS ////
  s1r_back_button = createButton("Back");
  s1r_back_button.position(30, 25);
  s1r_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  rhythm_hit = createButton("Press");
  rhythm_hit.position(240, 450);
  rhythm_hit.mousePressed(() => {
    // TODO: make rhythm button do something
    console.log('rhythm hit!');
  });

  hideElements(7);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 RHYTHM PRACTICE SCENE BUTTONS ////
  s1rp_back_button = createButton("Back");
  s1rp_back_button.position(30, 25);
  s1rp_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  hideElements(8);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 MELODY SCENE BUTTONS ////
  s1m_back_button = createButton("Back");
  s1m_back_button.position(30, 25);
  s1m_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  c = createButton('C');
  c.position(150, 450);
  c.mousePressed(() => {
    console.log('C');
  });

  c_sharp = createButton('C#');
  c_sharp.position(170, 400);
  c_sharp.mousePressed(() => {
    console.log('C#');
  });

  d = createButton('D');
  d.position(190, 450);
  d.mousePressed(() => {
    console.log('D');
  });

  d_sharp = createButton('D#');
  d_sharp.position(207, 400);
  d_sharp.mousePressed(() => {
    console.log('D#');
  });

  e = createButton('E');
  e.position(230, 450);
  e.mousePressed(() => {
    console.log('E');
  });

  f = createButton('F');
  f.position(270, 450);
  f.mousePressed(() => {
    console.log('F');
  });

  f_sharp = createButton('F#');
  f_sharp.position(290, 400);
  f_sharp.mousePressed(() => {
    console.log('F#');
  });

  g = createButton('G');
  g.position(310, 450);
  g.mousePressed(() => {
    console.log('G');
  });

  g_sharp = createButton('G#');
  g_sharp.position(327, 400);
  g_sharp.mousePressed(() => {
    console.log('G#');
  });

  a = createButton('A');
  a.position(350, 450);
  a.mousePressed(() => {
    console.log('A');
  });

  a_sharp = createButton('A#');
  a_sharp.position(365, 400);
  a_sharp.mousePressed(() => {
    console.log('A#');
  });

  b = createButton('B');
  b.position(390, 450);
  b.mousePressed(() => {
    console.log('B');
  });

  hideElements(9);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 MELODY PRACTICE SCENE BUTTONS ////
  s1mp_back_button = createButton("Back");
  s1mp_back_button.position(30, 25);
  s1mp_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  hideElements(10);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 PERFORMANCE SCENE BUTTONS ////
  s1p_back_button = createButton("Back");
  s1p_back_button.position(30, 25);
  s1p_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  hideElements(11);

  ///////////////////////////////////////////////////////////////
  //// SONG 1 PERFORMANCE PRACTICE SCENE BUTTONS ////
  s1pp_back_button = createButton("Back");
  s1pp_back_button.position(30, 25);
  s1pp_back_button.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.song1);     // back to song 1 screen
    showElements(screen);
  });

  hideElements(12);
}

function draw() {
  if (screen == scenes.title) {        // title screen
    background('220');
    fill('black');
    text("MEOWsic", 0, -190);
  }
  else if (screen == scenes.study) {   // study screen
    background(200);
    fill('black');
    text("Study", 0, -190);
  }
  else if (screen == scenes.rhythm_guide) {   // rhythm guide screen
    background(180);
    image(time_sig_img, -235, -298);
  }
  else if (screen == scenes.scales_ref) {   // scales reference screen
    background(160);
    fill('black');
    text("Scales Reference", 0, -190);
    image(scale_img, -235, -100);
  }
  else if (screen == scenes.note_flashcards) {   // note flashcards screen
    background(200);
    text("Note Reference", 432, 25);

    // draw the card's shape
    rotateY(radians(flipAngle));
    fill(isFlipped ? backColor : frontColor);
    rectMode(CENTER);
    rect(0, 0, cardWidth, cardHeight);

    // draw text
    fill('black');
    if (isFlipped) {
      push();
      rotateY(PI);
      text(flashcards[1].front, 0, 0);
      pop();
    } else {
      text(flashcards[1].back, 0, 0);
    }
    // TODO: implement more flashcards
  }
  else if (screen == scenes.play) {   // play screen
    background(120);
    fill('black');
    text("Play", 0, -190);
  }
  else if (screen == scenes.song1) {   // song 1 screen
    background(119);
    fill('black');
    text("Song 1", 0, -190);
  }
  else if (screen == scenes.s1rhythm) {   // song 1 rhythm screen
    background(90);
    text("Song 1 Rhythm", 0, -190);
    // Generate lines for the background
    stroke(255); // Set line color to white
    strokeWeight(4); // Set line thickness
    let lineSpacing = 20; // Spacing between lines
    for (let y = 0; y < height; y += lineSpacing) {
      line(-150, -150, -150, 150); // Draw horizontal lines
      line(-200, -10, 200, -10); // Draw vertical lines
    }
  }
  else if (screen == scenes.s1rhythm_practice) {   // song 1 rhythm practice screen
    background(90);
    text("Song 1 Rhythm Practice", 0, -190);
  }
  else if (screen == scenes.s1melody) {   // song 1 melody screen
    background(80);
    text("Song 1 Melody", 0, -190);
    // Generate lines for the background
    //TODO make lines smaller
    stroke(255); // Set line color to white
    strokeWeight(4); // Set line thickness
    let numLines = 5; // Number of horizontal lines
    let lineSpacing = height / (numLines + 5); // Spacing between lines
    for (let i = 1; i <= numLines; i++) {
        let y = i * lineSpacing;
        line(-215, y-150, 200, y-150); // Draw horizontal lines
    }
        strokeWeight(4); // Set line thickness
    line(-150, 175, -150, -175); // Draw vertical line
  }
  else if (screen == scenes.s1melody_practice) {  // song 1 melody practice screen
    background(80);
    text("Song 1 Melody Practice", 0, -190);
  }
  else if (screen == scenes.s1perform) {  // song 1 performance screen
    background(80);
    text("Song 1 Performance", 0, -190);
  }
  else if (screen == scenes.s1perform_practice) {  // song 1 performance practice screen
    background(80);
    text("Song 1 Performance Practice", 0, -190);
  }
  else {
    background('red');
    fill('black');
    text("error: draw() went outside the defined screens!", -235, -100);
  }
}

/** flip animation for the note flashcards */
function flipAnimation() {
  let targetAngle = isFlipped ? 180 : 0;
  if (flipAngle < targetAngle) {
    flipAngle += flipSpeed;
    requestAnimationFrame(flipAnimation);
  }
}

function keyPressed() {
  if (key == 'd' || key == 'D') {
    melodyLocked = false;
    performLocked = false;
  }
}

/** event handler for clicking inside the flashcard */
function mouseClicked() {
  // check if mouse is within the card bounds
  if (
    mouseX > width / 2 - cardWidth / 2 &&
    mouseX < width / 2 + cardWidth / 2 &&
    mouseY > height / 2 - cardHeight / 2 &&
    mouseY < height / 2 + cardHeight / 2
  ) {
    // flip the card
    isFlipped = !isFlipped;
    flipAngle = 0;
    flipAnimation();
  }
}

/**
 * switches scenes
 * @param {!scenes} x change current screen to this screen number
 */
function changeScene(x) {
  screen = x;
}

/**
 * hides the elements (buttons, etc.) from the screen, usually before switching scenes
 * @param {!scenes} x screen whose elements you're attempting to hide
 */
function hideElements(x) {
  switch (x) {
    case 0:          // hide elements from title screen
      study_button.hide();
      play_button.hide();
      break;

    case 1:          // hide elements from study screen
      study_back_button.hide();
      rhythm_guide_button.hide();
      scales_button.hide();
      notes_button.hide();
      break;
    case 2:          // hide elements from rhythm guide
      rg_back_button.hide();
      break;
    case 3:          // hide elements from scales guide
      sr_back_button.hide();
      break;
    case 4:          // hide elements from note flashcards
      nf_back_button.hide();
      break;

    case 5:          // hide elements from play screen
      play_back_button.hide();
      song1_button.hide();
      break;
    case 6:          // hide elements from song 1 screen
      s1_back_button.hide();
      song1_rhythm.hide();
      song1_rhythm_practice.hide();
      song1_melody.hide();
      song1_melody_practice.hide();
      song1_perform.hide();
      song1_perform_practice.hide();
      break;
    case 7:          // hide elements from song 1 rhythm
      s1r_back_button.hide();
      rhythm_hit.hide();
      break;
    case 8:          // hide elements from song 1 rhythm practice
      s1rp_back_button.hide();
      rhythm_hit.hide();
      break;
    case 9:          // hide elements from song 1 melody
      s1m_back_button.hide();
      c.hide();
      c_sharp.hide();
      d.hide();
      d_sharp.hide();
      e.hide();
      f.hide();
      f_sharp.hide();
      g.hide();
      g_sharp.hide();
      a.hide();
      a_sharp.hide();
      b.hide();
      break;
    case 10:         // hide elements from song 1 melody practice
      s1mp_back_button.hide();
      c.hide();
      c_sharp.hide();
      d.hide();
      d_sharp.hide();
      e.hide();
      f.hide();
      f_sharp.hide();
      g.hide();
      g_sharp.hide();
      a.hide();
      a_sharp.hide();
      b.hide();
      break;
    case 11:         // hide elements from song 1 performance
      s1p_back_button.hide();
      c.hide();
      c_sharp.hide();
      d.hide();
      d_sharp.hide();
      e.hide();
      f.hide();
      f_sharp.hide();
      g.hide();
      g_sharp.hide();
      a.hide();
      a_sharp.hide();
      b.hide();
      break;
    case 12:         // hide elements from song 1 performance practice
      s1pp_back_button.hide();
      c.hide();
      c_sharp.hide();
      d.hide();
      d_sharp.hide();
      e.hide();
      f.hide();
      f_sharp.hide();
      g.hide();
      g_sharp.hide();
      a.hide();
      a_sharp.hide();
      b.hide();
      break;
    default:         // hide elements from error message
      break;
  }
}

/**
 * shows the elements (buttons, etc.) on the screen, usually after changing scenes
 * @param {!scenes} x screen whose elements you're attempting to show
 */
function showElements(x) {
  switch (x) {
    case 0:          // hide elements from title screen
      study_button.show();
      play_button.show();
      break;

    case 1:          // hide elements from study screen
      study_back_button.show();
      rhythm_guide_button.show();
      scales_button.show();
      notes_button.show();
      break;
    case 2:          // hide elements from rhythm guide
      rg_back_button.show();
      break;
    case 3:          // hide elements from scales guide
      sr_back_button.show();
      break;
    case 4:          // hide elements from note flashcards
      nf_back_button.show();
      break;

    case 5:          // hide elements from play screen
      play_back_button.show();
      song1_button.show();
      break;
    case 6:          // hide elements from song 1 screen
      s1_back_button.show();
      song1_rhythm.show();
      song1_rhythm_practice.show();
      song1_melody.show();
      song1_melody_practice.show();
      song1_perform.show();
      song1_perform_practice.show();
      break;
    case 7:          // hide elements from song 1 rhythm
      s1r_back_button.show();
      rhythm_hit.show();
      break;
    case 8:          // hide elements from song 1 rhythm practice
      s1rp_back_button.show();
      rhythm_hit.show();
      break;
    case 9:          // hide elements from song 1 melody
      s1m_back_button.show();
      c.show();
      c_sharp.show();
      d.show();
      d_sharp.show();
      e.show();
      f.show();
      f_sharp.show();
      g.show();
      g_sharp.show();
      a.show();
      a_sharp.show();
      b.show();
      break;
    case 10:         // hide elements from song 1 melody practice
      s1mp_back_button.show();
      c.show();
      c_sharp.show();
      d.show();
      d_sharp.show();
      e.show();
      f.show();
      f_sharp.show();
      g.show();
      g_sharp.show();
      a.show();
      a_sharp.show();
      b.show();
      break;
    case 11:         // hide elements from song 1 performance
      s1p_back_button.show();
      c.show();
      c_sharp.show();
      d.show();
      d_sharp.show();
      e.show();
      f.show();
      f_sharp.show();
      g.show();
      g_sharp.show();
      a.show();
      a_sharp.show();
      b.show();
      break;
    case 12:         // hide elements from song 1 performance practice
      s1pp_back_button.show();
      c.show();
      c_sharp.show();
      d.show();
      d_sharp.show();
      e.show();
      f.show();
      f_sharp.show();
      g.show();
      g_sharp.show();
      a.show();
      a_sharp.show();
      b.show();
      break;
    default:         // hide elements from error message
      break;
  }
}
