<template>
  <div >
    <h5>Đổi mật khẩu</h5>
    <div class="password-change-tab">
      <el-form ref="changPassword" :model="changPassword" @submit.native.prevent="updatePassword">
        
          <label class="label" for="password">Mật khẩu hiện tại:</label>
          <el-input
            v-model="changPassword.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mật khẩu"
            required
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showPassword = !showPassword"></el-button>
          </el-input>
          <div>
            <el-button type="text" style="color:red;" @click="dialogVisible = true">Quên mật khẩu?</el-button>

            <el-dialog
              title="Khôi phục mật khẩu"
              :visible.sync="dialogVisible"
              width="25%"
              @close="dialogVisible = false">
              <el-button style="width: 80%" @click="handleSendMail()">Gửi mã xác minh qua email </el-button>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" type="danger">Huỷ bỏ</el-button>
              </span>
            </el-dialog>
          </div>
      
          <label class="label" for="password">Mật khẩu mới:</label>
          <el-input
            v-model="changPassword.newPassword"
            :type="showNewPassword ? 'text' : 'password'"
            placeholder="Mật khẩu mới"
            required
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showNewPassword = !showNewPassword"></el-button>
          </el-input>
        
          <label class="label" for="password">Nhập lại mật khẩu mới:</label>
          <el-input
            v-model="changPassword.againPassword"
            :type="showAgainPassword ? 'text' : 'password'"
            placeholder="Nhập lại mật khẩu mới"
            required
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showAgainPassword = !showAgainPassword"></el-button>
          </el-input>
          
          <div class="action-btn">
           <el-button :disabled="!(changPassword.password && changPassword.newPassword && changPassword.againPassword)" type="primary" native-type="submit">Lưu thay đổi</el-button>
          </div>          
    </el-form>
    </div>
    
  </div>
</template>

<script>
import AdminAuthApi from "@/api/admin/adminAuth"
import { Notification } from "element-ui";
import { mapState } from 'vuex';

export default {
  data() {
    return {
    dialogVisible: false,
      changPassword: {
        password: null,
        newPassword: null,
        againPassword: null,
      },
      showPassword: false,
      showNewPassword:false,
      showAgainPassword:false,
      rememberAccount: false,
    };
  },
  computed: mapState({
    admin: (state) => state.admin, 
  }),
  methods: {
    handleSendMail() {
      AdminAuthApi.forgotPassword(
        {
          email: this.admin.email,
        },
        () => {
          Notification.success({
            title: "Thành công",
            message: "Bạn hãy kiểm tra email để có thể thay đổi mật khẩu",
          });
          this.dialogVisible = false
        },
      )
    },
    
    updatePassword() {
      AdminAuthApi.updatePassword(
        {
          password: this.changPassword.password,
          new_password: this.changPassword.newPassword,
        },
        (response) => {
          const token = response.data.data
          localStorage.setItem('adminToken', token)
          Notification.success({
            title: "Thành công",
            message: "Thay đổi mật khẩu thành công",
          })
          this.changPassword.password = ""
          this.changPassword.newPassword = ""
          this.changPassword.againPassword = ""
        },
        (error) => {
          Notification.error({
            title: "Thất bại",
            message: error.data.error,
          });
        }
      )
    },
  },
}
</script>

<style>
.password-change-tab{
  width: 40%;
  margin-left: 20%;
}

.help-text{
  margin-top: 20px;
  color: gray;
  font-size: 14px;
}

a{
  text-decoration: none;
}

.action-btn{
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
}

.el-dialog {
  border-radius: 10px;
  min-width: 300px;
}

.el-dialog__body {
  display: flex;
  justify-content: center;
}

.label{
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 600;
}
</style>