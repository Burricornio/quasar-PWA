<template>
  <q-page padding>
    <q-btn
      class="fabR fixed"
      round color="secondary"
      icon="arrow_back"
      @click.native="$router.back()"
    ></q-btn>
    <SingleNewComponent :singleNew="$store.state.news.singleNew" />
  </q-page>
</template>

<script>
import SingleNewComponent from '../components/News/SingleNew'
export default {
  name: 'NewDetailPage',
  components: {
    SingleNewComponent
  }
}
</script>

<style lang="scss">
  .fabR {
    right: 18px;
    bottom: 60px;
    z-index: 9999;
  }

  .fabL {
    left: 18px;
    bottom: 60px;
  }
</style>
