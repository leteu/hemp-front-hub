<template>
  <div>
    <q-table
      title="공동 소모품 관리"
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
          to="/createConsumables"
        />
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <span>{{ message }}</span>
        </div>
      </template>

      <template v-slot:body-cell-number="props">
        <q-td class="text-center">
          <span @click="prompt(props, props.row)" style="cursor: pointer">{{ props.row.number }}</span>
        </q-td>
      </template>

      <template v-slot:body-cell-history="props">
        <q-td auto-width class="text-center">
          <q-btn
            padding="sm"
            size="md"
            color="primary"
            dense
            label="보기"
            @click="dialogToggle(props)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import ConsumablesHistory from "layouts/ConsumablesHistory";

export default {
  name: "Consumables",
  data () {
    return {
      filter: '',
      loading: false,
      field: row => row.id,
      pagination: {
        sortBy: 'no',
        descending: false,
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
        { id: 2, name: 'consum_name', align: 'center', label: '품목명', field: 'consum_name' },
        { id: 3, name: 'quantity', align: 'center', label: '재고', field: 'quantity' },
        { id: 4, name: 'last_date', align: 'center', label: '최근 증감일시', field: 'last_date' },
        { id: 5, name: 'user', align: 'center', label: '담당자', field: 'user' },
        { id: 5, name: 'history', align: 'center', label: '보기', field: 'history' },
      ],
      data: [],
      original: [
        {
          id: 1,
          name: '방진복',
          no: '1',
          consum_name: '방진복',
          last_date: '2021.02.18 14:37:48',
          quantity: '100',
          user: '신규현',
          history_list: [
            {
              id: 1,
              name: '방진복',
              no: '1',
              type: '입고',
              change_quantity: '+100',
              last_quantity: '100',
              date: '2021.02.02 14:37:48',
              user: '신규현',
              description: '초기 구매',
            },
            {
              id: 2,
              name: '방진복',
              no: '2',
              type: '출고',
              change_quantity: '-50',
              last_quantity: '50',
              date: '2021.02.05 14:37:48',
              user: '신규현',
              description: '',
            },
            {
              id: 3,
              name: '방진복',
              no: '3',
              type: '입고',
              change_quantity: '+50',
              last_quantity: '100',
              date: '2021.02.10 14:37:48',
              user: '신규현',
              description: '',
            },
            {
              id: 4,
              name: '방진복',
              no: '4',
              type: '출고',
              change_quantity: '-100',
              last_quantity: '0',
              date: '2021.02.18 14:37:48',
              user: '신규현',
              description: '',
            },
          ],
        },
        {
          id: 2,
          name: '진공팩',
          no: '2',
          consum_name: '진공팩',
          last_date: '2021.02.18 14:57:48',
          quantity: '50',
          user: '신규현',
          history_list: [
            {
              id: 1,
              name: '진공팩',
              no: '1',
              type: '입고',
              change_quantity: '+100',
              last_quantity: '100',
              date: '2021.02.02 14:37:48',
              user: '신규현',
              description: '초기 구매',
            },
            {
              id: 2,
              name: '진공팩',
              no: '2',
              type: '출고',
              change_quantity: '-50',
              last_quantity: '50',
              date: '2021.02.06 14:37:48',
              user: '신규현',
              description: '',
            },
            {
              id: 3,
              name: '진공팩',
              no: '3',
              type: '입고',
              change_quantity: '+50',
              last_quantity: '100',
              date: '2021.02.09 14:37:48',
              user: '신규현',
              description: '',
            },
            {
              id: 4,
              name: '진공팩',
              no: '4',
              type: '출고',
              change_quantity: '-100',
              last_quantity: '0',
              date: '2021.02.18 14:37:48',
              user: '신규현',
              description: '',
            },
          ],
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
    dialogToggle (list) {
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
        const sortFn = sortBy === 'no'
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

<style scoped>
</style>
