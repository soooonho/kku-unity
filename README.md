# Industrial Props Lab

Three.js와 Vite로 만든 절차적 산업 소품 라이브러리와 3D 뷰어입니다. 모든 모델은 **1 unit = 1 m**, 바닥 중심 원점을 사용합니다. 왼쪽 목록에서 소품을 검색하거나 선택하면 중앙에 한 개씩 미리보기가 표시됩니다.

## 실행

Node.js LTS 설치 후:

```bash
npm install
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 엽니다. 배포용 빌드는 `npm run build`입니다.

## 포함된 모델

| 함수 | 기본 크기 (m) | 설명 |
| --- | --- | --- |
| `createWorkbench({ width, height, depth })` | 2 × 0.9 × 0.8 | 작업대 |
| `createCabinet({ width, height, depth })` | 1.2 × 2 × 0.4 | 철제 캐비닛 |
| `createPipe({ length, diameter, height })` | 1.6 × 0.64 × 0.35 | 파이프 |
| `createValve({ width, height, depth })` | 0.65 × 0.72 × 0.36 | 밸브 |
| `createBarrel({ diameter, height })` | 0.58 × 0.88 × 0.58 | 드럼통 |
| `createFireExtinguisher({ diameter, height })` | 0.2 × 0.62 × 0.2 | 소화기 |
| `createGasCylinder({ diameter, height })` | 0.3 × 1.4 × 0.3 | 가스통 |
| `createSafetyFence({ width, height, depth, barCount })` | 2.4 × 1.8 × 0.16 | 안전 펜스 |
| `createPallet({ width, height, depth })` | 1.2 × 0.145 × 1 | 팔레트 |
| `createToolbox({ width, height, depth })` | 0.52 × 0.28 × 0.25 | 공구함 |
| `createDistributionBox({ width, height, depth })` | 0.8 × 1.2 × 0.3 | 배전함 |
| `createConveyor({ width, height, depth, rollerCount })` | 2.4 × 0.8 × 0.75 | 컨베이어 |
| `createIndustrialLamp({ diameter, height })` | 0.38 × 0.75 × 0.38 | 산업용 램프 |
| `createStorageTank({ diameter, height })` | 1.4 × 2.1 × 1.4 | 저장 탱크 |
| `createIBeam({ width, height, length })` | 0.3 × 0.3 × 2 | I-Beam |
| `createLathePart({ diameter, height })` | 0.5 × 0.85 × 0.5 | 회전대칭 부품 |

각 함수는 이름과 `userData`가 포함된 `THREE.Group`을 반환합니다. 화면에서 모델을 선택하고 **GLB 다운로드** 버튼을 누르면 선택한 모델만 바닥 중심 원점으로 내보냅니다.

```js
import { createWorkbench } from './src/props/createWorkbench.js';

scene.add(createWorkbench({ width: 2.4, height: 0.9, depth: 0.8 }));
```
