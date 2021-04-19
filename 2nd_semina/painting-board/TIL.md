# HTML Canvas와 JS 이용해서 그림판 만들기

## 1. 기본 캔버스 설정

```html
<!-- 캔버스는 html의 한 요소인데 context를 가짐 -> context는 우리가 픽셀에 접근할 수 있는 방법 // width와 height를 줌으로써 픽셀을 다루는 윈도우가 얼마나 큰 지에 대한 정보를 줘야함 (JS파일 통해서 줄 수도 있음)-->
<canvas id="jsCanvas" class="canvas" width="500" height="600"></canvas>
```

```css
/*실제로 우리 눈에 보일 캔버스의 모습을 구현*/
.canvas {
  width: 500px;
  height: 600px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

```javascript
const canvas = document.getElementById("jsCanvas"); //캔버스 테그의 요소 가져옴
const ctx = canvas.getContext("2d"); //그 픽셀을 읽어들이기 위해 context를 불러옴(2d의 공간 안에서 픽셀들을 컨트롤 함)
```

1. html에서 캔버스 테그와 기본 width, height 설정을 통해 캔버스 API를 데려와야하고
2. css에서 그것에 맞게 원하는 모습을 구현하고
3. JS 에서 해당 테그를 들고 와서 context를 불러와야 한다.

## 2. 자유롭게 그림 그릴 수 있는 도화지 만들기

### 기본적으로 캔버스 내부 그림 구성하는 전제 메소드들

```javascript
ctx.beginPath(); //새로운 경로 생성 -> 이 명령 이후의 그리기 명령들은 전부 경로구성에 쓰임
ctx.moveTo(x, y); //선의 시작 좌표, 펜을 들어 원하는 지점으로 옮겨서 딱 그릴 위치를 잡고 펜을 내려놓는 그 지점의 좌표
ctx.lineTo(x, y); //현재 드로잉 위치에서 해당 좌표까지 선을 그림
ctx.fill(); //경로들을 면으로 채움
ctx.stroke(); //경로들을 선으로 채움
ctx.closePath(); //마지막 지점과 처음지점을 직선으로 연결해 도형을 닫는다 ->  fill()메소드와 stroke()메소드에선 쓸 필요 없음
```

### 스타일 속성 제어하는 메소드들

```javascript
ctx.fillStyle = ""; // 원하는 색상으로 채움
ctx.strokeStyle = "" ; //원하는 색상의 선을 그음
ctx.lineWidth= ; //브러쉬의 굵기
```

### 특정 모양 그리기

```javascript
//호 그리기
arc(x, y, radius, startAngle, endAngle, anticlockwise);
//(x, y) 위치에 원점을 두면서, 반지름 r을 가지고,  startAngle 에서 시작하여 endAngle 에서 끝나며 주어진 anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 됩니다.
arcTo(x1, y1, x2, y2, radius);
//주어진 제어점들과 반지름으로 호를 그리고,  이전 점과 직선으로 연결합니다.

//베지어 곡선과 이차곡선 그리기
quadraticCurveTo(cp1x, cp1y, x, y);
//cp1x 및 cp1y로 지정된 제어점을 사용하여 현재 펜의 위치에서 x와 y로 지정된 끝점까지 이차 베지어 곡선을 그립니다.
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
//(cp1x, cp1y) 및 (cp2x, cp2y)로 지정된 제어점을 사용하여 현재 펜 위치에서 x 및 y로 지정된 끝점까지 삼차 베지어 곡선을 그립니다.

//직사각형 그리기
rect(x, y, width, height);
//좌측상단이 (x, y)이고 폭과 높이가 width와 height인 직사각형을 그립니다.
```

### 함께 사용한 마우스 이벤트들

1. `click` : 클릭
2. `dbclick` : 더블 클릭
3. `mouseup` : 마우스 클릭 눌렀던 것을 떼는 순간 발생
4. `mousedown` : 마우스 클릭 누른 순간 발생
5. `mousemove` : 마우스 움직였을 때 발생
   ```javascript
   //현재 마우스가 있는 곳의 x,y좌표 알고 싶으면
   x = event.offsetX;
   y = event.offsetY;
   ```
6. `mouseover` : 마우스가 해당 element 밖에서 안으로 들어가면 발생 -> 이벤트 버블링 있어서 상위 요소의 이벤트가 자식한테도 똑같이 적용된다.
7. `mouseover` : 마우스가 해당 element 밖에서 안으로 들어가면 발생 -> 이벤트 버블링 있어서 상위 요소의 이벤트가 자식한테도 똑같이 적용된다.
8. `mouseout` : 마우스가 해당 element 안에서 밖으로 나가면 발생
9. `mouseenter`: 마우스가 해당 element 밖에서 안으로 들어가면 발생 -> 이벤트 버블링 없어서 부모노드의 이벤트 속성이 자식한테 전달 안된다
10. `mouseleave` : 마우스가 해당 element 안에서 밖으로 나가면 발생 -> 이벤트 버블링 없어서 부모노드의 이벤트 속성이 자식한테 전달 안된다
11. `contextmenu` : 마우스크 우클릭 눌렀을 때 발생

## 3. 구현한 기능 정리

1. 기본적인 캔버스 기능
   - 캔버스 위에서 `mousedown` 하면 그림이 그려짐, `mouseup` 하는 순간 그림이 멈춤
   - `mouseenter` 된 순간, 그림 그릴 준비(`painting=true;`) / `mouseleave`된 순간, 그림 멈출 준비 -> but. 이러면 `mousedown` 상태로 캔버스에서 그림 그리다가 다시 들어왔을 때 그림 멈춤
2. 색상 팔레트 클릭하면 그 색상의 브러쉬로 바뀜
3. input 테그로 받은 range에 따라 브러쉬 굵기 조절
4. fill mode/ paint mode 나누어 fill 모드일 땐 캔버스 전체를 채우고, paint 모드일 때에는 그림을 그릴 수 있도록
5. 저장 누르면 이미지가 저장되도록 -> 우클릭은 비허용 한 채로

```javascript
const canvas = document.getElementById("jsCanvas"); //캔버스 테그의 요소 가져옴
const ctx = canvas.getContext("2d"); //그 픽셀을 읽어들이기 위해 context를 불러옴(2d의 공간 안에서 픽셀들을 컨트롤 함)
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode"); //fill 누르면 채워지는 함수 실행되고, 그리고 나서 paint로 모드 바뀌도록 제어
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

