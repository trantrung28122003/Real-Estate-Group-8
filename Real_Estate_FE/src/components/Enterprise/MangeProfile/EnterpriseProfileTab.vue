<template>
  <div>
    <h5>Thông tin người đại diện cho tài khoản</h5>
    <div class="profile">
      <div class="avatar">
        <div class="custom-file-input">
          <label
            for="fileInput6"
            class="upload-icon"
            v-if="!hasUploadedAvatar && !user.avatar"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text avt-text">Tải ảnh</div>
            <input
              type="file"
              id="fileInput6"
              @change="handleFileChange"
              accept="image/*"
              ref="fileInput6"
              style="display: none"
            />
          </label>
          <label
            for="fileInput6"
            class="upload-icon"
            v-if="hasUploadedAvatar"
            :style="{ 'background-image': `url('${avatar}')` }"
          >
            <input
              type="file"
              id="fileInput6"
              @change="handleFileChange"
              accept="image/*"
              ref="fileInput6"
              style="display: none"
            />
          </label>
          <label
            for="fileInput6"
            class="upload-icon"
            v-if="user.avatar && !hasUploadedAvatar"
            :style="{ 'background-image': `url('${user.avatar}')` }"
          >
            <input
              type="file"
              id="fileInput6"
              @change="handleFileChange"
              accept="image/*"
              ref="fileInput6"
              style="display: none"
            />
          </label>
          <span
            class="el-icon-close delete-avatar-icon"
            v-if="hasUploadedAvatar || user.avatar"
            @click="deleteAvatar"
          ></span>
        </div>
        <span>{{ user.name }}</span>
      </div>
      <div class="infor">
        <label class="label" for="username">Họ và tên</label>
        <el-input placeholder="Họ và tên" v-model="user.name"></el-input>

        <el-row :gutter="20">
          <el-col :span="12">
            <label class="label" for="username">Số điện thoại chính</label>
            <el-input
              placeholder="SĐT chính"
              v-model="user.phone"
              disabled
            ></el-input>
          </el-col>
          <el-col :span="12">
            <label class="label">Email</label>
            <el-input
              placeholder="Email"
              v-model="user.email"
              disabled
            ></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <h5 style="margin-top: 30px">Thông tin doanh nghiệp</h5>
    <div class="profile">
      <div class="avatar">
        <div class="custom-file-input">
          <div class="custom-file-input">
            <el-image
              style="width: 100px; height: 100px"
              :src="user.enterprise_infor.logo"
              fit="contain"
            ></el-image>
            <label class="label"
              >Logo công ty<span class="required-field"> *</span></label
            >
          </div>
        </div>
        <div class="custom-file-input">
          <el-image
            style="width: 100px; height: 100px"
            :src="user.enterprise_infor.certificate_url"
            fit="contain"
          ></el-image>
          <label class="label"
            >Giấy đăng kí kinh doanh<span class="required-field">
              *</span
            ></label
          >
        </div>
      </div>
      <div class="infor">
        <label class="label"
          >Tên công ty <span class="required-field"> *</span></label
        >
        <el-input
          disabled
          v-model="user.enterprise_infor.name"
          placeholder="Tên công ty"
        ></el-input>

        <label class="label"
          >Tên viết tắt <span class="required-field"> *</span></label
        >
        <el-input
          disabled
          v-model="user.enterprise_infor.abbreviation"
          placeholder="Tên viết tắt"
        ></el-input>

        <label class="label">Mô tả</label>
        <el-input
          type="textarea"
          v-model="user.enterprise_infor.description"
          :autosize="{ minRows: 5 }"
          placeholder="Mô tả về công ty"
        ></el-input>

        <el-row :gutter="20">
          <el-col :span="12">
            <label class="label"
              >Số điện thoại <span class="required-field"> *</span></label
            >
            <el-input
              v-model="user.enterprise_infor.phone_number"
              placeholder="SĐT liên hệ"
            ></el-input>
            <!-- <p
              v-if="submitted && !$v.enterprise.phone_number.required"
              class="p-error"
            >
              Số điện thoại không được để trống!
            </p>
            <p
              v-if="submitted && !$v.enterprise.phone_number.isPhoneNumber"
              class="p-error"
            >
              Số điện thoại không hợp lệ!
            </p> -->
          </el-col>
          <el-col :span="12">
            <label class="label"
              >Email <span class="required-field"> *</span></label
            >
            <el-input
              v-model="user.enterprise_infor.email"
              placeholder="Email"
            ></el-input>
            <!-- <p
              v-if="submitted && !$v.enterprise.email.required"
              class="p-error"
            >
              Email không được để trống!
            </p>
            <p v-if="submitted && !$v.enterprise.email.email" class="p-error">
              Email không hợp lệ!
            </p> -->
          </el-col>
        </el-row>

        <label class="label">Địa chỉ</label>
        <el-input
          v-model="user.enterprise_infor.address"
          placeholder="Địa chỉ"
        ></el-input>
        <!-- <p v-if="submitted && !$v.enterprise.address.required" class="p-error">
          Địa chỉ không được để trống!
        </p> -->

        <el-row :gutter="20">
          <el-col :span="12">
            <label class="label"
              >Website <span class="required-field"> *</span></label
            >
            <el-input
              v-model="user.enterprise_infor.website"
              placeholder="Website"
            ></el-input>
            <!-- <p
              v-if="submitted && !$v.enterprise.website.required"
              class="p-error"
            >
              Website không được để trống!
            </p>
            <p v-if="submitted && !$v.enterprise.website.url" class="p-error">
              Website không hợp lệ!
            </p> -->
          </el-col>
          <el-col :span="12">
            <label class="label"
              >Số đăng ký kinh doanh
              <span class="required-field"> *</span></label
            >
            <el-input
              disabled
              v-model="user.enterprise_infor.business_number"
              placeholder="Số đăng ký kinh doanh"
            ></el-input>
            <!-- <p
              v-if="submitted && !$v.enterprise.business_number.required"
              class="p-error"
            >
              Số đăng ký kinh doanh không được để trống!
            </p> -->
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <label class="label"
              >Lĩnh vực chính <span class="required-field"> *</span></label
            >
            <el-select
              disabled
              class="select"
              v-model="user.enterprise_infor.main_field"
              placeholder="Lĩnh vực chính"
              clearable
              filterable
            >
              <el-option
                v-for="item in fields"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <p
              v-if="submitted && !$v.enterprise.main_field.required"
              class="p-error"
            >
              Lĩnh vực chính không được để trống!
            </p> -->
          </el-col>
          <el-col :span="12">
            <label class="label">Lĩnh vực phụ</label>
            <el-select
              class="select sub-fields"
              v-model="user.enterprise_infor.sub_field"
              multiple
              placeholder="Lĩnh vực phụ"
              clearable
              filterable
            >
              <el-option
                v-for="item in fields"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="btn-action">
          <el-button
            type="primary"
            class="btn"
            icon="el-icon-check"
            :loading="loading"
            @click="handleSubmit()"
            >Lưu</el-button
          >
          <el-button @click="getInfor()" type="danger" class="btn" icon="el-icon-close"
            >Huỷ bỏ</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthApi from "@/api/auth";
