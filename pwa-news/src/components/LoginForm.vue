<template>
  <div>
    <q-input
      v-model="login.email"
      :label="$t('email')"
      :hint="$t('email_help')"
      @blur="$v.login.email.$touch"
      @keyup.enter="submit"
      :error="$v.login.email.$error"
    >
      <template v-slot:before>
        <q-btn flat icon="perm_identity" />
      </template>
    </q-input>

    <q-input
      v-model="login.password"
      :label="$t('password')"
      :hint="$t('password_help')"
      @blur="$v.login.password.$touch"
      @keyup.enter="submit"
      :error="$v.login.password.$error"
    >
      <template v-slot:before>
        <q-btn flat icon="enhanced_encryption" />
      </template>
    </q-input>

    <q-btn
      class="q-mt-lg full-width"
      color="secondary"
      icon-right="send"
      :label="$t('login_button')"
      @click.native="submit"
    />
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'LoginFormComponent',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    login: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    submit() {
      this.$v.login.$touch()

      if (this.$v.login.$error) {
        this.$q.notify({
          message: 'Error validando el formulario',
          position: 'bottom',
          type: 'negative'
        })
      } else {
        this.$emit('onLogin', this.login)
      }
    }
  }
}
</script>
