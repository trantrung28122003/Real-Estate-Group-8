<template>
  <div>
    <h5>Thông tin cá nhân</h5>
    <div class="profile">
        <div class="avatar">
            <div class="custom-file-input">
                <label for="fileInput3" class="upload-icon" v-if="!hasUploadedAvatar && !user.avatar">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text avt-text">Tải ảnh</div>
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <label for="fileInput3" class="upload-icon" v-if="hasUploadedAvatar" :style="{ 'background-image': `url('${avatar}')` }">
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <label for="fileInput3" class="upload-icon" v-if="user.avatar && !hasUploadedAvatar" :style="{ 'background-image': `url('${user.avatar}')` }">
                    <input type="file" id="fileInput3" @change="handleFileChange" accept="image/*" ref="fileInput3" style="display: none"/>
                </label>
                <span class="el-icon-close delete-avatar-icon" v-if="hasUploadedAvatar || user.avatar" @click="deleteAvatar"></span>
            </div>
            <span>{{ user.name }}</span>
        </div>
        <div class="infor">
            <label class="label" for="username">Họ và tên</label>
            <el-input placeholder="Họ và tên" v-model="user.name"></el-input>

            <label class="label" for="username">Số điện thoại chính</label>
            <el-input placeholder="SĐT chính" v-model="user.phone" disabled></el-input>

            <label class="label">Email</label>
            <el-input placeholder="Email" v-model="user.email" disabled></el-input>

            <div class="btn-action">
                <el-button type="primary" class="btn" icon="el-icon-check" :loading="loading" @click="update()">Lưu</el-button>
                <el-button type="danger" class="btn" icon="el-icon-close" @click="getInfor()">Huỷ bỏ</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AuthApi from "@/api/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "../../firebase"
import { Notification } from 'element-ui'
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            loading : false,
            avatar: null,
            hasUploadedAvatar: false,
            user: {},
        };
    },
    computed: mapState({
        userInfor: (state) => state.user,
    }),
    mounted() {
        this.getInfor()
    },
    methods: {
        getInfor() {
            this.user = {
                ...this.userInfor
            }
            if(this.user.avatar) {
                this.avatar = this.user.avatar;
                this.hasUploadedAvatar = true;
            } else {
                this.hasUploadedAvatar = false;
            }
        },
        ...mapActions(['commitSetUserInfo']),
        update() {
            this.loading = true
            AuthApi.updateProfile(
                {
                    avatar: this.avatar,
                    name: this.user.name,
                },
                () => {
                    this.loading = false
                    Notification.success({
                        title: "Thành công",
                        message: "Đã cập nhật thông tin cá nhân thành công!",
                    });
                    this.user.avatar = this.avatar
                    this.commitSetUserInfo(this.user)
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
            this.user.avatar = null
            this.hasUploadedAvatar = false
        }
    },
}
</script>

<style>
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