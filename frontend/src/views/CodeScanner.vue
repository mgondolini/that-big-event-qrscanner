<template>
  <div id="code_scanner">
    <b-card title="Card title" sub-title="Card subtitle">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-code" label="Your email" label-for="input-code">
          <b-form-input
              id="input-code"
              v-model="form.email"
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
          email: '',
          password: ''
      },
        show: true
    }
  },
  methods: {
      onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
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