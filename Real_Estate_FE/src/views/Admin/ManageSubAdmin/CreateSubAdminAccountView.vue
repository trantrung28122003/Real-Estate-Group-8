<template>
  <div class="container">
    <div class="register-form">
      <h2 class="text-center" style="margin-bottom: 20px">Tạo tài khoản mới</h2>
      <el-form ref="registerForm" @submit.native.prevent="createAccount">
        <el-form-item>
          <label for="username">Họ và tên<span class="required-field"> *</span></label>
          <el-input
            id="username"
            v-model="username"
            placeholder="Họ và tên"
          ></el-input>
          <span v-if="submitted && !$v.username.required" class="p-error">Không để trống họ và tên!</span>
        </el-form-item>
        <el-form-item>
          <label for="email">Email<span class="required-field"> *</span></label>
          <el-input
            id="email"
            v-model="email"
            placeholder="Email"
          ></el-input>
          <span v-if="submitted && !$v.email.required" class="p-error">Không để trống email!</span>
          <span v-if="submitted && !$v.email.email" class="p-error">Email không hợp lệ!</span>
        </el-form-item>
        <el-form-item>
          <label for="password">Mật khẩu<span class="required-field"> *</span></label>
          <el-input
            id="password"
            v-model="password"
            placeholder="Mật khẩu"
            type="password"
          ></el-input>
          <span v-if="submitted && !$v.password.required" class="p-error">Không để trống mật khẩu!</span>
        </el-form-item>
        <el-form-item>
          <label for="confirmPassword">Xác nhận mật khẩu<span class="required-field"> *</span></label>
          <el-input
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            type="password"
          ></el-input>
          <span v-if="submitted && !$v.confirmPassword.required" class="p-error">Cần xác thực lại mật khẩu!</span>
          <span v-if="submitted && confirmPassword && !$v.confirmPassword.isEqPassword" class="p-error">Không trùng khớp với mật khẩu!</span>
        </el-form-item>
        <el-button class="register-btn" type="primary" native-type="submit" :loading="loading"
          >Tạo tài khoản</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import SubAdminApi from "@/api/admin/subAdmin"
import { Notification } from 'element-ui'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loading: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      submitted: false,
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required
    },
    confirmPassword: {
      required,
      isEqPassword(value) {
        return value === this.password
      }
    }
  },
  methods: {
    async createAccount() {
      this.submitted = true;
      if(this.$v.$invalid) {
        return false
      }
      this.loading = true
      var userData = {
        'name': this.username,
        'email': this.email,
        'password': this.password,
      };
      SubAdminApi.createAccount(
        userData,
        () => {
          this.loading = false
          Notification.success({
            title: "Thành công",
            message: "Tạo tài khoản mới thành công",
          });
          this.submitted = false
          this.username = ''
          this.password = ''
          this.email = ''
          this.confirmPassword = ''
        },
        (error) => {
          if(error?.response?.data?.code) {
            if(error.response.data.code === 403) {
              Notification.error({
                title: "Thất bại",
                message: error.response.data.error,
              });
            }
          } else {
            Notification.error({
              title: "Thất bại",
              message: error.response.data.error,
            });
          }
          this.loading = false
        }
      )
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 95vh;
}

.register-form {
  margin: 20px;
  background-color: #f1f1f1;
  padding: 50px;
  width: 40%;
  border-radius: 5px;
  min-width: 450px;
}

.label{
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}

.register-btn {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
}
</style>