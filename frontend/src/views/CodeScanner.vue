<template>
  <div id="code_scanner">
    <b-card title="Code scanner">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-code" label-for="input-code">
          <b-form-input
              id="input-code"
              v-model="form.code"
              placeholder="Enter code"
              required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Save contact</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'code_scanner',
  data() {
    return {
      form: {
        code: '',
      },
      show: true
    }
  },
  computed: {
    getEmail(){
      return this.$store.state.email;
    }
  },
  methods: {
      onSubmit(event) {
        event.preventDefault()
        // alert(JSON.stringify(this.form))
        alert("1"+JSON.stringify(this.$store.state.contacts))
        const body = {email: this.$store.state.email}
        this.$store.state.axios.put(`user/addContact/${this.form.code}`, body )
          .then((response) => {
            console.log('respose', response.data)
            const user = response.data.user
            this.$store.commit('addContact', { user })
            this.$router.push('/contacts').catch(e=>console.log(e));    
          })
          .catch((error) => {
            alert(error.response.data)
            console.log(error.response.data)
          });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
      }
  }
}
</script>

<style lang="sass">

</style>