<template>
  <div class="container">
    <div class="login-form">
      <h2>Quên mật khẩu</h2>
      <el-form ref="loginForm" :model="loginForm" @submit.native.prevent="login">
        <el-form-item >
          <el-input
            v-model="loginForm.email"
            placeholder="Nhập email đã đăng ký tài khoản"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" native-type="submit">Tiếp tục</el-button>
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
        email: "",
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const userData = {
            email: this.loginForm.email,
          };

          AuthApi.forgotPassword(
            userData,
            () => {
            Notification.success({
                title: "Thành công",
                message: "Bạn hãy kiểm tra email để có thể thay đổi mật khẩu",
              });
              this.$router.push('/');
            },
            (error) => {
              Notification.error({
                title: "Thất bại",
                message: error.data.error,
              });
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
    margin-bottom: 30px;
}

.login-btn {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #007bff;
  font-size: 16px;
  font-weight: bold;
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