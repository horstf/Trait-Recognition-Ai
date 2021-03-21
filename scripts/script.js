const Random = require('Random');
const Reactive = require('Reactive');
const TouchGestures = require('TouchGestures');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics')
const FaceTracking = require('FaceTracking')

const names = ['creep', 'stalker', 'loner', 'weirdo', 'sad', 'social media addict', 'insecure', 'jealous', 'self sabotaging', 'anger problem', 'anxious', 'narcissist', 'attention seeker', 'inhibited', 'cautious', 'skeptic', 'not ok', 'distant', 'misanthrope', 'naive', 'disillusioned',
'hopeless'];

async function newDisp(label) {
  let prediction = names[Math.floor(Random.random()*names.length)];
  let confidence = Math.round(Random.random()*10000)/100+'%';
  label.text = Reactive.val(prediction + '\n' + confidence);
  Diagnostics.log("new trait: " + prediction + 
    ", " + confidence);
}


//map objects and make predictions for face
async function mapFace(face) {
  const canvas = await Scene.root.findFirst('face1');
  const label = await Scene.root.findFirst('label1');
  const confidence = await Scene.root.findFirst('confidence1')

  //map face coordinates to canvas
  canvas.transform.x = face.cameraTransform.x
  canvas.transform.y = face.cameraTransform.y
  canvas.transform.z = face.cameraTransform.z
  canvas.visible = face.isTracked


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

//map first face
mapFace(FaceTracking.face(0));