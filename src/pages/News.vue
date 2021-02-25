<template>
  <q-table
      title="보도자료"
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
          to="/createQnA"
        />
      </template>
      <template v-slot:body-cell-no="props">
        <q-td class="text-center" style="width:7%;">
          {{ props.row.no }}
        </q-td>
      </template>
      <template v-slot:body-cell-manager="props">
        <q-td class="text-center" style="width:10%;">
          {{ props.row.manager }}
        </q-td>
      </template>
      <template v-slot:body-cell-title="props">
        <q-td class="text-center" @click="prompt(props,props.row)" style="cursor:pointer">
          {{ props.row.title }}
        </q-td>
      </template>
      <template v-slot:body-cell-date="props">
        <q-td class="text-center" style="width:15%;">
          {{ props.row.date }}
        </q-td>
      </template>
      <template v-slot:body-cell-files="props">
        <q-td class="text-center" style="width:5%;">
          <q-icon
            v-if="props.row.files"
            name="picture_as_pdf"
            color="red-14"
            style="font-size:2em"
          />
        </q-td>
      </template>
  </q-table>
</template>

<script>
export default {
  name:'News',
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
        { id: 2, name: 'title', align: 'center', label: '제목', field: 'title' },
        { id: 3, name: 'manager', align: 'center', label: '담당부서', field: 'manager' },
        { id: 4, name: 'date', align: 'center', label: '등록일', field: 'date' },
        { id: 5, name: 'files', align: 'center', label: '첨부파일여부', field: 'files' },
      ],
      data: [],
      original: [
        {
          id:1,
          title: '[매일신문] SW산업의 주역, (주)우경정보기술',
          no:'1',
          manager: 'group1',
          date: '2021.02.24 11:26:34',
          files: 'TestFile.pdf',
          con: `
                지난 2008년 설립된 우경정보기술은 현재 대구 수성구 알파시티에 자리를 잡은 지역의 대표 IT기업이다. 특히 영상정보보안과 영상 인식·분석 솔루션 분야에서 탁월한 성과를 내고 있다.
                우경정보기술이 제공하는 솔루션은 ▷딥러닝 기반의 객체 검출 시스템 ▷고속 영상 암호화 ▷얼굴인식 등 원천기술을 바탕으로 개발됐다. 딥러닝 기반의 객체 검출 시스템은 영상 데이터를 학습한 인공지능(AI)이 영상의 객체(사람, 차량 등)를 분류하고 추적하는 기술이다. 특히 우경정보기술은 영상에 등장하는 차량의 차종은 물론 사람의 얼굴까지 인식해 구별할 수 있는 등 차별화된 기술력을 자랑한다.
                이러한 우경정보기술의 기술력으로 빗어낸 대표작이 '시큐워처 for CCTV'다. 이 제품은 CCTV 영상 정보에 자체 딥러닝 기술을 적용해 개인정보보호, 영상 데이터 보안, 위·변조 방지, 접근 통제 등을 지원한다. 특히 영상 내 움직이는 객체도 부분적으로 마스킹 조치도 할 수 있어 개인정보보호에 민감한 공공기관과 지자체, 기업들의 수요가 끊이지 않고 있다.
                이후 출시한 '시큐워처 for Hi-VS'는 우경정보기술만의 영상 인식·분석 기술이 본격적으로 적용된 솔루션이다. CCTV 영상 내 사람의 성별, 키, 옷 색상, 이동방향 등을 검출하고 분석할 수 있다. 차량에 대해서도 차종, 모델, 제조사, 색상, 이동방향 등을 분석할 수 있는 제품이다. 또 하나의 모듈로 약 100대의 CCTV에서 보내는 많은 양의 영상데이터를 실시간으로 분석할 수 있다는 게 회사 측의 설명이다.
                박윤하 우경정보기술 대표는 이 제품의 활용성이 무궁무진하다고 설명한다. 박 대표는 "실시간 교통데이터 분석은 물론이고 화재 감시. 범죄 추적 분야에도 활용할 수 있다"며 "단순 관제 시스템에서 멈추지 않고 시민들이 체감할 수 있는 안전한 도시를 만드는 데 기여할 수 있는 기술"이라고 자부했다.
                이미 세계적인 수준의 기술력을 갖춘 우경정보기술에, 해외시장의 관심도 적잖다. 지난 2018년 얼굴인식 기반 분석 시스템으로 베트남 시장을 개척한 우경정보기술은 최근 코로나19로 해 외수출이 어려운 상황에도 불구, 일본에 객체 마스킹 솔루션을, 말레이시아에 버스승객분석 솔루션을 수출하기도 했다.
                이러한 과정 속 지역의 기술력이 세계에도 통한다고 확신한 우경정보기술은 지난 2019년 지역의 IT기업 30여 개사와 함께 대구시의 지원을 받아 '팀 대구'를 결성, 적극적으로 해외 수주 활동을 펼치고 있다.
                박 대표는 "단일 기업으로는 해외 진출에 어려움도 있고 해외의 스마트시티 사업, 인프라구축 사업 등 큰 단위 사업을 소화하기도 벅차다"며 "'팀 대구'를 결성해 각 기업이 가진 장점들을 한 데니 합쳐 기술 현지화, 해외 바이어 공유 등을 하니 해외시장을 공략하는 것도 한결 수월해졌다. 현재는 인도네시아와 베트남 등 동남아 등지의 국가사업을 진행하는 중"이라고 말했다.
                지역의 일자리 창출에도 제 몫을 톡톡히 하고 있다. 지난해 초 50여 명이던 직원 수가 현재는 93명으로 2배 가까이 늘었다. 우경정보기술은 고용시장 활성화에 대한 기여를 인정받아 지난해 말 수성구청으로부터 일자리 창출 우수기업에 선정됐다. 2019년부터는 과학기술정보통신부가 지정하는 'SW 고성장 클럽 200'에 2년 연속 선정돼 가능성과 기술력을 인정받기도 했다.
                최근 박윤하 대표는 지역 인재 양성에 큰 힘을 쏟고 있다. 우경정보기술은 수성대와 협력해 지난해 ABC(AI, 블록체인, 빅데이터, 클라우드)과를 신설했고, 올해부터 신입생을 모집하고 있다.
                박 대표는 "지역에서 인력을 구하기 어렵다는 점이 대구 SW산업의 고질적인 문제였다"며 "대구가 미래의 석유인 SW산업의 한 축을 담당하려면 자체적으로 전문 인력을 양성해야 하고, 이는 기업이 먼저 나서야 한다고 생각했다. 추후 ABC과 학생들에겐 현장과 밀접한 교육·실무 기회를 제공할 계획"이라고 밝혔다.
              `,
        },
        {
          id:2,
          title: '(주)우경정보기술, 차별화된 기술로 해외시장 공략',
          no:'2',
          manager: 'group2',
          date: '2021.02.24 11:26:34',
          files: '',
          con: `
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              `,
        },
        {
          id:3,
          title: '[WK소식] (주)우경정보기술, 청년 희망이음 프로젝트 온라인 기업 탐방 프로그램 출연',
          no:'3',
          manager: 'group3',
          date: '2021.02.24 11:26:34',
          files: 'TestFile.pdf',
          con: `
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              `,
        },
        {
          id:4,
          title: `2020 하반기 인기상품 - 고객만족 / 고속영상검색솔루션 - 우경정보기술 'Hi-VS'`,
          no:'4',
          manager: 'group4',
          date: '2021.02.24 11:26:34',
          files: 'TestFile.pdf',
          con: `
                우경정보기술이 선보인 '시큐워처 하이브스(SecuWatcher for High Speed Video Searching)' 솔루션은 수준 높은 객체인식과 추적기술을 적용한 고속영상검색 시스템이다. 이를 통합관제센터 폐쇄회로(CC)TV 시스템에 적용해 효과적인 운영을 지원한다.
                시큐워처 하이브스는 CCTV 영상 내 사람 객체 카운팅뿐만 아니라 키, 옷 색상, 성별, 이동방향 등을 검출할 수 있다. 차량에 대해서도 객체 카운팅과 차종, 모델, 제조사, 색상, 이동방향 등을 검출할 수 있다. 기존 CCTV 시스템과 연동돼 편리하고 효율적으로 검색할 수 있다.
                고속영상검색을 지원하는 솔루션 이름처럼 고성능 GPU를 사용해 최대 60배 영상검색 속도를 제공한다. 다수의 테스크를 이용해 다중 영상 검색을 지원한다.
                이 제품은 최근 나라장터 종합쇼핑몰(물품식별번호 23998750)에 등록돼 품질 우수성도 인정받았다.
                우경정보기술은 시큐워처 하이브스에 앞서 CCTV 영상 유출과 위·변조를 방지하는 CCTV 영상 통합보안 솔루션 '시큐워처 for CCTV'를 선보이며 업계에서 기술력을 인정받았다.
                4년간 연구개발(R&amp;D)하며 딥러닝 기술을 적용해 자체 개발한 이 제품은 CCTV 영상 정보와 관련한 개인정보보호, 영상 데이터 보안, 위·변조 방지, 접근 통제를 지원한다. 기업이나 공공기관에서 고민하는 불법 영상유출 문제를 획기적으로 해결할 수 있다.
                프라이버시 보호를 위한 영상 보안 저장과 안전한 온라인 영상 반출 기능을 갖췄다. 영상 정보 위·변조를 방지하며 대용량 고화질 영상을 빠르고 안전하게 암호화해 저장한다.
                CCTV 영상 자료를 외부로 반출할 때 영상반출시스템을 이용해 암호화, 마스킹, 워터마킹을 거친다. 인식기반 동적 객체 프라이버시 보호·해제 기술을 적용해 부분적으로 마스킹 조치도 할 수 있다. 영상 활용 목적에 맞는 프라이버시를 제공한다.
                우경정보기술은 지난 5월 대구 실리콘밸리인 알파시티에 신사옥을 마련했다. 인공지능(AI)과 블록체인, 빅데이터, 클라우드를 접목한 ABC 융·복합 플랫폼 서비스 제공을 목표로 새로운 도약을 준비하고 있다. 최근 국가와 지자체는 다량의 CCTV를 설치 운영하고 있다. 증가하는 범죄에 대한 국민 불안감을 해소하고 신속한 범죄 예방과 교통 환경을 파악하기 위해서다. 하지만 기존 CCTV 관제시스템은 CCTV 수에 비해 관제요원 인원 공급이 부족해 효율적인 CCTV 운영관리와 특정 사건 초동조치에 필요한 CCTV 영상을 검색하는데 많은 시간이 소요됐다.
              `,
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
        name: 'NewsView',
        query: { seq: row.id },
        params: {
          title: row.title,
          manager: row.manager,
          date: row.date,
          files: row.files,
          con: row.con
        }
      })
    },
    
  }
}
</script>

<style scoped>
</style>
}
</script>

<style>

</style>