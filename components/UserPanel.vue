<template>
  <div class="userpanel">
    <ul
      class="list">
      <li class="panel-item" @click="closePanel();logout();"><a>로그아웃</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheUserPanel",
  methods: {
    logout(){
      return fetch('/auth/logout', {
        // 클라이언트 Cookies를 서버로 보냅니다.
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          this.$store.commit('SET_AUTH_TOKEN', null)
          this.$store.commit('SET_USER_INFO', null)
          window.location.reload()
        }
      })
    },
    closePanel: function() {
      this.$store.commit('userpanelvisible/close');
    }
  }
};
</script>

<style scoped>

.userpanel {
  height: 60px;
  width: 100px;
  background-color: #5f5d5d;
  z-index: 1001;
  position: fixed;
  top: 60px;
  right: 0;
  box-sizing: border-box;
  text-align:center;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.panel-item {
  margin: 20px 0;
}

.panel-item a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}

.panel-item a:hover,
.panel-item a:active {
  color: #f75727;
}
</style>