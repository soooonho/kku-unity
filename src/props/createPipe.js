import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createPipe({ length = 1.6, diameter = 0.22, height = 0.64 } = {}) {
  const group = createAssetGroup('IndustrialPipe', 'piping', { width: length, height, depth: diameter + 0.13 });
  const radius = diameter / 2;
  const flangeProjection = 0.065;
  const pipeY = height - radius - flangeProjection;
  const pipe = addCylinder(group, 'PipeBody', radius, radius, length, [0, pipeY, 0], materials.steelLight, 24);
  pipe.rotation.z = Math.PI / 2;
  for (const [side, x] of [['Left', -length / 2 + 0.0225], ['Right', length / 2 - 0.0225]]) {
    const flange = addCylinder(group, `${side}Flange`, radius + flangeProjection, radius + flangeProjection, 0.045, [x, pipeY, 0], materials.steelDark, 24);
    flange.rotation.z = Math.PI / 2;
  }
  for (const x of [-length * 0.28, length * 0.28]) {
    const supportHeight = pipeY - radius - 0.035;
    addBox(group, `Support_${x < 0 ? 'Left' : 'Right'}`, [0.09, supportHeight, 0.075], [x, 0.035 + supportHeight / 2, 0], materials.paintedSteelBlue);
    addBox(group, `Foot_${x < 0 ? 'Left' : 'Right'}`, [0.2, 0.035, 0.2], [x, 0.0175, 0], materials.steelDark);
  }
  return group;
}