import { Notification } from "element-ui";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import fields from "@/data/fieldList";
import { required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      avatar: null,
      hasUploadedAvatar: false,
      user: {
        enterprise_infor: {},
      },
      fields: fields,
      submitted: false,
      loading: false,
    };
  },
  computed: mapState({
    userInfor: (state) => state.user,
  }),
  validations: {
    logo: {
      required,
    },
    certificate: {
      required,
    },
  },
  mounted() {
    this.getInfor();
  },
  methods: {
    getInfor() {
      this.user = {
        ...this.userInfor,
      };
      this.user.enterprise_infor = {
        ...this.userInfor.enterprise_infor,
      };
      if(this.user.avatar) {
        this.avatar = this.user.avatar;
        this.hasUploadedAvatar = true;
      } else {
        this.hasUploadedAvatar = false;
      }
    },
    ...mapActions(['commitSetUserInfo']),
    async handleSubmit() {
      this.loading = true;
      AuthApi.updateProfile(
        {
          avatar: this.avatar,
          name: this.user.name,
          enterprise_infor: {
            description: this.user.enterprise_infor.description,
            phone_number: this.user.enterprise_infor.phone_number,
            email: this.user.enterprise_infor.email,
            website: this.user.enterprise_infor.website,
            address: this.user.enterprise_infor.address,
          },
          sub_field: this.user.enterprise_infor.sub_field
        },
        () => {
          this.loading = false;
          Notification.success({
            title: "Thành công",
            message: "Đã cập nhật thông tin cá nhân thành công!",
          });
          this.user.avatar = this.avatar;
          this.commitSetUserInfo(this.user);
          this.getInfor();
        },
        () => {
          this.loading = false;
        }
      );
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatar = URL.createObjectURL(file);
        this.hasUploadedAvatar = true; // Đánh dấu rằng đã có ảnh
        const newImageName = this.generateUniqueName(file.name); // Tạo tên mới cho ảnh
        const storageRef = ref(storage, `avatars/` + newImageName); // Sử dụng tên mới
        await uploadBytes(storageRef, file);
        this.avatar = await getDownloadURL(storageRef);
      }
      this.$refs.fileInput6.value = "";
    },
    deleteAvatar() {
      this.avatar = null;
      this.user.avatar = null;
      this.hasUploadedAvatar = false;
    },
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.avatar {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.infor {
  width: 50%;
}

.avt-icon {
  color: gray;
  font-size: 30px;
  margin-top: 20px;
}

.avt-text {
  color: gray;
  font-size: 14px;
}

.label {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}

.btn-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
}

.btn-action .btn {
  width: 110px;
  margin-bottom: 30px;
}

.select {
  width: 100%;
  height: 35px;
  border: rgb(227, 224, 224) solid 1px;
  border-radius: 5px;
  margin-top: 4px;
  margin-bottom: 10px;
}

.sub-fields {
  height: auto !important;
}

.custom-file-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  position: relative;
}

.delete-avatar-icon {
  cursor: pointer;
  position: absolute;
  right: -15px;
  top: -10px;
}

.icon-square {
  border-radius: 0px;
}

.upload-icon {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
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
</style>