import * as THREE from 'three'

// TRANSFORMING OBJECTS
// 4 properties to transform
// 1) Position
// 2) Scale
// 3) Rotation
// 4) Quartenion

// Every object that inherits from Object3D have these 4 properties
// These properties will be compiled in matrices

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



// Moving Objects
// Using position - x, y, z
mesh.position.x = 2
mesh.position.y = -1
mesh.position.z = -3
// mesh.position.set(2,-1,-3)

// position inherit from Vector3 a class with multiple methods
console.log(mesh.position.length()) // distance between center of scene and object
console.log(mesh.position.distanceTo(camera.position)) // distance between the object and the camera

mesh.position.normalize() // set vector length to 1

// Axes Helper
// - seeing the axes visually
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)



// Scale
mesh.scale.x = 2
mesh.scale.y = 0.5


// Rotation
// - with either rotation or with quaternion
// - updating one will update the other
mesh.rotation.reorder('YXZ') // ordering the rotations. E.g. FPS games
mesh.rotation.x = Math.PI // half rotation
mesh.rotation.y = 2 * Math.PI // full rotation



// Looking at something
camera.lookAt(mesh.position) // position of cube



renderer.render(scene, camera)