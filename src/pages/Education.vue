<template>
  <q-table
    title="교육훈련관리"
    title-class="text-bold text-h5"
    :table-header-style="{ backgroundColor: '#f5f8fa' }"
    :data="data"
    :columns="columns"
    row-key="id"
    @row-click="prompt"
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
      <q-btn
        class="q-ml-md"
        padding="xs"
        color="primary"
        icon="add"
        to="/createEducation"
      />
    </template>

    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center q-gutter-sm">
        <span>{{ message }}</span>
      </div>
    </template>
  </q-table>
</template>

<script>
import detailModalEducation from "layouts/DetailModalEducation";

export default {
  name: "Education",
  component: { detailModalEducation },
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 12,
        rowsNumber: 10
      },
      columns: [
        {
          id: 1,
          name: 'desc',
          required: true,
          align: 'center',
          label: 'No.',
          field: row => row.id,
          format: val => `${val}`
        },
        { id: 2, name: 'name', align: 'center', label: '교육명', field: 'name' },
        { id: 3, name: 'date', align: 'center', label: '교육일시', field: 'date' },
        { id: 4, name: 'place', align: 'center', label: '장소', field: 'place' },
        { id: 5, name: 'personnel', align: 'center', label: '대상인원', field: 'personnel' },
        { id: 6, name: 'content', align: 'center', label: '교육내용', field: 'content' },
      ],
      data: [],
      original: [
        { id: 1, name: '소방안전교육', no: '1', date: '2021.04.01.', place: '(주)우경정보기술', personnel: '안전관리담당자그룹', content: '소방재난 시 대처방법', files: ['훈련관리1.png', '훈련관리2.png', '훈련관리3.png']},
        { id: 2, name: '헴프 취급 교육', no: '2', date: '2021.03.01.', place: '(주)우경정보기술', personnel: '안전관리담당자그룹', content: '헴프관련 법률 이해', files: ['훈련관리4.png', '훈련관리5.png', '훈련관리6.png']}
      ]
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

    prompt(evt, row) {
      this.$q.dialog({
        component: detailModalEducation,

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
        no: row.no,
        name: row.name,
        date: row.date,
        place: row.place,
        personnel: row.personnel,
        content: row.content,
        files: row.files,
        // ...more.props...
      }).onOk((data) => {
        this.$router.push({
          name: 'updateEducation',
          query: { seq: data.no },
          params: {
            id: data.no,
            name: data.name,
            date: data.date,
            place: data.place,
            personnel: data.personnel,
            content: data.content,
            files: data.files,
          }
        })
      })
    },
  }
}
</script>
