// Scene graph
// putting objects instide group
const group = new THREE.Group()
scene.add(group)
const box1 = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({ color: 'yellow' })
const cube1 = new THREE.Mesh(
    box1, material1
)
cube1.position.x = -1

const box2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 'pink' })
const cube2 = new THREE.Mesh(
    box2, material2
)
cube2.position.x = 2

group.add(cube1)
group.add(cube2)
group.rotation.y = 1