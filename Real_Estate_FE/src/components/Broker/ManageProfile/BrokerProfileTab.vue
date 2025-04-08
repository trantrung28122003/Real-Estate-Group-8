<template>
  <div>
    <h5>Thông tin cá nhân</h5>
    <div class="profile">
        <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput4" class="upload-icon" v-if="!hasUploadedAvatar && !user.avatar">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput4" @change="handleFileChange" accept="image/*" ref="fileInput4" style="display: none"/>
                </label>
                <label for="fileInput4" class="upload-icon" v-if="hasUploadedAvatar" :style="{ 'background-image': `url('${imagePreview(avatar)}')` }">
                    <input type="file" id="fileInput4" @change="handleFileChange" accept="image/*" ref="fileInput4" style="display: none"/>
                </label>
                <label for="fileInput4" class="upload-icon" v-if="user.avatar && !hasUploadedAvatar" :style="{ 'background-image': `url('${user.avatar}')` }">
                    <input type="file" id="fileInput4" @change="handleFileChange" accept="image/*" ref="fileInput4" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedAvatar || user.avatar" @click="deleteAvatar"></span>
            </div>
            <span style="margin-bottom: 20px">{{ user.name }}</span>

            <div class="custom-file-input">
              <el-image
                style="width: 100px; height: 100px"
                :src="brokerInfor.certificate_url"
              ></el-image>
              <label class="label">Giấy chứng chỉ hành nghề</label>
            </div>
        </div>
        <div class="infor">
            <label class="label" for="username">Họ và tên</label>
            <el-input placeholder="Họ và tên" v-model="user.name"></el-input>

            <label class="label" for="username">Số điện thoại chính</label>
            <el-input placeholder="SĐT chính" v-model="user.phone" disabled></el-input>

            <label class="label">Email</label>
            <el-input placeholder="Email" v-model="user.email" disabled></el-input>

            <label class="label">Địa chỉ</label>
            <el-input v-model="brokerInfor.address" placeholder="Địa chỉ"></el-input>

            <label class="label">Mô tả</label>
            <el-input type="textarea" v-model="brokerInfor.description" :autosize="{ minRows: 5}" placeholder="Mô tả về bản thân"></el-input>

            <label class="label">Khu vực và loại hình môi giới</label>

            <ul>
                <li v-for="(item, index) in brokerageAreas" :key="index" style="margin-bottom: 5px;">
                    {{ showBrokerageArea(item) }}
                    <el-button @click="deleteItem(index)" icon="el-icon-delete" size="mini" style="border: none;" circle></el-button>
                </li>
            </ul>
            <table style="width: 100%">
                <tr>
                    <td style="width: 50%">
                        <el-select class="select" id="sell-rent" v-model="typeSelected" placeholder="-----  Loại giao dịch  -----">
                        <el-option v-for="item in choicesType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                    <td style="width: 50%">
                        <el-select class="select" id="post-type" v-model="type_id" placeholder="--- Loại hình bất động sản ---" filterable clearable>
                        <el-option v-for="item in listPostType" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td style="width: 50%">
                        <el-select class="select" id="province" v-model="province" placeholder="-----  Tỉnh, thành phố  -----" filterable clearable>
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
                        <el-select class="select" v-model="project" placeholder="Dự án" clearable filterable>
                        <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <span v-if="submitted && !$v.brokerageAreas.required" class="p-error">Phải có ít nhất một khu vực và loại hình môi giới</span>
            <div style="display: flex; justify-content: center;">
                <el-button @click="addBrokerageArea()" icon="el-icon-plus" size="small" circle></el-button>
            </div>

            <div class="btn-action">
                <el-button type="primary" class="btn" icon="el-icon-check" @click="update()">Lưu</el-button>
                <el-button type="danger" class="btn" icon="el-icon-close" @click="getInfor()">Huỷ bỏ</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AuthApi from "@/api/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../../firebase"
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import axios from "axios"
import postType from '@/data/postType.js'
import ProjectApi from '@/api/project'
export default {
    data() {
        return {
            avatar: null,
            hasUploadedAvatar: false,
            user: {},
            provinces: [],
            districts: [],
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
            brokerInfor: {
                address: "",
                description: "",
                certificate_url: "",
            },
            postType: postType,
            listPostType: postType.sell,
            brokerageAreas: [],
            type_id: null,
            province: "",
            district: "",
            submitted: false,
            address: "",
            description: "",
            project: null,
            projects: [],
            selectedProject: {},
        };
    },
    computed: mapState({
        userInfor: (state) => state.user,
    }),
    created() {
      this.getListProvince()
    },
    mounted() {
        this.getInfor()
    },
    methods: {
        getInfor() {
            this.user = {
                ...this.userInfor
            }
            this.brokerInfor = this.user.broker_infor
            this.brokerageAreas = [...this.user.broker_infor.areas]
            this.hasUploadedAvatar = false
            this.project = null
            this.selectedProject = {}
        },
        ...mapActions(['commitSetUserInfo']),
        async update() {
            if(this.avatar) {
                var downloadURL = ''
                if(this.avatar instanceof File) {
                    var storageRef = ref(
                    storage,
                    `avatars/` +
                        Math.random().toString(36).slice(2, 8) +
                        `${this.avatar.name}`
                    );
                    await uploadBytes(storageRef, this.avatar);
                    downloadURL = await getDownloadURL(storageRef);
                } else {
                    downloadURL = this.avatar
                }
            }
            this.user.broker_infor.areas = this.brokerageAreas
            AuthApi.updateProfile(
                {
                  avatar: downloadURL,
                  name: this.user.name,
                  broker_infor: this.user.broker_infor
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Đã cập nhật thông tin cá nhân thành công!",
                    });
                    this.user.avatar = downloadURL
                    this.commitSetUserInfo(this.user)
                    this.getInfor()
                },
                (error) => {
                    Notification.error({
                        title: "Thất bại",
                        message: error.data.error,
                    });
                }
            )
        },
        
        handleFileChange(event) {
            const file = event.target.files[0];
                if (file) {
                    this.avatar = file;
                    this.hasUploadedAvatar = true; // Đánh dấu rằng đã có ảnh
                }
            // Đặt lại input để cho phép chọn lại cùng một tệp
            this.$refs.fileInput4.value = '';
        },
        imagePreview(file) {
            if(file instanceof File) {
                return URL.createObjectURL(file)
            }
        },
        deleteAvatar() {
            this.avatar = null
            this.user.avatar = null
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
            this.brokerageAreas.splice(index, 1);
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
        avatar(val) {
            if(!val) {
                this.hasUploadedAvatar = false;
            }
        },
        province(val){
            if(val){
                var $result = val.split("-");
                this.getListDistrict($result[1]);
                this.address = $result[0];
            } else {
                this.districts = [];
                this.wards = [];
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
    margin-top: 30px;
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

.custom-file-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
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

.delete-avatar-icon{
    position: absolute;
    right: -7px;
    top: -7px;
}

</style>