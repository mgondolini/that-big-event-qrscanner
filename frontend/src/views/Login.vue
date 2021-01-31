<template>
    <div id="login">
        <b-container>
            <b-card title="Login" class="card-login mx-auto my-10">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-5">
                    <b-form-group id="input-group-email" label="Your email" label-for="input-email">
                        <b-form-input
                            id="input-email"
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email"
                            required
                            ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-psw" label="Password:" label-for="input-psw" class="mb-5">
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
            <b-modal ref="login-modal" hide-footer title="Login error">
                <div class="d-block text-center">
                    <p>{{ error }}</p>
                </div>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Ok</b-button>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
      return {
        form: {
            email: '',
            password: ''
        },
        error:'',
        show: true,
      }
    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))

            this.$store.state.axios.post('/auth/login', this.form)
                .then((response) => {
                    // alert(response.data.token)
                    const token = response.data.token
                    const user = response.data.user
                    alert(JSON.stringify(user.contacts))
                    this.$store.commit('login', {token, user})
                    this.$router.push('/code_scanner').catch(e=>console.log(e))
                }).catch((error) => {
                    this.error = error.response.data
                    this.showModal()
                });
        },
        onReset() {
            // Reset our form values
            this.form.email = ''
            this.form.password = ''
        },
        showModal() {
            this.$refs['login-modal'].show()
        },
        hideModal() {
            this.$refs['login-modal'].hide()
            this.onReset();
        },
    }
}
</script>

<style lang="sass">
label
    text-align: left

.card-login
    border: 0px !important

</style>