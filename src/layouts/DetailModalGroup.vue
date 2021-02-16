<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <div class="text-h6 text-bold q-py-sm">그룹 상세정보</div>
      <q-field borderless :value="groupName" prefix="그룹명: ">
        <template v-slot:prepend>
          <q-icon name="style" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{groupName}}</div>
        </template>
      </q-field>

      <q-field borderless :value="groupUser" prefix="그룹구성원: ">
        <template v-slot:prepend>
          <q-icon name="group" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{groupUser}}</div>
        </template>
      </q-field>

      <q-field borderless :value="groupDescription" prefix="설명: ">
        <template v-slot:prepend>
          <q-icon name="subtitles" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{groupDescription}}</div>
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
    name: "DetailModalGroup",
    props: {
      // ...your custom props
      no: '',
      groupName: '',
      groupUser: '',
      groupDescription: '',
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
