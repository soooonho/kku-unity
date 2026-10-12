import * as THREE from 'three';

export function addLighting(scene) {
  scene.add(new THREE.HemisphereLight(0xddefff, 0x263842, 2.2));
  const key = new THREE.DirectionalLight(0xffecd2, 3.2);
  key.name = 'KeyLight';
  key.position.set(-3, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.normalBias = 0.025;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8ebbd5, 1.4);
  fill.position.set(4, 4, -4);
  scene.add(fill);
}
