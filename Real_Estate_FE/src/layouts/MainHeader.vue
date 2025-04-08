<template>
  <el-header class="header shadow-sm" style="height: 90px">
    <div style="display: flex; flex-direction: row; align-items: center;">
      <div style="height: 90px">
        <router-link to="/">
          <img height="90" src="/web_logo.jpg" alt="Logo"/>
        </router-link>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="hover"
        :router="true"
      >
        <el-submenu index="/nha-dat-ban">
          <template slot="title"> <span @click="gotoPage('sellPost')">Nhà đất bán</span></template>
          <el-menu-item index="/nha-dat-ban/can-ho-chung-cu">Bán căn hộ chung cư</el-menu-item>
          <el-menu-item index="/nha-dat-ban/nha-rieng">Bán nhà riêng</el-menu-item>
          <el-menu-item index="/nha-dat-ban/nha-biet-thu-lien-ke">Bán nhà biệt thự liền kề</el-menu-item>
          <el-menu-item index="/nha-dat-ban/nha-mat-pho">Bán nhà mặt phố</el-menu-item>
          <el-menu-item index="/nha-dat-ban/nha-pho-thuong-mai">Bán nhà phố thương mại</el-menu-item>
          <el-menu-item index="/nha-dat-ban/dat-nen-du-an">Bán đất nền dự án</el-menu-item>
          <el-menu-item index="/nha-dat-ban/dat">Bán đất</el-menu-item>
          <el-menu-item index="/nha-dat-ban/trang-trai-khu-nghi-duong">Bán trang trại, khu nghỉ dưỡng</el-menu-item>
          <el-menu-item index="/nha-dat-ban/condotel">Bán condotel</el-menu-item>
          <el-menu-item index="/nha-dat-ban/kho-nha-xuong">Bán kho, nhà xưởng</el-menu-item>
          <el-menu-item index="/nha-dat-ban/loai-bat-dong-san-khac">Bán loại bất động sản khác</el-menu-item>
        </el-submenu>
        <el-submenu index="/nha-dat-cho-thue">
          <template slot="title"><span @click="gotoPage('rentPost')">Cho thuê nhà đất</span></template>
          <el-menu-item index="/nha-dat-cho-thue/can-ho-chung-cu">Cho thuê căn hộ chung cư</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/nha-rieng">Cho thuê nhà riêng</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/nha-biet-thu-lien-ke">Cho thuê nhà biệt thự liền kề</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/nha-mat-pho">Cho thuê nhà mặt phố</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/nha-thuong-mai">Cho thuê nhà thương mại</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/nha-tro-phong-tro">Cho thuê nhà trọ, phòng trọ</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/van-phong">Cho thuê văn phòng</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/sang-nhuong-cua-hang-ki-ot">Cho thuê, sang nhượng, cửa hàng, ki ốt</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/kho-nha-xuong-dat" >Cho thuê kho, nhà xưởng, đất</el-menu-item>
          <el-menu-item index="/nha-dat-cho-thue/loai-bat-dong-san-khac">Cho thuê loại bất động sản khác</el-menu-item>
        </el-submenu>
        <el-submenu index="/du-an">
          <template slot="title"><span @click="gotoPage('project')">Dự án</span></template>
          <el-menu-item index="/du-an/can-ho-chung-cu">Căn hộ chung cư</el-menu-item>
          <el-menu-item index="/du-an/cao-oc-van-phong">Cao ốc văn phòng</el-menu-item>
          <el-menu-item index="/du-an/trung-tam-thuong-mai">Trung tâm thương mại</el-menu-item>
          <el-menu-item index="/du-an/khu-do-thi-moi">Khu đô thị mới</el-menu-item>
          <el-menu-item index="/du-an/khu-phuc-hop">Khu phức hợp</el-menu-item>
          <el-menu-item index="/du-an/nha-o-xa-hoi">Nhà ở xã hội</el-menu-item>
          <el-menu-item index="/du-an/khu-nghi-duong-sinh-thai">Khu nghỉ dưỡng, Sinh thái</el-menu-item>
          <el-menu-item index="/du-an/khu-cong-nghiep">Khu công nghiệp</el-menu-item>
          <el-menu-item index="/du-an/biet-thu-lien-ke">Biệt thự, liền kề</el-menu-item>
          <el-menu-item index="/du-an/shophouse">Shophouse</el-menu-item>
          <el-menu-item index="/du-an/nha-mat-pho">Nhà mặt phố</el-menu-item>
          <el-menu-item index="/du-an/du-an-khac">Dự án khác</el-menu-item>
        </el-submenu>
        <el-menu-item index="/tin-tuc" >Tin Tức</el-menu-item>
        <el-menu-item v-if="user.role == role.broker" index="/danh-sach-yeu-cau-tu-van" >Yêu cầu tư vấn</el-menu-item>
        <el-submenu index="/danh-ba">
          <template slot="title">Danh bạ</template>
          <el-menu-item index="/doanh-nghiep">Doanh nghiệp</el-menu-item>
          <el-menu-item index="/nha-moi-gioi">Nhà môi giới</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="auth">
      <template v-if="user && user.id">
        <div>
          <el-badge :value="bookmarkCount ? bookmarkCount : null" :max="99" class="item">
            <router-link style="color: black;" to="/quan-ly-tin-luu"><i class="far fa-heart"></i></router-link>
          </el-badge>
          <el-popover
            ref="notificationPopover"
            placement="bottom"
            width="500"
            height="100"
            trigger="click"
            v-model="openNotificationPopup"
            @show="handlePopoverShow"
          >
            <NotificationPopup ref="notificationPopup" @close="openNotificationPopup = false" />
            <el-badge slot="reference" :value="notificationCount ? notificationCount : null" :max="99" class="item" style="cursor: pointer;">
              <i class="far fa-bell"></i>
            </el-badge>
          </el-popover>
          <el-dropdown class="dropdown" trigger="hover">
            <router-link :to=" user.role == role.enterprise ? '/quan-ly-du-an' : '/quan-ly-tin-dang'" class="dropdown-trigger username-avt">
              <div style="margin-right: 10px;">
                <el-image
                  class="avt"
                  :src="user.avatar"
                  alt="Avatar"
                  v-if="user.avatar"
                ></el-image>
                <div v-else class="avatar-placeholder">
                  <span class="avatar-letter">{{ showName() }}</span>
                </div>
              </div>
              <div>
                <span class="name">{{ user.name }}</span>
              </div>
            </router-link>
            <el-dropdown-menu>
              <router-link v-if="user.role == role.user || user.role == role.broker" to="/quan-ly-tin-dang">
                <el-dropdown-item>
                  Quản lý tin đăng
                </el-dropdown-item>
              </router-link>
              <router-link v-if="user.role == role.enterprise" to="/quan-ly-du-an">
                <el-dropdown-item>
                  Quản lý dự án
                </el-dropdown-item>
              </router-link>
              <router-link v-if="user.role == role.broker" to="/danh-sach-yeu-cau-dang-ky">
                <el-dropdown-item>
                  Danh sách yêu cầu đã đăng ký
                </el-dropdown-item>
              </router-link>
              <router-link v-if="user.role == role.user" to="/quan-ly-yeu-cau">
                <el-dropdown-item>
                  Quản lý yêu cầu tư vấn
                </el-dropdown-item>
              </router-link>
              <router-link to="/quan-ly-tai-khoan">
                <el-dropdown-item>
                  Thay đổi thông tin cá nhân
                </el-dropdown-item>
              </router-link>
              <span @click="logout()">
                <el-dropdown-item>
                  Đăng xuất
                </el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link v-if="user.role == role.user || user.role == role.broker" to="/dang-tin">
            <el-button type="primary"> Đăng tin </el-button>
          </router-link>
          <router-link v-if="user.role == role.user" to="/tim-kiem-tu-van">
            <el-button type="primary"> Tìm tư vấn </el-button>
          </router-link>
          <router-link v-if="user.role == role.enterprise" to="/dang-du-an-moi">
            <el-button type="primary"> Đăng dự án </el-button>
          </router-link>
        </div>
      </template>
      <template v-else>
        <div class="item d-flex align-items-center text-muted">
          <router-link to="/dang-nhap">
            <el-button class="btn" type="primary"> Đăng nhập </el-button>
          </router-link>
          <router-link to="/dang-ky">
            <el-button class="btn" type="primary"> Đăng ký </el-button>
          </router-link>
        </div>
      </template>
    </div>
  </el-header>
