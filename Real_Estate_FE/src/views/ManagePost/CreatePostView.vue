<template>
  <div class="create-post">
    <el-card class="basic-infor card">
      <div class="header-basic-infor">
        <h2>Thông tin cơ bản</h2>
        <div class="select-tyle-action">
          <el-button
            class="sell-button"
            :class="{ active: activeButton === 'sell' }"
            @click="activeButton = 'sell'"
            >Bán</el-button
          >
          <el-button
            class="rent-button"
            :class="{ active: activeButton === 'rent' }"
            @click="activeButton = 'rent'"
            >Cho thuê</el-button
          >
        </div>
      </div>
      <label class="label" for="type"
        >Loại bất động sản<span class="required-field"> *</span></label
      >
      <el-select
        class="select"
        v-model="value"
        filterable
        placeholder="Chọn loại bất động sản"
        clearable
      >
        <div v-if="activeButton === 'sell'">
          <el-option
            v-for="item in PostType.sell"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </div>
        <div v-else>
          <el-option
            v-for="item in PostType.rent"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </div>
      </el-select>
      <span v-if="submitted && !$v.value.required" class="p-error"
        >Loại bất động sản không được để trống!</span
      >

      <table style="width: 100%">
        <tr>
          <td style="width: 50%">
            <label class="label" for="province"
              >Tỉnh, thành phố<span class="required-field"> *</span></label
            >
            <el-select
              class="select"
              id="province"
              v-model="province"
              placeholder="-----  Tỉnh, thành phố  -----"
              filterable
              clearable
            >
              <el-option
                v-for="item in provinces"
                :key="item.province_id"
                :label="item.province_name"
                :value="item.province_name + '-' + item.province_id"
              ></el-option>
            </el-select>
          </td>
          <td style="width: 50%">
            <label class="label" for="district"
              >Quận, huyện<span class="required-field"> *</span></label
            >
            <el-select
              :disabled="!province"
              class="select"
              id="district"
              v-model="district"
              placeholder="-----  Quận, huyện  -----"
              filterable
              clearable
            >
              <el-option
                v-for="item in districts"
                :key="item.district_id"
                :label="item.district_name"
                :value="item.district_name + '-' + item.district_id"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td style="width: 50%">
            <span v-if="submitted && !$v.province.required" class="p-error"
              >Tỉnh, thành phố không được để trống!</span
            >
          </td>
          <td style="width: 50%">
            <span
              v-if="submitted && province && !$v.district.required"
              class="p-error"
              >Quận, huyện không được để trống!</span
            >
          </td>
        </tr>
        <tr>
          <td>
            <label class="label" for="ward"
              >Phường, xã<span class="required-field"> *</span></label
            >
            <el-select
              :disabled="!district"
              class="select"
              id="ward"
              v-model="ward"
              placeholder="-----  Phường, xã  -----"
              filterable
              clearable
            >
              <el-option
                v-for="item in wards"
                :key="item.ward_id"
                :label="item.ward_name"
                :value="item.ward_name + '-' + item.ward_id"
              ></el-option>
            </el-select>
          </td>
          <td>
            <label class="label" for="street">Đường, phố</label>
            <el-input
              :disabled="!ward"
              type="text"
              class="select"
              id="street"
              v-model="street"
              placeholder="-----  Đường, phố  -----"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td style="width: 50%">
            <span
              v-if="submitted && district && !$v.ward.required"
              class="p-error"
              >Phường, xã không được để trống!</span
            >
          </td>
          <td style="width: 50%"></td>
        </tr>
      </table>

      <label class="label" for="project">Dự án</label>
      <el-select
        class="select"
        id="project"
        v-model="project"
        placeholder="Chọn dự án"
        clearable
        filterable
      >
        <el-option
          v-for="item in projects"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>

      <label class="label" for="address"
        >Địa chỉ hiển thị<span class="required-field"> *</span></label
      >
      <el-input
        type="text"
        class="input"
        id="address"
        v-model="address"
        placeholder="Có thể bổ sung chi tiết về ngõ, hẻm"
        required
      ></el-input>
      <span v-if="submitted && !$v.address.required" class="p-error"
        >Địa chỉ không được để trống!</span
      >
    </el-card>

    <el-card class="post-infor card">
      <h2>Thông tin bài viết</h2>
      <label class="label" for="title"
        >Tiêu đề<span class="required-field"> *</span></label
      >
      <el-input
        type="text"
        class="input"
        id="title"
        v-model="title"
        placeholder="VD: Bán nhà mặt đường tại Giải Phóng"
        required
        minlength="30"
        maxlength="99"
        show-word-limit
      ></el-input>
      <p v-if="submitted && !$v.title.required" class="p-error">
        Tiêu đề không được để trống!
      </p>

      <label class="label" for="description"
        >Mô tả<span class="required-field"> *</span></label
      >
      <el-input
        type="textarea"
        :autosize="{ minRows: 6 }"
        class="input"
        id="description"
        v-model="description"
        placeholder="Nhập mô tả chung về bất động sản của bạn. VD: Gần các trường đại học lớn như Đại học Bách Khoa Hà Nội,..."
        required
        minlength="30"
        maxlength="3000"
        show-word-limit
      ></el-input>
      <p v-if="submitted && !$v.description.required" class="p-error">
        Mô tả không được để trống!
      </p>

      <label class="label" for="image"
        >Hình ảnh<span class="required-field"> *</span></label
      >
      <div class="imageLayout">
        <div class="row">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="col-4 imageHolder"
          >
            <img v-if="image" :src="image.url" />
            <el-button
              @click="deleteImage(index)"
              size="mini"
              class="delete-image"
              icon="el-icon-close"
              circle
            ></el-button>
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
      <p v-if="submitted && !$v.images.required" class="p-error">
        Ảnh không được để trống!
      </p>
    </el-card>

    <el-card class="real-estate-infor card">
      <h2>Thông tin bất động sản</h2>

      <label class="label" for="title"
        >Diện tích (m&sup2;)<span class="required-field"> *</span></label
      >
      <el-input
        class="input"
        type="number"
        id="size"
        v-model="size"
        placeholder="Nhập diện tích VD:100"
        required
      ></el-input>
      <p v-if="submitted && !$v.size.required" class="p-error">
        Diện tích không được để trống!
      </p>
      <table style="width: 100%">
        <tr>
          <td>
            <label class="label" for="title"
              >Mức giá<span class="required-field"> *</span></label
            >
            <el-input
              class="input"
              type="number"
              id="price"
              v-model="price"
              placeholder="Nhập giá VD:10000000"
              required
            ></el-input>
          </td>
          <td style="padding-left: 10px">
            <label class="label" for="title"
              >Đơn vị<span class="required-field"> *</span></label
            >
            <el-select class="select" id="unit" v-model="unitSelected">
              <el-option
                v-for="item in unit"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>
            <p v-if="submitted && !$v.price.required" class="p-error">
              Giá không được để trống!
            </p>
          </td>
          <td></td>
        </tr>
      </table>
      <label for="legalDocument" class="label">Giấy tờ pháp lý</label>
      <div class="button-container" id="legalDocument">
        <div v-for="legalDocument in legalDocuments" :key="legalDocument">
          <el-button
            class="button-select"
            :class="{ active_selected: legalSelected === legalDocument }"
            @click="
              legalSelected =
                legalSelected === legalDocument ? '' : legalDocument
            "
            >{{ legalDocument }}</el-button
          >
        </div>
        <el-button class="button-select" @click="dialogLegal = true"
          >+</el-button
        >
        <el-dialog
          title="Thêm giấy tờ pháp lý"
          width="500px"
          :visible.sync="dialogLegal"
        >
          <el-form>
            <el-form-item>
              <el-input
                v-model="newLegal"
                autocomplete="off"
                placeholder="Nhập loại giấy tờ mới"
                required
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLegal = false">Huỷ</el-button>
            <el-button type="primary" @click="addLegal">Thêm</el-button>
          </span>
        </el-dialog>
      </div>

      <label for="furniture" class="label">Nội thất</label>
      <div class="button-container" id="furniture">
        <div v-for="furniture in furnitures" :key="furniture">
          <el-button
            class="button-select"
            :class="{ active_selected: furnitureSelected === furniture }"
            @click="
              furnitureSelected =
                furnitureSelected === furniture ? '' : furniture
            "
            >{{ furniture }}</el-button
          >
        </div>
        <el-button class="button-select" @click="dialogFurniture = true"
          >+</el-button
        >
        <el-dialog
          title="Thêm trạng thái nội thất"
          width="500px"
          :visible.sync="dialogFurniture"
        >
          <el-form>
            <el-form-item>
              <el-input
                v-model="newFurniture"
                autocomplete="off"
                placeholder="Nhập trạng thái nội thất mới"
                required
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFurniture = false">Huỷ</el-button>
            <el-button type="primary" @click="addFurniture">Thêm</el-button>
          </span>
        </el-dialog>
      </div>

      <table style="width: 100%">
        <tr>
          <td>
            <label class="label" for="bedroom">Số phòng ngủ</label>
            <el-input-number
              class="input"
              id="bedroom"
              v-model="bedroom"
              :min="0"
            ></el-input-number>
          </td>
          <td>
            <label class="label" for="toilet">Số phòng tắm, vệ sinh</label>
            <el-input-number
              class="input"
              id="toilet"
              v-model="toilet"
              :min="0"
            ></el-input-number>
          </td>
          <td>
            <label class="label" for="floor">Số tầng</label>
            <el-input-number
              class="input"
              id="floor"
              v-model="floor"
              :min="0"
            ></el-input-number>
          </td>
        </tr>
      </table>
    </el-card>

    <el-card class="contact-infor card">
      <h2>Thông tin liên hệ</h2>
      <label class="label" for="uesrname"
        >Tên liên hệ<span class="required-field"> *</span></label
      >
      <el-input
        class="input"
        id="uesrname"
        v-model="user.name"
        placeholder="Nhập tên liên hệ"
        disabled
      ></el-input>

      <label class="label" for="phone"
        >Số điện thoại<span class="required-field"> *</span></label
      >
      <el-input
        class="input"
        id="phone"
        v-model="user.phone"
        placeholder="Nhập địa chỉ"
        disabled
      ></el-input>

      <label class="label" for="email"
        >Email<span class="required-field"> *</span></label
      >
      <el-input
        class="input"
        id="email"
        v-model="user.email"
        placeholder="Nhập vào email"
        disabled
      ></el-input>

      <div class="btn-action-end">
        <el-button @click="gotoPage('managePost')">Huỷ</el-button>
        <el-button :loading="loading" type="primary" @click="handelSubmit()">Tiếp tục</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import postType from "@/data/postType";
