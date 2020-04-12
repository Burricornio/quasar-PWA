<template>
  <q-card inline class="q-ma-sm">
    <img :src="singleNew.image">
    <q-card-section>
      {{ singleNew.title }}
      <span>{{ singleNew.date }} {{ singleNew.time }}</span>
    </q-card-section>
    <q-card-section>{{ singleNew.description }}</q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'SingleNewComponent',
  props: {
    singleNew: {
      required: true,
      type: Object
    }
  }
}
</script>
