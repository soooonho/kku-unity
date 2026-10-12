import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createStorageTank({ diameter = 1.4, height = 2.1 } = {}) {
  const group = createAssetGroup('StorageTank', 'storage', { width: diameter, height, depth: diameter });
  const radius = diameter / 2;
  const straightHeight = height - diameter;
  const bottomCenter = radius;
  const topCenter = bottomCenter + straightHeight;
  const bottom = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), materials.steelLight);
  bottom.name = 'LowerDome';
  bottom.position.y = bottomCenter;
  bottom.castShadow = true;
  group.add(bottom);
  addCylinder(group, 'TankShell', radius, radius, straightHeight, [0, bottomCenter + straightHeight / 2, 0], materials.steelLight, 24);
  const top = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), materials.steelLight);
  top.name = 'UpperDome';
  top.position.y = topCenter;
  top.castShadow = true;
  group.add(top);
  addCylinder(group, 'BaseSkirt', radius * 0.48, radius * 0.48, 0.18, [0, 0.09, 0], materials.steelDark, 24);
  addCylinder(group, 'TopAccessCover', 0.13, 0.13, 0.025, [0, height - 0.0125, 0], materials.steelDark, 16);
  return group;
}
