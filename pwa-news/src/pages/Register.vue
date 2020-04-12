<template>
  <q-page padding>
    <RegisterForm @onRegister="registerApi" />
  </q-page>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  },
  computed: {
    ...mapState('app', ['isOnline'])
  },
  watch: {
    isOnline(val) {
      if (!val) {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    if (!this.isOnline) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    ...mapMutations('auth', ['setUser', 'setIsLogged']),
    async registerApi(user) {
      this.$q.loading.show()
      setTimeout(async () => {
        try {
          const { data } = await this.register(user)
          this.setUser(data.user)
          this.setIsLogged(true)
          this.$q.notify({
            type: 'positive',
            message: data.res,
            position: 'bottom'
          })
          this.$router.push('/')
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: error.response.data.message,
            position: 'bottom'
          })
        } finally {
          this.$q.loading.hide()
        }
      }, 2000)
    }
  }
}
</script>
