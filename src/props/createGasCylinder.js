import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createGasCylinder({ diameter = 0.3, height = 1.4 } = {}) {
  const group = createAssetGroup('GasCylinder', 'storage', { width: diameter, height, depth: diameter });
  const radius = diameter * 0.46;
  addCylinder(group, 'FootRing', diameter / 2, diameter / 2, 0.055, [0, 0.0275, 0], materials.steelDark, 24);
  const bodyBottom = 0.055;
  const shoulderY = height - 0.19;
  addCylinder(group, 'CylinderBody', radius, radius, shoulderY - bodyBottom, [0, (bodyBottom + shoulderY) / 2, 0], materials.paintedSteelGreen, 24);
  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 12), materials.paintedSteelGreen);
  shoulder.name = 'RoundedShoulder';
  shoulder.position.y = shoulderY;
  shoulder.castShadow = true;
  group.add(shoulder);
  addCylinder(group, 'Neck', 0.045, 0.045, 0.09, [0, height - 0.09, 0], materials.steelLight, 16);
  addCylinder(group, 'Valve', 0.06, 0.06, 0.045, [0, height - 0.0225, 0], materials.steelDark, 12);
  return group;
}
