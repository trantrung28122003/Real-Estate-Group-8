<template>
  <div class="container">
    <div class="login-form">
      <h2>Thay đổi mật khẩu</h2>
      <el-form ref="loginForm" :model="loginForm" @submit.native.prevent="login">
        <el-form-item >
          <label class="label" for="password">Mật khẩu mới:</label>
          <el-input
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mật khẩu mới"
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showPassword = !showPassword"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-input
            v-model="loginForm.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Nhập lại mật khẩu"
            class="password-input"
          >
            <el-button slot="append" icon="el-icon-view" @click="showConfirmPassword = !showConfirmPassword"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" native-type="submit">Xác nhận</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import AuthApi from "@/api/auth"
export default {
  data() {
    return {
      loginForm: {
        password: "",
        confirmPassword: "",
      },
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const userData = {
            new_password: this.loginForm.password,
            confirm_password: this.loginForm.confirmPassword,
            token: this.$route.params.token
          };
          AuthApi.resetPassword(
            userData,
            () => {
              Notification.success({
                title: "Thành công",
                message: "Thay đổi mật khẩu thành công",
              });
              this.$router.push('/dang-nhap');
            },
            (error) => {
              Notification.error({
                title: "Thất bại",
                message: error.data.error,
              });
              console.log(error)
            }
          )
        } else {
          return false;
        }
      });
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

h2 {
    display: flex;
    justify-content: center;
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