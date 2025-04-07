import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homepage",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/chi-tiet-bai-dang/:id",
    name: "postDetail",
    component: () => import("../views/ManagePost/PostDetailView.vue"),
  },
  {
    path: "/dang-ky",
    name: "dang-ky",
    component: () => import("../components/RegisterView.vue"),
  },
  {
    path: "/chi-tiet-nguoi-dung/:id",
    name: "chi-tiet-nguoi-dung",
    component: () => import("../views/ManageInfor/UserInfor.vue"),
  },
  {
    path: "/dang-nhap",
    name: "dang-nhap",
    component: () => import("../components/LoginForm.vue"),
  },

  {
    path: "/quan-ly-tin-dang",
    name: "managePost",
    component: () => import("../views/ManagePost/ListPostView.vue"),
    meta: { showNavbar: true }
  },

  {
    path: "/quan-ly-tin-luu",
    name: "manageBookmark",
    component: () => import("../views/ManagePost/BookmarkView.vue"),
    meta: { showNavbar: true }
  },

  {
    path: "/quan-ly-thong-bao",
    name: "quan-ly-thong-bao",
    component: () => import("../views/ManageNotification/ManageNotificationView.vue"),
    meta: { showNavbar: true }
  },

  {
    path: "/dang-tin",
    name: "dang-tin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ManagePost/CreatePostView.vue"),
    meta: { showNavbar: true }
  },

  {
    path: "/sua-tin/:id",
    name: "sua-tin",
    component: () =>
      import("../views/ManagePost/CreatePostView.vue"),
    meta: { showNavbar: true }
  },

  {
    path: "/nha-dat-ban",
    name: "sellPost",
    component: () => import("../views/ManagePost/SellPostView.vue"),
    children: [
      { path: 'can-ho-chung-cu', name: 'ban-can-ho-chung-cu', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'nha-rieng', name: 'ban-nha-rieng', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'nha-biet-thu-lien-ke', name: 'ban-nha-biet-thu-lien-ke', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'nha-mat-pho', name: 'ban-nha-mat-pho', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'nha-pho-thuong-mai', name: 'ban-nha-pho-thuong-mai', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'dat-nen-du-an', name: 'ban-dat-nen-du-an', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'dat', name: 'ban-dat', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'trang-trai-khu-nghi-duong', name: 'ban-trang-trai-khu-nghi-duong', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'condotel', name: 'ban-condotel', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'kho-nha-xuong', name: 'ban-kho-nha-xuong', component: () => import('../views/ManagePost/SellPostView.vue') },
      { path: 'loai-bat-dong-san-khac', name: 'ban-loai-bat-dong-san-khac', component: () => import('../views/ManagePost/SellPostView.vue') },
    ],
  },

  {
    path: "/nha-dat-cho-thue",
    name: "rentPost",
    component: () => import("../views/ManagePost/SellPostView.vue"),
    children: [
      { path: 'can-ho-chung-cu', name: 'cho-thue-can-ho-chung-cu', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'nha-rieng', name: 'cho-thue-nha-rieng', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'nha-biet-thu-lien-ke', name: 'cho-thue-nha-biet-thu-lien-ke', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'nha-mat-pho', name: 'cho-thue-nha-mat-pho', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'nha-thuong-mai', name: 'cho-thue-nha-thuong-mai', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'nha-tro-phong-tro', name: 'cho-thue-nha-tro-phong-tro', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'van-phong', name: 'cho-thue-van-phong', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'sang-nhuong-cua-hang-ki-ot', name: 'cho-thue-sang-nhuong-cua-hang-ki-ot', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'kho-nha-xuong-dat', name: 'cho-thue-kho-nha-xuong-dat', component: () => import("../views/ManagePost/SellPostView.vue") },
      { path: 'loai-bat-dong-san-khac', name: 'cho-thue-loai-bat-dong-san-khac', component: () => import("../views/ManagePost/SellPostView.vue") },
    ],
  },

  {
    path: '/du-an',
    name: 'project',
    component: () => import('../views/Project/ProjectView.vue'),
    children: [
      { path: 'can-ho-chung-cu', name: 'can-ho-chung-cu', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'cao-oc-van-phong', name: 'cao-oc-van-phong', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'trung-tam-thuong-mai', name: 'trung-tam-thuong-mai', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'khu-do-thi-moi', name: 'khu-do-thi-moi', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'khu-phuc-hop', name: 'khu-phuc-hop', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'nha-o-xa-hoi', name: 'nha-o-xa-hoi', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'khu-nghi-duong-sinh-thai', name: 'khu-nghi-duong-sinh-thai', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'khu-cong-nghiep', name: 'khu-cong-nghiep', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'biet-thu-lien-ke', name: 'biet-thu-lien-ke', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'shophouse', name: 'shophouse', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'nha-mat-pho', name: 'nha-mat-pho', component: () => import('../views/Project/ProjectView.vue') },
      { path: 'du-an-khac', name: 'du-an-khac', component: () => import('../views/Project/ProjectView.vue') },
    ],
  },

  {
    path: '/chi-tiet-du-an/:id',
    name: 'chi-tiet-du-an',
    component: () => import('../views/Project/ProjectDetailView.vue'),
  },

  {
    path: '/tin-tuc',
    name: 'tin-tuc',
    component: () => import('../views/News/NewsView.vue'),
  },

  {
    path: '/tin-tuc/:id',
    name: 'chi-tiet-tin-tuc',
    component: () => import('../views/News/NewsDetailView.vue'),
  },

  {
    path: '/doanh-nghiep',
    name: 'doanh-nghiep',
    component: () => import('../views/PhoneBook/Enterprise/EnterpriseSearchView.vue'),
  },

  // {
  //   path: '/tim-kiem-doanh-nghiep',
  //   name: 'tim-kiem-doanh-nghiep',
  //   component: () => import('../views/PhoneBook/Enterprise/EnterpriseSearchView.vue'),
  // },

  {
    path: '/doanh-nghiep/:id',
    name: 'chi-tiet-doanh-nghiep',
    component: () => import('../views/PhoneBook/Enterprise/EnterpriseDetailView.vue'),
  },

  {
    path: '/nha-moi-gioi',
    name: 'nha-moi-gioi',
    component: () => import('../views/PhoneBook/Broker/BrokerView.vue'),
  },

  {
    path: '/nha-moi-gioi/:id',
    component: () => import('../views/PhoneBook/Broker/BrokerDetailView.vue'),
  },

  {
    path: '/tim-kiem-tu-van',
    component: () => import('../views/ManageAdviceRequest/CreateAdviceRequestView.vue'),
    meta: { showNavbar: true }
  },
  {
    path: '/dang-du-an-moi',
    component: () => import('../views/Enterprise/ManageProject/CreateProjectView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/chinh-sua-du-an/:id',
    component: () => import('../views/Enterprise/ManageProject/CreateProjectView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/quan-ly-du-an',
    component: () => import('../views/Enterprise/ManageProject/ListProjectView.vue'),
    meta: { showNavbar: true }
  },
  {
    path: '/quan-ly-yeu-cau',
    component: () => import('../views/ManageAdviceRequest/ListRequestView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/thong-tin-chi-tiet-yeu-cau/:id',
    component: () => import('../views/ManageAdviceRequest/RequestDetailView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/danh-sach-yeu-cau-tu-van',
    component: () => import('../views/Broker/AdviceRequest/ListAdviceRequestView.vue'),
  },

  {
    path: '/danh-sach-yeu-cau-dang-ky',
    component: () => import('../views/Broker/AdviceRequest/AppliedAdviceRequestView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/danh-sach-danh-gia-tu-nguoi-dung',
    component: () => import('../views/Broker/ManageReview.vue'),
    meta: { showNavbar: true }
  },

  

  {
    path: '/quan-ly-tai-khoan',
    name: 'quan-ly-tai-khoan',
    component: () => import('../views/ManageInfor/ProfileView.vue'),
    meta: { showNavbar: true }
  },

  {
    path: '/quen-mat-khau',
    name: 'quen-mat-khau',
    component: () => import('../views/ForgotPassword/ConfirmMailView.vue'),
  },

  {
    path: '/thay-doi-mat-khau/:token',
    name: 'thay-doi-mat-khau',
    component: () => import('../views/ForgotPassword/ResetPasswordView.vue'),
  },

  {
    path: "/admin",
    name: "dashboard",
    component: () => import('../views/Admin/DashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-tin-cho-duyet',
    name: 'danh-sach-tin-cho-duyet',
    component: () => import('../views/Admin/Post/ListRequestPostView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-bao-cao',
    name: 'danh-sach-bao-cao',
    component: () => import('../views/Admin/Post/ReportView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/tin-cho-duyet/:id',
    name: 'tin-cho-duyet-admin',
    component: () => import('../views/Admin/Post/RequestPostDetailView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-tin-dang',
    name: 'danh-sach-tin-dang-admin',
    component: () => import('../views/Admin/Post/ManagePostView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-tin-dang/:id',
    name: 'chi-tiet-tin-dang-admin',
    component: () => import('../views/Admin/Post/PostDetailView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  // Route đăng nhập
  {
    path: "/admin/dang-nhap",
    name: "adminLogin",
    component: () => import("../views/Admin/AdminLoginView.vue"),
    meta: { hideHeader: true, hiveAdminNavbar: true }
  },

  {
    path: "/admin/quan-ly-nguoi-dung",
    name: "quan-ly-nguoi-dung",
    component: () => import("../views/Admin/ManageUser/ListUserView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-nguoi-dung/:id",
    name: "quan-ly-chi-tiet-nguoi-dung",
    component: () => import("../views/Admin/ManageUser/UserDetailView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-doanh-nghiep",
    name: "quan-ly-doanh-nghiep-admin",
    component: () => import("../views/Admin/ManageUser/ListEnterpriseView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  // {
  //   path: "/admin/quan-ly-doanh-nghiep/:id",
  //   name: "quan-ly-chi-tiet-doanh-nghiep",
  //   component: () => import("../views/Admin/ManageUser/UserDetailView.vue"),
  //   meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  // },

  {
    path: "/admin/quan-ly-nha-moi-gioi",
    name: "quan-ly-moi-gioi-admin",
    component: () => import("../views/Admin/ManageUser/ListBrokerView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-nhan-su",
    name: "quan-ly-nhan-su",
    component: () => import("../views/Admin/ManageSubAdmin/ListSubAdminView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-nhan-su/tao-tai-khoan-moi",
    name: "tao-tai-khoan-subadmin",
    component: () => import("../views/Admin/ManageSubAdmin/CreateSubAdminAccountView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-tai-khoan",
    name: "quan-ly-tai-khoan-admin",
    component: () => import("../views/Admin/ManageInfor/ProfileView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/dang-tin-tuc",
    name: "dang-tin-tuc",
    component: () => import("../views/Admin/ManageNews/CreateNewsView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-tin-tuc",
    name: "quan-ly-tin-tuc",
    component: () => import("../views/Admin/ManageNews/ManageNewsView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/quan-ly-tin-tuc/:id",
    name: "thong-tin-chi-tiet-tin-tuc-admin",
    component: () => import("../views/Admin/ManageNews/NewsDetailView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: "/admin/chinh-sua-thong-tin-tin-tuc/:id",
    name: "chinh-sua-tin-tuc-admin",
    component: () => import("../views/Admin/ManageNews/EditNewsView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-du-an-cho-duyet',
    name: 'danh-sach-du-an-cho-duyet',
    component: () => import('../views/Admin/ManageProject/ListRequestProjectView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/danh-sach-du-an',
    name: 'danh-sach-du-an-admin',
    component: () => import('../views/Admin/ManageProject/ListProjectView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/thong-tin-du-an/:id',
    name: 'chi-tiet-du-an-admin',
    component: () => import('../views/Admin/ManageProject/ProjectDetailView'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '/admin/quan-ly-quyen',
    name: 'quan-ly-quyen',
    component: () => import('../views/Admin/ManageRole/ManageRoleView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: true }
  },

  {
    path: '*',
    component: () => import("../views/NotFoundView.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        ...savedPosition,
        behavior: 'smooth'
      };
    } else {
      return { x: 0, y: 0, behavior: 'smooth' };
    }
  },
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("adminToken");
  const isAdmin = localStorage.getItem("isAdmin");
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        name: 'adminLogin',
        query: { redirect: to.fullPath }
      });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next({
        name: 'adminLogin',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
