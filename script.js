const drumKit = [
  { key: 'Q', sound: 'assets/sounds/hit1.mp3'},
  { key: 'W', sound: 'assets/sounds/hit2.mp3'},
  { key: 'E', sound: 'assets/sounds/hit3.mp3'},
  { key: 'A', sound: 'assets/sounds/hit4.mp3'},
  { key: 'S', sound: 'assets/sounds/hit5.mp3'},
  { key: 'D', sound: 'assets/sounds/hit6.mp3'}
];

const playSound = (key) => {
      const drum = drumKit.find(d => d.key === key.toUpperCase());
      
      // Handle unmapped keys gracefully
      if (!drum) return;

      // Create and play audio
      const audio = new Audio(drum.sound);
      audio.currentTime = 0; // Reset if already playing
      audio.play().catch(err => console.log('Audio play failed:', err));

      // Visual feedback
      const pad = document.querySelector(`[data-key="${drum.key}"]`);
      if (pad) {
        pad.classList.add('active');
      }
    };

// Function to remove active class after transition
const removeTransition = (e) => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('active');
};

// Render drum pads dynamically
const renderDrumPads = () => {
    const grid = document.getElementById('drumGrid');
    
    drumKit.forEach(drum => {
    // Create pad container
    const pad = document.createElement('div');
    pad.className = 'drum-pad';
    pad.setAttribute('data-key', drum.key);
    
    // Create key display
    const keyEl = document.createElement('div');
    keyEl.className = 'key';
    keyEl.textContent = drum.key;
    
    // Assemble pad
    pad.appendChild(keyEl);
    
    // Click event
    pad.addEventListener('click', () => playSound(drum.key));
    
    // Remove active class after animation
    pad.addEventListener('transitionend', removeTransition);
    
    // Add to grid
    grid.appendChild(pad);
    });
};

// Keyboard event listener
const handleKeyPress = (e) => {
    playSound(e.key);
};

const init = () => {
    renderDrumPads();
    window.addEventListener('keydown', handleKeyPress);
};

init();
