import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

export function createPallet({ width = 1.2, height = 0.145, depth = 1 } = {}) {
  const group = createAssetGroup('IndustrialPallet', 'storage', { width, height, depth });
  const boardThickness = 0.025;
  const runnerHeight = height - boardThickness * 2;
  for (const [label, x] of [['Left', -width / 2 + 0.1], ['Middle', 0], ['Right', width / 2 - 0.1]]) {
    addBox(group, `${label}BottomBoard`, [0.14, boardThickness, depth], [x, boardThickness / 2, 0], materials.steelDark);
    addBox(group, `${label}Runner`, [0.1, runnerHeight, depth - 0.1], [x, boardThickness + runnerHeight / 2, 0], materials.paintedSteelBlue);
  }
  const slatWidth = width / 5 - 0.018;
  for (let index = 0; index < 5; index++) {
    const x = -width / 2 + slatWidth / 2 + index * (width - slatWidth) / 4;
    addBox(group, `TopSlat${index + 1}`, [slatWidth, boardThickness, depth], [x, height - boardThickness / 2, 0], materials.steelLight);
  }
  return group;
}
