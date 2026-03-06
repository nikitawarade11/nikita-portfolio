const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("hero-canvas").appendChild(renderer.domElement);

camera.position.set(0, 8, 35);
camera.lookAt(0, 0, 0);

// GRID
const size = 100;
const divisions = 80;

const grid = new THREE.GridHelper(size, divisions, 0x2f80ed, 0x2f80ed);
grid.material.opacity = 0.25;
grid.material.transparent = true;
scene.add(grid);

// Convert grid to wave
const position = grid.geometry.attributes.position;

function animateWave() {
  const time = Date.now() * 0.001;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const y = Math.sin((x + time) * 0.3) + Math.cos((z + time) * 0.3);
    position.setY(i, y);
  }

  position.needsUpdate = true;
}

scene.add(new THREE.AmbientLight(0xffffff, 1.2));

function animate() {
  requestAnimationFrame(animate);
  animateWave();
  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
