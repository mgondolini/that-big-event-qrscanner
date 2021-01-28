<template>
  <div id="contacts"> 
    <b-card title="Contacts" sub-title="Card subtitle">
      <b-card-text v-for="(contact, index) in contacts" v-bind:key="index">
        Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
        content.
      </b-card-text>

    </b-card>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  data(){
    return{
      contacts: this.$store.state.contacts
    }
  },
}
</script>

<style lang="sass">

</style>