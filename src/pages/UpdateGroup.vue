<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        그룹 관리 - 수정
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="name"
          v-model="groupName"
          color="primary"
          label="그룹명"
          hint="그룹명을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '그룹명이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="position"
          v-model="groupUser"
          color="primary"
          label="유저"
          hint="유저를 등록해주세요."
          :rules="[ val => val && val.length > 0 || '유저가 등록되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="position"
          v-model="groupDescription"
          color="primary"
          label="설명"
          hint="설명을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '설명이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/group'"/>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UpdateGroup",
    data () {
      return {
        groupName: this.$route.params.groupName,
        groupUser: this.$route.params.groupUser,
        groupDescription: this.$route.params.groupDescription,
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

<style scoped>

</style>
