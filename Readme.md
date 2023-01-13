# 즐커뮤니티 개발(오픈소스)

## 🖥 프로젝트 명

즐커뮤니티 개발 

## 💡 기획 및 개발

문진혁

## ⌚ 제작 기간

2022.03.05 ~ 2022.03.07 

## ⚙ 사용 기술

- **Front-End**: Ejs , Css , Bootstrap
- **Back-End**: Node-Js, Express, MongoDB

## 🚀  배포

- **MongoDB 에서 다음처럼 초기 값을 지정**

![Untitled](./images/Untitled.png)

![Untitled](./images/Untitled%201.png)

해당 DB_URL 은 server.js, post.js, board.js, login.js 에 각각 넣어준다. 

- **실행**

```jsx
npm start
```

- **배포 시 프로토 타입 사이트**

[즐 커뮤니티](https://port-0-zzul-community-project-ngsnp25lbs5jgw7.gksl2.cloudtype.app/)

## 프로젝트 기획 배경

 NodeJS와 Express를 배운 후에, 실전에 써보기 위해 커뮤니티 성격의 사이트를 제작

기본적인 CRUD 연습을 해보기 위해 제작

## 추후 예정

- 파일추가 기능
- 댓글의 댓글 기능 구현 —> 게시판-댓글 형식을 이용하여 댓글-대댓글 형식으로 만들면 될 것같음
- 로그인 기능
- 일단 가장 중요한 것은 해당 프로젝트는 REST.API를 전혀 준수하지 않고 제작하여 직접 REST.API에 맞춰서 코드를 변경해보는 연습을 해도 좋을 것같다.
(내가 만들고도 너무 코드가 어지러워서 이걸 응용한 물품관리 프로젝트에서는 싹다 REST.API에 맞춰서 코드를 수정하였다)

## 사용한 프로젝트

[세마고등학교 물품관리 프로젝트 에서 응용](https://github.com/jinhuyk/semasicencedata-portfolio)


## 구현

- **6개의 게시판 구현**
    
    ![Untitled](./images/Untitled%202.png)
    
- **기본적인 CRUD 구현**
    
    ![Untitled](./images/Untitled%203.png)
    
    (파일선택 기능은 추가 안됨)
    
    ![Untitled](./images/Untitled%204.png)
    
- **말잇기(댓글) 기능 구현**
    
    ![Untitled](./images/Untitled%205.png)
    

- **공감 기능 구현**
    
    ![Untitled](./images/Untitled%206.png)
    

- **비밀게시판 구현**
    
    ![Untitled](./images/Untitled%207.png)
