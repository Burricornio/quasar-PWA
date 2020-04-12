<template>
  <q-page>
    <q-infinite-scroll @load="loadMore" ref="infiniteScroll">
      <q-list dark highlight v-if="arrayNews.length">
        <q-item-label class="bg-header" header> {{ $t('news') }}</q-item-label>

        <NewItem
          :singleNew="singleNew"
          v-for="singleNew in arrayNews"
          :key="singleNew.id"
          @onForward="goNewsDetail(singleNew)"
        />
      </q-list>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>

    </q-infinite-scroll>
  </q-page>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NewItem from '../components/News/NewItem'

export default {
  name: 'NewsPage',
  components: {
    NewItem
  },
  async mounted() {
    this.setStart(0)
    this.$q.loading.show()
    setTimeout(async () => {
      try {
        const { data } = await this.paginatedNews()
        this.setNews(data)
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
  },
  watch: {
    isOnline(val) {
      if(val) {
        this.$refs.infiniteScroll.resume()
      }
    }
  },
  computed: {
    ...mapState('news', ['news', 'start', 'limit', 'offlineNews']),
    ...mapState('app', ['isOnline']),
    arrayNews() {
      if (this.isOnline) {
        return this.news
      }
      return this.offlineNews
    }
  },
  methods: {
    ...mapActions('news', ['paginatedNews']),
    ...mapMutations('news', ['setNews', 'setSingleNew', 'setStart', 'setOfflineNews']),
    loadMore(index, done) {
      this.setStart(this.news.length)
      if (this.isOnline) {
        setTimeout(() => {
          this.paginatedNews().then(news => {
            this.setNews(news.data)
            if (!news.data.length) {
              done(true)
            } else {
              done()
            }
          }, 3000)
        })
      } else {
        setTimeout(() => {
          done(true)
        }, 1500)
      }
    },
    goNewsDetail(singleNew) {
      this.setSingleNew(singleNew)
      this.$router.push({ name: 'new-detail', params: { id: singleNew.id } })
    }
  },

}
</script>

<style lang="scss">
  .dark {
    background-color: darkslategrey;
    color: #000;
  }

  .bg-header {
    background-color: crimson;
    color: #000;
  }

  .q-list {
    padding: 0!important;
  }

  .q-item {
    border-bottom: 1px solid white;
  }
</style>
