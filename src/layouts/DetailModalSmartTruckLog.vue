<template>
  <div class="q-mt-lg">
    <q-fab
      v-model="fab2"
      label="Actions"
      vertical-actions-align="left"
      color="purple"
      padding="none xl"
      icon="keyboard_arrow_down"
      direction="down"
    >
      <q-fab-action padding="3px" external-label color="primary" @click="onClick" icon="mail" label="Email"/>
      <q-fab-action padding="3px" external-label color="secondary" @click="onClick" icon="alarm" label="Alarm"/>
      <q-fab-action padding="3px" external-label color="orange" @click="onClick" icon="airplay" label="Airplay"/>
      <q-fab-action padding="3px" external-label color="accent" @click="onClick" icon="room" label="Map"/>
    </q-fab>
  </div>
</template>

<script>
export default {
  name: "DetailModalSmartTruckLog",
  props: {

  },
  data() {
    return {
      fab1: false,
      fab2: false
    }
  },

  methods: {
    onClick() {
      // console.log('Clicked on a fab action')
    }
  }
}
</script>
