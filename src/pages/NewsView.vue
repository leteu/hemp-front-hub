<template>
  <div>
    <div class="q-py-md text-h5 text-bold">{{title}}</div>
    담당부서 : {{manager}}<br><br>
    작성일 : {{date}}<br><br>
    {{con}}<br><br><br>
    첨부파일 : {{files}}
  </div>
</template>

<script>
export default {
  name:'NewsView',
  data(){
    return{
      title: this.$route.params.title,
      manager: this.$route.params.manager,
      date: this.$route.params.date,
      files: this.$route.params.files,
      con: this.$route.params.con
    }
  }
}
</script>

<style scoped>
  table { border-collapse: collapse;}
  td { border:1px solid #000; }
  .title { width: 100%;}
</style>>