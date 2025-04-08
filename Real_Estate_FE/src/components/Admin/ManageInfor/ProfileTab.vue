<template>
  <div>
    <h5>Thông tin cá nhân</h5>
    <div class="profile">
        <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput3" class="upload-icon" v-if="!hasUploadedAvatar && !admin.avatar">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <label for="fileInput3" class="upload-icon" v-if="hasUploadedAvatar" :style="{ 'background-image': `url('${avatar}')` }">
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <label for="fileInput3" class="upload-icon" v-if="admin.avatar && !hasUploadedAvatar" :style="{ 'background-image': `url('${admin.avatar}')` }">
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedAvatar || admin.avatar" @click="deleteAvatar"></span>
            </div>
            <span>{{ admin.name }}</span>
        </div>
        <div class="infor">
            <label class="label" for="username">Họ và tên</label>
            <el-input placeholder="Họ và tên" v-model="admin.name"></el-input>

            <label class="label">Email</label>
            <el-input placeholder="Email" v-model="admin.email" disabled></el-input>

            <div class="btn-action">
                <el-button type="primary" class="btn" icon="el-icon-check" :loading="loading" @click="update()">Lưu</el-button>
                <el-button type="danger" class="btn" icon="el-icon-close" @click="getInfor()">Huỷ bỏ</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AdminAuthApi from "@/api/admin/adminAuth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/firebase"
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            loading : false,
            avatar: null,
            hasUploadedAvatar: false,
            admin: {},
        };
    },
    computed: mapState({
        adminInfor: (state) => state.admin,
    }),
    mounted() {
        this.getInfor()
    },
    methods: {
        getInfor() {
            this.admin = {
                ...this.adminInfor
            }
            this.hasUploadedAvatar = false
        },
        ...mapActions(['commitSetAdminInfo']),
        update() {
            this.loading = true
            AdminAuthApi.updateProfile(
                {
                    avatar: this.avatar,
                    name: this.admin.name,
                },
                () => {
                    this.loading = false
                    Notification.success({
                        title: "Thành công",
                        message: "Đã cập nhật thông tin cá nhân thành công!",
                    });
                    this.admin.avatar = this.avatar
                    this.commitSetAdminInfo(this.admin)
                    this.getInfor()
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
            this.$refs.fileInput3.value = '';
        },
        deleteAvatar() {
            this.avatar = null
            this.admin.avatar = null
            this.hasUploadedAvatar = false
        }
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
    margin-top: 30px;
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
    cursor: pointer;
    position: absolute;
    right: -7px;
    top: -7px;
}

</style>