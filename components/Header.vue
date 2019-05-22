<template>
<div class="header-container">
  <header class="the-header" @click="(event) => { closePanel(event) }">
    <div
    @click="toggle();"
    class="drawer-toggle"
    role="button">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <transition name="slide-side">
    <SideNav v-if="getsideshow"/>
    </transition>
    <div v-if="getsideshow" class="sidenav-backdrop" @click="toggle"></div>
    <div class="logo">
      <nuxt-link to="/">
      <img src="~/static/images/logo.jpg" style="width:120px;">
      </nuxt-link>
    </div>
    <div class="spacer"></div>
    <div class="navigation-items">
      <ul class="nav-list">
        <li class="nav-item" v-if="!this.$store.state.userInfo"><nuxt-link to="/login">Login</nuxt-link></li>
        <li class="nav-item" v-else>
        <img class="user-img" @click="toggleuserPanel()" src="~/static/images/user.png"/>
        </li>
        <!--li class="nav-item" v-else><a @click="logout()">Logout</a></li-->
      </ul>
      <UserPanel v-if="getuserpanelshow"/>
    </div>
  </header>
</div>
</template>

<script>
import SideNav from "~/components/SideNav";
import UserPanel from "~/components/UserPanel";
export default {
  name: "TheHeader",
  components: {
    SideNav,
    UserPanel,
  },
  computed: {
    getsideshow() {
      return this.$store.state.sidenavvisible.show;
    },
    getuserpanelshow() {
      return this.$store.state.userpanelvisible.show;
    }
  },
  methods : {
    toggleuserPanel() {
      this.$store.commit('userpanelvisible/toggle');
    },
    toggle(){
      this.$store.commit('sidenavvisible/toggle');
    },
    closePanel: function(event) {
      if(this.$store.state.userpanelvisible.show && event.target.classList[0] != 'user-img')
        this.$store.commit('userpanelvisible/close');
    }
  },
};
</script>


<style scoped>
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.5s ease;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 100;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}

.logo {
  width: 100%;
  font-size: 1.3rem;
  text-align: center;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 0 9px 0;
}

.nav-item a {
  cursor: pointer;
  text-decoration: none;
  //color: #f75727;
  color: #9f9f9f;
  z-index:101;
  font-size: 12px;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}

.user-img {
  margin-top: 10px;
  width: 35px;
  cursor: pointer;
}
.drawer-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
  width: 35px;
  cursor: pointer;
  z-index:101;
}

.drawer-toggle .bar {
  width: 70%;
  height: 2px;
  background-color: black;
}
.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}
</style>