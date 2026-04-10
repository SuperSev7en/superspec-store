// Initialize Three.js scene
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;

// Spectrum colors (RGB values)
const spectrumColors = [
  {r: 1.0, g: 0.0, b: 0.0},    // Red
  {r: 1.0, g: 0.5, b: 0.0},    // Orange
  {r: 1.0, g: 1.0, b: 0.0},    // Yellow
  {r: 0.0, g: 1.0, b: 0.0},    // Green
  {r: 0.0, g: 0.0, b: 1.0},    // Blue
  {r: 0.4, g: 0.0, b: 0.8},    // Indigo
  {r: 0.8, g: 0.0, b: 1.0}     // Violet
];

// Glitch effect parameters
const glitchParams = {
  intensity: 0.015,
  speed: 0.5,
  scale: 1.0
};

// Initialize the background effects
function initBackgroundEffects() {
  // Setup Three.js scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  
  // Add canvas to background
  const container = document.createElement('div');
  container.id = 'background-canvas';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  `;
  container.appendChild(renderer.domElement);
  document.body.prepend(container);

  // Setup camera
  camera.position.z = 5;

  // Create particle system
  const particleCount = 1400;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Position
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Color from spectrum
    const colorIndex = Math.floor(Math.random() * spectrumColors.length);
    const color = spectrumColors[colorIndex];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Particle material
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  // Create particle system
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  // Mouse move event listener
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update particle positions
    const positions = particles.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
      positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.001;
    }
    particles.attributes.position.needsUpdate = true;

    // Camera movement based on mouse position
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create holographic background
  const holographicBg = document.createElement('div');
  holographicBg.className = 'holographic-bg';
  document.body.prepend(holographicBg);

  // Create foil effect
  const foilEffect = document.createElement('div');
  foilEffect.className = 'gold-foil';
  document.body.prepend(foilEffect);

  // Initialize Three.js effects
  initBackgroundEffects();
}); 