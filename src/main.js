import * as THREE from 'three';
import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { createRenderer } from './core/renderer.js';
import { addLighting } from './core/lighting.js';
import { assets } from './config/sceneConfig.js';
import './style.css';

const root = document.querySelector('#canvas-root');
const scene = createScene();
const renderer = createRenderer(root);
const { camera, controls } = createCamera(renderer.domElement);
addLighting(scene);

const assetGroups = new Map();
for (const asset of assets) {
  const group = asset.create();
  group.visible = false;
  scene.add(group);
  assetGroups.set(asset.id, group);
}

const selectionRing = new THREE.Mesh(
  new THREE.RingGeometry(0.43, 0.47, 64),
  new THREE.MeshBasicMaterial({ color: 0xf3b64c, transparent: true, opacity: 0.78, side: THREE.DoubleSide, depthWrite: false })
);
selectionRing.name = 'SelectionRing';
selectionRing.rotation.x = -Math.PI / 2;
selectionRing.position.y = 0.008;
scene.add(selectionRing);

document.querySelector('#asset-count').textContent = String(assets.length).padStart(2, '0');
const assetList = document.querySelector('#asset-list');
const searchInput = document.querySelector('#asset-search');

let selected = assets[0];
let targetPosition = new THREE.Vector3();
let cameraPosition = new THREE.Vector3();
let movingCamera = false;

function renderAssetList(query = '') {
  const keyword = query.trim().toLocaleLowerCase();
  const matches = assets.filter((asset) => `${asset.title} ${asset.category} ${asset.id}`.toLocaleLowerCase().includes(keyword));
  assetList.innerHTML = matches.length ? matches.map((asset) => `
    <button type="button" class="asset-item${selected.id === asset.id ? ' active' : ''}" data-id="${asset.id}" aria-label="${asset.title} 선택" aria-pressed="${selected.id === asset.id}">
      <span class="asset-number">${asset.number}</span><span class="asset-icon">${asset.icon}</span>
      <span class="asset-copy"><strong>${asset.title}</strong><small>${asset.category}</small></span><span class="asset-arrow">↗</span>
    </button>
  `).join('') : '<p class="no-results">검색 결과가 없습니다.</p>';
  document.querySelector('#asset-count').textContent = String(matches.length).padStart(2, '0');
}

function selectAsset(asset, animate = true) {
  selected = asset;
  const group = assetGroups.get(asset.id);
  for (const [id, object] of assetGroups) object.visible = id === asset.id;
  const { width, height, depth } = group.userData.dimensions;
  const index = assets.indexOf(asset);
  renderAssetList(searchInput.value);
  document.querySelector('#asset-index').textContent = `${asset.number} / ${String(assets.length).padStart(2, '0')}`;
  document.querySelector('#detail-icon').textContent = asset.icon;
  document.querySelector('#detail-category').textContent = asset.category;
  document.querySelector('#detail-title').textContent = asset.title;
  document.querySelector('#detail-description').textContent = asset.description;
  document.querySelector('#dim-width').textContent = width.toFixed(2);
  document.querySelector('#dim-height').textContent = height.toFixed(2);
  document.querySelector('#dim-depth').textContent = depth.toFixed(2);
  document.querySelector('#material-tags').innerHTML = asset.materials.map((name) => `<span>${name}</span>`).join('');
  document.querySelector('#view-label').textContent = `${asset.category} / ${String(index + 1).padStart(2, '0')}`;
  selectionRing.scale.setScalar(Math.max(width, depth) * 0.9 + 0.5);

  targetPosition = new THREE.Vector3(0, height * 0.52, 0);
  const distance = Math.max(2.5, Math.max(width, height, depth) * 2.7);
  cameraPosition = targetPosition.clone().add(new THREE.Vector3(distance * 0.85, distance * 0.67, distance));
  if (animate) movingCamera = true;
  else {
    camera.position.copy(cameraPosition);
    controls.target.copy(targetPosition);
    controls.update();
  }
}

assetList.addEventListener('click', (event) => {
  const button = event.target.closest('.asset-item');
  if (button) {
    selectAsset(assets.find((asset) => asset.id === button.dataset.id));
    if (window.matchMedia('(max-width: 760px)').matches) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
searchInput.addEventListener('input', () => renderAssetList(searchInput.value));

controls.addEventListener('start', () => { movingCamera = false; });

document.querySelector('#export-button').addEventListener('click', async () => {
  const button = document.querySelector('#export-button');
  button.disabled = true;
  button.firstChild.textContent = 'GLB 생성 중… ';
  try {
    const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');
    const model = assetGroups.get(selected.id).clone(true);
    model.position.set(0, 0, 0);
    const glb = await new GLTFExporter().parseAsync(model, { binary: true, onlyVisible: true });
    const url = URL.createObjectURL(new Blob([glb], { type: 'model/gltf-binary' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selected.id}.glb`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    console.error('GLB export failed:', error);
    alert('GLB 파일을 만들지 못했습니다. 브라우저 콘솔을 확인해 주세요.');
  } finally {
    button.disabled = false;
    button.firstChild.textContent = '선택한 모델 GLB 다운로드 ';
  }
});

const resizeObserver = new ResizeObserver(() => {
  const width = root.clientWidth;
  const height = root.clientHeight;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
resizeObserver.observe(root);

selectAsset(assets[0], false);
renderer.setAnimationLoop(() => {
  if (movingCamera) {
    camera.position.lerp(cameraPosition, 0.085);
    controls.target.lerp(targetPosition, 0.085);
    if (camera.position.distanceTo(cameraPosition) < 0.01 && controls.target.distanceTo(targetPosition) < 0.01) movingCamera = false;
  }
  controls.update();
  renderer.render(scene, camera);
});
