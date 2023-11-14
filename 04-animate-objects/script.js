import * as THREE from 'three'
import gsap from 'gsap'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'blue' })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})



renderer.setSize(sizes.width, sizes.height)

// Adaptation to framerate
// option 1:
let time = Date.now()
// option 2: 
const clock = new THREE.Clock()


// GSAP
// underlying is also using requestAnimationFrame
gsap.to(mesh.position, { duration: 1, delay: 3, x: 2 })


// Animations
const tick = () => {

    // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    console.log(deltaTime)

    // Option 2
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    console.log("tick")
    // Update object
    // mesh.position.x += 0.01
    // mesh.position.y += 0.01
    // mesh.rotation.y += 0.01
    // mesh.rotation.y += 0.002 * deltaTime // making it FPS independent and time dependent

    // mesh.rotation.y = elapsedTime

    // Using Trigonometry for animations
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.rotation.y = Math.sin(elapsedTime)
    camera.position.x = Math.sin(elapsedTime * 3)
    camera.lookAt(mesh.position)

    // Adding GSAP
    // Command: npm install --save gsap@3.12


    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()