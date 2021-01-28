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
export default {
    name: 'Login',
    data() {
      return {
        form: {
            email: '',
            password: ''
        },
        show: true,
      }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))

            this.$store.state.axios.post('/auth/login', this.form)
                .then((response) => {
                    alert(response.data.token);
                    const token = response.data.token;
                    const user = response.data.user;
                    this.$store.commit('login', {token, user})
                    this.$router.push('/code_scanner');
                }).catch((error) => {
                    alert(error.response.data)
                    this.onReset(event);
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