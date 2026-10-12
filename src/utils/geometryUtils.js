import * as THREE from 'three';

export function addBox(parent, name, size, position, material, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = options.castShadow ?? true;
  mesh.receiveShadow = options.receiveShadow ?? true;
  parent.add(mesh);
  return mesh;
}

export function addCylinder(parent, name, radiusTop, radiusBottom, height, position, material, segments = 24) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function createAssetGroup(name, category, dimensions) {
  const group = new THREE.Group();
  group.name = name;
  group.userData = { type: 'industrial-prop', category, assetName: name, dimensions };
  return group;
}
