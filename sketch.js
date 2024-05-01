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
 * - FLASHCARD IMAGES: https://www.quia.com/jg/1622622list.html
 * 
 * headings: header2 = createElement('h2', 'what is your name?');
 * 
 * button styling
 * - change text color: button.style('color', 'black');
 * - change button color: button.style('background-color', 'yellow');
 * - change text size: button.style('font-size', '44px');
 * - change button size: button.style('width', '300px');
 * - hover: button.mouseOver(function);
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
    start_screen: 13,
    error: 14
});

/** current state / screen */  let screen;
let melodyLocked = true;       //if melody is locked (for progression)
let performLocked = true;      //if performance is locked
let font;

// image vars //
let time_sig_img, scale_img, title_piano_img, piano_img, button_img,
    bg_img, c_img, d_img, e_img, f_img, g_img, a_img, b_img, cat_img;

// start screen buttons //
let get_started;

// title screen buttons //
let study_button, play_button;

// back buttons //
let study_back_button, rg_back_button, sr_back_button, nf_back_button,
    play_back_button, s1_back_button, s1r_back_button, s1rp_back_button,
    s1m_back_button, s1mp_back_button, s1p_back_button, s1pp_back_button,
    title_back_button;

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
let rhythm_hit = false;

// Rhythm guide variables
let lastSpawnTime = 0;
let spawnInterval = 4000; // Interval between circle spawns in milliseconds
let numCirclesSpawned = 0; // Number of circles spawned

// Arrays to store circle positions
let circleXPositions = [];
let circleYPosition = -10;

// Scoring variables
let score = 0;
let scoringWindow = 100; // Scoring window in pixels

let rhythmHit = false; // Flag to indicate if rhythm hit occurred

let song; // Variable to store the song

// music/sound variables //
let noteSynth = new p5.MonoSynth();

// note flashcards vars //
let cardWidth = 200, cardHeight = 150, frontColor = 100, backColor = 130;
let isFlipped = false, flipAngle = 0, flipSpeed = 10;
var flashcards = Object.freeze([
    {
        // id: 0,
        front: 'C',
        back: c_img
    },
    {
        // id: 1,
        front: 'C#',
        back: 'C# on the staff'
    },
    {
        // id: 2,
        front: 'D',
        back: d_img
    },
    {
        // id: 3,
        front: 'D#',
        back: 'D# on the staff'
    },
    {
        // id: 4,
        front: 'E',
        back: e_img
    },
    {
        // id: 5,
        front: 'F',
        back: f_img
    },
    {
        // id: 6,
        front: 'F#',
        back: 'F# on the staff'
    },
    {
        // id: 7,
        front: 'G',
        back: g_img
    },
    {
        // id: 8,
        front: 'A',
        back: a_img
    },
    {
        // id: 9,
        front: 'A#',
        back: 'A# on the staff'
    },
    {
        // id: 10,
        front: 'B',
        back: b_img
    }
]);

