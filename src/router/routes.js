// AUTH
import AuthLayout from "layouts/AuthLayout";
import RwvLogin from "pages/RwvLogin"
import RwvFindId from "pages/RwvFindId";
import RwvFindPw from "pages/RwvFindPw";

// MAIN
import MainLayout from "../layouts/MainLayout";
import Index from "../pages/Index";
import Agency from "../pages/Agency";
import CreateAgency from "../pages/CreateAgency";
import UpdateAgency from "../pages/UpdateAgency";
import User from "../pages/User";
import UserLog from "../pages/UserLog";
import UserCalender from "../pages/UserCalender";
import RightsManagement from "../pages/RightsManagement";
import UpdateRightsManagement from "../pages/UpdateRightsManagement";
import CreateUser from "../pages/CreateUser";
import UpdateUser from "../pages/UpdateUser";
import Group from "../pages/Group";
import CreateGroup from "../pages/CreateGroup";
import UpdateGroup from "../pages/UpdateGroup";
import CreateNotice from "../pages/CreateNotice";
import UpdateNotice from "../pages/UpdateNotice";
import SmartTruck from "../pages/SmartTruck";
import CreateSmartTruck from "../pages/CreateSmartTruck";
import UpdateSmartTruck from "../pages/UpdateSmartTruck";
import Cctv from "../pages/Cctv";
import AssetId from "../pages/AssetId"
import Lock from "../pages/Lock";
import Scanner from "../pages/Scanner";
import CreateScanner from "../pages/CreateScanner";
import UpdateScanner from "../pages/UpdateScanner";
import Consumables from "../pages/Consumables";
import CreateConsumables from "../pages/CreateConsumables";
import SystemId from "../pages/SystemId";
import SystemSmartDriving from "../pages/SystemSmartDriving";
import SystemUnlock from "../pages/SystemUnlock";
import OneDetails from "../pages/OneDetails";
import TwoDetails from "../pages/TwoDetails";
import ThreeDetails from "../pages/ThreeDetails";
import FourDetails from "../pages/FourDetails";
import Apply from "../pages/Apply";
import Archive from "../pages/Archive";
import Schedule from "../pages/Schedule";
import Education from "../pages/Education";
import Menu from "../pages/Menu";
import CreateEducation from "../pages/CreateEducation";
import UpdateEducation from "../pages/UpdateEducation";
import Notice from "../pages/Notice";
import News from "../pages/News";
import NewsView from "../pages/NewsView";
import FAQ from "../pages/FAQ";
import QnA from "../pages/QnA";
import AnswerQnA from "../pages/AnswerQnA";
import Login from "../pages/Login";
import Error404 from "../pages/Error404";

// TEST Field
import TestComponent from "layouts/TestComponent";

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: RwvLogin, name: 'login'},
      { path: 'findId', component: RwvFindId, name: 'findId'},
      { path: 'findPw', component: RwvFindPw, name: 'findPw'},
    ],
  },

  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Index },
      { path: 'agency', component: Agency, name: 'agency', props: true },
      { path: 'createAgency', component: CreateAgency },
      { path: 'updateAgency', component: UpdateAgency, name: 'updateAgency', props: true },
      { path: 'user', component: User, props: true },
      { path: 'userLog', component: UserLog },
      { path: 'userCalender', component: UserCalender },
      { path: 'rightsManagement', component: RightsManagement },
      { path: 'updateRightsManagement', component: UpdateRightsManagement, name: 'updateRightsManagement', props: true },
      { path: 'createUser', component: CreateUser },
      { path: 'updateUser/:id', component: UpdateUser, name: 'updateUser', props: true },
      { path: 'group', component: Group },
      { path: 'createGroup', component: CreateGroup },
      { path: 'updateGroup/:id', component: UpdateGroup, name: 'updateGroup', props: true },
      { path: 'createNotice', component: CreateNotice },
      { path: 'updateNotice/:id', component: UpdateNotice, name: 'updateNotice', props: true },
      { path: 'smartTruck', component: SmartTruck, props: true },
      { path: 'createSmartTruck', component: CreateSmartTruck },
      { path: 'updateSmartTruck', component: UpdateSmartTruck, name: 'updateSmartTruck', props: true },
      { path: 'cctv', component: Cctv },
      { path: 'assetId', component: AssetId },
      { path: 'lock', component: Lock },
      { path: 'scanner', component: Scanner },
      { path: 'createScanner', component: CreateScanner },
      { path: 'updateScanner', component: UpdateScanner, name: 'updateScanner', props: true },
      { path: 'consumables', component: Consumables, props: true },
      { path: 'createConsumables', component: CreateConsumables },
      { path: 'systemId', component: SystemId },
      { path: 'systemSmartDriving', component: SystemSmartDriving },
      { path: 'systemUnlock', component: SystemUnlock },
      { path: 'oneDetails', component: OneDetails },
      { path: 'twoDetails', component: TwoDetails },
      { path: 'threeDetails', component: ThreeDetails },
      { path: 'fourDetails', component: FourDetails },
      { path: 'apply', component: Apply },
      { path: 'archive', component: Archive },
      { path: 'schedule', component: Schedule },
      { path: 'education', component: Education },
      { path: 'menu', component: Menu },
      { path: 'createEducation', component: CreateEducation },
      { path: 'updateEducation', component: UpdateEducation, name: 'updateEducation', props: true },
      { path: 'notice', component: Notice },
      { path: 'news', component: News },
      { path: 'newsView', component: NewsView, name: 'NewsView', props: true },
      { path: 'faq', component: FAQ },
      { path: 'qna', component: QnA },
      { path: 'answerQnA', component: AnswerQnA, name:'AnswerQnA', props:true },
      { path: 'login', component: Login },

      // TEST Field
      { path: 'test', component: TestComponent, name: 'testComponent' },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: Error404 }
]

export default routes