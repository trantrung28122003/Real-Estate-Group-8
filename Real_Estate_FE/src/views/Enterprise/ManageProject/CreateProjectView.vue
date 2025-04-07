<template>
  <div class="create-post">
      <div class="container">
        <el-card class="basic-infor card">
          <div class="header-basic-infor">
            <h2>Thông tin cơ bản</h2>
          </div>
          <label class="label" for="type">Loại dự án<span class="required-field"> *</span></label>
          <el-select class="select" v-model="project.type_id" filterable placeholder="Chọn loại dự án" clearable>
              <el-option v-for="item in projectType.textValue" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
          <span v-if="submitted && !$v.value.required" class="p-error">Loại bất động sản không được để trống!</span>

          <table style="width: 100%">
            <tr>
              <td style="width: 50%">
                <label class="label" for="province">Tỉnh, thành phố<span class="required-field"> *</span></label>
                <el-select class="select" id="province" v-model="project.province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
                  <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
                </el-select>
              </td>
              <td style="width: 50%">
                <label class="label" for="district">Quận, huyện<span class="required-field"> *</span></label>
                <el-select :disabled="!project.province" class="select" id="district" v-model="project.district" placeholder="-----  Quận, huyện  -----" filterable clearable>
                  <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td style="width: 50%">
                <span v-if="submitted && !$v.province.required" class="p-error">Tỉnh, thành phố không được để trống!</span>
              </td>
              <td style="width: 50%">
                <span v-if="submitted && project.province && !$v.district.required" class="p-error">Quận, huyện không được để trống!</span>
              </td>
            </tr>
            <tr>
              <td>
                <label class="label" for="ward">Phường, xã<span class="required-field"> *</span></label>
                <el-select :disabled="!project.district" class="select" id="ward" v-model="project.ward" placeholder="-----  Phường, xã  -----" filterable clearable>
                  <el-option v-for="item in wards" :key="item.ward_id" :label="item.ward_name" :value="item.ward_name + '-' + item.ward_id"></el-option>
                </el-select>
              </td>
              <td>
                <label class="label" for="street">Đường, phố</label>
                <el-input :disabled="!project.ward" type="text" class="select" id="street" v-model="project.street" placeholder="-----  Đường, phố  -----"></el-input>
              </td>
            </tr>
            <tr>
              <td style="width: 50%">
                <span v-if="submitted && district && !$v.ward.required" class="p-error">Phường, xã không được để trống!</span>
              </td>
              <td style="width: 50%"></td>
            </tr>
          </table>

          <label class="label" for="address">Địa chỉ hiển thị<span class="required-field"> *</span></label>
          <el-input type="text" class="input" id="address" v-model="project.address" placeholder="Có thể bổ sung chi tiết về ngõ, hẻm" required></el-input>
          <span v-if="submitted && !$v.address.required" class="p-error">Địa chỉ không được để trống!</span>
        </el-card>

        <el-card class="post-infor card">
          <h2>Thông tin dự án</h2>
          <label class="label" for="name">Tên dự án<span class="required-field"> *</span></label>
          <el-input type="text" class="input" id="name" v-model="project.name" placeholder="VD: Vinhomes Grand Park" required minlength="30" maxlength="99" show-word-limit></el-input>
          <p v-if="submitted && !$v.name.required" class="p-error">Tên dự án không được để trống!</p>

          <label class="label" style="margin-bottom: 10px;" for="name">Mô tả về dự án<span class="required-field"> *</span></label>
          <ckeditor-custom v-model="project.description" type="project"/>
          
          <label class="label" style="margin-top: 20px; margin-bottom: 15px;" for="image">Hình ảnh<span class="required-field"> *</span></label>
          <div class="imageLayout">
            <div class="row">
              <div
                v-for="(image, index) in images"
                :key="index"
                class="col-4 imageHolder"
              >
                <img
                  v-if="image"
                  :src="image.url"
                />
                <el-button @click="deleteImage(index)" size="mini" class="delete-image" icon="el-icon-close" circle></el-button>
              </div>
              <label class="custom-file-upload imageHolder">
                <input
                  type="file"
                  multiple="true"
                  @change="handleFileChange"
                  accept="image/*"
                  class="custom-file-input"
                />
                <i
                  class="fa fa-plus"
                  style="font-size: 48px; color: rgba(184, 153, 153, 0.588)"
                ></i>
              </label>
            </div>
          </div>
          <p v-if="submitted && !$v.images.required" class="p-error">Ảnh không được để trống!</p>
        </el-card>

        <el-card class="real-estate-infor card">
          <h2>Thông tin chi tiết dự án</h2>
          <table style="width: 100%">
            <tr>
                <td style="width: 50%;">
                  <label class="label" for="title">Trạng thái dự án</label>
                  <el-select class="select" v-model="project.project_status" placeholder="Trạng thái dự án" clearable>
                    <el-option v-for="item in projectStatus.listStatus" :key="item.value" :label="item.text" :value="item.value"></el-option>
                  </el-select>
                </td>
                <td style="padding: 5px 0px 0px 10px">
                  <label class="label" for="title">Chú thích về trạng thái</label>
                  <el-input class="input" v-model="project.note" placeholder="VD: 25/2/2024: Khởi công"></el-input>
                </td>
            </tr>
          </table>
          <label class="label" for="title">Mức giá (Triệu/m&sup2;)</label>
          <el-tooltip content="Nếu chỉ có 1 mức giá cố định thì chỉ cần nhập vào ô đầu tiên" placement="top" effect="dark">
            <img class="tooltip_icon" width="14" height="14" style="margin-left: 5px" :src="`https://d31wum4217462x.cloudfront.net/img/question-circle.svg`" alt="tooltip_icon" />
          </el-tooltip>
          <table style="width: 100%">
            <tr>
                <td style="width: 50%;">
                  <el-input class="input" style="width: 100%;" type="number" v-model="project.start_price" placeholder="Giá dao động từ"></el-input>
                </td>
                <td style="padding-left: 10px">
                  <el-input class="input" type="number" :disabled="!project.start_price" v-model="project.end_price" placeholder="Đến (bỏ trống nếu giá cố định)"></el-input>
                </td>
            </tr>
          </table>
          <table style="width: 100%">
            <tr>
                <td>
                    <label class="label" for="title">Diện tích</label>
                    <el-input class="input" type="number" id="size" v-model="project.size" placeholder="Nhập diện tích VD:1000"></el-input>
                </td>
                <td style="padding-left: 10px">
                    <label class="label" for="title">Đơn vị</label>
                    <el-select class="select" id="unit" v-model="project.size_unit">
                        <el-option v-for="item in unit" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="label" for="title">Số tòa nhà</label>
                    <el-input-number style="width: 100%;" :controls="false" v-model="project.building" :min="0"></el-input-number>
                </td>
                <td style="padding-left: 10px">
                    <label class="label" for="title">Số căn hộ</label>
                    <el-input-number style="width: 100%;" :controls="false" v-model="project.apartment" :min="0"></el-input-number>
                </td>
            </tr>
          </table>
          <label class="label" for="title">Quy mô dự án</label>
          <el-input class="input" v-model="project.scale" placeholder="VD: 18 tầng, 1 tầng hầm"></el-input>
          <label for="legalDocument" class="label">Thông tin pháp lý</label>
          <div class="button-container" id="legalDocument">
            <div v-for="legalDocument in legalDocuments" :key="legalDocument">
              <el-button class="button-select" :class="{ active_selected: project.legal_documents === legalDocument }" @click="project.legal_documents = (project.legal_documents === legalDocument) ? '' : legalDocument">{{ legalDocument }}</el-button>
            </div>
            <el-button class="button-select" @click="dialogLegal = true">+</el-button>
            <el-dialog title="Thêm thông tin pháp lý" width="500px" :visible.sync="dialogLegal">
              <el-form >
                <el-form-item >
                  <el-input v-model="newLegal" autocomplete="off" placeholder="Nhập thông tin pháp lý mới" required></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogLegal = false">Huỷ</el-button>
                <el-button type="primary" @click="addLegal">Thêm</el-button>
              </span>
            </el-dialog>
          </div>
          <label class="label" for="title">Công ty xây dựng</label>
          <el-input class="input" v-model="project.builders" placeholder="Tên công ty xây dựng dự án"></el-input>
          <label class="label" for="title">Công ty thiết kế</label>
          <el-input class="input" v-model="project.designer" placeholder="Tên công ty thiết kế dự án"></el-input>
          <div class="btn-action-end">
            <el-button v-if="$route.params.id" @click="getDetail()">Huỷ</el-button>
            <el-button :loading="loading" type="primary" @click="handelSubmit()">Tiếp tục</el-button>
          </div>
        </el-card>
      </div>
  </div>
  
