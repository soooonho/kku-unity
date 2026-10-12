import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

export function createSafetyFence({ width = 2.4, height = 1.8, depth = 0.16, barCount = 11 } = {}) {
  const group = createAssetGroup('SafetyFence', 'safety', { width, height, depth });
  const postSize = 0.07;
  const innerWidth = width - postSize;
  for (const [side, x] of [['Left', -width / 2 + postSize / 2], ['Right', width / 2 - postSize / 2]]) {
    addBox(group, `${side}Post`, [postSize, height, postSize], [x, height / 2, 0], materials.paintedSteelYellow);
    const footX = side === 'Left' ? -width / 2 + 0.08 : width / 2 - 0.08;
    addBox(group, `${side}Foot`, [0.16, 0.045, depth], [footX, 0.0225, 0], materials.steelDark);
  }
  for (const [name, y] of [['Bottom', 0.22], ['Middle', height * 0.54], ['Top', height - 0.12]]) {
    addBox(group, `${name}Rail`, [innerWidth, 0.045, 0.04], [0, y, 0], materials.steelDark);
  }
  const barGeometryWidth = 0.025;
  for (let index = 0; index < barCount; index++) {
    const x = -width / 2 + postSize + (index + 1) * (width - 2 * postSize) / (barCount + 1);
    addBox(group, `VerticalBar${index + 1}`, [barGeometryWidth, height - 0.34, 0.025], [x, height / 2 + 0.05, 0], materials.steelLight);
  }
  return group;
}
