import * as THREE from 'three'

// Contains all your classes. Instantiate the classes to use
// console.log(THREE)

// To create a scene - 4 Elements
// 1) Scene
// 2) Objects
// 3) Camera
// 4) Renderer



// 1) Scene
// - a container in which we put objects, models, particles, light, etc
const scene = new THREE.Scene()


// 2) Object
// - can be many things like primitive geometries, imported models,
// particles, lights, etc
// - we need to create a Mesh which is a combination of a geometry (the shape)
// and a material (how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)

// Adding object to scene
scene.add(mesh)




// 3) Camera
// - different types of cameras
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// add camera to scene (optional)
scene.add(camera)



// 4) Renederer
// - render the scene from the camera's point of view. Result drawn into canvas
// - we can create the canvas, or let the renderer generate it adn then add
// it to your page

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
