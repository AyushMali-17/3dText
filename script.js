let scene, camera, renderer, textMesh, font;
const container = document.getElementById('container');
const inputText = document.getElementById('inputText');

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

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
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
        textMesh.rotation.x += 0.01;
        textMesh.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