</template>

<script>
import AuthApi from "@/api/auth"
import { mapState } from 'vuex';
import role from '@/data/role'
import NotificationPopup from '@/components/ManageNotification/NotificationPopup.vue';
export default {
  data() {
    return {
      activeMenu: this.$route.fullPath,
      role: role,
      openNotificationPopup: false,
    };
  },
  computed: mapState({
    user: (state) => state.user, 
    bookmarkCount: (state) => state.bookmarkCount,
    notificationCount: (state) => state.notificationCount,
  }),
  mounted() {
    this.checkGuest()
  },
  components: {
    NotificationPopup,
  },
  methods: {
    showName() {
      return this.user.name ? this.user.name.split(" ")[this.user.name.split(" ").length - 1][0] : ""
    },
    handleChangPagehange(path) {
      this.$router.push(path)
      window.location.href = this.$router.resolve(path).href
    },
    handlePopoverShow() {
      // Call the method in NotificationPopup component to fetch notifications
      this.$refs.notificationPopup.fetchNotifications();
    },
    logout() {
      AuthApi.logout(
        () => {
          localStorage.setItem('token', '')
          window.location.assign('/')
        }
      )
    },
    checkGuest() {
      var guest_id = localStorage.getItem('guest_id')
      if(!guest_id) {
        guest_id = Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 8)
        localStorage.setItem('guest_id', guest_id)
      }
    }
  },
  watch: {
    '$route'(val) {
      this.activeMenu = val.fullPath
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f8;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.el-menu-demo {
  background-color: #f7f7f8;
  border-bottom: none !important;
}

router-link {
  color: black;
}

.logo img {
  width: auto;
  height: 100%;
  margin-bottom: 10px;
}

.bell-icon {
  position: relative;
  height: 30px;
  width: 30px;
}

.notification-count {
  position: absolute;
  top: -7px;
  right: 9px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation ul {
  display: flex;
  align-items: center;
  list-style: none;
}

.navigation li {
  margin-right: 20px;
  vertical-align: middle;
}

.navigation a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.switch {
  text-decoration: none;
  color: black;
}

.navigation a:hover {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}

.item {
  margin-right: 1em;
}

.auth {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.auth > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  margin-right: 20px;
  height: 20px;
  width: 20px;
}

.username-avt {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn {
  font-weight: bold;
  vertical-align: middle;
  width: 120px;
}

.avt {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.name {
  justify-content: center;
  font-weight: 700;
}

.dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
}

a {
  text-decoration: none;
}

.dropdown .el-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.dropdown:hover .el-dropdown-menu {
  display: block;
}

.dropdown .dropdown-trigger {
  color: #333;
  white-space: nowrap;
}

.dropdown .el-dropdown-menu a {
  display: block;
  padding: 5px;
  color: #333;
  text-decoration: none;
}

.dropdown .el-dropdown-menu a:hover {
  background-color: #f0f0f0;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
</style>