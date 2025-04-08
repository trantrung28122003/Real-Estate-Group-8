<template>
  <div>
    <h5>Xoá tài khoản</h5>
    <div class="account-tab">
      <el-form
        ref="changPassword"
        :model="changPassword"
        @submit.native.prevent="showConfirmationDialog"
      >
        <label class="label" for="password">Mật khẩu hiện tại:</label>
        <el-input
          v-model="changPassword.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Mật khẩu"
          required
          class="password-input"
        >
          <el-button
            slot="append"
            icon="el-icon-view"
            @click="showPassword = !showPassword"
          ></el-button>
        </el-input>

        <div class="help-text">Lưu ý:</div>
        <ul class="help-text">
          <li>Quý khách sẽ không thể đăng nhập lại vào tài khoản này sau khi khóa.</li>
          <li>Các tin đăng đang hiển thị của quý khách sẽ tiếp tục được hiển thị tới hết thời gian đăng tin.</li>
          <li>Số điện thoại chính đăng ký tài khoản này và các số điện thoại đăng tin của quý khách sẽ không thể được sử dụng lại để đăng ký tài khoản mới.</li>
        </ul>
        <div class="action-btn">
          <el-button type="danger" native-type="submit"
            >Xoá tài khoản</el-button
          >
        </div>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Xác thực xoá tài khoản"
      width="25%"
      @close="dialogVisible = false"
    >
      <span>Bạn có chắc chắn muốn xoá tài khoản không?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
        <el-button type="danger" @click="deleteAccount">Đồng ý</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import AuthApi from "@/api/auth"
export default {
  data() {
    return {
      dialogVisible: false,
      changPassword: {
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    showConfirmationDialog() {
      this.dialogVisible = true
    },
    deleteAccount() {
      AuthApi.deleteAccount(
        {
          password: this.changPassword.password,
        },
        () => {
          Notification.success({
            title: "Thành công",
            message: "Khoá tài khoản thành công",
          });
          localStorage.setItem('token', '')
          window.location.href = "/"
        },
        (error) => {
          Notification.error({
            title: "Thất bại",
            message: error.data.error,
          });
        }
      )
      this.dialogVisible = false
    },
  },
};
</script>

<style scoped>
.account-tab {
  width: 40%;
  margin-left: 20%;
}

.help-text {
  margin-top: 20px;
  color: gray;
  font-size: 14px;
}

a {
  text-decoration: none;
}

.action-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
}
.el-dialog {
  border-radius: 10px;
  min-width: 300px;
}

.el-dialog__body {
  border-top: 1px solid rgb(225, 216, 216);
}

</style>