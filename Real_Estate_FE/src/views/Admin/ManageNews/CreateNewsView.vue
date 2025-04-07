<template>
  <div class="create-post">
      <div class="container">
        <el-card class="post-infor card">
          <h2>Thông tin bài viết</h2>
          <label class="label" for="name">Ảnh đại diện <span class="required-field"> *</span></label>
          <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput3" class="upload-icon" v-if="!hasUploadedImage">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <label for="fileInput3" class="upload-icon" v-else :style="{ 'background-image': `url('${image}')` }">
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                    <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedImage" @click="deleteImage()"></span>
                </label>
                <p style="margin-top: 10px;" v-if="submitted && !$v.image.required" class="p-error">Ảnh đại diện cho tin tức không được để trống!</p>
            </div>
        </div>
        
          <label class="label" for="name">Tiêu đề<span class="required-field"> *</span></label>
          <el-input type="text" class="input" id="name" v-model="title" placeholder="VD: Thị Trường BĐS Hà Nội ......" minlength="30" maxlength="99" show-word-limit></el-input>
          <p v-if="submitted && !$v.title.required" class="p-error">Tiêu đề không được để trống!</p>

          <label class="label" for="name">Tiêu đề phụ<span class="required-field"> *</span></label>
          <el-input type="textarea" class="input" id="name" v-model="subtitle" :autosize="{ minRows: 4}" placeholder="VD: Thị trường bất động sản Hà Nội tháng 4/2024 đã có sự bứt tốc đầy ..."></el-input>
          <p v-if="submitted && !$v.subtitle.required" class="p-error">Tiêu đề phụ không được để trống!</p>

          <label class="label" style="margin-bottom: 10px;" for="name">Nội dung tin tức<span class="required-field"> *</span></label>
          <ckeditor-custom v-model="content" type="news"/>
          <p v-if="submitted && !$v.content.required" class="p-error">Nội dung tin tức không được để trống!</p>

          <label class="label" for="name">Nguồn tin tức</label>
          <el-input type="text" class="input" id="name" v-model="source" placeholder="VD: https://thanhnienviet.vn/2024/05/14/"></el-input>

          <label class="label" for="province">Tin tức về BĐS thuộc tỉnh/thành phố</label>
            <el-select class="select" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
              <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
            </el-select>
            <div class="btn-action">
              <el-button type="primary" :loading="loading" @click="handelSubmit()">Đăng tin tức</el-button>
              <el-button type="danger" @click="handelReset()">Huỷ</el-button>
            </div>
        </el-card>
      </div>
  </div>
  
</template>

<script>
import axios from "axios"
import AdminNewsApi from '@/api/admin/adminNews'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/firebase"
import { Notification } from 'element-ui'
import { required } from 'vuelidate/lib/validators'
import CkeditorCustom from '@/components/CkeditorCustom.vue'

export default {
  components: {
    CkeditorCustom,
  },
  data() {
    return {
      provinces: [],
      province: "",
      image: "",
      title: "",
      subtitle: "",
      content: "",
      source: "",
      hasUploadedImage : false,
      loading: false,
      submitted: false
    };
  },
  validations: {
    image: {
      required,
    },
    title: {
      required,
    },
    subtitle : {
      required,
    },
    content: {
      required,
    },
  },
  mounted() {
    this.getListProvince()
  },
  methods: {
    async handelSubmit() {
      this.submitted = true
      if(this.$v.$invalid) {
        return false
      }
      this.loading = true
      var data = {
        image: this.image,
        title : this.title,
        subtitle : this.subtitle,
        content : this.content,
        province : this.province,
        source: this.source,
      }
      this.createProject(data)
    },
    createProject(data) {
      AdminNewsApi.create(
        data,
        () => {
          this.loading = false
          Notification.success({
            title: "Thành công",
            message: "Tin tức đã được đăng thành công",
          });
          this.$router.push('/admin/quan-ly-tin-tuc')
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

    async getListProvince() {
      try {
        const response = await axios.get("https://vapi.vnappmob.com/api/v2/province/");
        if(response.status == 200) {
          this.provinces = response.data.results;
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    async handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.image = URL.createObjectURL(file)
            this.hasUploadedImage = true; // Đánh dấu rằng đã có ảnh
            const newImageName = this.generateUniqueName(file.name) // Tạo tên mới cho ảnh
            const storageRef = ref(storage, `news/` + newImageName); // Sử dụng tên mới
            await uploadBytes(storageRef, file);
            this.image = await getDownloadURL(storageRef);
        }
        this.$refs.fileInput3.value = '';
    },

    handelReset() {
      this.title = ""
      this.subtitle = ""
      this.content = ""
      this.image = ""
      this.source = ""
      this.province = ""
    },

    deleteImage() {
      this.image = ""
      this.hasUploadedImage = false
    },
  },
};
</script>

<style scoped>
.card {
  width: 70%;
  margin: 10px;
  padding: 20px;
}

.create-post {
  width: 100%;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.select {
  width: 100%;
  height: 35px;
  border: rgb(227, 224, 224) solid 1px;
  border-radius: 5px;
  margin-top: 4px;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

.input {
  margin-top: 5px;
  margin-bottom: 10px;
}

input[type="file"] {
  display: none;
}

.custom-file-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

.upload-icon {
  width: 250px;
  height: 150px;
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

.delete-avatar-icon{
    cursor: pointer;
    position: absolute;
    right: -7px;
    top: -7px;
}
.btn-action {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0px 0px 0px;
}

.avt-text{
    color: gray;
    font-size: 14px;
}
</style>