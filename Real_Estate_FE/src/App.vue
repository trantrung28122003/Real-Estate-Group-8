<template>
  <div>
    <el-container direction="horizontal" style="height: 100%;" v-if="$route.meta.hideHeader">
        <el-aside v-if="!$route.meta.hiveAdminNavbar">
          <side-bar/>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
    </el-container>
    <el-container v-else style="height: 100%; width: 100%;">
      <el-header>
        <MainHeader />
      </el-header>
      <el-container direction="horizontal">
        <el-aside v-if="$route.meta.showNavbar">
          <manage-nav/>
        </el-aside>
        <el-main class="content">
          <router-view />
          <widget-review />
        </el-main>
      </el-container>
    </el-container>
        <main-footer v-if="!$route.meta.hideHeader && !$route.meta.showNavbar" />
    <!-- Các nội dung khác trong trang -->
  </div>
</template>

<script>
import MainHeader from './layouts/MainHeader.vue';
import MainFooter from './layouts/MainFooter.vue';
import { mapActions, mapState } from 'vuex';
import { Notification } from "element-ui";
import AuthApi from "@/api/auth"
import AdminAuthApi from '@/api/admin/adminAuth'
import WidgetReview from './components/WidgetReview.vue';
import SideBar from "@/layouts/Admin/SideBar.vue"
import ManageNav from './layouts/ManageNav.vue';

export default {
  data() {
    return {
      subscriptionData: null,
      userInfor: {

      },
      adminInfor: {

      },
      numberNotifications: 0,
    }
  },
  computed: mapState({
    user: (state) => state.user,
    bookmarkCount: (state) => state.bookmarkCount,
    notificationCount: (state) => state.notificationCount,
  }),
  components: {
    MainHeader,
    MainFooter,
    WidgetReview,
    SideBar,
    ManageNav,
  },

  mounted() {
  this.setUserInfor()
  this.$pusher.subscribe('notification')
    .bind('notice', data => {
      if(this.user.id === data['user_id']) {
        Notification.info({
          title: "Thông báo",
          message: data['message'],
          duration: 10000,
          offset: 90,
        })
        this.numberNotifications = this.notificationCount ? this.notificationCount : 0
        this.numberNotifications += 1
        this.commitSetNotificationCount(this.numberNotifications)
      }
    })
  },
  methods: {
    ...mapActions(['commitSetUserInfo', 'commitSetBookmarkCount', 'commitSetAdminInfo', 'commitSetNotificationCount']),
    setUserInfor() {
      if(window.location.href.includes('/dang-nhap') || window.location.href.includes('/dang-ky')) {
        return 1;
      } else {
        if(window.location.href.includes('/admin')) {
          AdminAuthApi.profile(
            (response) => {
              this.adminInfor = response.data
              this.commitSetAdminInfo(this.adminInfor)
            },
            () => {
              localStorage.removeItem('isAdmin')
              window.location.assign('/admin/dang-nhap')
            }
          )
        } else {
          AuthApi.profile(
            (response) => {
              this.userInfor = response.data.data
              this.commitSetUserInfo(this.userInfor)
              this.commitSetBookmarkCount(this.userInfor.bookmark)
              this.commitSetNotificationCount(this.userInfor.notification)
            },
          )
        }
      }
    },

    setBookmark(data) {
      this.commitSetBookmarkCount(data)
    },
  }

};
</script>

<style scoped>
  .admin-nav{
    width: 300px;
  }
</style>