# github-issue-dashboard

## 💁🏻‍♂️ Getting Started

<b>📁페이히어 구현 과제</b>

[구현된 사이트 (클릭)](https://github-issue-dashboard-ten.vercel.app/)

## 📃 Description

<div style='line-height: 2'>
요구사항을 충실하게 구현하였습니다.
<br>
React 환경에서 SPA 방식으로 구현을 하였으며, 번들러로는 Webpack을 사용하였습니다.
<br>
Rest API를 사용해 해당 데이터를 패치하는 방식을 사용하였습니다.
<br>
예외사항에 대해 충분히 고민하고 redirect와 error 메세지를 통해 이를 처리해주었습니다.
<br>
url의 쿼리 파라미터를 통해 rest하게 서버와 통신할 수 있습니다.
<br>
lint와 prettier 설정은 평소에 제가 주로 사용하던 설정을 사용하였습니다.
<br>
home page 컴포넌트에서는 함수를 명확하게 구분하기 위해 화살표 함수가 아닌 일반 함수 선언을 사용하였습니다.
<br>
유효하지 않은 url의 경우 404 페이지 처리를 해주었습니다.
<br>
이슈 페이지의 경우 유효하지 않은 id 값일 때 에러 메시지와 함께 home 페이지로 리다이렉트 처리를 해주었습니다.
<br>
</div>

<br>

<b>src 디렉토리 내의 설명을 아래와 같습니다.</b>

> <b>📁commons</b> : 서버와 통신할 base url과 localStorage 함수를 모아둔 곳

> <b>📁components</b> : 공통으로 사용할 컴포넌트와 아이콘들을 모아둔 곳.

> <b>📁constants</b> : 상수들을 모아둔 곳.

> <b>📁hooks</b> : custom hook들을 모아둔 곳. 각 목적에 맞게 파일로 세분화.

> <b>📁networks</b> : 서버와 통신할 함수들을 모아둔 곳. 각 목적에 맞게 파일로 세분화.

> <b>📁pages</b> : route 처리를 한 페이지 컴포넌트들을 모아둔 곳.

> <b>📁styles</b> : style 관련 파일들을 모아둔 곳. reset 파일과 전역으로 적용할 global style을 해당 디렉토리 내에서 정의.

> <b>📁types</b> : 각 type들을 정의해둔 곳.

<br>
<b>사용한 네이밍 컨벤션은 아래와 같습니다.</b>

- camel case : 함수, 변수, page 컴포넌트, 일반 파일
- scream snake case : 상수를 정의할 때 사용.
- pascal case : page 컴포넌트들을 제외한 일반 컴포넌트.

## 📚 Technical Stacks

- React
- React Router Dom
- Typescript
- Styled Components
- Antd
- Axios
- Webpack

## 📦 Install

```shell
$ npm install
```

## 🔨 Runs

```shell
$ npm run start
```

## ❤️ License

Licensed by [Taurusboong2](https://github.com/taurusboong2)
