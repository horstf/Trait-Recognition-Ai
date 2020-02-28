const Patches = require('Patches');
const Random = require('Random');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');

const f1bool = Patches.getBooleanValue('f1boolval');

const p1 = Patches.getPulseValue('Pulse1');

const names = ['creep', 'stalker', 'loner', 'weirdo', 'sad', 'social media addict', 'insecure', 'jealous', 'self sabotaging', 'anger problem', 'anxious', 'narcissist', 'attention seeker', 'inhibited', 'cautious', 'skeptic'];

let newDisp = function() {
  const label = names[Math.floor(Random.random()*names.length)];
  const pz = Math.round(Random.random()*10000)/100+'%';
  Patches.setStringValue('newLabel1', Reactive.val(label));
  Patches.setStringValue('newPz1', Reactive.val(pz));
}

p1.subscribe(function() {
  if (f1bool) {
    newDisp();
  }
})

TouchGestures.onTap().subscribe(newDisp);