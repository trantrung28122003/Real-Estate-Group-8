<template>
  <div class="sidebar">
    <header class="user-infor">
      <el-image
        class="avt"
        :src="user.avatar"
        fit="cover"
        alt="Avatar"
        v-if="user.avatar"
      ></el-image>
      <el-avatar
        v-else
        shape="circle"
        :size="60"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      ></el-avatar>
      <div class="name-email">
        <h6>{{ user.name }}</h6>
        {{ user.email }}
      </div>
    </header>
    <ul>
      <li v-for="item in menuItems" :key="item.name">
        <button
          v-if="item.role.includes(user.role)"
          type="button"
          @click="toggleMenu(item)"
          :class="{ active: activeMenu === item.name }"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>

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
              </button>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <button type="button" @click="logout()">
          <i class="el-icon fa fa-sign-out"></i>
          <span>Đăng xuất</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthApi from "@/api/auth";
import role from "@/data/role";

export default {
  data() {
    return {
      activeMenu: null,
      activeSubMenu: {},
      role: role,
      menuItems: [
        {
          name: "ManagePost",
          icon: "fa-regular fa-file-lines",
          label: "Quản lý tin đăng",
          role: [role.broker, role.user],
          subMenu: [
            { name: "NewPost", label: "Thêm bài đăng mới", page: "/dang-tin" },
            {
              name: "PostList",
              label: "Danh sách bài đăng",
              page: "/quan-ly-tin-dang",
            },
          ],
        },
        {
          name: "ManageProject",
          icon: "fa-solid fa-building",
          label: "Quản lý dự án",
          role: [role.enterprise],
          subMenu: [
            {
              name: "NewProject",
              label: "Đăng dự án mới",
              page: "/dang-du-an-moi",
            },
            {
              name: "ProjectList",
              label: "Danh sách dự án",
              page: "/quan-ly-du-an",
            },
          ],
        },
        {
          name: "ManageRequest",
          icon: "ai-newspaper",
          label: "Quản lý yêu cầu",
          role: [role.user],
          subMenu: [
            {
              name: "RequestConsult",
              label: "Tìm kiếm tư vấn",
              page: "/tim-kiem-tu-van",
            },
            {
              name: "RequestList",
              label: "Danh sách yêu cầu",
              page: "/quan-ly-yeu-cau",
            },
          ],
        },
        {
          name: "RegisteredRequestList",
          icon: "ai-newspaper",
          label: "Danh sách yêu cầu đã đăng ký",
          role: [role.broker],
          page: "/danh-sach-yeu-cau-dang-ky",
        },
        {
          name: "ReviewList",
          icon: "fa-solid fa-star",
          label: "Danh sách đánh giá từ người dùng",
          role: [role.broker],
          page: "/danh-sach-danh-gia-tu-nguoi-dung",
        },
        {
          name: "SavedPosts",
          icon: "fas fa-heart",
          label: "Tin lưu",
          role: [role.broker, role.user],
          page: "/quan-ly-tin-luu",
        },
        {
          name: "Notifications",
          icon: "fas fa-bell",
          label: "Thông báo",
          role: [role.broker, role.user, role.enterprise],
          page: "/quan-ly-thong-bao",
        },
        {
          name: "Account",
          icon: "fa fa-gear",
          label: "Quản lý tài khoản",
          role: [role.broker, role.user, role.enterprise],
          page: "/quan-ly-tai-khoan",
        },
      ],
    };
  },
  computed: mapState({
    user: (state) => state.user,
  }),
  methods: {
    toggleMenu(menu) {
      const oldMenu = this.activeMenu;
      this.activeMenu = menu.name;
      localStorage.setItem("activeMenu", this.activeMenu);

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
      localStorage.setItem("activeSubMenu", JSON.stringify(this.activeSubMenu));

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
      return this.user.name
        ? this.user.name.split(" ")[this.user.name.split(" ").length - 1][0]
        : "";
    },
    logout() {
      AuthApi.logout(() => {
        localStorage.setItem("token", "");
        window.location.assign("/");
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
        if(this.user.role == this.role.enterprise) {
          this.activeMenu = "ManageProject"
        } else {
          this.activeMenu = "ManagePost"
        }
      }
    },
  },
  created() {
    this.setActiveMenu();
  },
  beforeRouteUpdate(to, from, next) {
    this.setActiveMenu();
    next();
  },
  watch: {
    '$route'() {
        this.setActiveMenu();
    }
  }
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
  padding: 100px 10px 10px 10px;
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