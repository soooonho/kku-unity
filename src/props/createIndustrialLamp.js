import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createIndustrialLamp({ diameter = 0.38, height = 0.75 } = {}) {
  const group = createAssetGroup('IndustrialLamp', 'lighting', { width: diameter, height, depth: diameter });
  addCylinder(group, 'WeightedBase', 0.12, 0.12, 0.05, [0, 0.025, 0], materials.steelDark, 24);
  addCylinder(group, 'SupportStem', 0.023, 0.023, height - 0.11, [0, (height - 0.11) / 2 + 0.05, 0], materials.steelLight, 12);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(diameter / 2, 0.2, 24, 1, true), materials.paintedSteelYellow);
  shade.name = 'ConeShade';
  shade.position.y = height - 0.12;
  shade.castShadow = true;
  group.add(shade);
  addCylinder(group, 'ShadeCap', 0.055, 0.055, 0.04, [0, height - 0.02, 0], materials.steelDark, 16);
  addCylinder(group, 'LightLens', 0.075, 0.075, 0.015, [0, height - 0.23, 0], materials.glass, 16);
  return group;
}
