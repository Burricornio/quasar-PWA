<template>
  <q-item class="dark">
    <q-item-section avatar>
      <q-avatar>
        <img :src="singleNew.image" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label> {{ title}} </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-icon name="forward" color="white" @click.native="$emit('onForward')" />
    </q-item-section>

  </q-item>
</template>

<script>
export default {
  name: 'NewItemComponent',
  props: {
    singleNew: {
      required: true,
      type: Object
    }
  },
  computed: {
    title() {
      return `${this.singleNew.title.substr(0, 30)}...`
    }
  }
}
</script>
