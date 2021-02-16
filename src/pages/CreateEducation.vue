<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        교육훈련관리 - 추가
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="name"
          v-model="name"
          color="primary"
          label="교육명"
          hint="교육명을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '교육명이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="date"
          v-model="date"
          color="primary"
          label="교육일시"
          hint="교육일시를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '교육일시가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="place"
          v-model="place"
          color="primary"
          label="장소"
          hint="장소를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '장소가 입력되지 않았습니다.']"
          clearable
          filled
        />

        <q-input
          name="personnel"
          v-model="personnel"
          color="primary"
          label="대상인원"
          hint="대상인원을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '대상인원이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="content"
          v-model="content"
          color="primary"
          label="교육내용"
          hint="교육내용을 입력해주세요. (ex. example@example.com)"
          :rules="[ val => val && val.length > 0 || '교육내용이 입력되지 않았습니다.']"
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
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/education'"/>
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
  name: "CreateEducation",
  data () {
    return {
      name: '',
      date: '',
      place: '',
      personnel: '',
      content: '',
      files: '',
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
    }
  }
}
</script>

<style scoped>

</style>
