import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

export function createWorkbench({ width = 2, height = 0.9, depth = 0.8 } = {}) {
  const group = createAssetGroup('IndustrialWorkbench', 'workstation', { width, height, depth });
  const topThickness = 0.065;
  const legSize = 0.075;
  const inset = 0.11;
  const railHeight = 0.075;
  const legHeight = height - topThickness;
  const legX = width / 2 - inset;
  const legZ = depth / 2 - inset;

  addBox(group, 'Worktop', [width, topThickness, depth], [0, height - topThickness / 2, 0], materials.steelLight);
  addBox(group, 'WorktopEdge', [width, 0.035, depth], [0, height - topThickness - 0.0175, 0], materials.steelDark);

  for (const [side, x] of [['Left', -legX], ['Right', legX]]) {
    for (const [end, z] of [['Front', legZ], ['Rear', -legZ]]) {
      addBox(group, `${side}${end}Leg`, [legSize, legHeight, legSize], [x, legHeight / 2, z], materials.paintedSteelBlue);
      addBox(group, `${side}${end}Foot`, [0.105, 0.035, 0.105], [x, 0.0175, z], materials.rubberBlack);
    }
  }

  const lowerY = 0.24;
  const lowerWidth = width - 2 * inset + legSize;
  const lowerDepth = depth - 2 * inset + legSize;
  addBox(group, 'FrontLowerRail', [lowerWidth, railHeight, 0.05], [0, lowerY, legZ], materials.paintedSteelBlue);
  addBox(group, 'RearLowerRail', [lowerWidth, railHeight, 0.05], [0, lowerY, -legZ], materials.paintedSteelBlue);
  addBox(group, 'LeftLowerRail', [0.05, railHeight, lowerDepth], [-legX, lowerY, 0], materials.paintedSteelBlue);
  addBox(group, 'RightLowerRail', [0.05, railHeight, lowerDepth], [legX, lowerY, 0], materials.paintedSteelBlue);
  addBox(group, 'LowerShelf', [lowerWidth - 0.08, 0.035, lowerDepth - 0.08], [0, lowerY + 0.055, 0], materials.steelDark);

  // The rear lip prevents loose parts from rolling off the back edge.
  addBox(group, 'RearLip', [width, 0.12, 0.025], [0, height - 0.06, -depth / 2 + 0.0125], materials.steelDark);
  return group;
}
