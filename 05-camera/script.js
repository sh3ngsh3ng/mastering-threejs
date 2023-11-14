import * as THREE from 'three'

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 'blue' })
const mesh = new THREE.Mesh(geometry, material)



scene.add(mesh)
const sizes = {
    width: 800,
    height: 600
}

// Perspective Camera
// First argument is the FOV, Second argument is the aspect ratio
// Third argument is near, Fourth argument is far
// Between near and far = visible
// Objects won't show if lower than near OR further than far
// if using extreme values for near and far, i.e. 0.0001 and 9999999, will result in z-fighting
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)

// Orthographic Camera
// Canvas may change the shape of the object. To prevent this, give the object/camera aspect ratio
const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1 * aspectRatio, -1 * aspectRatio, 0.1, 100)


// camera.position.y = 2
camera.position.z = 3
// camera.position.x = 2

scene.add(camera)


const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})


const cursor = {
    x: 0,
    y: 0
}
// Changing the camera
window.addEventListener('mousemove', (e) => {
    console.log(e)
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)
    console.log(cursor.y)
})


renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

// Animations
const tick = () => {

    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime)

    // Update Camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    // camera.position.y = cursor.y * 2
    // camera.lookAt(new THREE.Vector3())
    camera.lookAt(mesh.position)

    // Camera Controls
    // 1) FlyControls
    // 2) FirstPersonControls
    // 3) PointerLockControls
    // 4) OrbitControls
    // 5) TrackBallControls
    // 6) TransformControls
    // 7) DragControls

    // mesh.rotation.y = elapsedTime

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()