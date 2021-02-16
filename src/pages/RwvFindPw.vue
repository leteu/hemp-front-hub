<template>
  <q-page-container>
    <q-page class="flex items-center justify-center text-center q-pa-md">
      <q-card class="card-container q-py-xl q-px-lg">
        <div class="text-h5 text-bold q-pb-lg">
          패스워드 찾기
          <div class="text-subtitle2 q-mt-sm">기존에 가입하실 때 정보를 입력하시면 비밀번호를 변경하실 수 있습니다.</div>
        </div>
        <q-form
          @submit="()=>{}"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="form.name"
            label="이름"
            hint="이름을 입력해주세요."
            :rules="[ val => val && val.length > 0 || '이름이 입력되지 않았습니다.']"
          />

          <q-input
            filled
            v-model="form.phone"
            label="휴대폰 번호"
            hint="휴대폰 번호를 입력해주세요."
            :rules="[ val => val && val.length > 0 || '휴대폰 번호가 입력되지 않았습니다.']"
          />

          <q-input
            filled
            v-model="form.email"
            label="이메일"
            hint="이메일을 입력해주세요."
            :rules="[ val => val && val.length > 0 || '이메일이 입력되지 않았습니다.']"
          />
        </q-form>
        <div class="q-mt-xl">
          <router-link :to="{ name: 'login' }" class="text-decoration-none">
            로그인
          </router-link>
          /
          <router-link :to="{ name: 'findId' }" class="text-decoration-none">
            아이디 찾기
          </router-link>
        </div>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
  export default {
    name: "RwvFindPw",
    data () {
      return {
        form: {
          name: '',
          phone: '',
          email: '',
        },
        submit: false,
        error: false
      }
    },
    methods: {

    },
  }
</script>
