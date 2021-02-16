<template>
  <q-table
    title="시건관리"
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
      <q-btn
        class="q-ml-md"
        padding="xs"
        color="primary"
        icon="add"
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
export default {
  name: "Lock",
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
          label: 'No.',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
        },
        { id: 2, name: 'cctv_model', align: 'center', label: '장치모델', field: 'cctv_model' },
        { id: 3, name: 'place', align: 'center', label: '설치장소', field: 'place' },
        { id: 4, name: 'installation_date', align: 'center', label: '설치일자', field: 'installation_date' },
        { id: 5, name: 'purchase_date', align: 'center', label: '구매일자', field: 'purchase_date' },
      ],
      data: [],
      original: [
        { id: 1, cctv_model: 'LvmEk-No103', place: '1세부 헴프 집하장 출입문', installation_date: '2021.02.13.', purchase_date: '2021.01.28.'},
        { id: 2, cctv_model: 'LvmEk-No103', place: '2세부 헴프 집하장 출입문', installation_date: '2021.02.13.', purchase_date: '2021.01.28.'},
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
    }
  }
}
</script>