function preload() {
    font = loadFont('assets/inconsolata.otf');        // cred: https://www.1001fonts.com/inconsolata-font.html
    time_sig_img = loadImage('assets/time-sig.jpg');  // cred: teacherspayteachers.com
    scale_img = loadImage('assets/c_scale.png');      // cred: https://pianosecrets.com/wp-content/uploads/2019/10/330xNxnotes.png.pagespeed.ic_.XQb0I4IFUy.png

    // cred: https://www.quia.com/jg/1622622list.html
    // note flashcard images //
    flashcards[0].back = loadImage('assets/middle-c.png');
    flashcards[2].back = loadImage('assets/d.png');
    flashcards[4].back = loadImage('assets/e.png');
    flashcards[5].back = loadImage('assets/f.png');
    flashcards[7].back = loadImage('assets/g.png');
    flashcards[8].back = loadImage('assets/a.png');
    flashcards[10].back = loadImage('assets/b.png');

    // original art created by Yongqi Ding and Skylar Norton
    title_piano_img = loadImage('assets/meowsic_piano.png');
    piano_img = loadImage('assets/piano.png')
    button_img = loadImage('assets/button_bg.png');
    bg_img = loadImage('assets/app_bg.jpeg');
    cat_img = loadImage('assets/cat.png')

    // original music created by Taylor Stoddard
    song = loadSound('assets/song1_Scales_melodyOnly.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(15);
    screen = 13;

    if (screen == scenes.start_screen) {        // get started screen
        get_started = createButton("GET STARTED");
        get_started.position(200, 600);
        get_started.mousePressed(() => {
            userStartAudio();  // starts audio in the browser with user action
            hideElements(screen);
            changeScene(scenes.title);
            showElements(screen);
        });
        get_started.style('background-color:black');
        get_started.style('color:white');
        get_started.style('font-weight:bold');
        get_started.style('justify-content:center');
    } else if (screen = scenes.error || screen >= 14) {// error screen msg
        console.log(`error: setup() went outside the defined scenes! screen = ${screen}`);
        screen = 0;
    }


    ///////////////////////////////////////////////////////////////
    //// TITLE SCREEN BUTTONS ////
    title_back_button = createButton("Back");
    title_back_button.position(30, 25);
    title_back_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.start_screen);
        showElements(screen);
    });
    title_back_button.class('back-buttons');

    study_button = createButton("Study");
    study_button.position(150, 250);
    study_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.study);
        showElements(screen);
    });
    study_button.class('title-buttons');

    play_button = createButton("Play");
    play_button.position(150, 550);
    play_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.play);
        showElements(screen);
    });
    play_button.class('title-buttons');

    hideElements(0);

    ///////////////////////////////////////////////////////////////
    //// STUDY SCENE BUTTONS ////
    study_back_button = createButton("Back");
    study_back_button.position(30, 25);
    study_back_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.title);     // back to title screen
        showElements(screen);
    });
    study_back_button.class('back-buttons');

    rhythm_guide_button = createButton("Rhythm Guide");
    rhythm_guide_button.position(145, 253);
    rhythm_guide_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.rhythm_guide);
        showElements(screen);
    });
    rhythm_guide_button.class('buttons');

    scales_button = createButton("Scales Reference");
    scales_button.position(125, 405);
    scales_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.scales_ref);
        showElements(screen);
    });
    scales_button.class('buttons');

    notes_button = createButton("Note Flash Cards");
    notes_button.position(125, 554);
    notes_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.note_flashcards);
        showElements(screen);
    });
    notes_button.class('buttons');

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
    rg_back_button.class('back-buttons');
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
    sr_back_button.class('back-buttons');
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
    nf_back_button.class('back-buttons');
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
    play_back_button.class('back-buttons');

    // change to match placard
    song1_button = createButton("Song 1");
    song1_button.position(154, 398);
    song1_button.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.song1);
        showElements(screen);
    });
    song1_button.class('title-buttons');
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
    s1_back_button.class('back-buttons');

    song1_rhythm = createButton("Rhythm");
    song1_rhythm.position(180, 253);
    song1_rhythm.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.s1rhythm);
        showElements(screen);
    });
    song1_rhythm.class('buttons');
    song1_rhythm_practice = createButton("Rhythm Practice");
    song1_rhythm_practice.position(386, 255);
    song1_rhythm_practice.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.s1rhythm_practice);
        showElements(screen);
    });
    song1_rhythm_practice.class('buttons');

    // TODO: get rid of dev note?
    song1_melody = createButton(melodyLocked ? "Melody 🔒" : "Melody 🔓");
    song1_melody.position(166, 400);
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
    song1_melody.class('buttons');
    song1_melody_practice = createButton("Melody Practice");
    song1_melody_practice.position(386, 405);
    song1_melody_practice.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.s1melody_practice);
        showElements(screen);
    });
    song1_melody_practice.class('buttons');

    song1_perform = createButton(performLocked ? "Perform 🔒" : "Perform 🔓");
    song1_perform.position(164, 552);
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
    song1_perform.class('buttons');
    song1_perform_practice = createButton("Perform. Practice");
    song1_perform_practice.position(373, 555);
    song1_perform_practice.mousePressed(() => {
        hideElements(screen);
        changeScene(scenes.s1perform_practice);
        showElements(screen);
    });
    song1_perform_practice.class('buttons');

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
    s1r_back_button.class('back-buttons');

    rhythm_hit = createButton("Press");
    rhythm_hit.position(240, 450);
    rhythm_hit.mousePressed(() => {
        // Remove all circles when the rhythm button is pressed
        circleXPositions = [];
        rhythmHit = true; // Set rhythm hit flag
        console.log('rhythm hit!');
    });
    rhythm_hit.class('back-buttons');

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
    s1rp_back_button.class('back-buttons');

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
    s1m_back_button.class('back-buttons');

    c = createButton('C');
    c.position(150, 450);
    c.mousePressed(() => {
        noteSynth.play('C4');
    });
    c.class('back-buttons');

    c_sharp = createButton('C#');
    c_sharp.position(170, 400);
    c_sharp.mousePressed(() => {
        noteSynth.play('C#4');
    });
    c_sharp.class('back-buttons');

    d = createButton('D');
    d.position(190, 450);
    d.mousePressed(() => {
        noteSynth.play('D4');
    });
    d.class('back-buttons');

    d_sharp = createButton('D#');
    d_sharp.position(207, 400);
    d_sharp.mousePressed(() => {
        noteSynth.play('D#4');
    });
    d_sharp.class('back-buttons');

    e = createButton('E');
    e.position(230, 450);
    e.mousePressed(() => {
        noteSynth.play('E4');
    });
    e.class('back-buttons');

    f = createButton('F');
    f.position(270, 450);
    f.mousePressed(() => {
        noteSynth.play('F4');
    });
    f.class('back-buttons');

    f_sharp = createButton('F#');
    f_sharp.position(290, 400);
    f_sharp.mousePressed(() => {
        noteSynth.play('F#4');
    });
    f_sharp.class('back-buttons');

    g = createButton('G');
    g.position(310, 450);
    g.mousePressed(() => {
        noteSynth.play('G4');
    });
    g.class('back-buttons');

    g_sharp = createButton('G#');
    g_sharp.position(327, 400);
    g_sharp.mousePressed(() => {
        noteSynth.play('G#4');
    });
    g_sharp.class('back-buttons');

    a = createButton('A');
    a.position(350, 450);
    a.mousePressed(() => {
        noteSynth.play('A5');
    });
    a.class('back-buttons');

    a_sharp = createButton('A#');
    a_sharp.position(365, 400);
    a_sharp.mousePressed(() => {
        noteSynth.play('A#5');
    });
    a_sharp.class('back-buttons');

    b = createButton('B');
    b.position(390, 450);
    b.mousePressed(() => {
        noteSynth.play('B5');
    });
    b.class('back-buttons');

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
    s1mp_back_button.class('back-buttons');

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
    s1p_back_button.class('back-buttons');

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
    s1pp_back_button.class('back-buttons');

    hideElements(12);
}

