const Random = require('Random');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics')
const FaceTracking = require('FaceTracking');

const names = ['creep', 'stalker', 'loner', 'weirdo', 'sad', 'social media addict', 'insecure', 'jealous', 'self sabotaging', 'anger problem', 'anxious', 'narcissist', 'attention seeker', 'inhibited', 'cautious', 'skeptic', 'not ok', 'distant', 'misanthrope', 'naive', 'disillusioned',
'hopeless'];

async function newDisp(label) {
  let prediction = names[Math.floor(Random.random()*names.length)];
  let confidence = Math.round(Random.random()*10000)/100+'%';
  label.text = Reactive.val(prediction + '\n' + confidence);
  Diagnostics.log("new trait: " + prediction + 
    ", " + confidence);
}

async function mapFace(i) {
  let face = FaceTracking.face(i);
  let canvas = await Scene.root.findFirst('face_'+i);
  Diagnostics.log(canvas.name)
  let label = await Scene.root.findFirst('label_'+i);

  //map face coordinates to canvas
  canvas.transform.x = face.cameraTransform.x;
  canvas.transform.y = face.cameraTransform.y;
  canvas.transform.z = face.cameraTransform.z;
  canvas.hidden = Reactive.not(face.isTracked);

  //make new prediction when face visibility changes
  face.isTracked.monitor().subscribe(function() {
    newDisp(label);
  });

  //make new prediction on tap
  TouchGestures.onTap().subscribe(function() {
    newDisp(label);
  });

  //make first prediction
  newDisp(label);
};

//map faces
mapFace(0);
mapFace(1);
mapFace(2);
mapFace(3);

