<template>
  <div class="create-post">
      <div class="container">
        <el-card class="post-infor card">
            <h2>Thông tin yêu cầu</h2>
            <label class="label" for="title">Tiêu đề<span class="required-field"> *</span></label>
            <el-input type="text" class="input" id="title" v-model="title" placeholder="VD: Cần tìm nhà đất tại Trần Đại Nghĩa" required minlength="30" maxlength="99" show-word-limit></el-input>
            <p v-if="submitted && !$v.title.required" class="p-error">Tiêu đề không được để trống!</p>

            <table style="width: 100%">
                <tr>
                    <td style="width: 50%">
                        <label class="label">Loại giao dịch<span class="required-field"> *</span></label>
                        <el-select class="select" id="sell-rent" v-model="typeSelected" placeholder="-----  Loại giao dịch  -----">
                        <el-option v-for="item in choicesType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                    <td style="width: 50%">
                        <label class="label">Loại bất động sản<span class="required-field"> *</span></label>
                        <el-select class="select" id="post-type" v-model="type_id" placeholder="--- Loại hình bất động sản ---" filterable clearable>
                        <el-option v-for="item in listPostType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%">
                    </td>
                    <td style="width: 50%">
                        <span v-if="submitted && !$v.type_id.required" class="p-error">Loại bất động sản không được để trống</span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%">
                        <label class="label" for="province">Tỉnh, thành phố<span class="required-field"> *</span></label>
                        <el-select class="select" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
                        <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
                        </el-select>
                    </td>
                    <td style="width: 50%">
                        <label class="label" for="district">Quận, huyện<span class="required-field"> *</span></label>
                        <el-select :disabled="!province" class="select" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
                        <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%">
                        <span v-if="submitted && !$v.province.required" class="p-error">Tỉnh, thành phố không được để trống!</span>
                    </td>
                    <td style="width: 50%">
                        <span v-if="submitted && province && !$v.district.required" class="p-error">Quận, huyện không được để trống!</span>
                    </td>
                </tr>
            </table>

            <label class="label" for="project">Dự án</label>
            <el-select class="select" id="project" v-model="project" placeholder="Chọn dự án" clearable filterable>
                <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <table style="width: 100%">
                <tr>
                    <td style="width: 70%">
                        <label class="label" for="price">Tài chính<span class="required-field"> *</span></label>
                        <el-input-number class="input" id="price" style="width: 100%;" v-model="price" :controls="false" :min="0" placeholder="Nhập số tiền muốn chi trả"></el-input-number>
                    </td>
                    <td style="padding-left: 10px">
                        <label class="label" for="title">Đơn vị<span class="required-field"> *</span></label>
                        <el-select class="select" id="unit" v-model="unitSelected">
                            <el-option v-for="item in unit" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>
                      <span v-if="submitted && (!$v.price.required || !$v.price.isPositiveNumber)" class="p-error">Tài chính không được để trống!</span>
                    </td>
                    <td>
                    </td>
                </tr>
                
            </table>

            <table style="width: 100%">
                <tr>
                    <td>
                        <label class="label" for="bedroom">Số phòng ngủ</label>
                        <el-input-number class="input" id="bedroom" v-model="bedroom" :min="0"></el-input-number>
                    </td>
                    <td>
                        <label class="label" for="living-room">Số phòng khách</label>
                        <el-input-number class="input" id="living-room" v-model="livingRoom" :min="0"></el-input-number>
                    </td>
                    <td>
                        <label class="label" for="floor">Số tầng</label>
                        <el-input-number class="input" id="floor" v-model="floor" :min="0"></el-input-number>
                    </td>
                </tr>
            </table>

            <label class="label" for="description">Diện tích</label>
            <table>
                <tr>
                    <td>
                        <label>Từ</label>
                        <el-input-number style="margin: 0px 10px" class="input" id="living-room" v-model="startSize" :controls="false" :min="0"><span slot="suffix">mw</span></el-input-number>
                    </td>
                    <td>
                        <label>Đến</label>
                        <el-input-number style="margin-left: 10px" class="input" id="living-room" v-model="endSize" :controls="false" :min="0"></el-input-number>
                    </td>
                </tr>
            </table>

            <label class="label" for="description">Mô tả<span class="required-field"> *</span></label>
            <el-input type="textarea" :autosize="{ minRows: 6}" class="input" id="description" v-model="description" placeholder="Nhập một vài thông tin bạn cần ngoài những thông tin cung cấp ở trên. VD: Yêu cầu gần  Đại học Bách Khoa Hà Nội,..." required minlength="30" maxlength="3000" show-word-limit></el-input>
            <p v-if="submitted && !$v.description.required" class="p-error">Mô tả không được để trống!</p>

            <div style="display:flex; justify-content: center; margin-top: 20px;">
                <el-button>Huỷ bỏ</el-button>
                <el-button type="primary" @click="handelSubmit()">Tiếp tục</el-button>
            </div>
        </el-card>
      </div>
  </div>
  
