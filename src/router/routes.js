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
import CreateUser from "../pages/CreateUser";
import UpdateUser from "../pages/UpdateUser";
import Group from "../pages/Group";
import CreateGroup from "../pages/CreateGroup";
import UpdateGroup from "../pages/UpdateGroup";
import Notice from "../pages/Notice";
import CreateNotice from "../pages/CreateNotice";
import UpdateNotice from "../pages/UpdateNotice";
import SmartTruck from "../pages/SmartTruck";
import CreateSmartTruck from "../pages/CreateSmartTruck";
import UpdateSmartTruck from "../pages/UpdateSmartTruck";
import Cctv from "../pages/Cctv";
import Lock from "../pages/Lock";
import Education from "../pages/Education";
import CreateEducation from "../pages/CreateEducation";
import UpdateEducation from "../pages/UpdateEducation";
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
      { path: 'createUser', component: CreateUser },
      { path: 'updateUser/:id', component: UpdateUser, name: 'updateUser', props: true },
      { path: 'group', component: Group },
      { path: 'createGroup', component: CreateGroup },
      { path: 'updateGroup/:id', component: UpdateGroup, name: 'updateGroup', props: true },
      { path: 'notice', component: Notice },
      { path: 'createNotice', component: CreateNotice },
      { path: 'updateNotice/:id', component: UpdateNotice, name: 'updateNotice', props: true },
      { path: 'smartTruck', component: SmartTruck, props: true },
      { path: 'createSmartTruck', component: CreateSmartTruck },
      { path: 'updateSmartTruck', component: UpdateSmartTruck, name: 'updateSmartTruck', props: true },
      { path: 'cctv', component: Cctv },
      { path: 'lock', component: Lock },
      { path: 'education', component: Education },
      { path: 'createEducation', component: CreateEducation },
      { path: 'updateEducation', component: UpdateEducation, name: 'updateEducation', props: true },

      // TEST Field
      { path: 'test', component: TestComponent, name: 'testComponent' },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  { path: '*', component: Error404 }
]

export default routes
