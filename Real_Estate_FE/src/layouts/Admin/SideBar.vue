<template>
  <div class="sidebar">
    <header class="user-infor">
      <el-image
        class="avt"
        :src="admin.avatar"
        fit="cover"
        alt="Avatar"
        v-if="admin.avatar"
      ></el-image>
      <el-avatar
        v-else
        shape="circle"
        :size="60"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      ></el-avatar>
      <div class="name-email">
        <h6>{{ admin.name }}</h6>
        {{ admin.email }}
      </div>
    </header>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <button
          v-if="admin.role == 0 || !item.permission || admin.permissions?.includes(item.permission)"
          type="button"
          @click="toggleMenu(item)"
          :class="{ active: activeMenu === item.name }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>

          <el-badge class="count-request-badge" :max="99" v-if="postRequestCount && item.name == 'ManagePost' && activeMenu != item.name" :value="postRequestCount" />
          <el-badge class="count-request-badge" :max="99" v-if="projectRequestCount && item.name == 'ManageProject' && activeMenu != item.name" :value="projectRequestCount" />
          <el-badge class="count-request-badge" :max="99" v-if="(brokerRequestCount || enterpriseRequestCount) && item.name == 'ManageUser' && activeMenu != item.name" :value="(enterpriseRequestCount + brokerRequestCount)" />

          <i v-if="item.subMenu" class="ai-chevron-down-small drop-down"></i>
        </button>
        <div
          v-if="item.subMenu"
          class="sub-menu"
          :style="{
            height: activeMenu === item.name ? subMenuHeight(item.name) : '0px',
          }"
        >
          <ul>
            <li v-for="subItem in item.subMenu" :key="subItem.name">
              <button
                type="button"
                @click="toggleSubMenu(item.name, subItem)"
                :class="{ active: isSubMenuActive(item.name, subItem) }"
              >
                {{ subItem.label }}
                <el-badge class="count-request-badge" :max="99" v-if="postRequestCount && subItem.name == 'RequestPost'" :value="postRequestCount" />
                <el-badge class="count-request-badge" :max="99" v-if="projectRequestCount && subItem.name == 'RequestProject'" :value="projectRequestCount" />
                <el-badge class="count-request-badge" :max="99" v-if=" enterpriseRequestCount && subItem.name == 'Enterprise'" :value="enterpriseRequestCount" />
                <el-badge class="count-request-badge" :max="99" v-if="brokerRequestCount && subItem.name == 'Broker'" :value="brokerRequestCount" />
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdminAuthApi from "@/api/admin/adminAuth";

