
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls 설정
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.target.set(0, 1, 0);

  // ✨ 자동 회전 추가
  controls.autoRotate = true;
  controls.autoRotateSpeed = 20.0;
controls.update();

// 조명
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5).normalize();
scene.add(ambientLight, directionalLight);

// 본체
const bodyGeometry = new THREE.BoxGeometry(3, 6, 3);
const bodyMaterial = new THREE.MeshLambertMaterial({color:0x0000ff});
const tardisBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(tardisBody);

// 지붕
const roofGeometry = new THREE.BoxGeometry(2.5, 0.2, 2.5);
const roofMaterial = new THREE.MeshLambertMaterial({color:0x0000ff});
const tardisRoof = new THREE.Mesh(roofGeometry, roofMaterial);
tardisRoof.position.y = 3.1;
tardisBody.add(tardisRoof);

// 벨
const bellGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
const bellMaterial = new THREE.MeshLambertMaterial({color:0x0000ff});
const bell = new THREE.Mesh(bellGeometry, bellMaterial);
bell.position.y = 3.2;
tardisBody.add(bell);

// 바닥
const footGeometry = new THREE.BoxGeometry(3.5, 0.3, 3.5);
const footMaterial = new THREE.MeshLambertMaterial({color:0x0000ff});
const tardisFoot = new THREE.Mesh(footGeometry, footMaterial);
tardisFoot.position.y = -3.1;
tardisBody.add(tardisFoot);

// 창문 8개
const windowGeometry = new THREE.BoxGeometry(1.1, 1.1, 0.1);
const windowMaterial = new THREE.MeshLambertMaterial({color:0xeeeeee});
const windows = [];

// 앞면 창문 2개
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows[0].position.set(-0.7, 1.8, 1.55);
windows[1].position.set(0.7, 1.8, 1.55);

// 뒷면 창문 2개 (뒤집기 포함)
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows[2].position.set(0.7, 1.8, -1.55);
windows[3].position.set(-0.7, 1.8, -1.55);
windows[2].rotation.y = Math.PI;
windows[3].rotation.y = Math.PI;

// 왼쪽면 창문 2개 (뒤집기 + 90도 회전)
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows[4].position.set(-1.55, 1.8, 0.7);
windows[5].position.set(-1.55, 1.8, -0.7);
windows[4].rotation.y = Math.PI / 2 + Math.PI;
windows[5].rotation.y = Math.PI / 2 + Math.PI;

// 오른쪽면 창문 2개 (뒤집기 - 90도 회전)
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows.push(new THREE.Mesh(windowGeometry, windowMaterial));
windows[6].position.set(1.55, 1.8, -0.7);
windows[7].position.set(1.55, 1.8, 0.7);
windows[6].rotation.y = -Math.PI / 2 + Math.PI;
windows[7].rotation.y = -Math.PI / 2 + Math.PI;

windows.forEach(w => tardisBody.add(w));

// 텍스트
const fontLoader = new THREE.FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font){
  const textMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const textOptions = {
    font: font,
    size: 0.3,
    height: 0.05,
    curveSegments: 12,
  };

  function createTextMesh(text){
    const geometry = new THREE.TextGeometry(text, textOptions);
    geometry.computeBoundingBox();
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    return new THREE.Mesh(geometry, textMaterial);
  }

  const textFront = createTextMesh("POLICE BOX");
  textFront.position.set(0, 2.5, 1.55);

  const textBack = createTextMesh("POLICE BOX");
  textBack.position.set(0, 2.5, -1.55);
  textBack.rotation.y = Math.PI;

  const textLeft = createTextMesh("POLICE BOX");
  textLeft.position.set(-1.55, 2.5, 0);
  textLeft.rotation.y = Math.PI / 2 + Math.PI;

  const textRight = createTextMesh("POLICE BOX");
  textRight.position.set(1.55, 2.5, 0);
  textRight.rotation.y = -Math.PI / 2 + Math.PI;

  tardisBody.add(textFront, textBack, textLeft, textRight);

  // 창문 격자 추가 함수
  function addGridToWindow(windowMesh) {
    const lineThickness = 0.02;
    const windowWidth = 1.1;
    const windowHeight = 1.1;
    const gridMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

    // 가로선 1개 (세로 2칸)
    const hLineGeo = new THREE.BoxGeometry(windowWidth, lineThickness, 0.02);
    const hLine = new THREE.Mesh(hLineGeo, gridMaterial);
    hLine.position.set(0, 0, windowMesh.geometry.parameters.depth/2 + 0.01);
    windowMesh.add(hLine);

    // 세로선 2개 (가로 3칸)
    const vLineGeo = new THREE.BoxGeometry(lineThickness, windowHeight, 0.02);
    const vLine1 = new THREE.Mesh(vLineGeo, gridMaterial);
    vLine1.position.set(-windowWidth/3, 0, windowMesh.geometry.parameters.depth/2 + 0.01);
    windowMesh.add(vLine1);

    const vLine2 = new THREE.Mesh(vLineGeo, gridMaterial);
    vLine2.position.set(windowWidth/3, 0, windowMesh.geometry.parameters.depth/2 + 0.01);
    windowMesh.add(vLine2);
  }
  windows.forEach(w => addGridToWindow(w));
});

// 4방면에 창문 아래 2x3 음각 패널 추가
function addPanels() {
  const panelRows = 3;
  const panelCols = 2;
  const panelWidth = 1.15;
  const panelHeight = 1.0;
  const panelDepth = 0.05;
  const panelSpacingX = 0.3;
  const panelSpacingY = 0.25;

  // 각 면 패널 그룹 생성 함수
  function createPanelGroup() {
    const group = new THREE.Group();
    const panelMaterial = new THREE.MeshLambertMaterial({color: 0x000080, side: THREE.BackSide});
    for(let row=0; row<panelRows; row++){
      for(let col=0; col<panelCols; col++){
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth);
        // 음각 처리를 위해 BackSide로 렌더링하고 안쪽으로 살짝 들어가게 위치 조정
        const panel = new THREE.Mesh(geometry, panelMaterial);
        // 위치 배치
        const x = (col - (panelCols-1)/2) * (panelWidth + panelSpacingX);
        const y = (-(row - (panelRows-1)/2)) * (panelHeight + panelSpacingY);
        panel.position.set(x, y, 0);
        group.add(panel);
      }
    }
    return group;
  }

  // 앞면 패널
  const frontPanels = createPanelGroup();
  frontPanels.position.set(0, -0.7, 1.55 + 0.025); // 창문 아래 (창문 y=1.8, 패널은 약간 더 아래로)
  tardisBody.add(frontPanels);

  // 뒷면 패널
  const backPanels = createPanelGroup();
  backPanels.position.set(0, -0.7, -1.55 - 0.025);
  backPanels.rotation.y = Math.PI;
  tardisBody.add(backPanels);

  // 왼쪽면 패널
  const leftPanels = createPanelGroup();
  leftPanels.position.set(-1.55 - 0.025, -0.7, 0);
  leftPanels.rotation.y = Math.PI / 2;
  tardisBody.add(leftPanels);

  // 오른쪽면 패널
  const rightPanels = createPanelGroup();
  rightPanels.position.set(1.55 + 0.025, -0.7, 0);
  rightPanels.rotation.y = -Math.PI / 2;
  tardisBody.add(rightPanels);
}

addPanels();

camera.position.set(0, 2, 10);

function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});