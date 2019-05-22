<template>
  <div class="sidenav">
    <ul
      class="nav-list">
      <li class="nav-item" @click="closeNav()"><nuxt-link to="/party">일정보기</nuxt-link></li>
      <li class="nav-item" @click="closeNav()"><nuxt-link to="/promotion">홍보하기</nuxt-link></li>
      <li class="nav-item" @click="closeNav()"><nuxt-link to="/info">NewMeet 소개</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheSidenav",
  methods: {
    closeNav: function() {
      this.$store.commit('sidenavvisible/toggle');
    }
  }
};
</script>

<style scoped>

.sidenav {
  height: 100%;
  width: 250px;
  background-color: #5f5d5d;
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px;
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
}

.nav-item a:hover,
.nav-item a:active {
  color: #f75727;
}
</style>