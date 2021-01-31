<template>
  <div id="contacts"> 
    <b-container>
      <b-card title="Contacts" class="card-contacts mx-auto my-10">
        <div v-for="(contact, index) in contacts" v-bind:key="index">
          <b-card class="mt-3">
            <b-card-text class="font-weight-bold mb-1">{{contact.firstName}} {{contact.lastName}}</b-card-text>
            <b-card-text class="font-italic  mb-1">{{contact.company}}</b-card-text>
            <a :href="`mailto:${contact.email}`"> {{contact.email}} </a>
            <b-button v-clipboard="contact.email" variant="light" class="btn-contacts">
              <b-icon icon="clipboard" font-scale="0.99"></b-icon>
            </b-button>
          </b-card>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "contacts",
  data(){
    return{
      contacts: this.$store.state.contacts
    }
  }
}
</script>

<style lang="sass">
.card-contacts
  border: 0px !important

.card-title 
  margin-bottom: 2.75rem !important

.btn-contacts
  padding: 0px !important
  background-color: transparent !important
  border: 0px !important
</style>