<template>
    <div>
        <h4>Quản lý tài khoản</h4>
        <el-tabs v-model="activeName" >
        <el-tab-pane label="Chỉnh sửa thông tin cá nhân" name="profile">
          <profile-tab/>
        </el-tab-pane>
        <el-tab-pane label="Thay đổi mật khẩu" name="password">
          <password-tab/>
        </el-tab-pane>
        <!-- <el-tab-pane label="Xoá tài khoản" name="deleteAccount">
          <delete-account-tab />
        </el-tab-pane> -->
      </el-tabs>
    </div>
</template>

<script>
import ProfileTab from '@/components/Admin/ManageInfor/ProfileTab.vue';
import PasswordTab from '@/components/Admin/ManageInfor/PasswordTab.vue';
// import DeleteAccountTab from '@/components/ManageInfor/DeleteAccountTab.vue';
export default {
    
    components: {
        ProfileTab,
        PasswordTab,
        // DeleteAccountTab,
    },
    data(){
        return {
          activeName: "profile",
        }
    },
}
</script>

<style scoped>
</style>