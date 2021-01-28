# Cryptocurrency Investment Project
안녕하세요. 프론트엔드 개발자 홍예찬입니다.<br>
새롭게 진행한 가상화폐 투자 프로젝트를 어떻게 진행했는지에 대해 설명드리도록 하겠습니다.<br>
이번 프로젝트는 기존에 위코드에서 진행했던 코인원 프로젝트에서 비중있게 다뤘던 데이터 시각화 구현뿐만 아니라, 실제 사용자가 투자를 진행하는 과정을 구현하는 프로젝트였습니다.<br>
프로젝트를 진행하면서 가장 중점을 뒀던 점은 제공된 api를 활용하여 데이터 통신을 얼마나 효율적으로 진행할 것인지, 차트를 위한 데이터와 사용자의 투자 신청 데이터를 어떻게 구현하고 처리할 것인지였습니다.<br>
이 프로젝트를 통해서 현업에서 방대한 양의 데이터 처리를 다뤄야 하는 일을 맡았을 때, 어떤 관점으로 접근하고 코드를 구현해야 하는지, 더 효율적인 방법은 없는지 고민해보고 공부하는 시간을 가졌습니다.<br>

## 🗓 작업 기간
**- 2021.1.22 - 2020.1.29**

## 🔧 기술 스택
**- JavaScript(ES6+)**<br>
**- React hooks**<br>
**- Chart.js**<br>
**- SCSS**<br>
**- Redux**<br>
**- Github**<br>

## 💻 기능 구현

### (1). CRA 초기세팅 및 컴포넌트 분류
CRA 초기세팅을 완료한 후, github을 통해 버전 관리를 수행했으며 유의미한 단위로 PR을 진행했습니다.<br>
이번 프로젝트는 Apply(투자 신청 컴포넌트), Status(투자 신청 상태 컴포넌트), Chart(차트 컴포넌트)로 크게 세 컴포넌트로 구성되어 있습니다.<br>

### (2). 데이터 처리 과정(이번 프로젝트에서 가장 많은 고민을 한 부분입니다.)
#### 데이터 전달 방식
처음 컴포넌트를 분류한 이후 app.js파일에서 필요한 데이터를 모두 받아와 props로 각각의 컴포넌트에 전달하는 방식으로 데이터 처리를 생각했습니다.<br>
그러나 app.js에서 각 컴포넌트에 필요한 데이터를 일일이 props로 전달하는 방식이 생각보다 번잡스럽고, 비효율적으로 코드를 작성한다는 생각이 들어 Redux를 활용하게 되었습니다.<br>
처음 컴포넌트가 마운트될 때, app.js에서 getApiData()가 실행되고, fetch함수를 통해 받아온 데이터들이 store에 저장되도록 구현했습니다.<br>

#### API 통신 (교훈: 공식문서를 꼼꼼히 잘 읽으면 해답이 보일 것이다.)
제공된 API를 이용하여 필요한 데이터(이자율)를 받아오는 작업을 수행할 때, 429error(Too Many Requests)가 발생했습니다.<br>
처음에는 api URL을 잘못 입력한 줄 알았으나, public api limit으로 인해 에러가 뜬다는 것을 알게 되었고 api를 제공하는 홈페이지에 로그인을 하고 개인에게 발급된 api key를 사용하지 않으면 안된다는 것을 알게 되었습니다.<br> 
홈페이지에 게시된 방법을 다시 차근차근 읽어보니 apikey를 발급받고 이를 api주소에 넣기만 하면 되는, 생각보다 쉬운 방법이었습니다.<br>
그러나 프로젝트를 진행하면서 또 한 번의 위기(?)를 맡게 되었는데, 개인에게 발급된 api key를 사용해도 일정 양의 API Credit을 다 사용하게 되면 429 error가 발생하는 것이었습니다.<br>
이러한 문제가 일어난 원인을 해결하기 위해, 기존의 api 통신 방식에 대해 다시 고민하게 되었고, 새로운 방식으로 변경하게 되었습니다.<br>
기존의 api 통신 방식은 사용자가 가상화폐 드롭다운에서 특정 화폐를 클릭했을 때, 그 화폐에 대한 데이터를 받아오는 방식이었습니다. 이 방식이 결국 429 error를 뜨게 만드는 원인이었습니다.<br>
만약, 실제 현업에서 이렇게 데이터 처리 로직을 구현했더라면 사용자가 클릭할 때마다 서버에 데이터 요청을 했을 것이고, 이는 서버에 과부하를 일으킬 수 있다는 생각이 들었습니다.<br>
따라서, 서버에 훨씬 적은 부담을 주기 위해 처음 화면이 렌더링된 이후, 컴포넌트가 마운트될 때 필요한 데이터를 한꺼번에 불러와서 store에 저장하게 하는 데이터 통신 방식으로 변경하게 되었습니다.<br>