//디폴트값 설정해줘야 이미지 저장했을 때 배경색 투명 아니라 무언가로 채워짐
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; //우리가 그릴 선들이 가질 색의 디폴트값
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //브러쉬 크기

let painting = false;
let filling = false; //기본적으로 이 값이 true이면 filling 모드가 되도록.

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//모든 움직임 감지하고 라인을 만들어야 함
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //만약 painting이 stop인 상태이면 마우스를 움직이는 모든 순간의 path를 기록. path의 시작점을 계속 갱신해나가다가, 딱 클릭해서 painting이 true가 되는 순간 시작 현재 path의 마지막 점부터 특정 좌표와 직선으로 이어나감.
  if (!painting) {
    ctx.beginPath(); //경로 생성
    ctx.moveTo(x, y); //선 시작 좌표
  } else {
    ctx.lineTo(x, y); //선 끝 좌표
    ctx.stroke(); //실제로 선을 stroke로 채워줌 (위에서 strokeStyle은 지정을 해주었으므로 여기선 실제 선을 채워주기만 함.)
  }
}

//캔버스로 들어왔을 때 시작점 위치 변경
function onMouseEnter(event) {
  x = event.offsetX;
  y = event.offsetY;
  ctx.moveTo(x, y); //선 시작 좌표
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //불러온 색으로 스트로크 스타일 바꾸기
  ctx.fillStyle = color; //선이 아니라 면의 스타일을 제어
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size / 10;
}

function handleModeClick(event) {
  if (filling === true) {
    //filling버튼을 누르면
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true; //filling모드인 상태
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } //filling이 true일 때만 filling모드가 됨
}

function handleCM(event) {
  event.preventDefault(); //우클릭 안됨
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg"); //그냥 비워두면 디폴트형은 png임
  const link = document.createElement("a");
  link.href = image; //canvas.toDataURL()을 href에 먼저 저장
  link.download = "PaimtJS[EXPORT]"; //그리고 그 이미지 이름을 download에 저장
  console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //우클릭창 제어하는 이벤트->우클릭 비허용 가능
}

//colors 찍어보니까 객체로 반환되므로 배열로 받고, 각각의 요소에 해당 이벤트 적용 -> 클릭했을 때 colors배열의 모든 요소에 handleColorClick 적용
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  //input 테그에 의해 받은 것들은 input 이벤트로 분류됨.
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
```

## 4. 추가하고 싶은 기능들

1. 밖에 나갔다가 들어와도 mousedown 상태이면 그림 이어서 그릴 수 있도록

```javascript
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  // canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //우클릭창 제어하는 이벤트->우클릭 비허용 가능
}
```

- `stopPainting`의 기준을 캔버스 밖으로 나가는 것이 아니라, 전체 영역에서 `mouseup` 이벤트가 일어났을 때로 한정하면 문재를 해결할 수 있다!

2. 색상팔레트 클릭했을 때 눌린 티가 나도록 애니메이션 추가 -- 눌렀는지 티가 안남 ㅜ

```javascript
//1. 배경 색 받아서 strokeStyle이랑 fillStyle 채우고, 애니메이션 클래스 추가함
//2. 그리고 애니메이션 클래스 삭제해서 다시 클릭이벤트 받았을 때 새롭게 애니메이션 클래스가 추가되도록.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  const element = event.target;
  //클릭을 하면 -> animation 클래스가 추가되면서 애니메이션 실행 -> 그러나 한 번 실행되고 끝 -> 다시 삭제해야함 )) 시간차 두고 함수실행하기 위해 콜백함수 이용
  element.classList.add("animation");
  ctx.strokeStyle = color; //불러온 색으로 스트로크 스타일 바꾸기
  ctx.fillStyle = color; //선이 아니라 면의 스타일을 제어
  setTimeout(function () {
    element.classList.remove("animation");
  }, 500); //애니메이션 실행시간 0.5s이므로 그 시간 이후에 실행되도록
}
```

```css
@keyframes btn-ani {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}
.animation {
  animation: btn-ani 0.5s;
}
```

- 시간 차 두고 함수를 실행시키기 위해선 콜백 함수가 필요하다!
