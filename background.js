const bgScene = new THREE.Scene();
const bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const bgRenderer = new THREE.WebGLRenderer({ alpha: true });
bgRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg-canvas").appendChild(bgRenderer.domElement);

bgCamera.position.z = 5;

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1200;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.4
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
bgScene.add(particlesMesh);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
});

function animateBG() {
    requestAnimationFrame(animateBG);

    particlesMesh.rotation.y += 0.0008;
    particlesMesh.rotation.x += 0.0003;

    bgCamera.position.x += (mouseX - bgCamera.position.x) * 0.02;
    bgCamera.position.y += (-mouseY - bgCamera.position.y) * 0.02;

    bgRenderer.render(bgScene, bgCamera);
}

animateBG();

window.addEventListener('resize', () => {
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
});
