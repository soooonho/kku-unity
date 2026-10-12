import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createFireExtinguisher({ diameter = 0.2, height = 0.62 } = {}) {
  const group = createAssetGroup('FireExtinguisher', 'safety', { width: diameter, height, depth: diameter });
  const radius = diameter * 0.43;
  addCylinder(group, 'BaseRing', diameter / 2, diameter / 2, 0.045, [0, 0.0225, 0], materials.steelDark, 24);
  addCylinder(group, 'PressureVessel', radius, radius, height * 0.66, [0, 0.045 + height * 0.33, 0], materials.safetyRed, 24);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 12), materials.safetyRed);
  dome.name = 'Shoulder';
  dome.position.y = 0.045 + height * 0.66;
  dome.castShadow = true;
  group.add(dome);
  addCylinder(group, 'ValveStem', 0.024, 0.024, 0.1, [0, height - 0.05, 0], materials.steelDark, 12);
  addBox(group, 'SqueezeHandle', [diameter * 0.9, 0.018, 0.035], [0, height - 0.009, 0], materials.steelDark);
  addBox(group, 'ReleaseLever', [diameter * 0.78, 0.015, 0.03], [0.01, height - 0.064, 0], materials.steelLight);
  addCylinder(group, 'DischargeNozzle', 0.014, 0.014, 0.105, [0.045, height - 0.107, 0], materials.rubberBlack, 12).rotation.z = -Math.PI / 6;
  return group;
}
