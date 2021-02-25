<template>
  <q-table
    title="신청, 보고 관리"
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
      <q-btn
        push
        class="q-mr-md"
        padding="sm"
        color="primary"
        label = "신청"
        @Click = "onclick(1)"
      />
      <q-btn
        push
        class="q-mr-md"
        padding="sm"
        color="primary"
        label = "보고"
        @Click = "onclick(2)"
        style="margin-right:100px;"
      />
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body-cell-no="props">
      <q-td class="text-center" style="width:10%;">
        {{ props.row.no }}
      </q-td>
    </template>
    <template v-slot:body-cell-user="props">
      <q-td class="text-center" style="width:10%;">
        {{ props.row.user }}
      </q-td>
    </template>
    <template v-slot:body-cell-date="props">
      <q-td class="text-center" style="width:20%;">
        {{ props.row.date }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: "Apply",
  data () {
    return {
      filter: '',
      loading: false,
      field: row => row.id,
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
          name: 'no',
          required: true,
          align: 'center',
          label: 'No.',
          field: row => row.no,
          format: val => `${val}`,
        },
        { id: 2, name: 'title', align: 'center', label: '제목', field: 'title' },
        { id: 3, name: 'user', align: 'center', label: '작성자', field: 'user' },
        { id: 4, name: 'date', align: 'center', label: '작성일', field: 'date' },
      ],
      data: [],
      original: [
        {
          id:1,
          title:"대마폐기 신청서1",
          no:'1',
          user:'신규현',
          date:'2021.02.18 10:37:48',
          type:'신청'
        },
        {
          id:2,
          title:"대마폐기 보고서1",
          no:'2',
          user:'신규현',
          date:'2021.02.18 14:37:48',
          type:'보고'
        },
        {
          id:3,
          title:"대마폐기 신청서2",
          no:'3',
          user:'신규현',
          date:'2021.01.18 10:37:48',
          type:'신청'
        },
        {
          id:4,
          title:"대마폐기 보고서2",
          no:'4',
          user:'신규현',
          date:'2021.01.18 14:37:48',
          type:'보고'
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
      }, 1500)
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

<style>

</style>