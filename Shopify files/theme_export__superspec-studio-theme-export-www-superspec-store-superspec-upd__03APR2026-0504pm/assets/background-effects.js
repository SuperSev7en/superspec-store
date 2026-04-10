/* global THREE */
(function () {
  let scene, camera, renderer;
  let mouseX = 0;
  let mouseY = 0;

  /* Full spectrum — NormalBlending reads on white (AdditiveBlending vanishes on white). */
  const spectrumColors = [
    { r: 1.0, g: 0.15, b: 0.2 },
    { r: 1.0, g: 0.45, b: 0.05 },
    { r: 1.0, g: 0.85, b: 0.1 },
    { r: 0.2, g: 0.85, b: 0.35 },
    { r: 0.15, g: 0.45, b: 1.0 },
    { r: 0.45, g: 0.2, b: 0.95 },
    { r: 0.9, g: 0.25, b: 1.0 },
  ];

  /**
   * One fixed stack: solid white on the bottom, WebGL above it (same z-index layer as page chrome).
   * Previously `.holographic-bg` was appended after the canvas with the same z-index as the canvas,
   * which painted an opaque white sheet on top of the particles.
   */
  function ensureAmbientStack() {
    if (document.getElementById('superspec-ambient-stack')) return;

    const stack = document.createElement('div');
    stack.id = 'superspec-ambient-stack';

    const white = document.createElement('div');
    white.className = 'superspec-ambient-white';
    white.setAttribute('aria-hidden', 'true');

    const canvasHost = document.createElement('div');
    canvasHost.id = 'background-canvas';

    stack.appendChild(white);
    stack.appendChild(canvasHost);
    document.body.prepend(stack);
  }

  function initBackgroundEffects() {
    if (typeof THREE === 'undefined') {
      return false;
    }

    ensureAmbientStack();
    const canvasHost = document.getElementById('background-canvas');
    if (!canvasHost) return false;
    if (canvasHost.querySelector('canvas')) {
      return true;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xffffff, 0);

    const canvasEl = renderer.domElement;
    canvasEl.style.display = 'block';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasHost.appendChild(canvasEl);

    camera.position.z = 5;

    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      const c = spectrumColors[Math.floor(Math.random() * spectrumColors.length)];
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.062,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    document.addEventListener('mousemove', function (event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        pos[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.001;
      }
      geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
    return true;
  }

  function tryInitThree(attempt) {
    attempt = attempt || 0;
    if (initBackgroundEffects()) {
      return;
    }
    if (typeof THREE === 'undefined' && attempt < 80) {
      window.setTimeout(function () {
        tryInitThree(attempt + 1);
      }, 50);
      return;
    }
    if (attempt < 20) {
      window.setTimeout(function () {
        tryInitThree(attempt + 1);
      }, 100);
    }
  }

  function boot() {
    try {
      tryInitThree(0);
    } catch (e) {
      console.warn('[background-effects]', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
