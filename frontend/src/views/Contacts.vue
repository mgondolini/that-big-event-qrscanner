<template>
  <div id="contacts"> 
    <b-card title="Contacts">
      <div v-for="(contact, index) in contacts" v-bind:key="index">
        <b-card>
          <b-card-text>{{contact.firstName}} {{contact.lastName}}</b-card-text>
          <b-card-text>{{contact.company}}</b-card-text>
          <a :href="`mailto:${contact.email}`"> {{contact.email}} </a>
          <b-button v-clipboard="contact.email" variant="light">
            <b-icon icon="clipboard" font-scale="0.99"></b-icon>
          </b-button>
        </b-card>
      </div>

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
  methods: {

  }
}
</script>

<style lang="sass">

</style>