let scene, camera, renderer, textMesh, font, textMaterial;
const container = document.getElementById('container');
const inputText = document.getElementById('inputText');
const colorPicker = document.getElementById('colorPicker');
const modeToggle = document.getElementById('modeToggle');
const animationSelector = document.getElementById('animationSelector');

let animationType = 'rotate';

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load font and create initial text
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
        font = loadedFont;
        createText('Type Here!');
    });

    // Handle input changes
    inputText.addEventListener('input', function (e) {
        const value = e.target.value;
        createText(value || 'Type Here!');
    });

    // Handle color changes
    colorPicker.addEventListener('input', function (e) {
        if (textMaterial) {
            textMaterial.color.set(e.target.value);
        }
    });

    // Handle mode toggle
    modeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
        modeToggle.textContent = document.body.classList.contains('light-mode') 
            ? 'Switch to Dark Mode' 
            : 'Switch to Light Mode';
    });

    // Handle animation changes
    animationSelector.addEventListener('change', function (e) {
        animationType = e.target.value;
    });

    window.addEventListener('resize', onWindowResize, false);
}

function createText(text) {
    if (textMesh) {
        scene.remove(textMesh);
    }

    const textGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: 20,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
    });

    textMaterial = new THREE.MeshBasicMaterial({ color: colorPicker.value });
    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textGeometry.computeBoundingBox();
    textGeometry.boundingBox.getCenter(textMesh.position).multiplyScalar(-1);

    scene.add(textMesh);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (textMesh) {
        switch (animationType) {
            case 'rotate':
                textMesh.rotation.x += 0.01;
                textMesh.rotation.y += 0.01;
                break;
            case 'bounce':
                textMesh.position.y = Math.sin(Date.now() * 0.005) * 10;
                break;
            case 'pulse':
                textMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.3);
                break;
        }
    }

    renderer.render(scene, camera);
}
