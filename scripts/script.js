const Random = require('Random');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics')
const FaceTracking = require('FaceTracking');

const names = ['creep', 'stalker', 'loner', 'weirdo', 'sad', 'social media addict', 'insecure', 'jealous', 'self sabotaging', 'anger problem', 'anxious', 'narcissist', 'attention seeker', 'inhibited', 'cautious', 'skeptic', 'not ok', 'distant', 'misanthrope', 'naive', 'disillusioned',
'hopeless'];

/**
 * Calculates a random category and percentage and sets label.text to the new
 * values, seperated by a newline.
 * 
 * @param {any} label, the scene object for which the text should be changed 
 */
async function newDisp(label) {
  const prediction = names[Math.floor(Random.random()*names.length)];
  const confidence = Math.round(Random.random()*10000)/100+'%';
  label.text = Reactive.val(prediction + '\n' + confidence);
  Diagnostics.log("new trait: " + prediction + 
    ", " + confidence);
}

/**
 * Maps the canvas to the coordinates of face i.
 * Subscribes to face.isTracked and onTap, to calculate new a new text and 
 * percentage when an event is triggered.
 * 
 * @param {number} i the index of the face
 */
async function mapFace(i) {
  const face = FaceTracking.face(i);
  const canvas = await Scene.root.findFirst('face_'+i);
  const label = await Scene.root.findFirst('label_'+i);

  //map face coordinates to canvas
  canvas.transform.x = face.cameraTransform.x;
  canvas.transform.y = face.cameraTransform.y;
  canvas.transform.z = face.cameraTransform.z;
  canvas.hidden = Reactive.not(face.isTracked);

  //make new prediction when the face becomes visible
  face.isTracked.monitor({fireOnInitialValue: true}).subscribe(function(e) {
      if (e.newValue) newDisp(label);
    });

  //make new prediction on tap
  TouchGestures.onTap().subscribe(function() {
    newDisp(label);
  });
};

//initialize 4 face predictions
mapFace(0);
mapFace(1);
mapFace(2);
mapFace(3);