#### 차트 데이터 (교훈: 이가 없으면 잇몸을 만들어서(?) 하면 된다.)
제공된 api의 경우 누적된 이자율 데이터를 보내는 것이 아니라, 호출 당시의 이자율 데이터를 보내줬기 때문에, 차트 데이터를 구현하기 위한 데이터 생성(?) 방법을 모색해야만 했습니다.<br>
차트에 나타날 데이터를 구현하기 위해서는 방대한 양의 누적된 데이터가 필요했기 때문에, 처음에는 1시간 단위로 데이터를 리턴하는 함수를 이용하여 가상 데이터를 생성해야겠다고 생각했습니다.<br>
그러나, 막대한 양의 데이터를 스스로 생성하는 데는 한계가 있을뿐더러, 구현하는 방식에 있어서도 어려움을 느꼈기에 하루 단위의 데이터를 리턴하는 함수를 구현했습니다.<br>
데이터 생성 함수의 경우, 실제 api에서 받아온 이자율에 랜덤으로 수를 곱한 후, 배열 안에 객체 형식으로 저장하는 로직으로 구현했습니다.(한 달을 기준으로 잡았기에 30개의 데이터를 생성했습니다.)<br> 
마지막 날짜의 이자율 같은 경우에는 제공된 api의 이자율이 들어가도록 구현했습니다.<br> 

### (3). 투자 신청
투자 신청의 경우 사용자가 일정 금액을 입력한 후 신청 버튼을 누르게 되면 해당 데이터가 store에 저장되고, status 컴포넌트에서는 store에 저장된 데이터를 렌더링하는 방식으로 구현했습니다.<br>
또한 몇 가지 예외처리를 통해 발생할 수 있는 버그를 처리하도록 고려했습니다.<br>
예를 들어, 사용자가 아무 값도 입력하지 않고 신청 버튼을 누르거나, 0을 입력하고 신청 버튼을 누르거나, 숫자가 아닌 문자를 입력했을 경우 alert창을 통해 조건에 맞는 값을 입력할 수 있도록 구현했습니다.<br>
또한 투자 한도보다 더 많은 금액을 입력하고 신청 버튼을 누르는 경우에도 '최대 n까지 신청할 수 있습니다'라는 alert창을 띄웠습니다.<br>
신청 조건에 맞는 값을 입력했을 경우에만 신청이 될 수 있도록 로직을 구현했습니다.<br>

### (4). 느낀 점
#### 1. 나무가 아닌 숲을 보자.
프로젝트를 진행하면서 한정된 시간 내에 반드시 완성하겠다는 의욕이 앞섰던 것 같습니다.<br>
그러다 보니 데이터를 어떻게하면 더 효율적으로 처리할지, 데이터의 흐름을 어떻게 가져갈지, 어떻게 하면 더 보기 좋고 예쁜 코드를 구현할 수 있을지 충분히 생각하기보다는 당장 눈 앞에 있는 기능을 구현하는데에 초점을 맞추게 되었습니다.<br>
프로젝트가 거의 완성될 무렵 구현한 코드를 다시 살펴보는데 마치 처음 코딩을 배웠을때로 돌아간듯한 형편없는 코드를 마주하게 되었습니다.<br>
데이터 통신 로직은 엉망이었고, 여기저기 예외처리는 되지 않아 언제 어디서든 버그가 터져나와도 이상하지 않을 괴상한 코드가 눈 앞에 펼쳐져 있었습니다.<br>
다시 api 통신 로직을 완전히 바꾸고, 큰 흐름에서 어떻게 코드를 짜야하는지 고민하게 되었습니다.<br>
이번 사건(?)을 통해 정말 좋은 개발자, 실력있는 개발자는 당장 수백줄의 코드를 치고, 단순히 기능을 재빠르게 구현하는 것이 아니라(물론 이런 능력도 함께 겸비한다면 더 좋겠으나) 보다 거시적인 관점에서 숲을 볼 줄 아는 개발자라는 점을 깨닫게 되었습니다.<br>

#### 2. API통신 전용 js 파일을 만들어보자.
이번 프로젝트에서는 api 통신 코드를 app.js 파일에서 구현했습니다.<br>
처음에는 api 통신 전용 js 파일을 따로 만들어서 더 좋은 코드를 구현해보자 했으나, 당장 눈 앞에 있는 기능 구현에 집중하게 되면서(나무가 아니라 숲을 보자!!) 실행에 옮기지 못했습니다.<br>
이번 프로젝트의 경우 한 번의 api 통신을 통해 필요한 데이터를 한 번에 받아올 수 있었지만, 만약 더 많고 다양한 api 통신을 진행하는 프로젝트를 진행하는 경우, 컴포넌트 단위의 파일에서 통신 로직을 작업하게 된다면 가독성이 떨어질 뿐만 아니라 그리 효율적인 코드 구현이 아니라는 생각이 들었으며 앞으로 프로젝트를 진행하면서 api통신 전용의 js 파일을 컴포넌트 단위 파일에서 분리하는 연습을 해봐야겠다고 생각했습니다.<br>
