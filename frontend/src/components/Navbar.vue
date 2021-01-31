<template>
 <div class=TBEnavbar>
  <b-navbar toggleable="lg" type="dark" variant="info">

    <b-navbar-brand>That Big Event</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="this.$store.state.isAuthenticated === true" to="code_scanner">Scan QRcode</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="this.$store.state.isAuthenticated === true" to="contacts">Contacts</b-nav-item>
          <b-nav-item-dropdown v-if="this.$store.state.isAuthenticated === true">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ getEmail }}</em>
            </template>
            <b-dropdown-item @click.prevent="signOut()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
 
 </div>
</template>

<script>
export default {
    name: "Navbar",
    data(){
      return{
        
      }
    },
    computed:{
      getEmail(){
        return this.$store.state.email;
      }
    },
    methods: {
      signOut(){
        this.$store.commit('logout');
        if (this.$route.path !== '/login') {
          this.$router.push('/login');
        }
      }
    }
}
</script>


<style lang="sass" scoped>

</style>