</template>

<script>
import postType from "@/data/postType"
import axios from "axios"
import ProjectApi from '@/api/project'
import AdviceRequestApi from "@/api/adviceRequest"
import { Notification } from 'element-ui'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
        type_id: null,
        typeSelected: 'sell',
        choicesType: [
            {
                text: 'Bán',
                value: 'sell'
            },
            {
                text: 'Cho thuê',
                value: 'rent'
            }
        ],
        listPostType: postType.sell,
        PostType : postType,
        provinces: [],
        districts: [],
        project: "",
        projects: [],
        province: "",
        district: "",
        title: "",
        description: "",
        size: null,
        price: null,
        bedroom: null,
        floor: null,
        livingRoom: null,
        startSize: null,
        endSize: null,
        unit: [
            { value: 1, text: "Triệu" },
            { value: 1000, text: "Tỷ" },
        ],
        unitSelected: 1,
        submitted: false
    };
  },
  validations: {
    type_id: {
      required,
    },
    title: {
      required,
    },
    description: {
      required,
    },
    price: {
      required,
      isPositiveNumber(value) {
        return value > 0
      }
    },
    province: {
      required,
    },
    district: {
      required,
    },
  },
  mounted() {
    this.getListProvince();
  },
  methods: {
    async handelSubmit() {
      this.submitted = true
      if(this.$v.$invalid) {
        return false
      }
      var data = {
        title : this.title,
        description : this.description,
        type_id : this.type_id,
        project_id : this.project,
        province : this.province,
        district : this.district,
        data : {
          bedroom : this.bedroom,
          livingRoom : this.livingRoom,
          floor : this.floor,
          price : this.price * this.unitSelected,
          size : this.size,
        },
      }
      this.createRequest(data)
    },
    createRequest(data) {
      AdviceRequestApi.create(
        data,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Thêm yêu cầu tư vấn thành công!",
          });
          this.$router.push('/quan-ly-yeu-cau')
        },
        (error) => {
          console.log(error)
          Notification.error({
            title: "Thất bại",
            message: "Đăng yêu cầu thất bại",
          });
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
    async getListDistrict( province_id) {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/district/${province_id}`);
        if(response.status == 200) {
          this.districts = response.data.results;
        }
      } catch (error) {
        console.error(error);
      }
    },
    updateSizeSelected() {
      if(this.startSize > this.endSize && this.endSize != 0){
        var $temp = this.startSize
        this.startSize = this.endSize
        this.endSize = $temp
      }
      if (this.startSize > 0 && this.endSize > 0) {
        this.size = `${this.startSize} - ${this.endSize} m²`
      } else if (this.startSize > 0) {
      this.size = `>= ${this.startSize} m²`
      } else if (this.endSize > 0) {
        this.size = `<= ${this.endSize} m²`
      } else {
        this.size = ""
      }
    },
    listProjectOptions() {
      ProjectApi.listProjectOptions(
        {
          province : this.province,
          district : this.district,
        },
        (response) => {
          this.projects = response.data
        }
      )
    },
  },

  watch: {
    province(val){
      if(val){
        var $result = val.split("-");
        this.getListDistrict($result[1]);
        this.address = $result[0];
      } else {
        this.districts = [];
        this.wards = [];
        this.address = "";
        this.project = ""
      }
      this.listProjectOptions()
      this.district = "";
    },
    district() {
      this.listProjectOptions()
    },
    typeSelected(val) {
      if(val == 'rent') {
        this.listPostType = {
          ...this.PostType.rent
        }
      } else {
        this.listPostType = {
          ...this.PostType.sell
        }
      }
      this.type_id = null
    },
    endSize() {
      this.updateSizeSelected()
    },
    startSize() {
      this.updateSizeSelected()
    },
    project(val) {
      if(val) {
        var selectedProject = this.projects.find(function(project) {
          return project.id === val;
        })

        if(!this.district) {
          this.district = selectedProject.district
        }
      }
    }
  },
};
</script>

<style scoped>
.card {
  width: 60%;
  margin: 30px 10px 10px 10px;
  padding: 20px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

.label {
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}

.input {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>