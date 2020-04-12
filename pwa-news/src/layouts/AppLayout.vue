<template>
  <q-layout v-if="isMobile" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isLogged"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Vue PWA News APP
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-btn
          v-for="lang in languages"
          :key="lang.key"
          flat
          round
          dense
          :disable="lang.key === currentLanguage"
          icon="language"
          color="dark"
          @click.native="setLanguage(lang.key)"
        > {{ lang.label }}
        </q-btn>

      </q-toolbar>

      <WorkingOfflineComponent />
    </q-header>

    <q-drawer
      v-if="isLogged"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          {{ $t('welcome_user', { name: user.displayName }) }}
        </q-item-label>

        <q-item
          clickable
          @click.native="$router.push('/news')"
        >
          <q-icon name="burst_mode" />
          <q-item-label>{{ $t('news') }}</q-item-label>
          <q-icon right name="subdirectory_arrow_right" />
        </q-item>

        <q-item
          clickable
          @click.native="logout"
        >
          <q-icon name="account_circle" />
          <q-item-label>{{ $t('logout') }}</q-item-label>
          <q-icon right name="subdirectory_arrow_right" />
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs v-if="!isLogged">
        <q-route-tab
          icon="home"
          to="/"
          name="home"
        />
        <q-route-tab
          icon="input"
          to="/login"
          name="login"
        />
        <q-route-tab
          v-if="isOnline"
          icon="account_box"
          to="/register"
          name="register"
        />
      </q-tabs>

      <q-tabs v-else>
        <q-route-tab
          icon="home"
          to="/"
          name="home"
        />
        <q-route-tab
          icon="burst_mode"
          to="/news"
          name="news"
        />
      </q-tabs>
    </q-footer>

  </q-layout>

  <q-layout v-else view="lHh Lpr lFf">
    <NoMobileDeviceComponent />
  </q-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { setIsOnline } from '../store/App/mutations'
import WorkingOfflineComponent from '../components/WorkingOffline'
import NoMobileDeviceComponent from '../components/NoMobileDevice'

export default {
  name: 'AppLayout',
  components: {
    WorkingOfflineComponent,
    NoMobileDeviceComponent
  },
  data () {
    return {
      leftDrawerOpen: false,
      isMobile: this.$q.platform.is.mobile
    }
  },
  watch: {
    currentLanguage (val) {
      this.$i18n.locale = val
    }
  },
  mounted() {
    window.addEventListener('online', () => {
      this.setIsOnline(true)
    })

    window.addEventListener('offline', () => {
      this.setIsOnline(false)
    })
  },
  computed: {
    ...mapState('app', ['currentLanguage', 'languages', 'version', 'isOnline']),
    ...mapState('auth', ['isLogged', 'user'])
  },
  methods: {
    ...mapMutations('app', ['setLanguage', 'setIsOnline']),
    ...mapMutations('auth', ['setIsLogged']),
    logout() {
      this.$q.loading.show()
      setTimeout(() => {
        this.setIsLogged(false)
        this.$router.push('/login')
        this.$q.loading.hide()
      }, 2000)
    }
  }
}
</script>
