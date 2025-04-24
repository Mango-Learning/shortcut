const windowsShortcuts = {
  copy: { keys: ['Control', 'c'], display: 'Copy', fullShortcut: 'Ctrl + C' },
  cut: { keys: ['Control', 'x'], display: 'Cut', fullShortcut: 'Ctrl + X' },
  paste: { keys: ['Control', 'v'], display: 'Paste', fullShortcut: 'Ctrl + V' },
  pasteWithoutFormatting: { keys: ['Control', 'Shift', 'v'], display: 'Paste without formatting', fullShortcut: 'Ctrl + Shift + V' },
  undo: { keys: ['Control', 'z'], display: 'Undo', fullShortcut: 'Ctrl + Z' },
  redo: { keys: ['Control', 'y'], display: 'Redo', fullShortcut: 'Ctrl + Y' },
  selectAll: { keys: ['Control', 'a'], display: 'Select all', fullShortcut: 'Ctrl + A' },
  find: { keys: ['Control', 'f'], display: 'Find', fullShortcut: 'Ctrl + F' },
  findReplace: { keys: ['Control', 'h'], display: 'Find and replace', fullShortcut: 'Ctrl + H' },
  print: { keys: ['Control', 'p'], display: 'Print', fullShortcut: 'Ctrl + P' },
  save: { keys: ['Control', 's'], display: 'Save', fullShortcut: 'Ctrl + S' },
  rename: { keys: ['F2'], display: 'Rename file or folder', fullShortcut: 'F2' },
  bold: { keys: ['Control', 'b'], display: 'Bold', fullShortcut: 'Ctrl + B' },
  italic: { keys: ['Control', 'i'], display: 'Italic', fullShortcut: 'Ctrl + I' },
  underline: { keys: ['Control', 'u'], display: 'Underline', fullShortcut: 'Ctrl + U' },
  superscript: { keys: ['Control', 'Shift', '='], display: 'Superscript', fullShortcut: 'Ctrl + Shift + =' },
  subscript: { keys: ['Control', '='], display: 'Subscript', fullShortcut: 'Ctrl + =' }
};

// iPad (Mac) Shortcuts
const macShortcuts = {
  copy: { keys: ['Meta', 'c'], display: 'Copy', fullShortcut: 'Command + C' },
  cut: { keys: ['Meta', 'x'], display: 'Cut', fullShortcut: 'Command + X' },
  paste: { keys: ['Meta', 'v'], display: 'Paste', fullShortcut: 'Command + V' },
  undo: { keys: ['Meta', 'z'], display: 'Undo', fullShortcut: 'Command + Z' },
  selectAll: { keys: ['Meta', 'a'], display: 'Select all', fullShortcut: 'Command + A' },	
  home: { keys: ['Meta', 'h'], display: 'Go to Home screen', fullShortcut: 'Command + H' },
  find: { keys: ['Meta', 'f'], display: 'Find', fullShortcut: 'Command + F' },
  bold: { keys: ['Meta', 'b'], display: 'Bold', fullShortcut: 'Command + B' },
  italic: { keys: ['Meta', 'i'], display: 'Italic', fullShortcut: 'Command + I' },
  underline: { keys: ['Meta', 'u'], display: 'Underline', fullShortcut: 'Command + U' },	
  spotlight: { keys: ['Meta', 'Space'], display: 'Open Spotlight search', fullShortcut: 'Command + Space' },
  appSwitcher: { keys: ['Meta', 'Shift', 'h'], display: 'Open App Switcher', fullShortcut: 'Command + Shift + H' },
  screenshot: { keys: ['Meta', 'Shift', '3'], display: 'Take a screenshot', fullShortcut: 'Command + Shift + 3' },
  quickNote: { keys: ['Globe', 'q'], display: 'Create a Quick Note', fullShortcut: 'Globe + Q' },
  dock: { keys: ['Meta', 'Option', 'D'], display: 'Show or hide the Dock', fullShortcut: 'Command + Option + D' },
  controlCenter: { keys: ['Globe', 'c'], display: 'Open Control Center', fullShortcut: 'Globe + C' },
  notificationCenter: { keys: ['Globe', 'n'], display: 'Open Notification Center', fullShortcut: 'Globe + N' },
  redo: { keys: ['Meta', 'Shift', 'z'], display: 'Redo', fullShortcut: 'Command + Shift + Z' },
  pasteWithoutFormatting: { keys: ['Meta', 'Shift', 'Option', 'v'], display: 'Paste without formatting', fullShortcut: 'Command + Shift + Option + V' },
  switchApps: { keys: ['Globe', 'LeftArrow'], display: 'Switch between open apps', fullShortcut: 'Globe + Left Arrow / Right Arrow' },
  appLibrary: { keys: ['Globe', 'a'], display: 'Open App Library', fullShortcut: 'Globe + A' },
  splitViewSpaces: { keys: ['Control', 'Globe', 'LeftArrow'], display: 'Move between Split View spaces', fullShortcut: 'Control + Globe + Left / Right Arrow' }
 
};


let currentShortcutKey = null;
let device = /iPad|iPhone|Macintosh/i.test(navigator.userAgent) ? 'iPad' : 'Windows';
let shortcutSet = device === 'iPad' ? macShortcuts : windowsShortcuts;

let shortcutKeys = Object.keys(shortcutSet);
let shortcutIndex = 0;

