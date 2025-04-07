<template>
  <div class="container">
    <div class="login-form">
      <h2 style="margin-left: 32%">Đăng nhập</h2>
      <el-form ref="loginForm" :model="loginForm" @submit.native.prevent="login">
        <el-form-item >
          <label for="username">Tài khoản<span class="required-field"> *</span></label>
          <el-input
            v-model="$v.loginForm.username.$model"
            placeholder="SĐT chính hoặc email"
          ></el-input>
          <span v-if="submitted && !$v.loginForm.username.required" class="p-error">Không để trống tài khoản!</span>
          <span v-if="submitted && !$v.loginForm.username.email" class="p-error">Tài khoản phải là email!</span>
        </el-form-item>
        <el-form-item >
          <label for="password">Mật khẩu<span class="required-field"> *</span></label>
          <el-input
            v-model="$v.loginForm.password.$model"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mật khẩu"
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showPassword = !showPassword"></el-button>
          </el-input>
          <span v-if="submitted && !$v.loginForm.password.required" class="p-error">Không để trống mật khẩu!</span>
        </el-form-item>
        <el-form-item>
          <router-link to="/quen-mat-khau">Quên mật khẩu?</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="loading" native-type="submit">Đăng nhập</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui"
import AdminAuthApi from "@/api/admin/adminAuth"
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: "",
        password: "",
      },
      showPassword: false,
      rememberAccount: false,
      submitted: false,
    };
  },
  validations: {
    loginForm: {
      username: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    login() {
      this.submitted = true
      if(this.$v.$invalid) {
        return false
      }
      this.loading = true
      const userData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };
      AdminAuthApi.login(
        userData,
        (response) => {
          const token = response.access_token
          localStorage.setItem('adminToken', token)
          localStorage.setItem('isAdmin', 1)
          Notification.success({
            title: "Thành công",
            message: "Đăng nhập thành công",
          })
          this.loading = false
          this.submitted = false
          window.location.href = "/admin"
        },
        (error) => {
          Notification.error({
            title: "Thất bại",
            message: error.data.error,
          })
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
  /* background-color: #f1f1f1; */
}

.login-form {
  margin: 20px;
  background-color: #f1f1f1;
  padding: 50px;
  width: 40%;
  border-radius: 5px;
  min-width: 450px;
}

.login-btn {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #007bff;
  font-size: 16px;
  font-weight: bold;
}

.password-input {
  position: relative;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.el-form-item__content {
  width: 90%;
  margin-bottom: 10px;
}

.el-button {
  border: none;
}

.el-form-item {
  display: flex;
  flex-direction: column;
}

.el-checkbox {
  margin-right: 10px;
}

</style>