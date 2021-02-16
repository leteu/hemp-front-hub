<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-md">
      <div class="text-h6 text-bold q-py-sm">사용자 상세정보</div>
      <q-field borderless :value="organizationName" prefix="기관명: ">
        <template v-slot:prepend>
          <q-icon name="apartment" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{organizationName}}</div>
        </template>
      </q-field>

      <q-field borderless :value="name" prefix="이름: ">
        <template v-slot:prepend>
          <q-icon name="badge" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{name}}</div>
        </template>
      </q-field>

      <q-field borderless :value="position" prefix="직급/직책: ">
        <template v-slot:prepend>
          <q-icon name="assignment_ind" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{position}}</div>
        </template>
      </q-field>

      <q-field borderless :value="phone" prefix="사용자 전화번호: ">
        <template v-slot:prepend>
          <q-icon name="contact_phone" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{phone}}</div>
        </template>
      </q-field>

      <q-field borderless :value="email" prefix="사용자 이메일: ">
        <template v-slot:prepend>
          <q-icon name="contact_mail" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{email}}</div>
        </template>
      </q-field>

      <q-field borderless :value="permission" prefix="권한: ">
        <template v-slot:prepend>
          <q-icon name="vpn_key"/>
        </template>

        <template v-slot:control>
          <div class="full-width no-outline text-right" tabindex="0">
            <q-chip
              v-for="item in permission"
              :key="item.index"
              color="primary"
              text-color="white"
            >
              {{ item }}
            </q-chip>
          </div>
        </template>
      </q-field>

      <q-field borderless :value="remark" prefix="비고: ">
        <template v-slot:prepend>
          <q-icon name="assignment" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-right" tabindex="0">{{remark}}</div>
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
  name: "DetailModalUser",
  props: {
    // ...your custom props
    no: '',
    organizationName: '',
    name: '',
    position: '',
    phone: '',
    email: '',
    permission: '',
    remark: '',
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
