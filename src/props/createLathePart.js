import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { createAssetGroup } from '../utils/geometryUtils.js';

export function createLathePart({ diameter = 0.5, height = 0.85 } = {}) {
  const group = createAssetGroup('TurnedMachinePart', 'machinery', { width: diameter, height, depth: diameter });
  const radius = diameter / 2;
  const profile = [
    [0, 0], [radius, 0], [radius, height * 0.08],
    [radius * 0.72, height * 0.08], [radius * 0.72, height * 0.25],
    [radius * 0.84, height * 0.28], [radius * 0.84, height * 0.38],
    [radius * 0.5, height * 0.4], [radius * 0.5, height * 0.76],
    [radius * 0.65, height * 0.76], [radius * 0.65, height * 0.82],
    [radius * 0.25, height * 0.82], [radius * 0.25, height], [0, height]
  ];
  const geometry = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 32);
  geometry.computeVertexNormals();
  const normals = geometry.getAttribute('normal');
  for (let index = 0; index < normals.count; index++) {
    const normal = new THREE.Vector3().fromBufferAttribute(normals, index);
    if (normal.lengthSq() < 1e-12) normal.set(0, 1, 0);
    else normal.normalize();
    normals.setXYZ(index, normal.x, normal.y, normal.z);
  }
  const turnedBody = new THREE.Mesh(geometry, materials.steelLight);
  turnedBody.name = 'LathedProfile';
  turnedBody.castShadow = true;
  turnedBody.receiveShadow = true;
  group.add(turnedBody);
  return group;
}
