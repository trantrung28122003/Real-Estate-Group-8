<template>
  <div class="container">
    <h3>Quản lý người dùng</h3>
    <el-input
        placeholder="Tìm kiếm theo email hoặc số điện thoại"
        class="search-field"
        v-model="search"
        clearable
    >
    </el-input>
    <el-button type="success" style="margin-left: 10px" @click="listUser(1)">Tìm kiếm</el-button>
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
    <el-table
        border
        :data="users"
        stripe
        style="width: 100%; margin-top: 20px"
    >
        <el-table-column
            fixed
            align="center"
            prop="id"
            label="ID"
            width="80">
        </el-table-column>
        <el-table-column
            align="center"
            label="Avatar"
            width="100">
            <template slot-scope="scope">
                <el-image class="hover-pointer avt" v-if="scope.row.avatar" shape="circle" :size="60" @click="openPreviewImage(scope.row.avatar)" fit="fill" :src="scope.row.avatar"></el-image>
                <el-avatar v-else shape="circle" :size="60" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="name"
            label="Họ tên"
            width="180"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="email"
            label="Email">
        </el-table-column>
        <el-table-column
            align="center"
            prop="phone"
            label="Điện thoại"
            width="150">
        </el-table-column>
        <el-table-column
            align="center"
            label="Trạng thái"
            width="150"
        >
            <template slot-scope="scope">
                <el-tag
                    v-if="scope.row.status"
                    type="success"
                >
                    Hoạt động
                </el-tag>
                <el-tag
                    v-else
                    type="danger"
                >
                    Khoá
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            align="center"
            label="Hành động"
            width="180"
        >
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="goToUserDetails(scope.row.id)">Xem</el-button
                >
                <el-button v-if="scope.row.status == 1"
                    size="mini"
                    type="danger"
                    @click="openDeleteConfirm(scope.row.id)">Khoá</el-button
                >
                <el-button v-else
                    size="mini"
                    type="primary"
                    @click="handleBlock(scope.row.id)">Mở khoá</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <preview-image
      :imageUrl="selectedImageUrl"
      :isVisible="isModalVisible"
      @close="closePreviewImage()"
    />
    <div v-if="users.length" class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import AdminUserApi from '@/api/admin/adminUser'
import { Notification } from "element-ui"
import PreviewImage from "@/components/Global/PreviewImage.vue";
export default {
    data() {
        return {
            search: '',
            users: [],
            currentPage: 1,
            totalPage: 0,
            perPage: 0,
            total: 0,
            selectedImageUrl: null,
            isModalVisible: false,
        }
    },
    components: {
        PreviewImage
    },
    mounted() {
        this.listUser(1)
    },
    methods: {
        listUser(page) {
            AdminUserApi.list(
                page,
                {
                    'search': this.search
                },
                (response) => {
                    this.users = response.data.data
                    this.currentPage = page
                    this.perPage = response.data.per_page
                    this.totalPage = response.data.last_page
                    this.total = response.data.total
                },
                (error) => {
                    if(error?.response?.data?.code) {
                        if(error.response.data.code === 403) {
                            Notification.error({
                                title: "Thất bại",
                                message: error.response.data.error,
                            });
                            this.goBack()
                        }
                    }
                }
            )
        },

        openPreviewImage(imageUrl) {
            this.selectedImageUrl = imageUrl;
            this.isModalVisible = true;
        },
        closePreviewImage() {
            this.selectedImageUrl = null
            this.isModalVisible = false
        },

        goToUserDetails(id) {
            this.$router.push({ name: 'quan-ly-chi-tiet-nguoi-dung', params: { id: id } });
        },

        openDeleteConfirm(id) {
            this.$confirm("Bạn muốn khoá tài khoản này. Bạn muốn tiếp tục?", "Xác nhận", {
                confirmButtonText: "Khoá",
                cancelButtonText: "Huỷ",
                type: "warning",
            })
            .then(() => {
                this.handleBlock(id);
            })
            .catch(() => {});
        },

        handleReset() {
            this.search = ''
            this.listUser(1)
        },

        handleBlock(id) {
            AdminUserApi.blockAccount(
                id,
                (response) => {
                    Notification.success({
                        title: "Thành công",
                        message: response.data,
                    });
                    this.listUser(this.currentPage)
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
                }
            )
        },

        handleChangPage(val) {
            this.listUser(val)
        },
    }
}
</script>

<style scoped>
.search-field {
  width: 400px;
  margin-top: 20px;
}
.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>