import * as THREE from 'three';

const standard = (color, metalness, roughness) => new THREE.MeshStandardMaterial({ color, metalness, roughness });

export const materials = {
  steelDark: standard(0x27333b, 0.78, 0.48),
  steelLight: standard(0x9ba9ad, 0.72, 0.37),
  paintedSteelBlue: standard(0x345366, 0.52, 0.48),
  paintedSteelYellow: standard(0xf2ae38, 0.46, 0.46),
  rubberBlack: standard(0x171e23, 0, 0.86),
  plasticBlack: standard(0x222c33, 0, 0.55),
  safetyRed: standard(0xc64335, 0.42, 0.45),
  safetyYellow: standard(0xf1b43e, 0.38, 0.49),
  safetyOrange: standard(0xe87532, 0.42, 0.48),
  paintedSteelWhite: standard(0xd5dddc, 0.44, 0.48),
  paintedSteelGreen: standard(0x42846c, 0.46, 0.5),
  glass: new THREE.MeshPhysicalMaterial({ color: 0xb6d5dc, metalness: 0, roughness: 0.12, transmission: 0.45, transparent: true, opacity: 0.8 })
};
