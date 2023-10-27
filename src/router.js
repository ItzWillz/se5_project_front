import { createRouter, createWebHashHistory } from "vue-router";
import Utils from "./config/utils"

import Login from "./views/Login.vue";

import AdminHome from "./views/AdminHome.vue";
import FacultyHome from "./views/FacultyHome.vue";
import StudentHome from "./views/StudentHome.vue";
import StudentUpdate from "./views/UpdateSAcc.vue";
import SearchStudent from "./views/SearchStudent.vue";
import AdminUpdate from "./views/UpdateAAcc.vue";
import NewRequest from "./views/NewSAcc.vue";
import ViewAcc from "./views/ViewAcc.vue";
import ViewStudent from "./views/ViewStudent.vue";
import CourseSchedule from "./views/ViewCourseSchedule.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminHome,
      // Prevent a user from navigating to the admin page if they do not have admin permission level. Redirect to proper page for permission.
      beforeEnter: () => {
        if (Utils.getStore("user") === null || Utils.getStore("user").permission !== 'admin') {
          router.push({name: Utils.getStore("user").permission});
        }
      },
    },
    {
      path: "/faculty",
      name: "faculty",
      component: FacultyHome,
      // Prevent a user from navigating to the faculty page if they do not have faculty permission level. Redirect to proper page for permission.
      beforeEnter: () => {
        if (Utils.getStore("user") === null || Utils.getStore("user").permission !== 'faculty') {
          router.push({name: Utils.getStore("user").permission});
        }
      },
    },
    {
      path: "/student",
      name: "student",
      component: StudentHome,
      // Prevent a user from navigating to the student page if they do not have student permission level. Redirect to proper page for permission.
      beforeEnter: () => {
        if (Utils.getStore("user") === null || Utils.getStore("user").permission !== 'student') {
          router.push({name: Utils.getStore("user").permission});
        }
      },
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
