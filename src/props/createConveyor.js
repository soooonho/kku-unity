import { materials } from '../materials/industrialMaterials.js';
import { addBox, addCylinder, createAssetGroup } from '../utils/geometryUtils.js';

export function createConveyor({ width = 2.4, height = 0.8, depth = 0.75, rollerCount = 12 } = {}) {
  const group = createAssetGroup('RollerConveyor', 'transport', { width, height, depth });
  const railY = height - 0.1;
  for (const [side, z] of [['Front', depth / 2 - 0.035], ['Rear', -depth / 2 + 0.035]]) {
    addBox(group, `${side}SideRail`, [width, 0.2, 0.07], [0, railY, z], materials.paintedSteelBlue);
  }
  const rollerLength = depth - 0.14;
  const rollerRadius = 0.055;
  for (let index = 0; index < rollerCount; index++) {
    const x = -width / 2 + 0.13 + index * (width - 0.26) / (rollerCount - 1);
    const roller = addCylinder(group, `Roller${index + 1}`, rollerRadius, rollerRadius, rollerLength, [x, height - 0.08, 0], materials.steelLight, 12);
    roller.rotation.x = Math.PI / 2;
  }
  for (const x of [-width / 2 + 0.18, width / 2 - 0.18]) {
    for (const z of [-depth / 2 + 0.1, depth / 2 - 0.1]) {
      const side = x < 0 ? 'Left' : 'Right';
      const end = z < 0 ? 'Rear' : 'Front';
      addBox(group, `${side}${end}Leg`, [0.075, height - 0.2, 0.075], [x, (height - 0.2) / 2, z], materials.steelDark);
      addBox(group, `${side}${end}Foot`, [0.12, 0.03, 0.12], [x, 0.015, z], materials.rubberBlack);
    }
  }
  return group;
}
