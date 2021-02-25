<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        비컨 스캐너 관리 - 수정
      </div>
      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-select
          name="type"
          v-model="type"
          color="primary"
          :options="type_option"
          label = "구분"
          hint="구분을 선택해주세요."
          :rules="[ val => val && val.length > 0 || '구분이 선택되지 않았습니다.']"
          filled
          clearable
        />
        <q-input
          name="name"
          v-model="name"
          color="primary"
          label="기종"
          hint="기종을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '차량번호가 입력되지 않았습니다.']"
          filled
          clearable
        />
        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/smartTruck'"/>
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
  name: "UpdateScanner",
  data () {
    return {
      name: this.$route.params.name,
      type: this.$route.params.type,
      type_option: [
        '스캐너', '프린터'
      ],
      confirm: false,
      tickStrategy: 'strict',
      submitResult: [],
    }
  },

  methods: {

    counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
      return `${filesNumber} files of ${maxFiles} | ${totalSize}`
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

    removeItem() {
      return this.user = null;
    },
    test(){
      console.log(this.$route.params)
    }
  }
}
</script>

<style lang="sass">
.q-tree__node--selected .q-tree__node-header-content
  color: $primary
  font-weight: 700
.emptyTxt
  color: rgba(0, 0, 0, 0.6)
.drive-selector
  background: rgba(0, 0, 0, 0.05)
  border-radius: 4px 4px 0 0
</style>
