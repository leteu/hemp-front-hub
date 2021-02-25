<template>
  <div>
    <div style="width:700px; margin:0 auto;">
      <div style="display:flex; item-algin-center">
        <q-icon name='live_help' style="font-size:3em" />
        <div class="text-h5 text-bold q-pl-md" style="line-height:42px; width:70%; border-right:1px solid #000">{{asked_title}}</div>
        <div class="text-body2 text-center" style="width:10%; line-height:42px; border-right:1px solid #000">{{asked_user}}</div>
        <div class="text-body2 text-center" style="width:20%; line-height:42px; border-right:1px solid #000">{{asked_date}}</div>
      </div>
      <div class="q-pa-md text-body1">
        {{asked_con}}
      </div>
      <q-separator class="q-my-md" />
      <q-card
        class="q-pa-lg"
        style="max-width:700px; background:#e0f7fa;"
        :virtual-scroll-item-size="78"
        bordered
      >
        <q-scroll-area
          style="height: 280px;"
          ref="scrollArea"
          :delay="1200"
        >
          <q-chat-message
            v-for="item in comments"
            :key="item.index"
            :text="[item.comments_text]"
            :style="item.writer ? 'padding-left:100px' : ''"
            :sent="item.writer"
            text-color="white"
            :bg-color="!item.writer ? 'deep-orange-7' : 'primary'"
          />
        </q-scroll-area>
      </q-card>
      <q-separator class="q-my-md" />
      <q-form dence @submit="onSubmit">
        <div class="q-mb-md">
          <div>
            <q-btn
              :disable="answer_status<3"
              readonly
              class="btn q-mx-auto"
              algin="center"
              color="grey-7"
              label="미확인"
              style="width:85.2px; cursor:pointer;"
              @click="answer_status=3"
            />
            <q-btn
              readonly
              class="btn q-ml-sm"
              algin="center"
              :color="answer_status===2 ? 'purple-6' : 'grey-7'"
              label="답변중"
              style="width:85.2px; cursor:pointer;"
              @click="answer_status=2"
            />
            <q-btn
              readonly
              class="btn q-ml-sm"
              algin="center"
              :color="answer_status===1 ? 'green-13' : 'grey-7'"
              label="답변완료"
              style="width:85.2px; cursor:pointer;"
              @click="answer_status=1"
            />
            <span class="q-ml-xl">{{timestamp}}</span>
          </div>
        </div>
        <div v-show="answer_status===2">
          <q-input
            type="text"
            name="writer"
            v-model="writer"
            style="display:none"
          />
          <q-input
            type="textarea"
            name="comments_text"
            v-model="comments_text"
            color="primary"
            label="내용"
            :rules="[ val => val && val.length > 0 || '내용을 입력해주세요']"
            clearable
            filled
            style="width:700px;"
          />
          <q-input
            type="text"
            name="date"
            v-model="date"
            style="display:none"
          />
          <div class="float-right">
            <q-btn label="등록" type="submit" color="primary" @click="getNow()"/>
            <q-btn label="취소" type="button" color="warning" class="q-ml-sm" :to="'/qna'"/>
          </div>
          <br class="clear">
          <div class="q-mb-xl"></div>
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
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name:'AnswerQnA',
  data(){
    return{
      comments_text: '',
      submitResult: [],
      date: '',
      timestamp: '',
      writer: true,
      asked_title: this.$route.params.asked_title,
      asked_user: this.$route.params.asked_user,
      asked_date: this.$route.params.asked_date,
      asked_con: this.$route.params.asked_con,
      answer_status: this.$route.params.answer_status,
      comments: this.$route.params.comments,
      position: 0,
    }
  },
  methods: {
    getNow() {
      const today = new Date();
      const year = today.getFullYear();
      const mon = (today.getMonth()+1 < 10 ? '0' + (today.getMonth()+1) : today.getMonth()+1);
      const day = (today.getDate()<10 ? '0' + (today.getDate()) : today.getDate());
      const hour = (today.getHours()<10 ? '0' + (today.getHours()) : today.getHours());
      const min = (today.getMinutes()<10 ? '0' + (today.getMinutes()) : today.getMinutes());
      const sec = (today.getSeconds()<10 ? '0' + (today.getSeconds()) : today.getSeconds());
      const date = year + "-" + mon + "-" + day;
      const time = hour + ":" + min + ":" + sec;
      const dateTime = date +' '+ time;
      this.timestamp = dateTime;
      this.date = dateTime;
      return dateTime;
    },
    onSubmit (evt) {
      // getNow()
      const formData = new FormData(evt.target)
      const submitResult = []

      for (const [ key, value ] of formData.entries()) {
        submitResult.push({
          key,
          value
        })
      }
      this.submitResult = submitResult
      this.answer_date = answer_date
    },
  },
  mounted() {
    console.clear();
    function getNow() {
      const today = new Date();
      const year = today.getFullYear();
      const mon = (today.getMonth()+1 < 10 ? '0' + (today.getMonth()+1) : today.getMonth()+1);
      const day = (today.getDate()<10 ? '0' + (today.getDate()) : today.getDate());
      const hour = (today.getHours()<10 ? '0' + (today.getHours()) : today.getHours());
      const min = (today.getMinutes()<10 ? '0' + (today.getMinutes()) : today.getMinutes());
      const sec = (today.getSeconds()<10 ? '0' + (today.getSeconds()) : today.getSeconds());
      const date = year + "-" + mon + "-" + day;
      const time = hour + ":" + min + ":" + sec;
      const dateTime = date +' '+ time;
      return dateTime;
    }
    this.timestamp = getNow();
    this.$refs.scrollArea.setScrollPosition(this.$refs.scrollArea.scrollSize);
  },
  computed:{
  }
}
</script>

<style scoped>
  table { border-collapse: collapse;}
  td { border:1px solid #000; }
  .title { width: 100%;}
</style>>