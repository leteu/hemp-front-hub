<template>
  <div class="row justify-center q-pa-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <div class="q-py-md text-h5 text-bold">
        사용자 관리 - 수정
      </div>

      <q-form dence @submit="onSubmit" class="q-col-gutter-md">
        <q-input
          name="name"
          v-model="name"
          color="primary"
          label="이름"
          hint="이름을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '대표자가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="position"
          v-model="position"
          color="primary"
          label="직급/직책"
          hint="직급/직책을 입력해주세요."
          :rules="[ val => val && val.length > 0 || '사업자등록번호가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-select
          filled
          v-model="organizationName"
          label="기관"
          hint="기관을 선택해주세요."
          :options="options"
          behavior="menu"
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
          name="phone"
          v-model="phone"
          color="primary"
          label="휴대폰 번호"
          hint="휴대폰 번호를 입력해주세요."
          :rules="[ val => val && val.length > 0 || '대표자 전화번호가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="email"
          v-model="email"
          color="primary"
          label="이메일"
          hint="이메일을 입력해주세요. (ex. example@example.com)"
          :rules="[ val => val && val.length > 0 || '대표자 이메일이 입력되지 않았습니다.']"
          filled
          clearable
        />

        <q-input
          name="password"
          v-model="password"
          color="primary"
          label="패스워드"
          filled
          clearable
          readonly
        />

        <q-input
          name="permission"
          v-model="permission"
          class="hidden invisible"
        />

        <div>
          <q-item class="bg-grey-2">
            <q-item-section v-if="permission.length !== 0">
              <q-item-label>
                <q-chip removable
                        @remove="removeItem(index)"
                        color="primary"
                        text-color="white"
                        v-for="(items, index) in permission"
                        :key="items.index"
                >
                  <span v-if="items">{{ items }}</span>
                </q-chip>
              </q-item-label>
            </q-item-section>

            <q-item-section v-else>
              <span class="emptyTxt">부여할 권한을 체크해주세요.</span>
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
                <div class="text-h6 text-bold">기관 선택</div>
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-separator/>

              <q-tree
                :nodes="authorityList"
                node-key="label"
                :tick-strategy="tickStrategy"
                :ticked.sync="permission"
                default-expand-all
                style="min-width: 320px"
                class="q-py-md q-px-sm"
              />

              <q-separator/>

            </q-card>
          </q-dialog>
        </div>

        <q-input
          name="remark"
          v-model="remark"
          color="primary"
          label="설명"
          hint="설명를 입력해주세요."
          type="textarea"
          :rules="[ val => val && val.length > 0 || '비고가 입력되지 않았습니다.']"
          filled
          clearable
        />

        <div>
          <q-btn label="등록" type="submit" color="primary"/>
          <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/user'"/>
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
const agencyList = [
  '우경정보기술', '산업관리공단', 'DIP', '안동시', '경북과학기술연구소', '마약관리공단'
]

export default {
  name: "UpdateUser",
  data () {
    return {
      options: agencyList,
      organizationName: this.$route.params.organizationName,
      name: this.$route.params.name,
      position: this.$route.params.position,
      phone: this.$route.params.phone,
      email: this.$route.params.email,
      password: 'RABC186!@dkKrisx',
      remark: this.$route.params.remark,
      authorityList: [
        {
          label: '전체권한',
          children: [
            {
              label: '관리',
              children: [
                {label: '세부 권한1'},
                {label: '세부 권한2'},
                {label: '세부 권한3'},
                {label: '세부 권한4'},
              ]
            },
            {label: '항목 권한2'},
            {label: '항목 권한3'},
            {label: '항목 권한4'},
          ],
        }
      ],
      confirm: false,
      permission: ["세부 권한1","세부 권한2","세부 권한3","세부 권한4","항목 권한2","항목 권한3","항목 권한4"],
      tickStrategy: 'leaf',
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

    removeItem(idx) {
      return this.permission.splice(idx, 1);
    }
  }
}
</script>

<style lang="sass" scoped>
  .q-chip
    padding-right: 1em
    .q-chip__icon--remove
      line-height: 2px
  .emptyTxt
    color: rgba(0, 0, 0, 0.6)
</style>
