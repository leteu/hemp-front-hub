<template>
  <q-page-container>
    <q-page class="flex items-center justify-center text-center q-pa-md">
      <q-card class="card-container q-py-xl q-px-lg">
        <div class="text-h5 text-bold q-pb-lg">
          HEMP 관리자 시스템
        </div>
        <q-form
          @submit="()=>{}"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="form.userId"
            label="아이디"
            hint="아이디를 입력해주세요."
            :rules="[ val => val && val.length > 0 || '아이디가 입력되지 않았습니다.']"
          />

          <q-input
            filled
            type="password"
            v-model="form.password"
            label="비밀번호"
            hint="비밀번호를 입력해주세요"
            :rules="[
              val => val !== null && val !== '' || '비밀번호가 입력되지 않았습니다.',
            ]"
          />

          <div>
            <q-btn
              label="로그인"
              type="submit"
              color="primary"
              class="full-width q-py-xs q-my-lg text-bold text-subtitle1"
              @click="onSubmit($event)"
            />
          </div>

          <div>
            <router-link :to="{ name: 'findId' }" class="text-decoration-none">
              아이디 찾기
            </router-link>
            /
            <router-link :to="{ path: 'findPw' }" class="text-decoration-none">
              비밀번호 찾기
            </router-link>
          </div>
        </q-form>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import {mapState} from 'vuex'
import {LOGIN} from '../store/actions.type'

// userId: 'eve.holt@reqres.in',
// password: 'cityslicka'

export default {
  name: "Login",
  data() {
    return {
      form: {
        userId: 'eve.holt@reqres.in',
        password: 'cityslicka'
      },
      submit: false,
      error: false
    }
  },
  methods: {
    onSubmit() {
      this.submit = true
      this.$store
        .dispatch(LOGIN, {email: this.form.userId, password: this.form.password})
        .then(() => {
          this.submit = false
          this.$router.push({path: '/'})
        })
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>