import axios from "axios";
import { mapState } from "vuex";
// import PostTypeApi from "@/api/postType"
import PostApi from "@/api/post";
import ProjectApi from "@/api/project";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import { Notification } from "element-ui";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      PostType: postType,
      username: "",
      activeButton: "sell", // Track the active button, initially set to "ban"
      propertyType: null,
      selected: null,
      dialogLegal: false,
      dialogFurniture: false,
      provinces: [],
      districts: [],
      wards: [],
      quickAddress: "",
      project: "",
      projects: [],
      province: "",
      district: "",
      ward: "",
      street: "",
      address: "",
      title: "",
      description: "",
      images: [],
      images_urls: [],
      legalDocuments: ["Sổ đỏ/ Sổ hồng", "Hợp đồng mua bán", "Đang chờ sổ"],
      newLegal: "",
      legalSelected: "",
      furnitures: ["Đầy đủ", "Cơ bản", "Không có"],
      newFurniture: "",
      furnitureSelected: "",
      size: null,
      price: null,
      value: null,
      bedroom: null,
      toilet: null,
      floor: null,
      email: "",
      unit: [
        { value: "VND", text: "VND" },
        { value: "VND/m2", text: "VND/m2" },
        { value: "Thoả thuận", text: "Thoả thuận" },
      ],
      unitSelected: "VND",
      submitted: false,
      loading : false,
    };
  },
  validations: {
    value: {
      required,
    },
    title: {
      required,
    },
    description: {
      required,
    },
    size: {
      required,
    },
    price: {
      required,
    },
    province: {
      required,
    },
    district: {
      required,
    },
    ward: {
      required,
    },
    address: {
      required,
    },
    images: {
      required,
    },
  },
  computed: mapState({
    user: (state) => state.user,
  }),
  mounted() {
    this.getListProvince();
    if(this.$route.params.id) {
      this.getPostDetail()
    }
  },
  methods: {
    getPostDetail() {
      PostApi.detail(
        this.$route.params.id,
        (response) => {
            this.post = response.data
            this.activeButton = this.post.type
            this.title = this.post.title
            this.description = this.post.description
            this.project = this.post.project_id
            this.province = this.post.province
            this.street= this.post.street
            this.address = this.post.address
            this.legalSelected = this.post.legal_documents
            this.furnitureSelected = this.post.furniture
            this.bedroom = this.post.bedroom
            this.toilet = this.post.toilet
            this.floor = this.post.floor
            this.size = this.post.size
            this.price = this.post.price*1000000
            this.unitSelected = this.post.unit
            this.images = []
            this.post.images.forEach( image => {
              this.images.push({
                url: image
              })
            })
            this.value = this.post.type_id
        },
      )
    },
    async handelSubmit() {
      this.submitted = true;
      if (this.$v.$invalid) {
        return false;
      }
      this.images_urls = [];
      this.images.forEach((image) => {
        this.images_urls.push(image.url);
      });
      this.loading = true

      var data = {
        title: this.title,
        description: this.description,
        type_id: this.value,
        project_id: this.project,
        province: this.province,
        district: this.district,
        ward: this.ward,
        street: this.street,
        address: this.address,
        legal_documents: this.legalSelected,
        furniture: this.furnitureSelected,
        bedroom: this.bedroom,
        toilet: this.toilet,
        floor: this.floor,
        size: this.size,
        price: this.price ? this.price / 1000000 : 0,
        unit: this.unitSelected,
        images: this.images_urls,
      };
      if(this.$route.params.id) {
        this.updatePost(data)
      } else {
        this.createPost(data)
      }
      
    },
    updatePost(data) {
      PostApi.update(
        this.$route.params.id,
        data,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Tin của bạn đã được cập nhật thành công!",
          });
          this.getPostDetail()
          this.loading = false
        },
        (error) => {
          Notification.error({
            title: "Thất bại",
            message: error.data.error,
          });
          this.loading = false
        }
      );
    },
    createPost(data) {
      PostApi.create(
        data,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Tin của bạn đã được thêm thành công, đang chờ duyệt!",
          });
          this.loading = false
          this.$router.push("/quan-ly-tin-dang");
        },
        () => {
          Notification.error({
            title: "Thất bại",
            message: "Đăng tin thất bại",
          });
          this.loading = false
        }
      );
    },
    addLegal() {
      this.legalDocuments.push(this.newLegal);
      this.newLegal = "";
      this.dialogLegal = false;
    },
    addFurniture() {
      this.furnitures.push(this.newFurniture);
      this.newFurniture = "";
      this.dialogFurniture = false;
    },

    listProjectOptions() {
      ProjectApi.listProjectOptions(
        {
          province: this.province,
          district: this.district,
        },
        (response) => {
          this.projects = response.data;
        }
      );
    },

    async getListProvince() {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/v2/province/"
        );
        if (response.status == 200) {
          this.provinces = response.data.results;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getListDistrict(province_id) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/v2/province/district/${province_id}`
        );
        if (response.status == 200) {
          this.districts = response.data.results;
          if(this.$route.params.id) {
            this.district = this.post.district
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getListWard(district_id) {
      try {
        const response = await axios.get(
          `https://vapi.vnappmob.com/api/v2/province/ward/${district_id}`
        );
        if (response.status == 200) {
          this.wards = response.data.results;
          if(this.$route.params.id) {
            this.ward = this.post.ward
            this.street = this.post.street
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleFileChange(event) {
      const newImages = event.target.files;
      const tempImages = [...this.images];
      // Lặp qua từng ảnh mới
      Array.from(newImages).forEach((image) => {
        // Tạo URL cho ảnh và thêm vào mảng
        const imageURL = URL.createObjectURL(image);
        const newImageName = this.generateUniqueName(image.name); // Tạo tên mới cho ảnh
        tempImages.push({ name: newImageName, url: imageURL });
        // Tải lên ảnh lên Firebase Storage với tên mới
        this.uploadImageToFirebase(image, newImageName);
      });
      // Cập nhật giao diện người dùng với danh sách các ảnh
      this.images = tempImages;
    },

    async uploadImageToFirebase(image, imageName) {
      try {
        const storageRef = ref(storage, `posts/` + imageName); // Sử dụng tên mới
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
      const updatedImages = this.images.map((image) => {
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
    province(val) {
      if (val) {
        var $result = val.split("-");
        this.getListDistrict($result[1]);
        this.address = $result[0];
      } else {
        this.districts = [];
        this.wards = [];
        this.address = "";
      }
      this.listProjectOptions();
      this.district = "";
      this.project = "";
    },
    district(val) {
      if (val) {
        var $result = val.split("-");
        this.getListWard($result[1]);
        this.address = $result[0] + ", " + this.province.split("-")[0];
      } else {
        this.wards = [];
        this.address = this.province.split("-")[0];
      }
      this.listProjectOptions();
      this.ward = "";
    },
    ward(val) {
      if (val) {
        var $result = val.split("-");
        this.address =
          $result[0] +
          ", " +
          this.district.split("-")[0] +
          ", " +
          this.province.split("-")[0];
      } else {
        if (this.district) {
          this.address =
            this.district.split("-")[0] + ", " + this.province.split("-")[0];
        }
      }
      this.street = "";
    },
    street(val) {
      if (val) {
        this.address =
          val +
          ", " +
          this.ward.split("-")[0] +
          ", " +
          this.district.split("-")[0] +
          ", " +
          this.province.split("-")[0];
      } else {
        if (this.ward) {
          this.address =
            this.ward.split("-")[0] +
            ", " +
            this.district.split("-")[0] +
            ", " +
            this.province.split("-")[0];
        }
      }
    },
    activeButton() {
      this.value = null;
    },
    project(val) {
      if (val) {
        var selectedProject = this.projects.find(function (project) {
          return project.id === val;
        });

        if (!this.district) {
          this.district = selectedProject.district;
        }

        setTimeout(() => {
          this.ward = selectedProject.ward;
        }, 1000);
        setTimeout(() => {
          if (selectedProject.street) {
            this.street = selectedProject.street;
          }
        }, 2000);

        setTimeout(() => {
          this.address =
            selectedProject.name +
            ", " +
            this.district.split("-")[0] +
            ", " +
            this.province.split("-")[0];
        }, 3000);
      } else {
        this.street = "";
        if (this.ward) {
          this.address =
            this.ward.split("-")[0] +
            ", " +
            this.district.split("-")[0] +
            ", " +
            this.province.split("-")[0];
        }
      }
    },
    '$route'() {
      if(this.$route.params.id) {
        this.getPostDetail()
      } else {
        this.title = ""
        this.description = ""
        this.value = null
        this.project = null
        this.province = ""
        this.district = ''
        this.ward = ""
        this.street = ''
        this.address = ""
        this.legalSelected = null
        this.furnitureSelected = null
        this.bedroom = null
        this.toilet = null
        this.floor = null
        this.size = null
        this.price = null
        this.unitSelected = "m²"
        this.images = []
      }
    }
  },
};
</script>

<style scoped>
.card {
  width: 60%;
  margin: 10px;
  padding: 20px;
}
.basic-infor {
  margin-top: 30px;
}

.create-post {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.header-basic-infor {
  display: flex;
  flex-direction: row;
}

.select-tyle-action {
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
  background-color: #409eff !important;
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