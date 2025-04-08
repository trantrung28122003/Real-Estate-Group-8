<template>
  <div>
    <h5>Đăng ký tài khoản doanh nghiệp</h5>
    <div class="profile">
        <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput1" class="upload-icon-square" v-if="!hasUploadedLogo">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput1" @change="handleLogoChange" accept="image/*" ref="fileInput1" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedLogo" @click="handleDeleteLogo"></span>
                <label for="fileInput1" class="upload-icon-square" v-if="hasUploadedLogo" :style="{ 'background-image': `url('${logo}')` }">
                    <input type="file" id="fileInput1" @change="handleLogoChange" accept="image/*" ref="fileInput1" style="display: none"/>
                </label>
            </div>
            <label class="label">Logo công ty<span class="required-field"> *</span></label>
            <span v-if="submitted && !$v.logo.required" class="p-error">Logo không được để trống!</span>
            <div class="custom-file-input">
                <label for="fileInput2" class="upload-icon-square" v-if="!hasUploadedCertificate">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput2" @change="handleCertificateChange" accept="image/*" ref="fileInput2" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedCertificate" @click="handleDeleteCertificate"></span>
                <label for="fileInput2" class="upload-icon-square" v-if="hasUploadedCertificate" :style="{ 'background-image': `url('${certificate}')` }">
                    <input type="file" id="fileInput2" @change="handleCertificateChange" accept="image/*" ref="fileInput2" style="display: none"/>
                </label>
            </div>
            <label class="label">Giấy đăng kí kinh doanh<span class="required-field"> *</span></label>
            <span v-if="submitted && !$v.certificate.required" class="p-error">Giấy đăng ký kinh doanh không được để trống!</span>
        </div>
        <div class="infor">
            <label class="label">Tên công ty <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.name" placeholder="Tên công ty"></el-input>
            <p v-if="submitted && !$v.enterprise.name.required" class="p-error">Tên công ty không được để trống!</p>

            <label class="label">Tên viết tắt <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.abbreviation" placeholder="Tên viết tắt"></el-input>
            <p v-if="submitted && !$v.enterprise.abbreviation.required" class="p-error">Tên viết tắt không được để trống!</p>

            <label class="label">Mô tả</label>
            <el-input type="textarea" v-model="enterprise.description" :autosize="{ minRows: 5}" placeholder="Mô tả về công ty"></el-input>

            <label class="label">Số điện thoại <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.phone_number" placeholder="SĐT liên hệ"></el-input>
            <p v-if="submitted && !$v.enterprise.phone_number.required" class="p-error">Số điện thoại không được để trống!</p>
            <p v-if="submitted && !$v.enterprise.phone_number.isPhoneNumber" class="p-error">Số điện thoại không hợp lệ!</p>

            <label class="label">Email <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.email" placeholder="Email"></el-input>
            <p v-if="submitted && !$v.enterprise.email.required" class="p-error">Email không được để trống!</p>
            <p v-if="submitted && !$v.enterprise.email.email" class="p-error">Email không hợp lệ!</p>

            <label class="label">Địa chỉ</label>
            <el-input v-model="enterprise.address" placeholder="Địa chỉ"></el-input>
            <p v-if="submitted && !$v.enterprise.address.required" class="p-error">Địa chỉ không được để trống!</p>

            <label class="label">Website <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.website" placeholder="Website"></el-input>
            <p v-if="submitted && !$v.enterprise.website.required" class="p-error">Website không được để trống!</p>
            <p v-if="submitted && !$v.enterprise.website.url" class="p-error">Website không hợp lệ!</p>

            <label class="label">Số đăng ký kinh doanh <span class="required-field"> *</span></label>
            <el-input v-model="enterprise.business_number" placeholder="Số đăng ký kinh doanh"></el-input>
            <p v-if="submitted && !$v.enterprise.business_number.required" class="p-error">Số đăng ký kinh doanh không được để trống!</p>

            <label class="label">Lĩnh vực chính <span class="required-field"> *</span></label>
            <el-select class="select" v-model="enterprise.main_field" placeholder="Lĩnh vực chính" clearable filterable>
              <el-option v-for="item in fields" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <p v-if="submitted && !$v.enterprise.main_field.required" class="p-error">Lĩnh vực chính không được để trống!</p>

            <label class="label">Lĩnh vực phụ</label>
            <el-select class="select sub-fields" v-model="enterprise.sub_field" multiple placeholder="Lĩnh vực phụ" clearable filterable>
              <el-option v-for="item in fields" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <div class="btn-action">
              <el-button type="primary" class="btn" icon="el-icon-check" :loading="loading" @click="handleSubmit()">Lưu</el-button>
              <el-button type="danger" class="btn" icon="el-icon-close">Huỷ bỏ</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AuthApi from "@/api/auth"
import { Notification } from 'element-ui'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase.js"
import fields from "@/data/fieldList"
import { required, email, url } from 'vuelidate/lib/validators'
export default {
    data() {
      return {
        logo: null,
        hasUploadedLogo: false,
        certificate: null,
        hasUploadedCertificate: false,
        enterprise: {
          name: "",
          abbreviation : "",
          description : "",
          phone_number : "",
          email: "",
          address: "",
          website: "",
          business_number: "",
          main_field: "",
          sub_field: [],
          logo: null,
          certificate_url: null,
        },
        fields: fields,
        submitted: false,
        loading: false,
      };
    },
    validations: {
      enterprise: {
        name: {
          required
        },
        abbreviation: {
          required
        },
        phone_number: {
          required,
          isPhoneNumber(value) {
            return this.isPhoneNumber(value)
          }
        },
        email: {
          required,
          email
        },
        address: {
          required
        },
        website: {
          required,
          url
        },
        business_number: {
          required
        },
        main_field: {
          required
        },
      },
      logo: {
        required
      },
      certificate: {
        required
      },
    },
    methods: {
      async handleSubmit() {
        this.submitted = true
        if(this.$v.$invalid) {
          return false
        }
        this.loading = true
        this.enterprise.logo = this.logo
        this.enterprise.certificate_url = this.certificate
        AuthApi.enterpriseRegister(
          this.enterprise,
          () => {
            this.loading = false
            Notification.success({
              title: "Thành công",
              message: "Bạn đã gửi yêu cầu đăng kí tài khoản doanh nghiệp thành công! Yêu cầu sẽ được kiểm duyệt sau!",
            });
          },
          () => {
            this.loading = false
            Notification.error({
              title: "Thất bại",
              message: "Gửi yêu cầu đăng ký thất bại",
            });
          }
        )
      },
      async handleCertificateChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.certificate = URL.createObjectURL(file)
          this.hasUploadedCertificate = true; // Đánh dấu rằng đã có ảnh
          const newImageName = this.generateUniqueName(file.name) // Tạo tên mới cho ảnh
          const storageRef = ref(storage, `enterprise/certificate/` + newImageName); // Sử dụng tên mới
          await uploadBytes(storageRef, file);
          this.certificate = await getDownloadURL(storageRef);
        }
        this.$refs.fileInput2.value = '';
      },
      async handleLogoChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.logo = URL.createObjectURL(file)
          this.hasUploadedLogo = true; // Đánh dấu rằng đã có ảnh
          const newImageName = this.generateUniqueName(file.name) // Tạo tên mới cho ảnh
          const storageRef = ref(storage, `enterprise/logo/` + newImageName); // Sử dụng tên mới
          await uploadBytes(storageRef, file);
          this.logo = await getDownloadURL(storageRef);
        }
        this.$refs.fileInput1.value = '';
      },
      handleDeleteLogo() {
        this.logo = null
        this.hasUploadedLogo = false
      },
      handleDeleteCertificate() {
        this.hasUploadedCertificate = false
        this.certificate = null
      },
    },
}
</script>

<style scoped>
.profile {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}

.avatar{
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.infor{
    width: 40%;
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

.btn-action{
    display: flex;
    justify-content: flex-end;
    margin-top: 35px;
}

.btn-action .btn{
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

.upload-icon-square {
  width: 150px;
  height: 100px;
  border: 1px dashed #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

</style>