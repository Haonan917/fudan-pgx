<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                  v-model="username"
                  label="Username"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '123456') {
        this.$router.push('/home')
        this.$store.state.globalStore.isAuthenticated = true
      } else {
        this.$toast.error('Invalid credentials')
      }
    }
  }
}
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
