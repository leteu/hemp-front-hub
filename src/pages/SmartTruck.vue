<template>
  <div>
    <q-table
      title="스마트트럭 관리"
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
          to="/createSmartTruck"
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
import detailModalSmartTruck from "layouts/DetailModalSmartTruck";
import SmartTruckHistory from "layouts/SmartTruckHistory";

export default {
  name: "SmartTruck",
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
        { id: 2, name: 'number', align: 'center', label: '차량번호', field: 'number' },
        { id: 3, name: 'model_name', align: 'center', label: '모델명', field: 'model_name' },
        { id: 4, name: 'manufacturer', align: 'center', label: '제조사', field: 'manufacturer' },
        { id: 5, name: 'user', align: 'center', label: '운행자', field: 'user' },
        { id: 5, name: 'history', align: 'center', label: '정비이력', field: 'history' },
      ],
      data: [],
      original: [
        {
          id: 1,
          name: '현대자동차',
          no: '1',
          number: '21허1235',
          model_name: '포터탑차',
          manufacturer: '현대자동차',
          user: '홍길동1',
          history_list: [
            {
              id: 1,
              date: '20210205',
              title: '엔진 점검',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi blanditiis consequuntur distinctio eos eum facilis harum illum ipsam itaque labore molestias nemo nisi, nostrum nulla numquam officiis omnis quaerat quibusdam reprehenderit sequi similique soluta suscipit veniam vitae. Accusantium illum iure magnam nostrum officia officiis quidem quis, repellendus sunt vero?',
            },
            {
              id: 2,
              date: '20210206',
              title: '타이어 손상으로 인한 교체',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi blanditiis consequuntur distinctio eos eum facilis harum illum ipsam itaque labore molestias nemo nisi, nostrum nulla numquam officiis omnis quaerat quibusdam reprehenderit sequi similique soluta suscipit veniam vitae. Accusantium illum iure magnam nostrum officia officiis quidem quis, repellendus sunt vero?',
            },
          ],
        },
        {
          id: 2,
          name: '현대자동차',
          no: '2',
          number: '54하1235',
          model_name: '포터포터',
          manufacturer: '현대자동차',
          user: '홍길동2',
          history_list: [
            {
              id: 1,
              date: '20210207',
              title: '엔진 점검',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi blanditiis consequuntur distinctio eos eum facilis harum illum ipsam itaque labore molestias nemo nisi, nostrum nulla numquam officiis omnis quaerat quibusdam reprehenderit sequi similique soluta suscipit veniam vitae. Accusantium illum iure magnam nostrum officia officiis quidem quis, repellendus sunt vero?',
            },
            {
              id: 2,
              date: '20210208',
              title: '엔진 점검',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi blanditiis consequuntur distinctio eos eum facilis harum illum ipsam itaque labore molestias nemo nisi, nostrum nulla numquam officiis omnis quaerat quibusdam reprehenderit sequi similique soluta suscipit veniam vitae. Accusantium illum iure magnam nostrum officia officiis quidem quis, repellendus sunt vero?',
            },
          ],
        },
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
    dialogToggle (list) {
      this.$q.dialog({
        component: SmartTruckHistory,

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
        component: detailModalSmartTruck,

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

        name: row.name,
        no: row.no,
        number: row.number,
        model_name: row.model_name,
        manufacturer: row.manufacturer,
        user: row.user,
        // ...more.props...
      }).onOk((data) => {
        this.$router.push({
          name: 'updateSmartTruck',
          query: { seq: data.no },
          params: {
            name: data.name,
            no: data.no,
            number: data.number,
            model_name: data.model_name,
            manufacturer: data.manufacturer,
            user: data.user,
          }
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
