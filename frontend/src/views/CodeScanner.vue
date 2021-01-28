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
  name: 'CodeScanner',
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
        alert(this.$store.state.email)
        const body = {email: this.$store.state.email}
        this.$store.state.axios.put(`user/addContact/${this.form.code}`, body )
          .then((response) => {
            alert(JSON.stringify(response.data.user))
            this.$store.commit('addContact', {user: response.data.user})
            this.$router.push('/contacts');
          })
          .catch((error) => {
            alert(error.response.data)
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