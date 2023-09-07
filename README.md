# 프리온보딩 3주차 과제

## 🚀 팀원
여기에 팀원 입력

## 🌐 배포 주소
여기에 배포 주소 입력

## ⚙ 실행 방법
1. 프로젝트 내려받기: `git clone <https://github.com/AlgeMoya/pre-onboarding-12th-3-8.git> ./`
2. 패키지 설치: `npm install`
3. 애플리케이션 실행: `npm start` (브라우저가 자동으로 실행되어 홈페이지로 이동)

## 📁 프로젝트 디렉토리 설명:
- **src/mocks**: Mock Service Worker 관련 함수 관리
- **src/components**: 반복적으로 사용되는 컴포넌트 관리  

**API**:

- **`/sick?q=질병명`** : q에 담긴 키워드를 포함하는 질병 ID와 병명 요청

### **검색어 호출 기능**

- 질환명 검색 시 API 호출 통해서 검색어 추천 기능 구현
- Mock Service Worker 기반의 MSW를 사용, 서버 구축 없이 정적 배포에서도 동작하도록 구현

### **로컬 캐싱 구현**
- API 호출별로 로컬 캐싱 구현
- API 호출 시 현재 시간을 Key로 하고 응답받은 값을 value로 하여 localStorage에 저장
- 매 접속 시마다 localStorage의 값들을 확인하여 키 값이 현재 시간보다 일정 기간 이전인 값들을 삭제
- 창을 닫으면 값이 사라지는 sessionStorage와 달리, localStorage는 창을 닫아도 값이 보존되므로 특정 기간에 따른 만료 기능 구현이 더욱 용이

### **API 호출 횟수를 줄이는 전략 수립 및 실행**

- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- 디바운스 기능을 사용, input 창의 value가 바뀔 때마다 타이머를 설정함으로서 input 창의 value가 마지막으로 바뀐 시점으로부터 특정 기간 이후에 API 호출을 1회 수행
- 이렇게 마지막 입력으로부터 특정 기간 후에 API를 호출하게 함으로서, 실질적으로 여러 API 호출 중 불필요한 건을 없애고 마지막 한 건만 호출하는 효과를 낼 수 있음
- 이러한 API 호출 횟수 감소는 불필요한 요청을 줄임으로서 서버 리소스 절약 효과를 기대할 수 있음
- API 호출 시마다 console.info() 하여 콘솔창에서 API 호출 횟수 확인 가능
 
## 🛠Tech Stack

<div>
  
Area| Tech Stack|
:--------:|:------------------------------:|
**Frontend** | <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Mock Service Worker-FF6A33?&style=for-the-badge">
</div>

