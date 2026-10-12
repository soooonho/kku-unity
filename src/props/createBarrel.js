import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createBarrel({ diameter = 0.58, height = 0.88 } = {}) {
  const group = createAssetGroup('SteelDrum', 'storage', { width: diameter, height, depth: diameter });
  const ribProjection = 0.012;
  const radius = diameter / 2 - ribProjection;
  addCylinder(group, 'DrumBody', radius, radius, height - 0.035, [0, (height - 0.035) / 2, 0], materials.safetyYellow, 32);
  for (const [name, y] of [['Bottom', 0.03], ['Lower', 0.2], ['Upper', height - 0.2], ['Top', height - 0.03]]) {
    addCylinder(group, `${name}Rib`, radius + ribProjection, radius + ribProjection, 0.022, [0, y, 0], materials.steelDark, 32);
  }
  addCylinder(group, 'Lid', radius - 0.014, radius - 0.014, 0.018, [0, height - 0.009, 0], materials.steelLight, 32);
  addCylinder(group, 'LargeBung', 0.035, 0.035, 0.016, [radius * 0.5, height - 0.008, 0], materials.steelDark, 12);
  addCylinder(group, 'SmallBung', 0.022, 0.022, 0.016, [-radius * 0.5, height - 0.008, 0], materials.steelDark, 12);
  return group;
}
