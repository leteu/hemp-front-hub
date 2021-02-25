<template>
  <q-dialog
    ref="dialog"
    :position="position"
    maximized
    square
  >


    <q-card style="min-width: 300px;">
      <q-card-section class="row justify-between items-center q-my-sm">
        <p class="text-bold text-h6 q-mb-none">정비이력</p>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="text-weight-bold q-pt-lg">
        <q-list
          padding
          bordered
          class="rounded-borders q-mb-xs"
          v-for="item in history_list"
          :key="item.index"
        >
          <q-expansion-item
            dense
            dense-toggle
            expand-separator
            icon="assignment"
            :label=item.title
            :caption=item.date
          >
            <q-card>
              <q-card-section>
                <p class="text-bold">{{ item.title }}</p>
                <p class="text-subtitle2" style="max-width: 250px">{{ item.description }}</p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ScannerHistory",
  props: {
    id: '',
    history_list: '',
  },

  data () {
    return {
      position: 'right',
    }
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
