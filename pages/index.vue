<template>
  <meta http-equiv="refresh" content="0; url=party/"></meta>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  head() {
    return {
      title: "NewMeet"
    };
  },
  async asyncData ({ params, store }) {
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.title {
  //font-family: "Helvetica Neue";
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #000000;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
