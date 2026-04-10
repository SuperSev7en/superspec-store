/* global THREE */
(function () {
  let scene, camera, renderer;
  let mouseX = 0;
  let mouseY = 0;

  function initBackgroundEffects() {
    if (typeof THREE === 'undefined') {
      return false;
    }
    if (document.getElementById('background-canvas')) {
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

    const container = document.createElement('div');
    container.id = 'background-canvas';
    container.style.cssText =
      'position:fixed;top:0;left:0;z-index:0;width:100vw;height:100vh;pointer-events:none;';
    container.appendChild(renderer.domElement);
    document.body.prepend(container);

    camera.position.z = 5;

    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      /* Neutral light gray sparkles on white (no rainbow / green cast). */
      const t = 0.72 + Math.random() * 0.26;
      colors[i] = t;
      colors[i + 1] = t;
      colors[i + 2] = t;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
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

  function ensureAmbientDivs() {
    if (!document.querySelector('.holographic-bg')) {
      const holographicBg = document.createElement('div');
      holographicBg.className = 'holographic-bg';
      document.body.prepend(holographicBg);
    }
    if (!document.querySelector('.gold-foil')) {
      const foilEffect = document.createElement('div');
      foilEffect.className = 'gold-foil';
      document.body.prepend(foilEffect);
    }
  }

  function tryInitThree(attempt) {
    attempt = attempt || 0;
    ensureAmbientDivs();
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
