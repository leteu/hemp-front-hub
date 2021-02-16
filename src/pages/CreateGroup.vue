<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        그룹 관리 - 추가
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

        <div class="flex justify-between">
          <div class="q-mr-sm" style="flex-grow: 10">
            <q-input ref="filter" filled v-model="filter" label="그룹멤버">
              <template v-slot:append>
                <q-icon v-if="filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter"/>
              </template>
            </q-input>
          </div>
          <q-btn color="primary" class="text-subtitle1 text-bold" style="flex-grow: 1" @click="addGroupMember(selected)">선택</q-btn>
        </div>

        <div class="q-pt-none">
          <q-tree
            :nodes="list"
            node-key="label"
            :filter="filter"
            :selected.sync="selected"
            no-results-label="멤버가 존재하지 않습니다."
            default-expand-all
            v-if="filter !== ''"
            class="flex-block shadow-1 q-pa-sm"
          />
        </div>

        <div v-for="(items, index) in groupList" :key="items.index" v-if="groupList.length !== 0">
          <q-chip
            removable
            @remove="removeGroupList(index)"
            color="primary"
            text-color="white"
          >
            {{ items }}
          </q-chip>

        </div>

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
  name: "CreateGroup",
  data() {
    return {
      selected: null,
      groupName: '',
      groupList: [],
      filter: '',
      list: [
        {label: '가길동1'},
        {label: '나길동2'},
        {label: '다길동3'},
        {label: '라길동4'},
        {label: '마길동5'},
        {label: '바길동6'},
        {label: '사길동7'},
      ],
    }
  },

  methods: {
    onSubmit(evt) {
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [key, value] of formData.entries()) {
        submitResult.push({
          key,
          value
        })
      }

      this.submitResult = submitResult
    },

    counterLabelFn({totalSize, filesNumber, maxFiles}) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
    },

    resetFilter() {
      this.filter = ''
      this.$refs.filter.focus()
    },

    addGroupMember(user) {
      // TODO :: 동일한 멤버 있을 시 false check

      this.groupList.forEach((item)=> {
        return console.log(item)
      })

      return this.groupList.push(user);
    },

    removeGroupList(idx) {
      this.groupList.splice(idx, 1);
    }
  }
}
</script>

<style scoped>

</style>
