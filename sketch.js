/*
 * states = [title=0, study=1, rhythm_guide=2, scales=3, note_flashcards=4,
 *            play=5, song1=6,
 *                        song1_rhythm=7, song1_rhythm_practice=8,
 *                        song1_melody=9, song1_melody_practice=10,
 *                        song1_perform=11, song1_perform_practice=12,
 *            error=13 ]
 * 
 * accuracy: passing = 70%
 * 
 * TODO LIST
 * - connect buttons to sound (rhythm & play mode)
 * - connect buttons to interaction (rhythm & play mode)
 * - note flashcards
 * - save state / login?
 * 
 * for future reference:
 * - p5 button types: https://editor.p5js.org/jeffThompson/sketches/dmG6fvuWi
 * - hover text box: https://editor.p5js.org/xinxin/sketches/WEFVlnvSg
 * - headings: header2 = createElement('h2', 'what is your name?');
*/

/* keeps track of the states */
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
let screen;                    //current state
let time_sig_img, scale_img;   //image vars
let melodyLocked = true;       //if melody is locked (for progression)
let performLocked = true;      //if performance is locked

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

function preload() {
  // cred: teacherspayteachers.com
  time_sig_img = loadImage('assets/time-sig.jpg');
  // cred: https://pianosecrets.com/wp-content/uploads/2019/10/330xNxnotes.png.pagespeed.ic_.XQb0I4IFUy.png
  scale_img = loadImage('assets/c_scale.png');
}

function setup() {
  createCanvas(500, 500);
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
  // TODO: flashcards
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
  song1_rhythm_practice.position(250, 200);
  song1_rhythm_practice.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1rhythm_practice);
    showElements(screen);
  });

  // TODO: get rid of dev note
  song1_melody = createButton("Melody");
  song1_melody.text = melodyLocked ? "Melody 🔒" : "Melody 🔓";
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
  song1_melody_practice.position(250, 220);
  song1_melody_practice.mousePressed(() => {
    hideElements(screen);
    changeScene(scenes.s1melody_practice);
    showElements(screen);
  });

  song1_perform = createButton("Perform");
  song1_perform.text = performLocked ? "Perform 🔒" : "Perform 🔓";
  song1_perform.position(185, 240);
  song1_perform.mousePressed(() => {
    if (isLocked) {
      alert('Perform is locked until Melody has been completed.');
      console.log('dev note: press d to unlock');
    } else {
      hideElements(screen);
      changeScene(scenes.s1perform);
      showElements(screen);
    }
  });
  song1_perform_practice = createButton("Practice");
  song1_perform_practice.position(250, 240);
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

  rhythm_hit = createButton(" ");
  rhythm_hit.position(240, 450);
  rhythm_hit.mousePressed(() => {
    // TODO: make rhythm button do something
    console.log('not implemented yet');
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
  c.position(50, 400);
  c.mousePressed(() => {
    console.log('C');
  });

  c_sharp = createButton('C#');
  c_sharp.position(70, 350);
  c_sharp.mousePressed(() => {
    console.log('C#');
  });

  d = createButton('D');
  d.position(90, 400);
  d.mousePressed(() => {
    console.log('D');
  });

  d_sharp = createButton('D#');
  d_sharp.position(107, 350);
  d_sharp.mousePressed(() => {
    console.log('D#');
  });

  e = createButton('E');
  e.position(130, 400);
  e.mousePressed(() => {
    console.log('E');
  });

  f = createButton('F');
  f.position(170, 400);
  f.mousePressed(() => {
    console.log('F');
  });

  f_sharp = createButton('F#');
  f_sharp.position(190, 350);
  f_sharp.mousePressed(() => {
    console.log('F#');
  });

  g = createButton('G');
  g.position(210, 400);
  g.mousePressed(() => {
    console.log('G');
  });

  g_sharp = createButton('G#');
  g_sharp.position(227, 350);
  g_sharp.mousePressed(() => {
    console.log('G#');
  });

  a = createButton('A');
  a.position(250, 400);
  a.mousePressed(() => {
    console.log('A');
  });

  a_sharp = createButton('A#');
  a_sharp.position(265, 350);
  a_sharp.mousePressed(() => {
    console.log('A#');
  });

  b = createButton('B');
  b.position(290, 400);
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
  textSize(15);

  if (screen == scenes.title) {        // title screen
    background(220);
    textAlign(CENTER);
    text("MEOWsic", 250, 25);
  }
  else if (screen == scenes.study) {   // study screen
    background(200);
    textAlign(CENTER);
    text("Study", 445, 25);
  }
  else if (screen == scenes.rhythm_guide) {   // rhythm guide screen
    background(180);
    image(time_sig_img, 15, -48);
  }
  else if (screen == scenes.scales_ref) {   // scales reference screen
    background(160);
    textAlign(CENTER);
    text("Scales Reference", 428, 25);
    image(scale_img, 13, 150);
  }
  else if (screen == scenes.note_flashcards) {   // note flashcards screen
    // TODO: flashcards
    background(140);
    textAlign(CENTER);
    text("Note Reference", 432, 25);
  }
  else if (screen == scenes.play) {   // play screen
    background(120);
    textAlign(CENTER);
    text("Play", 440, 25);
  }
  else if (screen == scenes.song1) {   // song 1 screen
    background(100);
    textAlign(CENTER);
    text("Song 1", 440, 25);
  }
  else if (screen == scenes.s1rhythm) {   // song 1 rhythm screen
    background(80);
    textAlign(CENTER);
    text("Song 1 Rhythm", 435, 25);
  }
  else if (screen == scenes.s1rhythm_practice) {   // song 1 rhythm practice screen
    background(80);
    textAlign(CENTER);
    text("Song 1 Rhythm Practice", 430, 25);
  }
  else if (screen == scenes.s1melody) {   // song 1 melody screen
    background(60);
    textAlign(CENTER);
    text("Song 1 Melody", 435, 25);
  }
  else if (screen == scenes.s1melody_practice) {  // song 1 melody practice screen
    background(60);
    textAlign(CENTER);
    text("Song 1 Melody Practice", 430, 25);
  }
  else if (screen == scenes.s1perform) {  // song 1 performance screen
    background(40);
    textAlign(CENTER);
    text("Song 1 Performance", 430, 25);
  }
  else if (screen == scenes.s1perform_practice) {  // song 1 performance practice screen
    background(40);
    textAlign(CENTER);
    text("Song 1 Performance Practice", 425, 25);
  }
  else {
    background("red");
    fill('black');
    textAlign(CENTER);
    text("error: draw() went outside the defined screens!", 250, 75);
  }
}

function keyPressed() {
  if (key == 'd' || key == 'D') {
    melodyLocked = false;
    performLocked = false;
  }
}

/* switches scenes using the scene number to swtich to (for example, 0=title) as an input */
function changeScene(x) {
  screen = x;
}

/* hides the elements (buttons, etc.) from the screen in preperation to switch scenes */
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

/* shows the elements (buttons, etc.) on the screen after changing scenes */
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
