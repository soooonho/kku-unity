import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { addBox, createAssetGroup } from '../utils/geometryUtils.js';

function createDoorFrame(width, height, border) {
  const outer = new THREE.Shape();
  outer.moveTo(-width / 2, -height / 2);
  outer.lineTo(width / 2, -height / 2);
  outer.lineTo(width / 2, height / 2);
  outer.lineTo(-width / 2, height / 2);
  outer.closePath();
  const inner = new THREE.Path();
  inner.moveTo(-width / 2 + border, -height / 2 + border);
  inner.lineTo(-width / 2 + border, height / 2 - border);
  inner.lineTo(width / 2 - border, height / 2 - border);
  inner.lineTo(width / 2 - border, -height / 2 + border);
  inner.closePath();
  outer.holes.push(inner);
  return new THREE.ExtrudeGeometry(outer, { depth: 0.014, bevelEnabled: false });
}

export function createDistributionBox({ width = 0.8, height = 1.2, depth = 0.3 } = {}) {
  const group = createAssetGroup('DistributionBox', 'electrical', { width, height, depth });
  const bodyDepth = depth - 0.05;
  const bodyZ = -0.025;
  const frontZ = bodyZ + bodyDepth / 2;
  addBox(group, 'EnclosureBody', [width, height, bodyDepth], [0, height / 2, bodyZ], materials.paintedSteelWhite);
  addBox(group, 'FrontDoor', [width - 0.055, height - 0.055, 0.018], [0, height / 2, frontZ + 0.012], materials.paintedSteelBlue);
  const frame = new THREE.Mesh(createDoorFrame(width - 0.085, height - 0.085, 0.026), materials.steelLight);
  frame.name = 'ExtrudedDoorFrame';
  frame.position.set(0, height / 2, frontZ + 0.022);
  frame.castShadow = true;
  group.add(frame);
  addBox(group, 'DoorHandle', [0.036, 0.15, 0.03], [width / 2 - 0.105, height / 2, depth / 2 - 0.015], materials.steelDark);
  addBox(group, 'WarningPlate', [0.13, 0.09, 0.004], [-width / 2 + 0.14, height * 0.71, frontZ + 0.031], materials.safetyYellow);
  return group;
}
