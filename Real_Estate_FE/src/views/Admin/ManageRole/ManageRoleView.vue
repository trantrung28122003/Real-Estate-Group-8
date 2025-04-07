<template>
  <div class="container">
    <h3>Quản lý quyền</h3>
    <div>Hiện có {{ total }} quyền </div>
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 20px">
        <div>
            <el-input
                placeholder="Tìm kiếm theo tên quyền"
                class="search-field"
                v-model="search"
                clearable
            >
            </el-input>
            <el-button type="success" style="margin-left: 10px" @click="listRole(1)">Tìm kiếm</el-button>
            <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
        </div>
        <div >
            <el-button type="primary" @click="isActive = !isActive" icon="el-icon-plus">Thêm mới</el-button>
        </div>
    </div>
    <el-table
        border
        :data="roles"
        stripe
        style="width: 100%; margin-top: 20px"
    >
        <el-table-column
            align="center"
            prop="id"
            label="ID"
            width="100">
        </el-table-column>
        <el-table-column
            align="center"
            prop="name"
            label="Tên quyền"
        >
        </el-table-column>
        <el-table-column
            label="Các chức năng có thể thực hiện"
        >
            <template slot-scope="scope">
                <ul v-if="scope.row.permissions.length">
                    <li v-for="(permission, index) in scope.row.permissions" :key="index"><span>{{ permissions[permission].label }}</span></li>
                </ul>
                <span v-else>N/A</span>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="Hành động"
            width="180"
        >
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleOpenUpdateModal(scope.row)">Sửa</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="openDeleteConfirm(scope.row)">Xoá</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <CreateRoleModal :isActive="isActive" :permissions="permissions" @closeDialog="isActive = !isActive" @createRole="listRole(1)"/>
    <UpdateRoleModal :isActive="isActiveUpdate" :data="currentRole" :permissions="permissions" @closeUpdateDialog="isActiveUpdate = !isActiveUpdate" @updateRole="listRole(1)"/>
    <div v-if="roles.length" class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import permissions from '@/data/permission'
import AdminRoleApi from '@/api/admin/adminRole'
import { Notification } from "element-ui"
import CreateRoleModal from '@/components/Admin/ManageRole/CreateRoleModal.vue'
import UpdateRoleModal from '@/components/Admin/ManageRole/UpdateRoleModal.vue'
export default {
    data() {
        return {
            permissions: permissions,
            search: '',
            isActive: false,
            isActiveUpdate: false,
            currentRole: {},
            roles: [],
            currentPage: 1,
            totalPage: 0,
            perPage: 0,
            total: 0,
        }
    },
    mounted() {
        this.listRole(1)
    },
    components: {
        CreateRoleModal,
        UpdateRoleModal,
    },
    methods: {
        listRole(page) {
            AdminRoleApi.list(
                page,
                {
                    'search': this.search
                },
                (response) => {
                    this.roles = response.data.data
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

        goToUserDetails(id) {
            this.$router.push({ name: 'quan-ly-chi-tiet-nguoi-dung', params: { id: id } });
        },

        openDeleteConfirm(role) {
            this.$confirm("Bạn muốn xoá quyền " + role.name + ". Bạn muốn tiếp tục?", "Xác nhận", {
                confirmButtonText: "Xoá",
                cancelButtonText: "Huỷ",
                type: "warning",
            })
            .then(() => {
                this.handleBlock(role.id);
            })
            .catch(() => {});
        },

        handleReset() {
            this.search = ''
            this.listRole(1)
        },

        handleBlock(id) {
            AdminRoleApi.delete(
                id,
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Xoá quyền thành công",
                    });
                    this.listRole(this.currentPage)
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
                            message: "Duyệt dự án thất bại",
                        });
                    }
                }
            )
        },

        handleOpenUpdateModal(role) {
            this.currentRole = role
            this.isActiveUpdate = true
        },

        handleChangPage(val) {
            this.listRole(val)
        },
    }
}
</script>

<style scoped>
.search-field {
  width: 400px;
}
.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>