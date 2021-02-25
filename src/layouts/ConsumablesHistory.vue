<template>
  <q-dialog
    ref="dialog"
    :position="position"
    maximized
    square
  >
    
    <q-card style="width: 1440px;">
      <q-card-section class="row justify-between items-center q-my-sm">
        <p class="text-bold text-h6 q-mb-none">증감이력</p>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section class="text-weight-bold q-pt-lg">
        <q-table
          :data="data"
          title-class="text-bold text-h5"
          :columns="columns"
          :pagination.sync="pagination"
          color="primary"
          row-key="id"
          :filter="filter"
          :table-header-style="{ backgroundColor: '#f5f8fa' }"
          no-data-label="내용이 존재하지 않습니다."
          no-results-label="검색결과가 존재하지 않습니다."
          @request="onRequest"
          binary-state-sort
          :loading="loading"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-no="props">
            <q-td class="text-center">
              {{ props.row.no }}
            </q-td>
          </template>
          <template v-slot:body-cell-change_quantity="props">
            <q-td class="text-center" :style="props.row.type === '입고' ? 'background:rgba(0,255,0,.3)' : 'background:rgba(255,0,0,.3)' ">
              {{ props.row.change_quantity }}
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: "ConsumableHistory",
  props: {
    id: '',
    history_list: '',
    filter: '',
  },
  data () {
    return {
      loading: false,
      position: 'top',
      field: row => row.id,
      pagination: {
        sortBy: 'no',
        descending: true,
        page: 1,
        rowsPerPage: 0,
        rowsNumber: 0
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
        { id: 2, name: 'type', align: 'center', label: '입/출고', field: 'type' },
        { id: 3, name: 'change_quantity', align: 'center', label: '증감수량', field: 'change_quantity' },
        { id: 4, name: 'last_quantity', align: 'center', label: ' 재고', field: 'last_quantity' },
        { id: 5, name: 'date', align: 'center', label: '증감일시', field: 'date', },
        { id: 6, name: 'user', align: 'center', label: '담당자', field: 'user' },
        { id: 7, name: 'description', align: 'center', label: '비고', field: 'description' },
      ],
      data:[],
      original: this.history_list
    }
  },
  mounted(){
    this.onRequest({
      pagination: this.pagination,
    })
  },
  computed: {
    
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
    show () {
      this.$refs.dialog.show()
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
  },
}
</script>

<style scoped>
  
</style>