<template>
  <div>
    <q-input
      v-model="register.displayName"
      :label="$t('display_name')"
      :hint="$t('display_name_help')"
      @blur="$v.register.displayName.$touch"
      @keyup.enter="submit"
      :error="$v.register.displayName.$error"
    >
      <template v-slot:before>
        <q-btn flat icon="perm_identity" />
      </template>
    </q-input>

    <q-input
      v-model="register.email"
      :label="$t('email')"
      :hint="$t('email_help')"
      @blur="$v.register.email.$touch"
      @keyup.enter="submit"
      :error="$v.register.email.$error"
    >
      <template v-slot:before>
        <q-btn flat icon="perm_identity" />
      </template>
    </q-input>

    <q-input
      v-model="register.password"
      :label="$t('password')"
      :hint="$t('password_help')"
      @blur="$v.register.password.$touch"
      @keyup.enter="submit"
      :error="$v.register.password.$error"
    >
      <template v-slot:before>
        <q-btn flat icon="enhanced_encryption" />
      </template>
    </q-input>

    <q-btn
      class="q-mt-lg full-width"
      color="secondary"
      icon-right="send"
      :label="$t('register_button')"
      @click.native="submit"
    />
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'RegisterFormComponent',
  data () {
    return {
      register: {
        displayName: '',
        email: '',
        password: ''
      }
    }
  },
  validations: {
    register: {
      displayName: { required, minLength: minLength(2) },
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    submit() {
      this.$v.register.$touch()

      if (this.$v.register.$error) {
        this.$q.notify({
          message: 'Error validando el formulario',
          position: 'bottom',
          type: 'negative'
        })
      } else {
        this.$emit('onRegister', this.register)
      }
    }
  }
}
</script>
