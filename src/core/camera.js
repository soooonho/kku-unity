import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createCamera(canvas) {
  const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 100);
  camera.position.set(3.7, 2.7, 4.6);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.minDistance = 1.2;
  controls.maxDistance = 13;
  controls.maxPolarAngle = Math.PI / 2.02;
  controls.target.set(0, 0.85, 0);
  controls.update();
  return { camera, controls };
}
