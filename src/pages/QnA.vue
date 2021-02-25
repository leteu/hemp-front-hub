<template>
  <div>
    <q-table
      title="Q&A - 질문과 답변"
      title-class="text-bold text-h5"
      :table-header-style="{ backgroundColor: '#f5f8fa' }"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      no-data-label="내용이 존재하지 않습니다."
      no-results-label="검색결과가 존재하지 않습니다."
      @request="onRequest"
      binary-state-sort
      flat
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-no="props">
        <q-td class="text-center" style="width:7%;">
          {{ props.row.no }}
        </q-td>
      </template>
      <template v-slot:body-cell-answer_status="props">
        <q-td class="text-center" style="width:10%;">
          <q-btn
            readonly
            class="btn q-mx-auto"
            algin="center"
            :color="props.row.answer_status===1 ? 'green-13' : props.row.answer_status===2 ? 'purple-6' : 'grey-7'"
            :label="props.row.answer_status===1 ? '답변완료' : props.row.answer_status===2 ? '답변중' : '미확인'"
            style="width:85.2px;"
            :style="props.row.answer_status===3 ? 'cursor:pointer;' : 'cursor:default;'"
            @click="props.row.answer_status===3 ? props.row.answer_status=2 : props.row.answer_status=props.row.answer_status"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-asked_title="props">
        <q-td class="text-center">
          <div 
            @click="prompt(props,props.row)"
            :style="props.row.answer_status ? 'cursor:pointer' : 'cursor:defalut'"
          >
            {{ props.row.asked_title }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-asked_user="props">
        <q-td class="text-center" style="width:10%;">
          {{ props.row.asked_user }}
        </q-td>
      </template>
      <template v-slot:body-cell-asked_date="props">
        <q-td class="text-center" style="width:20%;">
          {{ props.row.asked_date }}
        </q-td>
      </template>
      
    </q-table>
  </div>
</template>

<script>
export default {
  name:'QnA',
  data(){
    return{
      filter: '',
      loading: false,
      field: row => row.id,
      pagination: {
        sortBy: 'no',
        descending: true,
        page: 1,
        rowsPerPage: 12,
        rowsNumber: 10
      },
      columns: [
        {
          id: 1,
          name: 'no',
          required: false,
          align: 'center',
          label: 'No.',
          field: row => row.no,
          format: val => `${val}`,
        },
        { id: 2, name: 'answer_status', align: 'center', label: '답변 상태', field: 'answer_status' },
        { id: 3, name: 'asked_title', align: 'center', label: '제목', field: 'asked_title' },
        { id: 4, name: 'asked_user', align: 'center', label: '작성자', field: 'asked_user' },
        { id: 5, name: 'asked_date', align: 'center', label: '작성일', field: 'asked_date' },
      ],
      data: [
        
      ],
      original: [
        {
          id:1,
          asked_title: '질문 드립니다.1',
          no:'1',
          asked_user: '신규현',
          asked_date: '2021-02-24 11:26:34',
          asked_con: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answer_status: 1,
          comments:[
            {
              comments_idx:1,
              comments_text:`test 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:2,
              comments_text:` 추가 test 질문입니다.`,
              writer:false,
            },
            {
              comments_idx:3,
              comments_text:`추가 test 질문에 대한 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:4,
              comments_text:`Q&A가 종료되었습니다.`,
              writer:true,
            },
          ]
        },
        {
          id:2,
          asked_title: '질문 드립니다.2',
          no:'2',
          asked_user: '신규현',
          asked_date: '2021-02-24 11:26:34',
          asked_con: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answer_status: 1,
          comments:[
            {
              comments_idx:1,
              comments_text:`test 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:2,
              comments_text:`추가 test 질문입니다.`,
              writer:false,
            },
            {
              comments_idx:3,
              comments_text:`추가 test 질문에 대한 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:4,
              comments_text:`Q&A가 종료되었습니다.`,
              writer:true,
            },
          ]
        },
        {
          id:3,
          asked_title: '질문 드립니다.3',
          no:'3',
          asked_user: '신규현',
          asked_date: '2021-02-24 11:26:34',
          asked_con: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answer_status: 2,
          comments:[
            {
              comments_idx:1,
              comments_text:`test 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:2,
              comments_text:`추가 test 질문입니다.`,
              writer:false,
            },
            {
              comments_idx:3,
              comments_text:`추가 test 질문에 대한 답변입니다. 감사합니다.`,
              writer:true,
            },
            {
              comments_idx:4,
              comments_text:`추가 test2 질문2입니다.`,
              writer:false,
            },
            {
              comments_idx:5,
              comments_text:`추가 test3 질문3입니다.`,
              writer:false,
            },
            {
              comments_idx:6,
              comments_text:`추가 test 질문에 대한 답변입니다.`,
              writer:true,
            },
            {
              comments_idx:7,
              comments_text:`추가 test4 질문4입니다.`,
              writer:false,
            },
            {
              comments_idx:8,
              comments_text:`추가 test5 질문5입니다.`,
              writer:false,
            },
            {
              comments_idx:9,
              comments_text:`추가 test6 질문6입니다.`,
              writer:false,
            },
            {
              comments_idx:10,
              comments_text:`추가 test7 질문7입니다.<br>추가<br>추가`,
              writer:false,
            },
          ]
        },
        {
          id:4,
          asked_title: '질문 드립니다.4',
          no:'4',
          asked_user: '신규현',
          asked_date: '2021-02-24 11:26:34',
          asked_con: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answer_status: 3,
          comments:[
            
          ]
        },
        {
          id:5,
          asked_title: '질문 드립니다.5',
          no:'5',
          asked_user: '신규현',
          asked_date: '2021.02.24 11:26:34',
          asked_con: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          answer_status: 3,
          comments:[
            
          ]
        },
      ],
    }
  },
mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 500)
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.original.filter(row => row.name.includes(filter))
        : this.original.slice()

      // handle sortBy
      if (sortBy) {
        const sortFn = sortBy === 'desc'
          ? (descending
              ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
              : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          )
          : (descending
              ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
              : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
    },
    prompt(evt,row){
      this.$router.push({
        name: 'AnswerQnA',
        query: { seq: row.id },
        params: {
          asked_title: row.asked_title,
          asked_user: row.asked_user,
          asked_date: row.asked_date,
          asked_con: row.asked_con,
          answer_status: row.answer_status,
          comments: row.comments,
        }
      })
    },
    
  }
}
</script>

<style scoped>
</style>