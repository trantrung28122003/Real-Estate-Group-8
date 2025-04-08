<template>
    <div class="container" style="margin-top: 50px;">
        <h4>Quản lý tài khoản</h4>
        <el-tabs v-model="activeName" >
        <el-tab-pane label="Chỉnh sửa thông tin cá nhân" name="profile">
          <profile-tab v-if="user.role == role.user"/>
          <broker-profile-tab v-if="user.role == role.broker" />
          <enterprise-profile-tab v-if="user.role == role.enterprise" />
        </el-tab-pane>
        <el-tab-pane label="Thay đổi mật khẩu" name="password">
          <password-tab/>
        </el-tab-pane>
        <el-tab-pane v-if="user.role == role.user && !user.registeredBroker" label="Đăng ký tài khoản doanh nghiệp" name="enterpriseRegister">
          <enterprise-register-tab/>
        </el-tab-pane>
        <el-tab-pane label="Xoá tài khoản" name="deleteAccount">
          <delete-account-tab />
        </el-tab-pane>
        <el-tab-pane v-if="user.role == role.user && !user.registeredEnterprise" label="Đăng ký tài khoản môi giới" name="brokerRegister">
          <broker-register-tab />
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import ProfileTab from '@/components/ManageInfor/ProfileTab.vue';
import PasswordTab from '@/components/ManageInfor/PasswordTab.vue';
import EnterpriseRegisterTab from '@/components/ManageInfor/EnterpriseRegisterTab.vue';
import DeleteAccountTab from '@/components/ManageInfor/DeleteAccountTab.vue';
import BrokerRegisterTab from '@/components/ManageInfor/BrokerRegisterTab.vue';
import role from '@/data/role'
import { mapState } from "vuex"
import BrokerProfileTab from '@/components/Broker/ManageProfile/BrokerProfileTab.vue';
import EnterpriseProfileTab from '@/components/Enterprise/MangeProfile/EnterpriseProfileTab.vue';
export default {
    
    components: {
        ProfileTab,
        PasswordTab,
        EnterpriseRegisterTab,
        DeleteAccountTab,
        BrokerRegisterTab,
        BrokerProfileTab,
        EnterpriseProfileTab,
    },
    computed: mapState({
        user: (state) => state.user, 
    }),
    data(){
        return {
          activeName: "profile",
          role: role,
        }
    },

    methods: {
        
    },
}
</script>

<style scoped>
</style>