import { createWorkbench } from '../props/createWorkbench.js';
import { createCabinet } from '../props/createCabinet.js';
import { createPipe } from '../props/createPipe.js';
import { createValve } from '../props/createValve.js';
import { createBarrel } from '../props/createBarrel.js';
import { createFireExtinguisher } from '../props/createFireExtinguisher.js';
import { createGasCylinder } from '../props/createGasCylinder.js';
import { createSafetyFence } from '../props/createSafetyFence.js';
import { createPallet } from '../props/createPallet.js';
import { createToolbox } from '../props/createToolbox.js';
import { createDistributionBox } from '../props/createDistributionBox.js';
import { createConveyor } from '../props/createConveyor.js';
import { createIndustrialLamp } from '../props/createIndustrialLamp.js';
import { createStorageTank } from '../props/createStorageTank.js';
import { createIBeam } from '../props/createIBeam.js';
import { createLathePart } from '../props/createLathePart.js';

export const assets = [
  { id: 'workbench', icon: '▤', category: 'WORKSTATION', title: '작업대', description: '강철 상판과 하단 선반, 보강 프레임을 갖춘 산업용 작업대입니다.', materials: ['도장 강철', '스테인리스', '고무'], create: createWorkbench },
  { id: 'cabinet', icon: '▥', category: 'STORAGE', title: '철제 캐비닛', description: '회전 가능한 도어와 손잡이, 환기 슬롯을 갖춘 보관 캐비닛입니다.', materials: ['도장 강철', '금속'], create: createCabinet },
  { id: 'pipe', icon: '═', category: 'PIPING', title: '파이프', description: '양 끝 플랜지와 받침대를 포함한 직선 배관 모듈입니다.', materials: ['강철', '도장 강철'], create: createPipe },
  { id: 'valve', icon: '◉', category: 'PIPING', title: '밸브', description: '배관 연결부와 회전 가능한 핸드휠을 갖춘 수동 밸브입니다.', materials: ['강철', '안전 빨강'], create: createValve },
  { id: 'barrel', icon: '◫', category: 'STORAGE', title: '드럼통', description: '원통형 강철 몸체와 보강 링, 뚜껑을 갖춘 저장 드럼입니다.', materials: ['도장 강철', '금속'], create: createBarrel },
  { id: 'fire-extinguisher', icon: '♨', category: 'SAFETY', title: '소화기', description: '압력 용기와 둥근 어깨, 분사 레버가 분리된 휴대용 소화기입니다.', materials: ['안전 빨강', '금속', '고무'], create: createFireExtinguisher },
  { id: 'gas-cylinder', icon: '▣', category: 'STORAGE', title: '가스통', description: '둥근 어깨와 상단 밸브를 갖춘 고압 가스 실린더입니다.', materials: ['도장 강철', '금속'], create: createGasCylinder },
  { id: 'safety-fence', icon: '▦', category: 'SAFETY', title: '안전 펜스', description: '노란 기둥과 반복되는 세로 바를 갖춘 모듈형 안전 펜스입니다.', materials: ['안전 노랑', '강철'], create: createSafetyFence },
  { id: 'pallet', icon: '▰', category: 'STORAGE', title: '팔레트', description: '상판 슬랫과 세 개의 받침대를 조합한 산업용 팔레트입니다.', materials: ['강철', '도장 강철'], create: createPallet },
  { id: 'toolbox', icon: '▧', category: 'STORAGE', title: '공구함', description: '열 수 있도록 피벗을 분리한 뚜껑과 운반 손잡이를 갖춘 공구함입니다.', materials: ['안전 빨강', '금속'], create: createToolbox },
  { id: 'distribution-box', icon: '▩', category: 'ELECTRICAL', title: '배전함', description: 'Box 몸체와 ExtrudeGeometry 도어 테두리를 사용한 벽면형 배전함입니다.', materials: ['도장 강철', '금속'], create: createDistributionBox },
  { id: 'conveyor', icon: '▥', category: 'TRANSPORT', title: '컨베이어', description: '강철 프레임과 반복되는 원통 롤러로 구성된 운반 장치입니다.', materials: ['도장 강철', '금속', '고무'], create: createConveyor },
  { id: 'industrial-lamp', icon: '◬', category: 'LIGHTING', title: '산업용 램프', description: '원통 지지대와 원뿔형 갓을 조합한 산업용 조명 소품입니다.', materials: ['도장 강철', '유리'], create: createIndustrialLamp },
  { id: 'storage-tank', icon: '⬭', category: 'STORAGE', title: '저장 탱크', description: '원통형 셸과 위아래 반구형 돔으로 구성된 저장 탱크입니다.', materials: ['강철'], create: createStorageTank },
  { id: 'i-beam', icon: 'Ⅰ', category: 'STRUCTURE', title: 'I-Beam', description: 'I형 단면을 ExtrudeGeometry로 길게 압출한 구조용 강재입니다.', materials: ['강철'], create: createIBeam },
  { id: 'lathe-part', icon: '♧', category: 'MACHINERY', title: '회전대칭 부품', description: '단면 프로파일을 LatheGeometry로 회전해 만든 기계 부품입니다.', materials: ['금속'], create: createLathePart }
].map((asset, index) => ({ ...asset, number: String(index + 1).padStart(2, '0') }));
