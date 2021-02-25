<template>
  <q-layout>
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-separator dark vertical inset/>
        <q-btn
          :to="'/'"
          stretch
          flat
          lg
        >
          WKIT
        </q-btn>
        <q-space/>

        <q-btn dense flat no-wrap>
          <q-chip color="grey-1" size="12px">
            <q-avatar rounded size="26px">
              <q-icon name="account_circle"></q-icon>
            </q-avatar>
            관리자
            <q-icon name="arrow_drop_down"/>
          </q-chip>

          <q-menu auto-close>
            <q-list dense>
              <q-item clickable class="GL__menu-link">
                <q-item-section @click="logout">로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="250"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
    >
      <q-list
        class="rounded-borders"
      >
        <SideNavigation
          v-for="link in sideNavigations"
          :key="link.title"
          v-bind="link"
        ></SideNavigation>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view/>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white no-shadow">
      <q-toolbar>
        <q-toolbar-title class="text-right text-caption">
          Copyright 2021. WKIT Hemp System. all rights reserved.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT, UPDATE_USER } from '../store/actions.type'
import { GET_CURRENT_USER, IS_AUTHENTICATED } from '../store/getters.type'
import SideNavigation from 'components/SideNavigation.vue'


const linksData = [  {

    title: '사용자 관리',
    caption: '',
    icon: '',
    expansion: [
      {
        title: '사용자관리 페이지',
        caption: '',
        icon: '',
        link: '/user',
      },
      {
        title: '사용자 이력조회',
        caption: '',
        icon: '',
        link: '/userLog',
      },
      {
        title: '사용자 일정관리',
        caption: '',
        icon: '',
        link: '/userCalender',
      },
    ],
  },
  {
    title: '사용자 권한 관리',
    caption: '',
    icon: '',
    link: '/rightsManagement',
    expansion: [],
  },
  {
    title: '그룹 관리',
    caption: '',
    icon: '',
    link: '/group',
    expansion: [],
  },
  {
    title: '기관 관리',
    caption: '',
    icon: '',
    link: '/agency',
    expansion: [],
  },
  {
    title: '자산 관리',
    caption: '',
    icon: '',
    expansion: [
      {
        title: '스마트 트럭',
        caption: '',
        icon: '',
        link: '/smartTruck',
      },
      {
        title: 'CCTV',
        caption: '',
        icon: '',
        link: '/cctv',
      },
      {
        title: 'ID [RFID/QR]',
        caption: '',
        icon: '',
        link: '/assetId',
      },
      {
        title: '시건 장치',
        caption: '',
        icon: '',
        link: '/lock',
      },
      {
        title: '비컨 스캐너',
        caption: '',
        icon: '',
        link: '/scanner',
      },
      {
        title: '공동 소모품',
        caption: '',
        icon: '',
        link: '/consumables',
      },
    ],
  },
  {
    title: '시스템 사용이력',
    caption: '',
    icon: '',
    expansion: [
      {
        title: 'ID 이력 [RFID/QR]',
        caption: '',
        icon: '',
        link: '/systemId',
      },
      {
        title: '스마트트럭 주행 이력',
        caption: '',
        icon: '',
        link: '/systemSmartDriving',
      },
      {
        title: '출입 이력',
        caption: '',
        icon: '',
        link: '/systemUnlock',
      },
    ],
  },
  {
    title: '이력 관리조회',
    caption: '',
    icon: '',
    expansion: [
      {
        title: '1세부',
        caption: '',
        icon: '',
        link: '/oneDetails',
      },
      {
        title: '2세부',
        caption: '',
        icon: '',
        link: '/twoDetails',
      },
      {
        title: '3세부',
        caption: '',
        icon: '',
        link: '/threeDetails',
      },
      {
        title: '4세부',
        caption: '',
        icon: '',
        link: '/fourDetails',
      },
    ],
  },
  {
    title: '신청, 보고 관리',
    caption: '',
    icon: '',
    link: '/apply',
    expansion: [],
  },
  {
    title: '보관 관리',
    caption: '',
    icon: '',
    link: '/archive',
    expansion: [],
  },
  {
    title: '일정 관리',
    caption: '',
    icon: '',
    link: '/schedule',
    expansion: [],
  },
  {
    title: '교육,훈련 관리',
    caption: '',
    icon: '',
    link: '/education',
    expansion: [],
  },
  {
    title: '메뉴 관리',
    caption: '',
    icon: '',
    link: '/menu',
    expansion: [],
  },
  {
    title: '게시판 관리',
    caption: '',
    icon: '',
    expansion: [
      {
        title: '공지사항',
        caption: '',
        icon: '',
        link: '/notice',
      },
      {
        title: '보도자료',
        caption: '',
        icon: '',
        link: '/news',
      },
      {
        title: 'FAQ',
        caption: '',
        icon: '',
        link: '/faq',
      },
      {
        title: 'Q&A',
        caption: '',
        icon: '',
        link: '/qna',
      }
    ],
  },
  {
    title: '환경 설정',
    caption: '',
    icon: '',
    expansion: [
      {
        title: '로그인 이력',
        caption: '',
        icon: '',
        link: '/login',
        expansion: [],
      },
    ],
  },
];

export default {
  name: 'MainLayout',
  components: {SideNavigation},
  computed: {
    ...mapGetters({
      user: [GET_CURRENT_USER],
      isAuth: [IS_AUTHENTICATED]
    })
  },

  beforeMount () {
    if (!this.isAuth) {
      return this.$router.push({ name: 'login' })
    }
  },

  data() {
    return {
      leftDrawerOpen: false,
      sideNavigations: linksData
    }
  },

  methods: {
    logout () {
      this.$store
        .dispatch(LOGOUT)
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    },
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: $primary
  font-weight: 700

.q-footer
  .q-layout__shadow:after
    box-shadow: none

.q-table__top
  padding: 12px 0 12px 0
</style>
