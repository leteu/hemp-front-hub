<template>
  <q-dialog ref="dialog">
    <q-card class="full-width" style="max-height: 100%">
      <q-card-section class="row justify-between items-center">
        <div class="text-h6 text-bold">주소 검색</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="full-width">
        <vue-daum-postcode @onsearch="result = $event"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { VueDaumPostcode } from 'vue-daum-postcode'

export default {
  name: "AddressSearch",
  components: {
    VueDaumPostcode,
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
  },

}
</script>
