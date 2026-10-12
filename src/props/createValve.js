import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createValve({ width = 0.65, height = 0.72, depth = 0.36 } = {}) {
  const group = createAssetGroup('IndustrialValve', 'piping', { width, height, depth });
  const pipeY = 0.22;
  const pipeRadius = 0.09;
  const pipe = addCylinder(group, 'ValvePipe', pipeRadius, pipeRadius, width, [0, pipeY, 0], materials.steelLight, 24);
  pipe.rotation.z = Math.PI / 2;
  for (const [side, x] of [['Left', -width / 2 + 0.025], ['Right', width / 2 - 0.025]]) {
    const flange = addCylinder(group, `${side}Flange`, 0.145, 0.145, 0.05, [x, pipeY, 0], materials.steelDark, 24);
    flange.rotation.z = Math.PI / 2;
  }
  addCylinder(group, 'ValveBody', 0.16, 0.16, 0.23, [0, pipeY, 0], materials.paintedSteelBlue, 24);
  addCylinder(group, 'ValveBonnet', 0.085, 0.115, 0.14, [0, 0.405, 0], materials.steelDark, 16);
  addCylinder(group, 'ValveStem', 0.025, 0.025, 0.23, [0, 0.59, 0], materials.steelLight, 12);
  const wheelPivot = new THREE.Group();
  wheelPivot.name = 'HandwheelPivot';
  wheelPivot.position.y = height - 0.019;
  group.add(wheelPivot);
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.019, 8, 24), materials.safetyRed);
  wheel.name = 'HandwheelRim';
  wheel.rotation.x = Math.PI / 2;
  wheel.castShadow = true;
  wheelPivot.add(wheel);
  for (const angle of [0, Math.PI / 2]) {
    const spoke = addBox(wheelPivot, `HandwheelSpoke${angle === 0 ? 'X' : 'Z'}`, [0.3, 0.025, 0.025], [0, 0, 0], materials.safetyRed);
    spoke.rotation.y = angle;
  }
  addCylinder(wheelPivot, 'HandwheelHub', 0.04, 0.04, 0.035, [0, 0, 0], materials.steelDark, 12);
  addBox(group, 'ValveBase', [0.2, 0.035, depth], [0, 0.0175, 0], materials.steelDark);
  addBox(group, 'ValveSupport', [0.09, pipeY - pipeRadius - 0.025, 0.09], [0, (pipeY - pipeRadius - 0.025) / 2 + 0.025, 0], materials.steelDark);
  return group;
}
