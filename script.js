const drumKit = [
  { key: 'Q', sound: 'assets/sounds/hit1.mp3', name: 'Tom 1'},
  { key: 'W', sound: 'assets/sounds/hit2.mp3', name: 'Snare'},
  { key: 'E', sound: 'assets/sounds/hit3.mp3', name: 'Hit-hat'},
  { key: 'A', sound: 'assets/sounds/hit4.mp3', name: 'Crash'},
  { key: 'S', sound: 'assets/sounds/hit5.mp3', name: 'Tom 3'},
  { key: 'D', sound: 'assets/sounds/hit6.mp3', name: 'Tom 2'}
];

const playSound = (key) => {
      const drum = drumKit.find(d => d.key === key.toUpperCase());
      
      if (!drum) return;

      const audio = new Audio(drum.sound);
      audio.currentTime = 0;
      audio.play().catch(err => console.log('Audio play failed:', err));

      const pad = document.querySelector(`[data-key="${drum.key}"]`);
      if (pad) {
        pad.classList.add('active');
      }
    };

const removeTransition = (e) => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
};

const renderDrumPads = () => {
  const grid = document.getElementById('drumGrid');
  
  drumKit.forEach(drum => {
    const pad = document.createElement('div');
    pad.className = 'drum-pad';
    pad.setAttribute('data-key', drum.key);
    
    const keyEl = document.createElement('div');
    keyEl.className = 'key';
    keyEl.textContent = drum.key;

    const nameEl = document.createElement('div');
    nameEl.className = 'instrument';
    nameEl.textContent = drum.name;
    
    pad.appendChild(keyEl);
    pad.appendChild(nameEl);
    
    pad.addEventListener('click', () => playSound(drum.key));
    
    pad.addEventListener('transitionend', removeTransition);
    
    grid.appendChild(pad);
  });
};

const handleKeyPress = (e) => {
    playSound(e.key);
};

const init = () => {
    renderDrumPads();
    window.addEventListener('keydown', handleKeyPress);
};

init();
