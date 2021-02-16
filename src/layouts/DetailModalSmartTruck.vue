<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <div class="text-h6 text-bold q-py-sm">스마트트럭 상세정보</div>
      <q-field borderless :value="number" prefix="차량번호: ">
        <template v-slot:prepend>
          <q-icon name="pin" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{ number }}</div>
        </template>
      </q-field>

      <q-field borderless :value="model_name" prefix="모델명: ">
        <template v-slot:prepend>
          <q-icon name="drive_eta" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{ model_name }}</div>
        </template>
      </q-field>

      <q-field borderless :value="manufacturer" prefix="제조사: ">
        <template v-slot:prepend>
          <q-icon name="emoji_transportation" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{ manufacturer }}</div>
        </template>
      </q-field>

      <q-field borderless :value="user" prefix="운행자: ">
        <template v-slot:prepend>
          <q-icon name="carpenter" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{ user }}</div>
        </template>
      </q-field>

      <q-card-actions align="right" class="q-mt-sm q-pr-none">
        <q-btn push color="primary" label="수정" @click="onOKClick" />
        <q-btn push color="negative" label="삭제" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "DetailModalSmartTruck",
    props: {
      // ...your custom props
      name: '',
      no: '',
      number: '',
      model_name: '',
      manufacturer: '',
      user: '',
    },

    methods: {
      // following method is REQUIRED
      // (don't change its name --> "show")
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

      confirm () {
        this.$q.dialog({
          message: '데이터가 삭제됩니다. 정말 삭제하시겠습니까?',
          ok: {
            label: '삭제',
            push: true,
            color: 'negative',
          },
          cancel: {
            label: '취소',
            push: true,
            color: 'primary'
          },
          persistent: true
        }).onOk(() => {
          // 삭제 클릭 시 해당 데이터 ID 값 DEL API 전송 후 삭제 로직
          window.location.reload();
          this.hide();
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
    }
  }
</script>

<style scoped>

</style>
