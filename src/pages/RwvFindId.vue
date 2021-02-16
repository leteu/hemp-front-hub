<template>
  <q-page-container>
    <q-page class="flex items-center justify-center text-center q-pa-md">
      <q-card class="card-container q-py-xl q-px-lg">
        <div class="text-h5 text-bold q-pb-lg">
          아이디 찾기
          <div class="text-subtitle2 q-mt-sm">기존에 가입하실 때 입력한 이메일로 아이디를 전송해 드립니다.</div>
        </div>
        <q-form
          @submit="()=>{}"
          class="q-gutter-md"
        >
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
          <router-link :to="{ name: 'findPw' }" class="text-decoration-none">
            비밀번호 찾기
          </router-link>
        </div>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
  export default {
    name: "RwvFindId",
    data() {
      return {
        form: {
          email: '',
        },
        submit: false,
        error: false
      }
    },
    methods: {},
  }
</script>
