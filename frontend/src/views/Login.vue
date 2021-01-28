<template>
    <div id="login">
        <b-card title="Login">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="input-group-email" label="Your email" label-for="input-email">
                    <b-form-input
                        id="input-email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                        required
                        ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-psw" label="Password:" label-for="input-psw">
                    <b-form-input
                    id="input-psw"
                    type="password"
                    v-model="form.password"
                    placeholder="Enter password"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Sign In</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'http://localhost:3000/',
//   timeout: 1000
});

export default {
    name: 'Login',
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

            axios.post('/auth/login', this.form)
                .then((response) => {
                    alert(JSON.stringify(response.data.user));
    
                    this.$router.push('/code_scanner');
                }).catch((error) => alert(response.data));
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