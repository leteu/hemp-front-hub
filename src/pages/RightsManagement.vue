<template>
  <div>
    <q-table
      title="사용자 권한 관리"
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
      <template v-slot:body-cell-no="props">
        <q-td class="text-center" style="width:5%;">
          {{ props.row.no }}
        </q-td>
      </template>
      <template v-slot:body-cell-modify="props">
        <q-td auto-width class="text-center" style="width:7%">
          <q-btn
            push
            color="green"
            label="수정"
            @click="prompt(props,props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-delete="props">
        <q-td class="text-center" style="width:7%;">
          <q-btn
            push
            color="red"
            label="삭제"
            @click="confirm (props)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "RightsManagement",
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
        { id: 2, name: 'permission', align: 'center', label: '권한', field: 'permission' },
        { id: 3, name: 'modify', align: 'center', label: '수정', field: 'modify' },
        { id: 3, name: 'delete', align: 'center', label: '삭제', field: 'delete' },
      ],
      data: [],
      original: [
        {
          id:1,
          organizationName:"대마폐기 신청서1",
          no:'1',
          permission:'세부 권한1',
          modify:'',
          delete:'',
        },
        {
          id:2,
          no:'2',
          permission:'세부 권한2',
          modify: '',
          delete:'',
        },
      ]
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
    prompt(evt,row){
      this.$router.push({
        name: 'updateRightsManagement',
        query: { seq: row.no },
        params: {
          permission: row.permission,
          no: row.no,
        }
      })
    },
    confirm (row) {
      this.$q.dialog({
        message: '데이터가 삭제됩니다. 정말 삭제하시겠습니까?',
        ok: {
          label: '취소',
          push: true,
          color: 'primary',
        },
        cancel: {
          label: '삭제',
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        
        // console.log('>>>> Cancel')
      }).onCancel(() => {
        // 삭제 클릭 시 해당 데이터 ID 값 DEL API 전송 후 삭제 로직
        //DELETE query
        window.location.reload();
        this.hide();
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
  },
}
</script>

<style>

</style>