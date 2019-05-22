<template>
  <div>
    <Navbar/>
    <div class="app" @click="closePanel">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Header.vue'
import SideNav from '~/components/SideNav.vue'

export default {
  
  components: {
    Navbar,
    SideNav,
  },
  data: function() {
    return {
      display:false
    }
  },
  methods: {
    closePanel: function() {
      this.$store.commit('userpanelvisible/close');
    }
  }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Do+Hyeon|Sunflower:500');
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
* { 
  font-family: 'Do Hyeon', sans-serif;
  font-size: 15px;
  -webkit-text-stroke: 1px rgba(0,0,0,0.1)

}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3549ae;
  color: #3549ae;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--blue:hover {
  color: #fff;
  background-color: #3549ae;
}
</style>
