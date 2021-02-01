<template>
  <div id="code_scanner">
    <b-container>
      <b-card title="Code scanner" class="card-scanner mx-auto my-10">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-5">
          <b-form-group
            id="input-group-code"
            label-for="input-code"
            class="mb-5"
          >
            <b-form-input
              id="input-code"
              v-model="form.code"
              placeholder="Enter code"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="info">Save contact</b-button>
        </b-form>
      </b-card>
      <b-modal ref="scanner-modal" hide-footer title="Code scanner">
        <div class="d-block text-center">
          <p>{{ error }}</p>
        </div>
        <b-button
          class="mt-3"
          variant="outline-primary"
          block
          @click="goToContacts()"
          >Contacts</b-button
        >
        <b-button class="mt-3" block @click="hideModal">Back</b-button>
      </b-modal>
      <b-modal ref="error-modal" hide-footer title="Error!">
        <div class="d-block text-center">
          <p>{{ error + " Sign in to use this app" }}</p>
        </div>
        <b-button
          class="mt-3"
          variant="outline-primary"
          block
          @click="goToLogin()"
          >Ok</b-button
        >
      </b-modal>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "code_scanner",
  data() {
    return {
      form: {
        code: "",
      },
      error: "",
      show: true,
    };
  },
  computed: {
    getEmail() {
      return this.$store.state.email;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      const body = { email: this.$store.state.email };
      this.$store.state.axios
        .put(`user/addContact/${this.form.code}`, body)
        .then((response) => {
          const user = response.data.user;
          this.$store.commit("addContact", { user });
          this.goToContacts();
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(this.error);
          if (this.error === "Unauthorized!") {
            this.$refs["error-modal"].show();
          } else {
            this.showModal();
          }
        });
    },
    onReset() {
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    },
    goToLogin() {
      this.$store.commit("logout");
      this.$router.push("/login").catch((e) => console.log(e));
    },
    goToContacts() {
      this.$router.push("/contacts").catch((e) => console.log(e));
    },
    showModal() {
      this.$refs["scanner-modal"].show();
    },
    hideModal() {
      this.$refs["scanner-modal"].hide();
      this.onReset();
    },
  },
};
</script>

<style lang="sass">
.card-scanner
  border: 0px !important
</style>
