import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

// Debug UI
// npm install lil-gui
const gui = new GUI({
    width: 300,
    title: "Adjusting Width of Debug UI"
})
// default close
// gui.close()

// open on keydown
gui.hide()
window.addEventListener('keydown', (event) => {
    if (event.key == 'h') {
        gui.show(gui._hidden)
    }
})


const debugObject = {}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Listening to resizing
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update the camera aspect
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Rrendere
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Listening to double click for fullscreen
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    // won't work on safari
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }

    }
})

// Scene
const scene = new THREE.Scene()

// Object
debugObject.color = '#3a6ea6'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// dividing into folders
const folderOne = gui.addFolder('Folder 1')
const folderTwo = gui.addFolder('Folder 2')

// gui.add(mesh.position, 'y', -3, 3, 0.01)
folderOne.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')

const myObject = {
    myVariable: 1377
}

folderOne.add(myObject, 'myVariable')

folderTwo.add(mesh, 'visible')

folderTwo.add(material, 'wireframe')

// gui.addColor(material, 'color')
//     .onChange((value) => {
//         console.log("Values changed")
//         console.log(value)
//         console.log(material.color)
//         console.log(value.getHexString())
//     })


gui.addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
    })

// adding animate function
debugObject.spin = () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}
gui.add(debugObject, 'spin')

// tweaking geometry
debugObject.subdivision = 2
gui.add(debugObject, 'subdivision').min(1).max(20).step(1)
    .onFinishChange(() => {
        // when value change, destroy old geometry and create new one
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })



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
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()


const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()