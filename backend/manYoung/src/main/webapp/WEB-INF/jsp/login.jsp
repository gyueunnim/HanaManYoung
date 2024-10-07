<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">
    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="logo text-hana">
        <img src="${pageContext.request.contextPath}/images/logo.png" alt="Logo">
        <div style="display: flex; align-items: flex-end; font-weight: bold;">
            <p style="margin-left: 5px">하나만영</p>
            <p style="margin-left: 7.5px; font-size: 0.85rem;">하나에서 만나 young</p>
        </div>
    </div>
    <form id="loginForm">
        <div class="box mt-10">
            <p class="mb-5">아이디 <span id="loginError" class="error-msg"></span></p>
            <input type="text" name="user_login_id" placeholder="아이디 입력" id="user_login_id">
        </div>
        <div class="box mt-10">
            <p class="mb-5">비밀번호</p>
            <input type="password" name="user_pw" placeholder="비밀번호 입력" id="user_pw">
        </div>
        <button class="login-btn mt-20" type="button" onclick="handleLogin()">로그인</button>
    </form>
</div>
<script>
    function clearErrorMessage() {
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.textContent = '';
        }
    }

    // function handleLogin() {
    //     const userId = document.getElementById('user_login_id').value;
    //     const userPw = document.getElementById('user_pw').value;
    //
    //     fetch('/login/try', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userLoginId: userId,
    //             userPw: userPw
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             const loginError = document.getElementById('loginError');
    //             if (data.success) {
    //                 loginError.textContent = '';
    //                 window.parent.postMessage({ success: true, userId: data.data.userId }, '*');
    //             } else {
    //                 loginError.textContent = '로그인 실패. 다시 시도하세요.';
    //                 window.parent.postMessage({ success: false }, '*');
    //             }
    //         })
    //         .catch(error => console.error('Error:', error));
    // }

    // JSP의 handleLogin 함수에서 postMessage로 JWT를 전달하는 부분 수정
    function handleLogin() {
        const userId = document.getElementById('user_login_id').value;
        const userPw = document.getElementById('user_pw').value;

        fetch('/login/try', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userLoginId: userId,
                userPw: userPw
            }),
        })
            .then(response => response.json())
            .then(data => {
                const loginError = document.getElementById('loginError');
                if (data.success) {
                    loginError.textContent = '';

                    // 성공적으로 JWT와 userId를 부모 창에 전달
                    window.parent.postMessage({ success: true, userId: data.data.userId, jwt: data.data.jwt }, '*');
                } else {
                    loginError.textContent = '로그인 실패. 다시 시도하세요.';
                    window.parent.postMessage({ success: false }, '*');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    document.getElementById('user_login_id').addEventListener('input', clearErrorMessage);
    document.getElementById('user_pw').addEventListener('input', clearErrorMessage);
</script>
</body>
</html>
