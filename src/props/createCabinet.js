import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

export function createCabinet({ width = 1.2, height = 2, depth = 0.4 } = {}) {
  const group = createAssetGroup('SteelCabinet', 'storage', { width, height, depth });
  const footHeight = 0.09;
  const bodyHeight = height - footHeight;
  const doorGap = 0.028;
  const doorDepth = 0.025;
  const handleProjection = 0.12;
  const bodyDepth = depth - handleProjection;
  const bodyZ = -handleProjection / 2;
  const frontZ = bodyZ + bodyDepth / 2;

  addBox(group, 'CabinetBody', [width, bodyHeight, bodyDepth], [0, footHeight + bodyHeight / 2, bodyZ], materials.paintedSteelBlue);
  addBox(group, 'CabinetInnerFace', [width - 0.07, bodyHeight - 0.08, 0.006], [0, footHeight + bodyHeight / 2, frontZ + 0.004], materials.steelDark);

  const doorPivot = new THREE.Group();
  doorPivot.name = 'DoorPivot';
  doorPivot.position.set(-width / 2 + doorGap, footHeight, frontZ + 0.018);
  group.add(doorPivot);
  const doorWidth = width - doorGap * 2;
  const doorHeight = bodyHeight - doorGap * 2;
  addBox(doorPivot, 'CabinetDoor', [doorWidth, doorHeight, doorDepth], [doorWidth / 2, bodyHeight / 2, 0], materials.steelLight);
  addBox(doorPivot, 'DoorInset', [doorWidth - 0.09, doorHeight - 0.09, 0.004], [doorWidth / 2, bodyHeight / 2, doorDepth / 2 + 0.003], materials.paintedSteelBlue);
  addBox(doorPivot, 'HandleMount', [0.07, 0.15, 0.025], [doorWidth - 0.13, bodyHeight / 2, doorDepth / 2 + 0.018], materials.steelDark);
  addBox(doorPivot, 'CabinetHandle', [0.035, 0.2, 0.055], [doorWidth - 0.13, bodyHeight / 2, doorDepth / 2 + 0.06], materials.steelLight);

  for (let index = 0; index < 5; index++) {
    addBox(doorPivot, `VentSlot${index + 1}`, [0.21, 0.014, 0.006], [doorWidth / 2, 0.22 + index * 0.035, doorDepth / 2 + 0.008], materials.steelDark);
  }
  for (const x of [-width / 2 + 0.11, width / 2 - 0.11]) {
    for (const z of [bodyZ - bodyDepth / 2 + 0.09, bodyZ + bodyDepth / 2 - 0.09]) {
      addBox(group, `CabinetFoot_${x < 0 ? 'L' : 'R'}_${z < 0 ? 'B' : 'F'}`, [0.1, footHeight, 0.1], [x, footHeight / 2, z], materials.rubberBlack);
    }
  }
  return group;
}
