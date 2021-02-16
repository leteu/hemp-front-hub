<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        게시판 관리 - 수정
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="title"
          v-model="title"
          color="primary"
          label="제목"
          hint="제목을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '제목이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="remark"
          v-model="remark"
          color="primary"
          label="내용"
          hint="내용을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '내용이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-file
          name="files"
          v-model="files"
          label="파일 업로드"
          filled
          counter
          :counter-label="counterLabelFn"
          max-files="3"
          multiple
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'Notice'"/>
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
  name: "UpdateNotice",
  data () {
    return {
      name: this.$route.params.name,
      title: this.$route.params.title,
      writer: this.$route.params.writer,
      createdAt: this.$route.params.createdAt,
      remark: this.$route.params.remark,
      files: null,
      submitResult: [],
    }
  },
  methods: {
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
