<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <div class="text-h6 text-bold q-py-sm">교육훈련 상세정보</div>
      <q-field borderless :value="name" prefix="교육명: ">
        <template v-slot:prepend>
          <q-icon name="history_edu" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{name}}</div>
        </template>
      </q-field>

      <q-field borderless :value="date" prefix="교육일시: ">
        <template v-slot:prepend>
          <q-icon name="today" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{date}}</div>
        </template>
      </q-field>

      <q-field borderless :value="place" prefix="장소: ">
        <template v-slot:prepend>
          <q-icon name="share_location" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{place}}</div>
        </template>
      </q-field>

      <q-field borderless :value="personnel" prefix="대상인원: ">
        <template v-slot:prepend>
          <q-icon name="supervisor_account" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{personnel}}</div>
        </template>
      </q-field>

      <q-field borderless :value="content" prefix="교육내용: ">
        <template v-slot:prepend>
          <q-icon name="event_note" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{content}}</div>
        </template>
      </q-field>

      <q-field borderless :value="files" prefix="첨부파일: ">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">
            <a v-for="items in files" :key="items.index" :href="items" :alt="items" class="text-grey-10 block q-mb-xs" style="text-decoration: none">
              {{ items }}
            </a>
          </div>
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
  name: "DetailModalEducation",
  props: {
    // ...your custom props
    no: '',
    name: '',
    date: '',
    place: '',
    personnel: '',
    content: '',
    files: '',
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

<style lang="sass">
  .q-field__control
    align-items: center
</style>
