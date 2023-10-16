import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";


import Accomadation from "./views/Accomadation.vue";
import StudentUpdate from "./views/UpdateSAcc.vue";
import SearchStudent from "./views/SearchStudent.vue";
import AdminUpdate from "./views/UpdateAAcc.vue";
import NewRequest from "./views/NewSAcc.vue";
import ViewAcc from "./views/ViewAcc.vue";
import ViewStudent from "./views/ViewStudent.vue";
import CourseSchedule from "./views/ViewCourseSchedule.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/accomadation",
      name: "accomadation",
      component: Accomadation,
    },
    {
      path: "/new",
      name: "add",
      component: NewRequest,
    },
    {
      path: "/studentupdate/:id",
      name: "studentupdate",
      component: StudentUpdate,
      props: true,
    },
    {
      path: "/adminupdate/:id",
      name: "adminupdate",
      component: AdminUpdate,
      props: true,
    },
    {
      path: "/search",
      name: "search",
      component: SearchStudent,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewStudent,
      props: true,
    },
    {
      path: "/viewAcc/:id",
      name: "viewAcc",
      component: ViewAcc,
      props: true,
    },
    {
      path: "/courseSchedule/:id",
      name: "courseSchedule",
      component: CourseSchedule,
      props: true,
    },
  ],
});

export default router;
