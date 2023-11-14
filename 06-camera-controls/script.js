import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Cursor
const cursor = {
    x: 0,
    y: 0
}
canvas.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = e.clientY / sizes.height - 0.5
})


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1
// controls.update()
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

// Camera Controls
// 1) FlyControls
// 2) FirstPersonControls
// 3) PointerLockControls
// 4) OrbitControls
// 5) TrackBallControls
// 6) TransformControls
// 7) DragControls


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3
    // camera.lookAt(new THREE.Vector3())
    // camera.lookAt(mesh.position)

    // Rotate
    // camera.position.x = Math.sin(Math.PI * cursor.x * 2) * 2
    // camera.position.z = Math.cos(Math.PI * cursor.x * 2) * 2
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)


    // if using damping, update controls on each frame
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()