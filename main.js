// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    observer.observe(section);
});

// Three.js Hero Background Animation
function initThreeJS() {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create minimalistic geometric objects
    const geometry = new THREE.IcosahedronGeometry(15, 1);
    
    // We will use a standard portfolio wireframe look
    const material = new THREE.MeshBasicMaterial({
        color: 0x64ffda,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    const shape1 = new THREE.Mesh(geometry, material);
    scene.add(shape1);

    const shape2 = new THREE.Mesh(new THREE.IcosahedronGeometry(22, 1), material);
    scene.add(shape2);
    
    // Position them slightly off-center
    shape1.position.x = 20;
    shape2.position.x = -15;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Slow smooth rotation
        shape1.rotation.y += 0.002;
        shape1.rotation.x += 0.001;
        
        shape2.rotation.y -= 0.0015;
        shape2.rotation.z += 0.001;

        // Subtle parallax effect on mouse move
        const targetX = mouseX * 0.01;
        const targetY = mouseY * 0.01;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    
    animate();
}

document.addEventListener('DOMContentLoaded', initThreeJS);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
