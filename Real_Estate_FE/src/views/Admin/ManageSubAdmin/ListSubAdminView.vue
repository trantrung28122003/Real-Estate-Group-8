<template>
  <div class="container">
    <h3>Quản lý nhân sự</h3>
    <el-input
        placeholder="Tìm kiếm theo email"
        class="search-field"
        v-model="search"
        clearable
    >
    </el-input>
    <el-button type="success" style="margin-left: 10px" @click="listAdmin(1)">Tìm kiếm</el-button>
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
    <el-table
        border
        :data="admins"
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
            prop="name"
            label="Họ tên"
            width="180"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="email"
            width="300"
            label="Email">
        </el-table-column>
        <el-table-column
            align="center"
            label="Quyền"
        >
            <template slot-scope="scope">
                <el-tooltip
                    v-for="role in scope.row.roles"
                    :key="role.id"
                    content="Bottom center" 
                    placement="bottom" 
                    effect="light"
                    style="margin-right: 15px; margin-bottom: 10px"
                >
                    <ul slot="content" style="padding: 5px 5px 0px 15px;">
                        <li v-for="permission, index in role.permissions" :key="index">
                            {{ permissions[permission].label }}
                        </li>
                    </ul>
                    <el-tag
                        type="info"
                    >
                        {{role.name}}
                    </el-tag>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="Trạng thái"
            width="120"
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
                    @click="handleOpenUpdateModal(scope.row)">Sửa</el-button
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
    <UpdateRoleSubAdminModal :isActive="isActiveUpdate" :data="currentAdmin" :roles="roles" @closeUpdateDialog="isActiveUpdate = !isActiveUpdate" @updateRole="listAdmin(1)"/>
    <div v-if="admins.length" class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import permissions from '@/data/permission'
import SubAminApi from '@/api/admin/subAdmin'
import AdminRoleApi from '@/api/admin/adminRole'
import { Notification } from "element-ui"
import UpdateRoleSubAdminModal from '@/components/Admin/ManageSubAdmin/UpdateRoleSubAdminModal.vue'
export default {
    data() {
        return {
            permissions: permissions,
            search: '',
            admins: [],
            roles: [],
            currentAdmin: {},
            isActiveUpdate: false,
            currentPage: 1,
            totalPage: 0,
            perPage: 0,
            total: 0,
        }
    },
    mounted() {
        this.listAdmin(1)
        this.listRole()
    },
    components: {
        UpdateRoleSubAdminModal,
    },
    methods: {
        listRole() {
            AdminRoleApi.listOption(
                (response) => {
                    this.roles = response.data
                },
            )
        },
        listAdmin(page) {
            SubAminApi.list(
                page,
                {
                    'search': this.search
                },
                (response) => {
                    this.admins = response.data.data
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

        handleOpenUpdateModal(admin) {
            this.currentAdmin = admin
            this.isActiveUpdate = true
        },

        handleReset() {
            this.search = ''
            this.listAdmin(1)
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

        handleBlock(id) {
            SubAminApi.blockAccount(
                id,
                (response) => {
                    Notification.success({
                        title: "Thành công",
                        message: response.data,
                    });
                    this.listAdmin(this.currentPage)
                },
            )
        },

        handleChangPage(val) {
            this.listAdmin(val)
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