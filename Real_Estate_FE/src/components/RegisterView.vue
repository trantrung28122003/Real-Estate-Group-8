<template>
  <div class="container">
    <div class="register-form">
      <h2 class="text-center" style="margin-bottom: 20px">Đăng ký tài khoản</h2>
      <el-form ref="registerForm" @submit.native.prevent="register">
        <el-form-item label="Avatar">
          <br>
            <div class="custom-file-input">
                <label for="fileInput" class="upload-icon" v-if="!hasUploadedAvatar">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput" @change="handleFileChange" accept="image/*" ref="fileInput" style="display: none"/>
                </label>
                <label for="fileInput" class="upload-icon" v-if="hasUploadedAvatar" :style="{ 'background-image': `url('${avatar}')` }">
                    <input type="file" id="fileInput" @change="handleFileChange" accept="image/*" ref="fileInput" style="display: none"/>
                </label>
            </div>
        </el-form-item>
        
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
            type="email"
          ></el-input>
          <span v-if="submitted && !$v.email.required" class="p-error">Không để trống email!</span>
          <span v-if="submitted && !$v.email.email" class="p-error">Email không hợp lệ!</span>
        </el-form-item>
        <el-form-item>
          <label for="phone">Số điện thoại<span class="required-field"> *</span></label>
          <el-input
            id="phone"
            v-model="phone"
            placeholder="Số điện thoại chính"
          ></el-input>
          <span v-if="submitted && !$v.phone.required" class="p-error">Không để trống số điện thoại!</span>
          <span v-if="submitted && !$v.phone.isPhoneNumber" class="p-error">Số điện thoại không hợp lệ!</span>
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
          >Đăng ký</el-button
        >
        <div style="text-align: center; margin-top: 20px">
          <span>Đã có tài khoản? </span>
          <a href="/dang-nhap" style="text-decoration: none">Đăng nhập</a> tại đây
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase.js"
import AuthApi from "@/api/auth"
import { Notification } from 'element-ui'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      loading: false,
      hasUploadedAvatar: false,
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      imageUrl: "",
      avatar: null,
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
    phone: {
      required,
      isPhoneNumber(value) {
        return this.isPhoneNumber(value)
      }
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
    async register() {
      this.submitted = true;
      if(this.$v.$invalid) {
        return false
      }
      this.loading = true
      var userData = {
        'username': this.username,
        'email': this.email,
        'phone': this.phone,
        'password': this.password,
        'avatar': this.avatar,
      };
      AuthApi.regiter(
        userData,
        () => {
          this.loading = false
          Notification.success({
            title: "Thành công",
            message: "Đăng ký tài khoản thành công! Xác thực email để tiếp tục!",
          });
          this.$router.push('/dang-nhap');
        },
        (error) => {
          this.loading = false
          Notification.error({
            title: "Thất bại",
            message: error.data.error,
          });
        }
      )
    },

    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatar = URL.createObjectURL(file)
        this.hasUploadedAvatar = true; // Đánh dấu rằng đã có ảnh
        const newImageName = this.generateUniqueName(file.name) // Tạo tên mới cho ảnh
        const storageRef = ref(storage, `avatars/` + newImageName); // Sử dụng tên mới
        await uploadBytes(storageRef, file);
        this.avatar = await getDownloadURL(storageRef);
      }
      this.$refs.fileInput.value = '';
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

.avatar{
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.avt-icon{
  color:gray;
  font-size:30px;
  margin-top: 20px;
}

.avt-text{
  color: gray;
  font-size: 14px;
}

.label{
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}

.custom-file-input {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.register-btn {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #007bff;
  font-size: 16px;
  font-weight: bold;
}
</style>