</template>

<script>
import ProjectType from '@/data/projectType'
import axios from "axios"
import ProjectApi from '@/api/project'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../../firebase.js"
import { Notification } from 'element-ui'
// import { required } from 'vuelidate/lib/validators'
import ProjectStatus from '@/data/projectStatus'
import CkeditorCustom from '../../../components/CkeditorCustom.vue'

export default {
  components: {
    CkeditorCustom,
  },
  data() {
    return {
      projectType : ProjectType,
      projectStatus: ProjectStatus,
      dialogLegal: false,
      provinces: [],
      districts: [],
      wards: [],
      loading: false,
      project: {
        name : "",
        description : "",
        type_id : null,
        project_id : null,
        province : "",
        district : "",
        project_status : null,
        note: "",
        ward : "",
        street : "",
        address : "",
        legal_documents : null,
        size : null,
        start_price : null,
        end_price : null,
        size_unit : 'm²',
        apartment : null,
        building : null,
        scale : "",
        builders : "",
        designer : "",
      },
      districtSelected: "",
      wardSelected: "",
      images: [],
      images_urls: [],
      legalDocuments: ["Sở hữu lâu dài", "Sổ hồng lâu dài"],
      newLegal: "",
      unit: [
        { value: "m²", text: "m²" },
        { value: "ha", text: "ha" },
      ],
      submitted: false
    };
  },
  // validations: {
  //   type: {
  //     required,
  //   },
  //   name: {
  //     required,
  //   },
  //   description: {
  //     required,
  //   },
  //   province: {
  //     required,
  //   },
  //   district: {
  //     required,
  //   },
  //   ward: {
  //     required,
  //   },
  //   address: {
  //     required,
  //   },
  //   images: {
  //     required
  //   },
  // },
  mounted() {
    this.getListProvince()
    if(this.$route.params.id) {
      this.getDetail()
    }
  },
  methods: {
    async handelSubmit() {
      // this.submitted = true
      // if(this.$v.$invalid) {
      //   return false
      // }
      this.loading =  true
      this.images_urls = []
      this.images.forEach(image => {
        this.images_urls.push(image.url)
      });
      
      var data = {
        ...this.project,
        images : this.images_urls,
      }
      if(this.$route.params.id) {
        this.updateProject(data)
      } else {
        this.createProject(data)
      }
    },
    createProject(data) {
      ProjectApi.create(
        data,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Dự án của bạn đã được thêm thành công, đang chờ duyệt!",
          });
          this.loading = false
          this.$router.push('/quan-ly-du-an')
        },
        () => {
          Notification.error({
            title: "Thất bại",
            message: "Đăng tin thất bại",
          });
          this.loading = false
        }
      )
    },
    updateProject(data) {
      ProjectApi.update(
        this.$route.params.id,
        data,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Dự án của bạn đã cập nhật thành công",
          });
          this.loading = false
          this.$router.push('/quan-ly-du-an')
        },
        () => {
          Notification.error({
            title: "Thất bại",
            message: "Cập nhật thất bại",
          });
          this.loading = false
        }
      )
    },
    getDetail() {
      ProjectApi.detail(
        this.$route.params.id,
        (response) => {
          this.project = {...response.data}
          this.provinceSelected = this.project.province
          this.districtSelected = this.project.district
          this.wardSelected = this.project.ward
          this.project.images.forEach( image => {
            this.images.push({
              url: image
            })
          })
        }
      )
    },
    addLegal() {
      this.legalDocuments.push(this.newLegal)
      this.newLegal = ""
      this.dialogLegal = false
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
    async getListDistrict( province_id) {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/district/${province_id}`);
        if(response.status == 200) {
          this.districts = response.data.results;
          if(this.$route.params.id) {
            this.project.district = this.districtSelected
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getListWard( district_id) {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/ward/${district_id}`);
        if(response.status == 200) {
          this.wards = response.data.results;
          if(this.$route.params.id) {
            this.project.ward = this.wardSelected
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleFileChange(event) {
      const newImages = event.target.files
      const tempImages = [...this.images]
      // Lặp qua từng ảnh mới
      Array.from(newImages).forEach(image => {
        // Tạo URL cho ảnh và thêm vào mảng
        const imageURL = URL.createObjectURL(image)
        const newImageName = this.generateUniqueName(image.name) // Tạo tên mới cho ảnh
        tempImages.push({ name: newImageName, url: imageURL })
        // Tải lên ảnh lên Firebase Storage với tên mới
        this.uploadImageToFirebase(image, newImageName)
      });
      // Cập nhật giao diện người dùng với danh sách các ảnh
      this.images = tempImages
    },

    async uploadImageToFirebase(image, imageName) {
      try {
        const storageRef = ref(storage, `projects/` + imageName); // Sử dụng tên mới
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        // Cập nhật URL của ảnh trong mảng this.images sau khi đã tải lên Firebase
        this.updateImageUrl(imageName, downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },

    updateImageUrl(imageName, imageUrl) {
      // Tìm kiếm ảnh trong mảng và cập nhật URL của nó
      const updatedImages = this.images.map(image => {
        if (image.name === imageName) {
          return { ...image, url: imageUrl };
        }
        return image;
      });
      // Cập nhật mảng ảnh với URL mới
      this.images = updatedImages;
    },

    deleteImage(index) {
      this.images.splice(index, 1);
    },
  },

  watch: {
    'project.province'(val){
      if(val){
        var $result = val.split("-");
        this.getListDistrict($result[1]);
        this.project.address = $result[0];
      } else {
        this.districts = [];
        this.wards = [];
        this.project.address = "";
      }
      this.project.district = "";
    },
    'project.district'(val){
      if(val){
        var $result = val.split("-");
        this.getListWard($result[1]);
        this.project.address = $result[0] + ', ' + this.project.province.split("-")[0];
      } else {
        this.wards = [];
        this.project.address = this.project.province.split("-")[0];
      }
      this.project.ward= "";
    },
    'project.ward'(val){
      if (val) {
        var $result = val.split("-");
        this.project.address = $result[0] + ', ' + this.project.district.split("-")[0] + ', ' + this.project.province.split("-")[0];
      } else {
        if (this.project.district) {
          this.project.address = this.project.district.split("-")[0] + ', ' + this.project.province.split("-")[0];
        }
      }
      this.street = "";
    },
    'project.street'(val) {
      if (val) {
        this.project.address = val + ', ' + this.project.ward.split("-")[0] + ', ' + this.project.district.split("-")[0] + ', ' + this.project.province.split("-")[0];
      } else {
        if (this.project.ward) {
          this.project.address = this.project.ward.split("-")[0] + ', ' + this.project.district.split("-")[0] + ', ' + this.project.province.split("-")[0];
        }
      }
    },
    '$route'() {
      if(this.$route.params.id) {
        this.getDetail()
      } else {
        this.project = {
          size_unit: "m²"
        }
        this.images = []
      }
    }
  },
};
</script>

<style scoped>
.card {
  width: 65%;
  margin: 25px 10px 10px 10px;
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

.button-container {
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}

.header-basic-infor{
  display: flex;
  flex-direction: row;
}

.select-tyle-action{
  margin-left: 10%;
  display: flex;
  flex-direction: row;
}

.select {
  width: 100%;
  height: 35px;
  border: rgb(227, 224, 224) solid 1px;
  border-radius: 5px;
  margin-top: 4px;
  margin-bottom: 10px;
}

.sell-button {
  /* background-color: #007bff; */
  width: 100px;
}

.rent-button {
  /* background-color: #28a745; */
  width: 100px;
}

.active {
  background-color: #dc3545 !important;
  color: #fff !important;
}

.active_selected {
  background-color: #409EFF !important;
  color: #ffffff !important;
}

.button-select {
  border-radius: 20px;
  margin: 5px 5px 0 5px;
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

.imageHolder {
  position: relative;
  display: flex;
  width: 175px;
  height: 170px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #f5f5f5;
  margin: 7px;
  border: 1px solid black;
}

.delete-image {
  position: absolute;
  top: 5px;
  right: 5px;
}

.imageHolder img {
  width: 95%;
  height: 95%;
}

input[type="file"] {
  display: none;
}

.imageLayout {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  padding: 32px;
  align-items: flex-start;
  gap: 19px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
}
</style>