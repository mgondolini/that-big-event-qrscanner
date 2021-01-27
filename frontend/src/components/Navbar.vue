<template>
 <div class=TBEnavbar>
  <b-navbar toggleable="lg" type="dark" variant="info">

    <b-navbar-brand href="#">That Big Event</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Scan QRcode</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Contacts</b-nav-item>
          <b-nav-item-dropdown>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Name Surname</em>
            </template>
            <b-dropdown-item href="profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
 </div>
</template>

<script>
export default {
    name: "Navbar",
}
</script>


<style lang="sass" scoped>

</style>