document.getElementById('ipad-controls').style.display = device === 'iPad' ? 'block' : 'none';


function pickShortcut() {
  currentShortcutKey = shortcutKeys[shortcutIndex];
  document.getElementById('current-shortcut').textContent = `${shortcutSet[currentShortcutKey].display}`;
  document.getElementById('feedback').textContent = '';

  shortcutIndex = (shortcutIndex + 1) % shortcutKeys.length; // Loop back to the beginning
}

//function pickShortcut() {
//  const keys = Object.keys(shortcutSet);
//  currentShortcutKey = keys[Math.floor(Math.random() * keys.length)];
//  document.getElementById('current-shortcut').textContent = `${shortcutSet[currentShortcutKey].display}`;
//  document.getElementById('feedback').textContent = '';
//}

function simulateShortcut(name) {
  if (name === currentShortcutKey) {
    giveFeedback(true);
  } else {
    giveFeedback(false);
  }
}

let pressedKeys = new Set();

const normalizeKey = (key) => key.toLowerCase();

// Normalize shortcut keys from data
const getExpectedKeys = (shortcut) => {
  return new Set(shortcutSet[shortcut]?.keys.map(normalizeKey));
};

window.addEventListener('keydown', (e) => {
	
 if (device === 'Windows') {	
  const key = normalizeKey(e.key);
  pressedKeys.add(key);

  // Prevent browser default for common Windows shortcuts
  if (['f2', 'f5', 'f11'].includes(key)) e.preventDefault();

  if (e.ctrlKey && key === 's') e.preventDefault();
  if (e.ctrlKey && key === 'p') e.preventDefault();
  if (e.ctrlKey && key === 'c') e.preventDefault();
  if (e.ctrlKey && key === 'x') e.preventDefault();
  if (e.ctrlKey && key === 'v') e.preventDefault();
  if (e.ctrlKey && key === 'z') e.preventDefault();
  if (e.ctrlKey && key === 'y') e.preventDefault();
  if (e.ctrlKey && key === 'a') e.preventDefault();
  if (e.ctrlKey && key === 'f') e.preventDefault();
  if (e.ctrlKey && key === 'h') e.preventDefault();
  if (e.ctrlKey && key === 'u') e.preventDefault();
  if (e.ctrlKey && key === 'b') e.preventDefault();
  if (e.ctrlKey && key === 'i') e.preventDefault();
  if (e.ctrlKey && key === '=') e.preventDefault();

  // Ctrl + Shift + combos
  if (e.ctrlKey && e.shiftKey && (key === 'v' || key === 's' || key === '+' || key === '=')) e.preventDefault();
 }
  
  if (device === 'iPad') {
  if (e.metaKey && e.key === 'c') simulateShortcut("copy");
  if (e.metaKey && e.key === 'x') e.preventDefault();
  if (e.metaKey && e.key === 'v') e.preventDefault();
  if (e.metaKey && e.key === 'z') e.preventDefault();
  if (e.metaKey && e.shiftKey && e.key === 'z') e.preventDefault();
  if (e.metaKey && e.key === 'a') e.preventDefault();
  if (e.metaKey && e.key === 'f') e.preventDefault();
  if (e.metaKey && e.key === 'b') e.preventDefault();
  if (e.metaKey && e.key === 'i') e.preventDefault();
  if (e.metaKey && e.key === 'u') e.preventDefault();
  if (e.metaKey && e.key === 'h') e.preventDefault();
  if (e.metaKey && e.key === ' ') e.preventDefault(); // Spotlight

  // Meta + Option combos
  if (e.metaKey && e.altKey && e.key.toLowerCase() === 'd') e.preventDefault(); // Dock

  // Globe shortcuts
  if (e.key === 'q' && e.getModifierState('Fn')) e.preventDefault(); // Quick Note
  if (e.key === 'c' && e.getModifierState('Fn')) e.preventDefault(); // Control Center
  if (e.key === 'n' && e.getModifierState('Fn')) e.preventDefault(); // Notification Center
  if (e.key === 'a' && e.getModifierState('Fn')) e.preventDefault(); // App Library
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.getModifierState('Fn')) e.preventDefault(); // Switch apps
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.ctrlKey && e.getModifierState('Fn')) e.preventDefault(); // Split View spaces

  // Screenshot
  if (e.metaKey && e.shiftKey && e.key === '3') e.preventDefault();
}

  const expectedKeys = getExpectedKeys(currentShortcutKey);

  // Superscript support: normalize '+' to '='
  const normalizedPressed = new Set([...pressedKeys].map(k => k === '+' ? '=' : k));

  if (expectedKeys && isEqualSets(normalizedPressed, expectedKeys)) {
    giveFeedback(true);
  }
});

window.addEventListener('keyup', (e) => {
  pressedKeys.delete(normalizeKey(e.key));
});

function isEqualSets(setA, setB) {
  return setA.size === setB.size && [...setA].every(key => setB.has(key));
}

function giveFeedback(correct) {
  const feedback = document.getElementById('feedback');
  if (correct) {
    feedback.textContent = "✅ Correct!";
    setTimeout(() => {
      pickShortcut();
    }, 1000);
  } else {
    feedback.textContent = "❌ Try again.";
  }
}

function showAnswer() {
  const feedback = document.getElementById('feedback');
  feedback.textContent = `${shortcutSet[currentShortcutKey].fullShortcut}`;
}

pickShortcut(); // Load the first shortcut
