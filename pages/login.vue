<template>
  <div class="login-page">
    <div class="row">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6" style="margin-left:auto; margin-right:auto;  background-color:#fefefe; padding: 2%; box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.2);">
        <div class="row">
          <div class="col-md-12" style="text-align:center;">
            <h2>로그인</h2>
          </div>
        </div>
        <form class="login-form validate" id="login-form" method="post" name="login-form">
          <div class="row">
            <div class="form-group col-md-12">
              <label class="form-label">아이디</label>
              <input class="form-control" id="login_id" name="username" type="text" @click="login_fail=false">
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-12">
              <label class="form-label">비밀번호</label> <span class="help"></span>
              <input class="form-control" id="password" name="password" type="password" @click="login_fail=false"
                @keyup.13="login">
            </div>
          </div>
          <div class="row">
            <div class="control-group col-xs-12 col-md-12">
              <div class="checkbox checkbox check-success">
                <input id="save_id" type="checkbox" checked>
                <label for="save_id">아이디 저장</label>
                <a href="#">비밀번호 찾기</a>&nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" style="text-align:center; margin-top: 15px;">
              <label class="error pull-left vertical-center" style="font-size:13px;"
               v-if="login_fail">아이디 혹은 비밀번호가 올바르지 않습니다.</label>
              <button class="btn-login" type="button" @click="login">로그인</button>
            </div>
            <div class="col-md-12" style="text-align:center; margin-top: 15px;">
                <img class="kakao-login-img"
                src="~/static/images/kakao_login.png" @click="loginWithKakao()"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  layout : 'blank',
  head:{
    title: 'Login',
    script: [
      { src: "//developers.kakao.com/sdk/js/kakao.min.js" }
    ]
  },
  mounted(){
    $('#login_id').val(this.getCookie('login_id'));
  },
  data(){
    return {
      appKey: process.env.APPKEY,
      login_fail : false
    }
  },
  methods : {
      login ({ commit }) {
      var username = $('#login_id').val();
      var password = $('#password').val();
      return fetch('/auth/login', {
        // 클라이언트 Cookies를 서버로 보냅니다.
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return res.json()
        }
      })
      .then((authUser) => {
        this.$store.commit('SET_AUTH_TOKEN', authUser.auth)
        this.$store.commit('SET_USER_INFO', authUser.userInfo)
        window.location.href = document.referrer;
      })
    },
    loginWithKakao() {
      try {
        Kakao.init(this.appKey);
      }
      catch(e) {
        console.log(e);
      }
      var axios = this.$axios;
      var store = this.$store;
      var router = this.$router;
      var res_access_token;
      Kakao.Auth.login({
        success: function(authObj) {
          res_access_token = authObj.access_token        
          return fetch('/oauth/kakao', {
            // 클라이언트 Cookies를 서버로 보냅니다.
            credentials: 'same-origin',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({res_access_token})
          })
          .then((res) => {
            if (res.status === 401) {
              throw new Error('Bad credentials')
            } else {
              return res.json()
            }
          })
          .then((authUser) => {
            store.commit('SET_AUTH_TOKEN', authUser.auth)
            store.commit('SET_USER_INFO', authUser.userInfo)
            window.location.href = document.referrer;
          })
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    },
    setCookie : function (cName, cValue, cDay){
      var expire = new Date();
      expire.setDate(expire.getDate() + cDay);
      var cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
      if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
    },
    getCookie : function (cName) {
      cName = cName + '=';
      var cookieData = document.cookie;
      var start = cookieData.indexOf(cName);
      var cValue = '';
      if(start != -1){
          start += cName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
      }
      return unescape(cValue);
    }
  }
}
</script>
<style>
body {
  background-color: #e7e7e7;
}
.login-page{
  height: 100%;
  display: flex;
  align-items: center;
}
.login-page > .row{
  padding: 2%;
  width: 100%;
  margin: 0px !important;
}

.kakao-login-btn {
  border: none;
  padding: 0;
  border-radius: 0.5rem;
}
.kakao-login-img {
  cursor: pointer;
  width: 150px;
  height: 35px;
}
.btn-login {
  width: 150px;
  height: 35px;
  padding: 0;
  border-radius: 0.2rem;
  border: none;
  background-color: #2ac1bc;
  color: white;
  font-size: 14px;
  box-shadow: 0 0.03rem 0.03rem rgba(0,0,0,.3);
}
</style>