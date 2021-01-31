<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

.my-10 
  margin-top: 10% !important
  margin-bottom: 10% !important

.card-title
  font-size: 30px

@media (min-width: 1200px)
  .container
    max-width: 850px !important

@media (min-width: 992px)
  .container
    max-width: 800px !important
</style>