function draw() {
    background('#760F13');
    image(bg_img, -770, -460, windowWidth, windowHeight+24);

    if (screen == scenes.title) {        // title screen
        fill('white');
        text("MEOWsic", 0, -390);
        image(button_img, -685, 70, 255, 124);
        image(button_img, -685, -230, 255, 124);
        image(piano_img, -650, -463, 1369, 1024);
    }
    else if (screen == scenes.study) {   // study screen
        fill('white');
        text("Study", 0, -390);
        image(button_img, -685, 70, 255, 124);
        image(button_img, -685, -80, 255, 124);
        image(button_img, -685, -230, 255, 124);
        image(cat_img, 105, -100, 400, 450);
    }
    else if (screen == scenes.rhythm_guide) {   // rhythm guide screen
        fill('white');
        text("Rhythm Guide", 0, -390);
        image(time_sig_img, -235, -298);
    }
    else if (screen == scenes.scales_ref) {   // scales reference screen
        fill('white');
        text("Scales Reference", 0, -390);
        image(scale_img, -235, -100);
    }
    else if (screen == scenes.note_flashcards) {   // note flashcards screen
        fill('white');
        text("Note Reference", 0, -390);

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
            image(flashcards[0].back, -52, -45, 100, 100);
            pop();
        } else {
            text(flashcards[0].front, 0, 0);
        }
        // TODO: implement more flashcards
    }
    else if (screen == scenes.play) {   // play screen
        fill('white');
        text("Play", 0, -390);
        image(button_img, -685, -80, 255, 124);
        image(cat_img, 105, -100, 400, 450);
    }
    else if (screen == scenes.song1) {   // song 1 screen
        fill('white');
        text("Song 1", 0, -390);
        image(button_img, -685, 70, 255, 124);
        image(button_img, -685, -80, 255, 124);
        image(button_img, -685, -230, 255, 124);
        image(button_img, -430, 70, 255, 124);
        image(button_img, -430, -80, 255, 124);
        image(button_img, -430, -230, 255, 124);
        image(cat_img, 105, -100, 400, 450);
    }
    else if (screen == scenes.s1rhythm) {   // song 1 rhythm screen
        background(90);
        text("Song 1 Rhythm", 0, -190);
        // Display score on screen
        textSize(24);
        fill(255);
        text("Score: " + score, -windowWidth / 2 + 20, windowHeight / 2 - 40);

        // Generate lines for the background
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let lineSpacing = 20; // Spacing between lines
        for (let y = 0; y < height; y += lineSpacing) {
            line(-150, -150, -150, 150); // Draw horizontal lines
            line(-200, -10, 200, -10); // Draw vertical lines
        }

        // Check if it's time to spawn a circle
        if (millis() - lastSpawnTime > spawnInterval && numCirclesSpawned < 10) {
            spawnCircle(); // Spawn a circle
            lastSpawnTime = millis(); // Update last spawn time
            numCirclesSpawned++; // Increment the number of circles spawned
        }

        // Move and display existing circles
        strokeWeight(1);
        fill(255, 0, 0); // Set circle color to red
        let circleSize = 25; // Size of circles
        // Move and display existing circles
        for (let i = 0; i < circleXPositions.length; i++) {
            ellipse(circleXPositions[i], circleYPosition, circleSize, circleSize); // Draw circle
            circleXPositions[i] -= 2; // Move the circle to the right

            // Check if the circle is within the scoring window
            if (circleXPositions[i] <= -150 + scoringWindow && circleXPositions[i] >= -150 - scoringWindow) {
                // Increment score if the circle is within the window
                if (scoreCheck()) {
                    score++;
                    console.log('Score: ', score);
                }
                // Reset rhythmHit flag
                rhythmHit = false;
            }

            // Remove circles that reach the end of the line
            if (circleXPositions[i] <= -200) {
                circleXPositions.splice(i, 1);
                i--; // Decrement i to account for removed circle
            }
        }
    }
    else if (screen == scenes.s1rhythm_practice) {   // song 1 rhythm practice screen
        background(90);
        text("Song 1 Rhythm", 0, -190);
        // Display score on screen
        textSize(24);
        fill(255);
        text("Score: " + score, -windowWidth / 2 + 20, windowHeight / 2 - 40);

        // Generate lines for the background
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let lineSpacing = 20; // Spacing between lines
        for (let y = 0; y < height; y += lineSpacing) {
            line(-150, -150, -150, 150); // Draw horizontal lines
            line(-200, -10, 200, -10); // Draw vertical lines
        }

        // Check if it's time to spawn a circle
        if (millis() - lastSpawnTime > spawnInterval && numCirclesSpawned < 10) {
            spawnCircle(); // Spawn a circle
            lastSpawnTime = millis(); // Update last spawn time
            numCirclesSpawned++; // Increment the number of circles spawned
        }

        // Move and display existing circles
        strokeWeight(1);
        fill(255, 0, 0); // Set circle color to red
        let circleSize = 25; // Size of circles
        // Move and display existing circles
        for (let i = 0; i < circleXPositions.length; i++) {
            ellipse(circleXPositions[i], circleYPosition, circleSize, circleSize); // Draw circle
            circleXPositions[i] -= 2; // Move the circle to the right

            // Check if the circle is within the scoring window
            if (circleXPositions[i] <= -150 + scoringWindow && circleXPositions[i] >= -150 - scoringWindow) {
                // Increment score if the circle is within the window
                if (scoreCheck()) {
                    score++;
                    console.log('Score: ', score);
                }
                // Reset rhythmHit flag
                rhythmHit = false;
            }

            // Remove circles that reach the end of the line
            if (circleXPositions[i] <= -200) {
                circleXPositions.splice(i, 1);
                i--; // Decrement i to account for removed circle
            }
        }
    }
    else if (screen == scenes.s1melody) {   // song 1 melody screen
        fill('white');
        text("Song 1 Melody", 0, -390);
        // Generate lines for the background
        //TODO make lines smaller
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let numLines = 5; // Number of horizontal lines
        let lineSpacing = height / (numLines + 5); // Spacing between lines
        for (let i = 1; i <= numLines; i++) {
            let y = i * lineSpacing;
            line(-215, y - 150, 200, y - 150); // Draw horizontal lines
        }
        strokeWeight(4); // Set line thickness
        line(-150, 175, -150, -175); // Draw vertical line
    }
    else if (screen == scenes.s1melody_practice) {  // song 1 melody practice screen
        fill('white');
        text("Song 1 Melody Practice", 0, -390);
        // Generate lines for the background
        //TODO make lines smaller
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let numLines = 5; // Number of horizontal lines
        let lineSpacing = height / (numLines + 5); // Spacing between lines
        for (let i = 1; i <= numLines; i++) {
            let y = i * lineSpacing;
            line(-215, y - 150, 200, y - 150); // Draw horizontal lines
        }
        strokeWeight(4); // Set line thickness
        line(-150, 175, -150, -175); // Draw vertical line
    }
    else if (screen == scenes.s1perform) {  // song 1 performance screen
        fill('white');
        text("Song 1 Performance", 0, -390);
        // Generate lines for the background
        //TODO make lines smaller
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let numLines = 5; // Number of horizontal lines
        let lineSpacing = height / (numLines + 5); // Spacing between lines
        for (let i = 1; i <= numLines; i++) {
            let y = i * lineSpacing;
            line(-215, y - 150, 200, y - 150); // Draw horizontal lines
        }
        strokeWeight(4); // Set line thickness
        line(-150, 175, -150, -175); // Draw vertical line
    }
    else if (screen == scenes.s1perform_practice) {  // song 1 performance practice screen
        fill('white');
        text("Song 1 Performance Practice", 0, -390);
        // Generate lines for the background
        //TODO make lines smaller
        stroke(255); // Set line color to white
        strokeWeight(4); // Set line thickness
        let numLines = 5; // Number of horizontal lines
        let lineSpacing = height / (numLines + 5); // Spacing between lines
        for (let i = 1; i <= numLines; i++) {
            let y = i * lineSpacing;
            line(-215, y - 150, 200, y - 150); // Draw horizontal lines
        }
        strokeWeight(4); // Set line thickness
        line(-150, 175, -150, -175); // Draw vertical line
    }
    else if (screen == scenes.start_screen) {
        fill('white');
        text('Music Education Online Workshop', -445, 0);
        image(title_piano_img, -650, -463, 1369, 1024);
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

function spawnCircle() {
    let xPos = 200; // Fixed x-position for all circles
    circleXPositions.push(xPos); // Store the x-position of the circle
}

function keyPressed() {
    if (key == 'd' || key == 'D') {
        melodyLocked = false;
        performLocked = false;
    }

    // Remove all circles when the 'g' key is pressed
    if (key === 'g') {
        circleXPositions = [];
        console.log('g key pressed!');
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

function scoreCheck() {
    // Check if 'rhythm hit!' occurred and circle is on top of the lines
    if (rhythmHit) {
        for (let i = 0; i < circleXPositions.length; i++) {
            if (circleXPositions[i] <= -150 + scoringWindow && circleXPositions[i] >= -150 - scoringWindow) {
                console.log('rhythm hit!');
                rhythmHit = false; // Reset rhythm hit flag
                return true;
            }
        }
    }
    return false;
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
            title_back_button.hide();
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
        case 13:         // hide elements from start screen
            get_started.hide();
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
            title_back_button.show();
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
        case 13:
            get_started.show();
        default:         // hide elements from error message
            break;
    }
}