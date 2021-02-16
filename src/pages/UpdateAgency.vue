<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        기관관리 - 수정
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="agency"
          v-model="agency"
          color="primary"
          label="기관명"
          hint="기관명을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '기관명이 입력되지 않았습니다.']"
          clearable
          filled
        />

        <q-input
          name="representative"
          v-model="representative"
          color="primary"
          label="대표자"
          hint="대표자를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '대표자가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="representativeNumber"
          v-model="representativePhone"
          color="primary"
          label="대표자 전화번호"
          hint="대표자 전화번호를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '대표자 전화번호가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="representativeEmail"
          v-model="representativeEmail"
          color="primary"
          label="대표자 이메일"
          hint="대표자 이메일을 입력해주세요. (ex. example@example.com)"
          :rules="[ val => val && val.length > 0 || '대표자 이메일이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="address"
          v-model="address"
          color="primary"
          label="주소"
          hint="주소를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '주소가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="email"
          v-model="remark"
          color="primary"
          label="비고"
          hint="비고를 입력해주세요."
          type="textarea"
          :rules="[ val => val && val.length > 0 || '비고가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/agency'"/>
        </div>
      </q-form>

      <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
        <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
        <q-separator />
        <q-card-section class="row q-gutter-sm items-center">
          <div
            v-for="(item, index) in submitResult"
            :key="index"
            class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
          >{{ item.key }} = {{ item.value }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateAgency",
  data () {
    return {
      agency: this.$route.params.id,
      representative: this.$route.params.representative,
      representativePhone: this.$route.params.representativePhone,
      representativeEmail: this.$route.params.representativeEmail,
      address: this.$route.params.address,
      remark: this.$route.params.remark,
      files: this.$route.params.files,
      uploadProgress: [],
      uploading: null,
      submitResult: [],
    }
  },
  methods: {
    cancelFile (index) {
      this.uploadProgress[index] = {
        ...this.uploadProgress[index],
        error: true,
        color: 'orange-2'
      }
    },

    updateFiles (files) {
      this.files = files
      this.uploadProgress = (files || []).map(file => ({
        error: false,
        color: 'green-2',
        percent: 0,
        icon: file.type.indexOf('video/') === 0
          ? 'movie'
          : (file.type.indexOf('image/') === 0
              ? 'photo'
              : (file.type.indexOf('audio/') === 0
                  ? 'audiotrack'
                  : 'insert_drive_file'
              )
          )
      }))
    },

    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [ key, value ] of formData.entries()) {
        submitResult.push({
          key,
          value
        })
      }

      this.submitResult = submitResult
    },

    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    },
  }
}
</script>
