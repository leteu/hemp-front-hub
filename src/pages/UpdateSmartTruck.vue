<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        스마트트럭 관리 - 수정
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="number"
          v-model="number"
          color="primary"
          label="차량번호"
          hint="차량번호를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '차량번호가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="model_name"
          v-model="model_name"
          color="primary"
          label="모델명"
          hint="모델명을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '모델명이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="manufacturer"
          v-model="manufacturer"
          color="primary"
          label="제조사"
          hint="제조사를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '제조사가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="user"
          v-model="user"
          class="hidden invisible"
        />

        <div>
          <q-item class="drive-selector bg-grey-2 q-px-md q-py-sm text-subtitle1 round-borders">
            <q-item-section v-if="user !== null">
              <q-item-label>
                <q-chip removable
                        @remove="removeItem"
                        color="primary"
                        text-color="white"
                >
                  <span v-if="user">{{ user }}</span>
                </q-chip>
              </q-item-label>
            </q-item-section>

            <q-item-section v-else>
              <span class="emptyTxt">운행자를 선택해주세요.</span>
            </q-item-section>

            <q-item-section side>
              <q-btn padding="xs"
                     color="primary"
                     icon="add"
                     @click="confirm = true"
              />
            </q-item-section>
          </q-item>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center justify-between">
                <div class="text-h6 text-bold">운행자 선택</div>
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-separator/>

              <q-tree
                :nodes="authorityList"
                :selected.sync="user"
                node-key="label"
                default-expand-all
                style="min-width: 320px"
                class="q-py-md q-px-sm"
              />

              <q-separator/>

            </q-card>
          </q-dialog>
        </div>

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
  name: "UpdateSmartTruck",
  data () {
    return {
      name: this.$route.params.name,
      no: this.$route.params.no,
      number: this.$route.params.number,
      model_name: this.$route.params.model_name,
      manufacturer: this.$route.params.manufacturer,
      authorityList: [
        {label: '홍길동1'},
        {label: '홍길동2'},
        {label: '홍길동3'},
        {label: '홍길동4'},
        {label: '홍길동5'},
        {label: '홍길동6'},
        {label: '홍길동7'},
        {label: '홍길동8'},
        {label: '홍길동9'},
        {label: '홍길동10'},
        {label: '홍길동11'},
        {label: '홍길동12'},
      ],
      confirm: false,
      user: this.$route.params.user,
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
