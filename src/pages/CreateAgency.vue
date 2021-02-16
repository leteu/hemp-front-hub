<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        기관등록
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
          v-model="representativeNumber"
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

        <div>
          <q-btn
            @click="EditAddress"
            label="주소검색"
          />
        </div>

        <q-input
          name="email"
          v-model="email"
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
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'agency'"/>
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
  import AddressSearch from "layouts/AddressSearch";

  export default {
    name: "CreateAgency",
    components: {
      AddressSearch
    },
    data () {
      return {
        agency: '',
        representative: '',
        representativeNumber: '',
        representativeEmail: '',
        address: '',
        email: '',
        remark: '',
        submitResult: [],
      }
    },

    methods: {
      EditAddress() {
        this.$q.dialog({
          component: AddressSearch,

          // optional if you want to have access to
          // Router, Vuex store, and so on, in your
          // custom component:
          parent: this, // becomes child of this Vue node
                        // ("this" points to your Vue component)
                        // (prop was called "root" in < 1.1.0 and
                        // still works, but recommending to switch
                        // to the more appropriate "parent" name)

          // props forwarded to component
          // (everything except "component" and "parent" props above):
          text: 'something',
          // ...more.props...
        }).onOk(() => {
          console.log('OK')
        }).onCancel(() => {
          console.log('Cancel')
        }).onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
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
      }
    }
  }
</script>
