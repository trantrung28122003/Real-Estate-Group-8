<template>
  <div style="margin-top: 20px;">
    <h5>Đăng ký tài khoản môi giới</h5>
    <div class="profile">
        <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput" class="upload-icon-square" v-if="!hasUploadedBrokerCertificate">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input :disabled="disable" type="file" id="fileInput" @change="handleBrokerCertificateChange" accept="image/*" ref="fileInput" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedBrokerCertificate && !disable" @click="handleDeleteCertificate"></span>
                <label for="fileInput" class="upload-icon-square" v-if="hasUploadedBrokerCertificate" :style="{ 'background-image': `url('${brokerCertificate}')` }">
                    <input :disabled="disable" type="file"  id="fileInput" @change="handleBrokerCertificateChange" accept="image/*" ref="fileInput" style="display: none"/>
                </label>
            </div>
            <label class="label">Giấy chứng chỉ hành nghề<span class="required-field"> *</span></label>
            <span v-if="submitted && !$v.brokerCertificate.required" class="p-error">Giấy chứng chỉ hành nghề không được để trống</span>
        </div>
        <div class="infor">
            <label class="label">Tên <span class="required-field"> *</span></label>
            <el-input v-model="user.name" placeholder="Họ và tên" disabled></el-input>

            <label class="label">Số điện thoại <span class="required-field"> *</span></label>
            <el-input v-model="user.phone" placeholder="SĐT liên hệ" disabled></el-input>

            <label class="label">Email <span class="required-field"> *</span></label>
            <el-input v-model="user.email" placeholder="Email" disabled></el-input>

            <label class="label">Địa chỉ</label>
            <el-input :disabled="disable" v-model="broker.address" placeholder="Địa chỉ"></el-input>

            <label class="label">Mô tả</label>
            <el-input :disabled="disable" type="textarea" v-model="broker.description" :autosize="{ minRows: 5}" placeholder="Mô tả về bản thân"></el-input>

            <label class="label">Khu vực và loại hình môi giới</label>

            <ul>
                <li v-for="(item, index) in brokerageAreas" :key="index" style="margin-bottom: 5px;">
                    {{ showBrokerageArea(item) }}
                    <el-button :disabled="disable" @click="deleteItem(index)" icon="el-icon-delete" size="mini" style="border: none;" circle></el-button>
                </li>
            </ul>
            <table style="width: 100%">
                <tr>
                    <td style="width: 50%">
                        <el-select :disabled="disable" class="select" id="sell-rent" v-model="typeSelected" placeholder="-----  Loại giao dịch  -----">
                        <el-option v-for="item in choicesType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                    <td style="width: 50%">
                        <el-select :disabled="disable" class="select" id="post-type" v-model="type_id" placeholder="--- Loại hình bất động sản ---" filterable clearable>
                        <el-option v-for="item in listPostType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%">
                        <el-select :disabled="disable" class="select" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
                        <el-option v-for="item in provinces" :key="item.province_id" :label="item.province_name" :value="item.province_name + '-' + item.province_id"></el-option>
                        </el-select>
                    </td>
                    <td style="width: 50%">
                        <el-select :disabled="!province" class="select" id="district" v-model="district" placeholder="-----  Quận, huyện  -----" filterable clearable>
                        <el-option v-for="item in districts" :key="item.district_id" :label="item.district_name" :value="item.district_name + '-' + item.district_id"></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <table style="width: 100%">
                <tr>
                    <td style="width: 50%">
                        <el-select :disabled="disable" class="select" v-model="project" placeholder="Dự án" clearable filterable>
                        <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <span v-if="submitted && !$v.brokerageAreas.required" class="p-error">Phải có ít nhất một khu vực và loại hình môi giới</span>
            <div style="display: flex; justify-content: center;">
                <el-button :disabled="disable" @click="addBrokerageArea()" icon="el-icon-plus" size="small" circle></el-button>
            </div>
            <div v-if="user.registeredBroker" class="btn-action">
                <div v-if="isEdit">
                    <el-button type="primary" class="btn" icon="el-icon-check" @click="handleSubmit()">Lưu</el-button>
                    <el-button type="danger" class="btn" icon="el-icon-close" @click="endEdit()">Huỷ bỏ</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" class="btn" icon="el-icon-edit" @click="changeEditView()">Sửa</el-button>
                </div>
            </div>
            <div v-else class="btn-action">
                <el-button type="primary" class="btn" icon="el-icon-check" @click="handleSubmit()">Lưu</el-button>
                <el-button type="danger" class="btn" icon="el-icon-close" @click="handleReset()">Huỷ bỏ</el-button>
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
import { required } from 'vuelidate/lib/validators'
import { mapState } from "vuex"
import axios from "axios"
import ProjectApi from '@/api/project'
import postType from '@/data/postType.js'
export default {
    data() {
        return {
            disable: false,
            isEdit: false,
            provinces: [],
            districts: [],
            projects: [],
            project: "",
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
            postType: postType,
            listPostType: postType.sell,
            brokerCertificate: null,
            hasUploadedBrokerCertificate: false,
            broker: {
                description: "",
                address: "",
                certificate_url: null,
            },
            brokerageAreas: [],
            type_id: null,
            province: "",
            district: "",
            submitted: false,
            selectedProject: {},
        };
    },
    validations: {
        brokerCertificate: {
            required
        },
        brokerageAreas: {
            required
        }
    },
    computed: mapState({
        user: (state) => state.user,
    }),
    mounted() {
        this.getListProvince();
        if(this.user.registeredBroker) {
            this.disable = true
            this.getDetailBrokerRegistration()
        }
    },
    methods: {
        getDetailBrokerRegistration() {
            AuthApi.getDetailBrokerRegistration(
                (response) => {
                    this.broker = { ...response.data }
                    this.brokerageAreas = this.broker.areas
                    this.brokerCertificate = this.broker.certificate_url
                    this.hasUploadedBrokerCertificate = true
                }
            )
        },
        handleSubmit() {
            this.submitted = true
            if(this.$v.$invalid) {
                return false
            }
            this.broker.certificate_url = this.brokerCertificate

            AuthApi.brokerRegister(
                {
                    isUpdate: this.user.registeredBroker,
                    ...this.broker,
                    brokerageAreas: this.brokerageAreas,
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: this.user.registeredBroker ? "Bạn đã cập nhật yêu cầu đăng kí tài khoản môi giới thành công! Yêu cầu sẽ được kiểm duyệt sau!" : "Bạn đã gửi yêu cầu đăng kí tài khoản môi giới thành công! Yêu cầu sẽ được kiểm duyệt sau!",
                    });
                    this.disable = true
                    this.user.registeredBroker = true
                    this.isEdit = false
                },
                (error) => {
                    Notification.error({
                        title: "Thất bại",
                        message: error.data.error,
                    });
                }
            )
        },
        changeEditView() {
            this.disable = false
            this.isEdit = true
        },
        endEdit() {
            this.disable = true
            this.isEdit = false
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

        handleReset() {
            this.typeSelected = 'sell'
            this.brokerageAreas = []
            this.type_id = null
            this.province = null
            this.district = null
            this.submitted = false
            this.broker 
            this.broker.email = ""
            this.broker.address = ""
            this.broker.certificate_url = null
            this.project = null
            this.selectedProject = {}
        },

        async handleBrokerCertificateChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.brokerCertificate = URL.createObjectURL(file)
                this.hasUploadedBrokerCertificate = true; // Đánh dấu rằng đã có ảnh
                const newImageName = this.generateUniqueName(file.name) // Tạo tên mới cho ảnh
                const storageRef = ref(storage, `broker/certificat/` + newImageName); // Sử dụng tên mới
                await uploadBytes(storageRef, file);
                this.brokerCertificate = await getDownloadURL(storageRef);
            }
            this.$refs.fileInput.value = '';
        },
        handleDeleteCertificate() {
            this.hasUploadedBrokerCertificate = false
            this.brokerCertificate = null
        },
        async getListProvince() {
            try {
                const response = await axios.get("https://vapi.vnappmob.com/api/v2/province/")
                if(response.status == 200) {
                    this.provinces = response.data.results
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getListDistrict( province_id) {
            try {
                const response = await axios.get(`https://vapi.vnappmob.com/api/v2/province/district/${province_id}`)
                if(response.status == 200) {
                    this.districts = response.data.results
                }
            } catch (error) {
                console.error(error)
            }
        },
        addBrokerageArea() {
            if(!this.type_id || !this.province || !this.district) {
                return false
            }
            this.brokerageAreas.push({
                type_id: this.type_id,
                province: this.province,
                district: this.district,
                project_id: this.project,
                project_name: this.selectedProject.name,
            })
            this.type_id = null
            this.province = null
            this.district = null
            this.project = null
            this.selectedProject = {}
        },
        deleteItem(index) {
            this.brokerageAreas.splice(index, 1)
        }
    },
    watch: {
        province(val){
            if(val){
                var $result = val.split("-")
                this.getListDistrict($result[1])
                this.address = $result[0]
            } else {
                this.districts = []
                this.wards = []
                this.address = ""
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
                    ...this.postType.rent
                }
            } else {
                this.listPostType = {
                    ...this.postType.sell
                }
            }
        },
        project(val) {
            if(val) {
                this.selectedProject = this.projects.find(function(project) {
                    return project.id === val;
                })

                if(!this.district) {
                    this.district = this.selectedProject.district
                }
            }
        }
    }
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
  position: absolute;
  right: -15px;
  top: -10px;
  cursor: pointer;
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