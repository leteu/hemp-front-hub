<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        공동소모품 관리 - 추가
      </div>
      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-select
          name="type"
          v-model="type"
          color="primary"
          :options="name_option"
          label = "품명"
          hint="품명을 선택해주세요."
          :rules="[ val => val && val.length > 0 || '품명이 선택되지 않았습니다.']"
          filled
          clearable
        />
        <q-select
          name="consum_name"
          v-model="consum_name"
          color="primary"
          :options="type_option"
          label = "입/출고"
          hint="입/출고를 선택해주세요."
          :rules="[ val => val && val.length > 0 || '입/출고가 선택되지 않았습니다.']"
          transition-show="flip-up"
          transition-hide="flip-down"
          filled
          clearable
        />
        <q-input
          name="change_quantity"
          v-model="change_quantity"
          type="number"
          color="primary"
          label="증감 수량"
          hint="증감 수량를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '증감 수량이 입력되지 않았습니다.']"
          filled
          clearable
        />
        <q-select
          filled
          name="user"
          v-model="user"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="담당자"
          color="primary"
          :options="user_options"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
          hint="담당자를 선택해주세요."
          :rules="[ val => val && val.length > 0 || '담당자가 선택되지 않았습니다.']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          name="description"
          v-model="description"
          color="primary"
          label="비고"
          hint="비고를 입력해주세요."
          filled
          clearable
        />
        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/consumables'"/>
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
const stringOptions = [
                        'user1',
                        'user2',
                        'user3',
                        'user4',
                        'user5',
                      ]
export default {
  name: "createConsumables",
  data () {
    return {
      consum_name: '',
      name_option: [
        '방진복', '진공팩'
      ],
      type: '',
      type_option: [
        '입고', '출고'
      ],
      change_quantity: '',
      user: '',
      user_options: stringOptions,
      description: '',
      confirm: false,
      tickStrategy: 'strict',
      submitResult: [],
    }
  },
  methods: {
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.user_options = stringOptions
          }
          else {
            const needle = val.toLowerCase()
            this.user_options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
          }
        })
      }, 1000)
    },

    abortFilterFn () {
      // console.log('delayed filter aborted')
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
