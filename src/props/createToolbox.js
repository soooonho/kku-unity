import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

export function createToolbox({ width = 0.52, height = 0.28, depth = 0.25 } = {}) {
  const group = createAssetGroup('Toolbox', 'storage', { width, height, depth });
  const bodyHeight = height * 0.7;
  addBox(group, 'ToolboxBody', [width, bodyHeight, depth], [0, bodyHeight / 2, 0], materials.safetyRed);
  const lidPivot = new THREE.Group();
  lidPivot.name = 'LidPivot';
  lidPivot.position.set(0, bodyHeight, -depth / 2);
  group.add(lidPivot);
  addBox(lidPivot, 'ToolboxLid', [width, 0.035, depth], [0, 0.0175, depth / 2], materials.steelDark);
  addBox(lidPivot, 'HandleLeft', [0.018, height - bodyHeight - 0.035, 0.018], [-0.065, (height - bodyHeight + 0.035) / 2, depth / 2], materials.steelLight);
  addBox(lidPivot, 'HandleRight', [0.018, height - bodyHeight - 0.035, 0.018], [0.065, (height - bodyHeight + 0.035) / 2, depth / 2], materials.steelLight);
  addBox(lidPivot, 'CarryHandle', [0.15, 0.018, 0.018], [0, height - bodyHeight - 0.009, depth / 2], materials.steelLight);
  addBox(group, 'FrontLatch', [0.045, 0.055, 0.016], [0, bodyHeight - 0.012, depth / 2 - 0.008], materials.steelLight);
  return group;
}
