const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li");
let posArr = [];
const base = -200;

//section의 갯수만큼 반복을 돌면서 해당 section의 세로 위치값을 전역변수 배열에 저장
for (let section of sections) posArr.push(section.offsetTop);

//브라우저 스크롤시 버튼활성화
window.addEventListener("scroll", e => {
   let scroll = window.scrollY || window.pageYOffset;

   sections.forEach((el, index) => {
      //모든 박스의 세로 위치영역에 공통 버튼, 박스 활성화
      if (scroll >= posArr[index] + base) {
         for (let num = 0; num < sections.length; num++) {
            lis[num].classList.remove("on");
            sections[num].classList.remove("on");
         }
         lis[index].classList.add("on");
         sections[index].classList.add("on");
      }
   })

   // 4번째 스크롤 박스의 영역 svg 커스텀하는 코드
   if(scroll>=posArr[3]){
      //기본 스크롤 값에 현재 박스의 offsetTop값을 뺀 값을 따로 구해야 합니다.

      let catScroll = scroll - posArr[3];
      
   // 선이 그려지는 속도를 4배 더 빠르게 하는 코드
      catScroll = catScroll *4;

      if(catScroll>=3774) catScroll=3774;

      // 스크롤 값을 연동해서 최종적으로는 css의 stroke-dashoffset을 0으로 변화시켜주면서 스크롤 값과 연동되며 그려지게 하는 코드

      let path = sections[3].querySelector("path");
      path.style.strokeDashoffset = 3774 - catScroll;
   }else{
      let path = sections[3].querySelector("path");
      path.style.strokeDashoffset = 3774
   }
   //path의 strokeDashoffset값을 3774로 고정해서 선을 강제로 사라지게 만드는 코드
   //가능한 이유는 strokeDashoffset strokeDasharray값이 같으면 보이지 않는다는 성질을 이용



});

//버튼 클릭시 세로 스크롤 이동
lis.forEach((li, index) => {
   li.addEventListener("click", e => {

      new Anim(window, {
         prop: "scroll",
         value: posArr[index],
         duration: 500
      })
   })
})