export default {
  data() {
    return {
      countUserRequest: 0,
      activeMenu: null,
      activeSubMenu: {},
      menuItems: [
        {
          name: "Dashboard",
          icon: "ai-dashboard",
          label: "Dashboard",
          page: "/admin",
        },
        {
          name: "ManageProject",
          icon: "fa-solid fa-building",
          label: "Quản lý dự án",
          permission: "view_any_project",
          subMenu: [
            { name: "RequestProject", label: "Dự án chờ duyệt", page: "/admin/danh-sach-du-an-cho-duyet" },
            { name: "ListProject", label: "Danh sách dự án", page: "/admin/danh-sach-du-an" },
          ],
        },
        {
          name: "ManagePost",
          icon: "fa-regular fa-file-lines",
          label: "Quản lý bài đăng",
          permission: "view_any_post",
          subMenu: [
            {
              name: "RequestPost",
              label: "Tin chờ duyệt",
              page: "/admin/danh-sach-tin-cho-duyet",
            },
            {
              name: "ListPost",
              label: "Danh sách bài đăng",
              page: "/admin/danh-sach-tin-dang",
            },
            {
              name: "Report",
              label: "Danh sách báo cáo",
              page: "/admin/danh-sach-bao-cao",
            },
          ],
        },
        {
          name: "ManageNews",
          icon: "ai-newspaper",
          label: "Quản lý tin tức",
          permission: "view_any_news",
          subMenu: [
            {
              name: "ListNews",
              label: "Danh sách tin tức",
              page: "/admin/quan-ly-tin-tuc",
            },
            {
              name: "CreateNews",
              label: "Đăng tin tức mới",
              page: "/admin/dang-tin-tuc",
            },
          ],
        },
        {
          name: "ManageUser",
          icon: "ai-people-group",
          label: "Quản lý người dùng",
          permission: "view_any_user_account",
          subMenu: [
            {
              name: "User",
              label: "Quản lý người dùng",
              page: "/admin/quan-ly-nguoi-dung",
            },
            {
              name: "Enterprise",
              label: "Quản lý doanh nghiệp",
              page: "/admin/quan-ly-doanh-nghiep",
            },
            {
              name: "Broker",
              label: "Quản lý nhà môi giới",
              page: "/admin/quan-ly-nha-moi-gioi",
            },
          ],
        },
        {
          name: "ManageSubadmin",
          icon: "fa-solid fa-user-tie",
          label: "Quản lý nhân sự",
          permission: "view_any_subadmin",
          subMenu: [
            {
              name: "Subadmin",
              label: "Quản lý nhân sự",
              page: "/admin/quan-ly-nhan-su",
            },
            {
              name: "CreateAccount",
              label: "Thêm tài khoản mới",
              page: "/admin/quan-ly-nhan-su/tao-tai-khoan-moi",
            },
          ],
        },
        {
          name: "ManageRole",
          icon: "ai-person-check",
          label: "Quản lý quyền",
          permission: "view_any_role",
          page: "/admin/quan-ly-quyen",
        },
        {
          name: "Profile",
          icon: "ai-person",
          label: "Quản lý tài khoản",
          page: "/admin/quan-ly-tai-khoan",
        },
        {
          name: "Logout",
          icon: "el-icon fa fa-sign-out",
          label: "Đăng xuất",
        },
      ],
    };
  },
  computed: mapState({
    admin: (state) => state.admin,
    postRequestCount: (state) => state.postRequestCount,
    projectRequestCount: (state) => state.projectRequestCount,
    enterpriseRequestCount: (state) => state.enterpriseRequestCount,
    brokerRequestCount: (state) => state.brokerRequestCount,
  }),
  methods: {
    toggleSidebar() {
      // Logic để bật/tắt sidebar (nếu có)
    },
    toggleMenu(menu) {
      if (menu.name == "Logout") {
        this.logout();
      }
      const oldMenu = this.activeMenu;
      this.activeMenu = menu.name;
      // Reset activeSubMenu khi đóng menu
      if (this.activeMenu !== oldMenu) {
        this.activeSubMenu = {};
      }
      if (menu.page) {
        this.$router.push(menu.page).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      }
    },
    toggleSubMenu(menu, subMenu) {
      this.activeSubMenu = {};
      this.$set(this.activeSubMenu, menu, subMenu);
      // localStorage.setItem('activeSubMenu', JSON.stringify(this.activeSubMenu));

      this.$router.push(subMenu.page).catch((err) => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
    isSubMenuActive(menu, subMenu) {
      return this.activeSubMenu[menu] === subMenu;
    },
    subMenuHeight(menu) {
      const item = this.menuItems.find((i) => i.name === menu);
      return item && item.subMenu ? `${item.subMenu.length * 50}px` : "0px";
    },
    showName() {
      return this.admin.name
        ? this.admin.name.split(" ")[this.admin.name.split(" ").length - 1][0]
        : "";
    },
    logout() {
      AdminAuthApi.logout(() => {
        localStorage.setItem("adminToken", "");
        localStorage.removeItem("isAdmin");
        window.location.assign("/admin/dang-nhap");
      });
    },
    setActiveMenu() {
      const routePath = this.$route.path;
      let found = false;

      this.menuItems.forEach((menu) => {
        if (menu.page === routePath) {
          this.activeMenu = menu.name;
          found = true;
        }
        if (menu.subMenu) {
          menu.subMenu.forEach((subMenu) => {
            if (subMenu.page === routePath) {
              this.activeMenu = menu.name;
              this.activeSubMenu = { [menu.name]: subMenu };
              found = true;
            }
          });
        }
      });

      if (!found) {
        this.activeMenu = "Dashboard";
      }
    },
  },
  watch: {
    enterpriseRequestCount(val) {
      this.countUserRequest = this.brokerRequestCount + val
    },
    brokerRequestCount(val) {
      this.countUserRequest = this.enterpriseRequestCount + val
    },
    '$route'() {
        this.setActiveMenu();
    }
  },
  created() {
    this.setActiveMenu();
  },
  beforeRouteUpdate(to, from, next) {
    this.setActiveMenu();
    next();
  },
};
</script>

<style scoped>
.drop-down {
    position: fixed;
    right: 20px;
}

.user-infor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  height: auto !important;
}

.name-email {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

.avt {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
button {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.sidebar {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  display: flex;
  height: 100%;
  min-height: 600px;
  flex-direction: column;
  gap: 8px;
  width: 270px;
  padding: 10px 10px;
  border: 1px solid rgb(255 255 255 / 8%);
  background: rgb(0 0 0 / 40%);
  backdrop-filter: blur(20px);
  transition: width 0.4s;
  /* z-index: 999; */
}

.sidebar header {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 1.25rem 0 0;
  border-bottom: 1px solid rgb(255 255 255 / 8%);
}

.sidebar header button {
  width: 52px;
}

.sidebar button {
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;
  height: 50px;
  width: 100%;
  border-radius: 6px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  padding: 0 16px;
  color: rgb(255 255 255 / 95%);
}

.sidebar button p:nth-child(2) {
  flex: 1 1 auto;
}

.sidebar button:is(.active, :hover) {
  /* background: rgb(0 0 0 / 30%); */
  color: #ffd700; /* Màu sắc khác khi button active */
}

.sidebar button i {
  transition: 0.3s;
}

.sidebar button.active > i:nth-child(3) {
  rotate: -180deg;
}

.sidebar button:not(.active):hover {
  background: rgb(0 0 0 / 10%);
}

.sidebar ul {
  display: grid;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sub-menu {
  position: relative;
  overflow: hidden;
  height: 0;
  transition: 0.5s;
}

.sub-menu ul {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
}

.sub-menu button {
  padding-left: 52px;
}

.sub-menu button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 24px;
  translate: 0 -50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: rgb(255 255 255 / 35%);
}

.sub-menu button.active {
  background: rgb(0 0 0 / 50%);
  color: #ffd700; /* Màu sắc khác khi button active */
}

.sidebar .material-symbols-outlined {
  font-size: 16px;
}

.sidebar i {
  font-size: 20px;
  width: 20px;
  max-width: 20px;
  min-width: 20px;
}

.drop-down {
  position: fixed;
  right: 20px;
}

</style>