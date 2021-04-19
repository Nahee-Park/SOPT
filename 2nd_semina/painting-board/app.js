// 이벤트들 정리 
// "mousemove" 해당 element에서 마우스가 움직이는 것을 감지
// "mousedown" 해당 element에서 마우스 버튼 누를 때 발생
// "mouseup" 해당 element에서 마우스 버튼을 뗄 때 발생
// "mouseleave" 마우스가 element의 경계 밖으로 벗어날 때 발생 

// 필요한 이벤트
// 1. 마우스가 움직이는 것에 따라 그 값을 받아서 -> 라인을 그릴 예정
// 2. 마우스가 클릭 되었을 때 painting 값을 true로 만들어서 그리기 시작할 수 있도록
// 3. 마우스가 버튼 뗄 때 painting 값을 false로 만들어서 painting 멈추도록
// 4. 마우스가 해당 캔버스 구간으르 벗어날 때 paint false로 만들어서 멈추도록

const canvas = document.getElementById("jsCanvas"); //캔버스 테그의 요소 가져옴
const ctx = canvas.getContext("2d"); //그 픽셀을 읽어들이기 위해 context를 불러옴(2d의 공간 안에서 픽셀들을 컨트롤 함)
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode"); //fill 누르면 채워지는 함수 실행되고, 그리고 나서 paint로 모드 바뀌도록 제어 
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

//html이 아니라 js에서 캔버스 크기 컨트롤한다면 이런 방식으로!
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

//디폴트값 설정해줘야 이미지 저장했을 때 배경색 투명 아니라 무언가로 채워짐
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR; //우리가 그릴 선들이 가질 색의 디폴트값
ctx.fillStyle = INITIAL_COLOR ; 
ctx.lineWidth = 2.5; //브러쉬 크기 

let painting = false; 
let filling = false; //기본적으로 이 값이 true이면 filling 모드가 되도록.

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

//모든 움직임 감지하고 라인을 만들어야 함 
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //만약 painting이 stop인 상태이면 마우스를 움직이는 모든 순간의 path를 기록. path의 시작점을 계속 갱신해나가다가, 딱 클릭해서 painting이 true가 되는 순간 시작 현재 path의 마지막 점부터 특정 좌표와 직선으로 이어나감. 
    if(!painting){
        ctx.beginPath(); //경로 생성
        // ctx.moveTo(x, y); //선 시작 좌표
    }
    else{ 
        ctx.lineTo(x, y); //선 끝 좌표
        ctx.stroke(); //실제로 선을 stroke로 채워줌 (위에서 strokeStyle은 지정을 해주었으므로 여기선 실제 선을 채워주기만 함.)
    }
}

//캔버스로 들어왔을 때 시작점 위치 변경
function onMouseEnter(event){
    x=event.offsetX;
    y=event.offsetY;
    ctx.moveTo(x, y); //선 시작 좌표
}

//1. 배경 색 받아서 strokeStyle이랑 fillStyle 채우고, 애니메이션 클래스 추가함
//2. 그리고 애니메이션 클래스 삭제해서 다시 클릭이벤트 받았을 때 새롭게 애니메이션 클래스가 추가되도록. 
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    const element = event.target;
    //클릭을 하면 -> animation 클래스가 추가되면서 애니메이션 실행 -> 그러나 한 번 실행되고 끝 -> 다시 삭제해야함 )) 시간차 두고 함수실행하기 위해 콜백함수 이용
    element.classList.add("animation"); 
    ctx.strokeStyle = color; //불러온 색으로 스트로크 스타일 바꾸기
    ctx.fillStyle = color; //선이 아니라 면의 스타일을 제어 
    setTimeout(function() {element.classList.remove("animation");},500);
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size/10;
}

function handleModeClick(event){
    if(filling===true){ //filling버튼을 누르면 
        filling = false; 
        mode.innerText = "Fill";
    } else{
        filling = true; //filling모드인 상태 
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    } //filling이 true일 때만 filling모드가 됨 
}

function handleCM(event){
    event.preventDefault(); //우클릭 안됨 
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");//그냥 비워두면 디폴트형은 png임
    const link = document.createElement("a");
    link.href = image; //canvas.toDataURL()을 href에 먼저 저장 
    link.download = "PaimtJS[EXPORT]"; //그리고 그 이미지 이름을 download에 저장
    console.log(link);
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    // canvas.addEventListener("mouseleave", stopPainting); 
    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM); //우클릭창 제어하는 이벤트->우클릭 비허용 가능
}


//colors 찍어보니까 객체로 반환되므로 배열로 받고, 각각의 요소에 해당 이벤트 적용 -> 클릭했을 때 colors배열의 모든 요소에 handleColorClick 적용
Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
);

if(range){ //input 테그에 의해 받은 것들은 input 이벤트로 분류됨.
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
