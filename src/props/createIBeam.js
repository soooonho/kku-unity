import * as THREE from 'three';
import { materials } from '../materials/industrialMaterials.js';
import { createAssetGroup } from '../utils/geometryUtils.js';

export function createIBeam({ width = 0.3, height = 0.3, length = 2 } = {}) {
  const group = createAssetGroup('IBeam', 'structure', { width, height, depth: length });
  const flange = 0.045;
  const web = 0.055;
  const points = [
    [-width / 2, 0], [width / 2, 0], [width / 2, flange], [web / 2, flange],
    [web / 2, height - flange], [width / 2, height - flange], [width / 2, height],
    [-width / 2, height], [-width / 2, height - flange], [-web / 2, height - flange],
    [-web / 2, flange], [-width / 2, flange]
  ];
  const shape = new THREE.Shape();
  shape.moveTo(...points[0]);
  for (const point of points.slice(1)) shape.lineTo(...point);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false });
  geometry.translate(0, 0, -length / 2);
  const beam = new THREE.Mesh(geometry, materials.steelDark);
  beam.name = 'ExtrudedIProfile';
  beam.castShadow = true;
  beam.receiveShadow = true;
  group.add(beam);
  return group;
}
