<template>
  <div class="manage-nav">
    <div class="user-infor">
        <img v-if="admin.avatar" :src="admin.avatar" alt="avatar" class="user-avatar">
        <div v-else class="avatar-placeholder">
            <span class="avatar-letter">{{ showName() }}</span>
        </div>
        <div class="name-email">
            <h6>{{ admin.name }}</h6>
            {{ admin.email }}
        </div>
    </div>
    <el-menu class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/admin">
            <i class="el-icon fa fa-chart-line"></i>
            <span slot="title">Dashboard</span>
        </el-menu-item>
        <el-submenu index="quan-ly-tin-dang">
            <template slot="title">
                <i class="el-icon fa fa-bars"></i>
                <span slot="title">Quản lý tin đăng</span>
            </template>
            <el-menu-item index="/admin/danh-sach-tin-cho-duyet">Tin chờ duyệt</el-menu-item>
            <el-menu-item index="/admin/danh-sach-tin-dang">Danh sách tin</el-menu-item>
        </el-submenu>
        <el-submenu index="quan-ly-tin-tuc">
            <template slot="title">
                <i class="el-icon fa fa-bars"></i>
                <span slot="title">Quản lý tin tức</span>
            </template>
            <el-menu-item index="/admin/quan-ly-tin-tuc">Danh sách tin tức</el-menu-item>
            <el-menu-item index="/admin/dang-tin-tuc">Đăng tin tức mới</el-menu-item>
        </el-submenu>
        <el-menu-item index="quan-ly-tin-luu">
            <i class="el-icon fas fa-bell"></i>
            <span slot="title">Quản lý dự án</span>
        </el-menu-item>
        <el-menu-item index="/admin/quan-ly-tai-khoan">
            <i class="el-icon fa fa-gear"></i>
            <span slot="title">Quản lý tài khoản</span>
        </el-menu-item>
        <el-submenu index="quan-ly-nguoi-dung">
            <template slot="title">
                <i class="el-icon fa fa-bars"></i>
                <span slot="title">Quản lý người dùng</span>
            </template>
            <el-menu-item index="/admin/quan-ly-nguoi-dung">Quản lý người dùng</el-menu-item>
            <el-menu-item index="/admin/quan-ly-doanh-nghiep">Quản lý doanh nghiệp</el-menu-item>
            <el-menu-item index="/admin/quan-ly-nha-moi-gioi">Quản lý nhà môi giới</el-menu-item>
        </el-submenu>
        <el-submenu index="quan-ly-nhan-su">
            <template slot="title">
                <i class="el-icon fa fa-bars"></i>
                <span slot="title">Quản lý nhân sự</span>
            </template>
            <el-menu-item index="/admin/quan-ly-nhan-su">Quản lý nhân sự</el-menu-item>
            <el-menu-item index="/admin/quan-ly-nhan-su/tao-tai-khoan-moi">Thêm tài khoản mới</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" @click="logout()">
            <i class="el-icon fa fa-sign-out"></i>
            <span slot="title">Đăng xuất</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex"
import AdminAuthApi from "@/api/admin/adminAuth"
export default {
    data() {
        return {};
    },
    computed: mapState({
        admin: (state) => state.admin, 
    }),
    methods: {
        showName() {
            return this.admin.name ? this.admin.name.split(" ")[this.admin.name.split(" ").length - 1][0] : ""
        },
        logout() {
            AdminAuthApi.logout(
                () => {
                    localStorage.setItem('adminToken', '')
                    localStorage.removeItem('isAdmin')
                    window.location.assign('/admin/dang-nhap')
                }
            )
        }
    },
}
</script>

<style scoped>
.manage-nav{
    display: flex;
    flex-direction: column;
    padding: 15px 0px 20px 0px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    height: 100%;
}

.user-infor{
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    padding-right: 15px;
    padding-left: 15px;
}

.name-email{
    margin-left: 10px;
}

.user-avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.menu-item{
    height: 40px;
    width: 100%;
    padding: 10px;
}

.link-to{
    color: black;
    text-decoration: none;
}

.menu-item :hover {
    background-color: #ccc;
}

.el-icon{
    margin-right: 10px;
}

.avatar-placeholder {
  width: 50px;
  height: 50px;
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