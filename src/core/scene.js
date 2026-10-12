import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x17242c);
  scene.fog = new THREE.Fog(0x17242c, 10, 22);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x26353d, metalness: 0.08, roughness: 0.95 })
  );
  ground.name = 'Ground';
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(16, 32, 0x52636a, 0x35464e);
  grid.name = 'MeterGrid';
  grid.position.y = 0.002;
  grid.material.transparent = true;
  grid.material.opacity = 0.44;
  scene.add(grid);
  return scene;
}
