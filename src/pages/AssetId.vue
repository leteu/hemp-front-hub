<template>
  <q-table
    title="ID 관리 [RFID / QR]"
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
  </q-table>
</template>

<script>
export default {
  name: "UserLog",
  data(){
    return{
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
        { id: 2, name: 'type', align: 'center', label: '구분', field: 'type' },
        { id: 3, name: 'place', align: 'center', label: '장소', field: 'place' },
        { id: 4, name: 'status', align: 'center', label: '상태', field: 'status' },
        { id: 5, name: 'idValue', align: 'center', label: '고유번호(?)', field: 'idValue' },
      ],
      data: [],
      original: [
        {
          id:1,
          no:'1',
          type:'RFID',
          place:'',
          status:'미사용',
          idValue:'21894daw88092099d'
        },
        {
          id:2,
          no:'2',
          type:'RFID',
          place:'',
          status:'미사용',
          idValue:'21894daw88092099d'
        },
        {
          id:3,
          no:'3',
          type:'RFID',
          place:'',
          status:'미사용',
          idValue:'21894daw88092099d'
        },
        {
          id:4,
          no:'4',
          type:'RFID',
          place:'',
          status:'미사용',
          idValue:'21894daw88092099d'
        }

      ],
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    dialogToggle (list){
        this.$q.dialog({
            component: ConsumablesHistory,
            id: list.row.id,
            history_list: list.row.history_list,
        })
    },
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
  },
}
</script>

<style>

</style>