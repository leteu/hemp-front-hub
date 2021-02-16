<template>
  <div>
    <div v-for="(item, index) in list" :key="item.index">
      {{ list[index].email }}
    </div>

    <vue-daum-postcode @onsearch="result = $event"/>
    <div>
      {{ result }}
    </div>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import { VueDaumPostcode } from 'vue-daum-postcode'

export default {
  created() {
    this.loadData();
  },

  components: {
    VueDaumPostcode,
  },

  data() {
    return {
      list: [],
    }
  },

  methods: {
    loadData () {
      var result = api.get('https://jsonplaceholder.typicode.com/posts/1/comments');

      result.then((response) => {
        this.list = response.data
      })
    },
  }
}
</script>
