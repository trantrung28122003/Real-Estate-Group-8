<template>
  <el-table
        border
        :data="news"
        stripe
        style="width: 100%; margin-top: 20px"
    >
        <el-table-column
            align="center"
            fixed
            prop="id"
            label="ID"
            width="80">
        </el-table-column>
        <el-table-column align="center" label="Ảnh đại diện" width="170">
            <template slot-scope="scope">
            <el-image
                :lazy="true"
                style="width: 150px; height: 100px"
                fit="cover"
                :src="scope.row.image"
            ></el-image>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Tiêu đề" width="220">
            <template slot-scope="scope">
            <span style="font-weight: 600; color: #0e58a0">{{
                scope.row.title
            }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Tiêu đề phụ" width="350">
            <template slot-scope="scope">
            <span class="subtitle-display">{{
                scope.row.subtitle
            }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Nguồn" width="200">
            <template slot-scope="scope">
            <a :href="scope.row.source" target="_blank"> {{ scope.row.source }} </a>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Tin tức về BĐS thuộc tỉnh/thành phố" width="200">
            <template slot-scope="scope">
            <span> {{ scope.row.province ? showProvince(scope.row.province) : "N/A" }} </span>
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
                    Hiển thị
                </el-tag>
                <el-tag
                    v-else
                    type="danger"
                >
                    Xoá
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column align="center" label="Cập nhật vào" width="120">
            <template slot-scope="scope">
            <span>{{ showTime(scope.row.updated_at) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            align="center"
            label="Hành động"
            width="220"
        >
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="gotoDetailPage(scope.row.id)">Xem</el-button
                >
                <el-button
                    v-if="scope.row.status == 1 && (admin.role === 0 || admin.id === scope.row.admin_id)"
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row.id)">Sửa</el-button
                >
                <el-button v-if="scope.row.status == 1 && (admin.role === 0 || admin.id === scope.row.admin_id)"
                    size="mini"
                    type="danger"
                    @click="openDeleteConfirm(scope.row.id)">Xoá</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { mapState } from "vuex";
import AdminNewsApi from '@/api/admin/adminNews'
import { Notification } from "element-ui"
export default {
    props: {
        news: {
            type: Array,
            default: () => []
        }
    },
    computed: mapState({
        admin: (state) => state.admin,
    }),
    methods: {
        openDeleteConfirm(id) {
            this.$confirm("Bạn muốn xoá tin tức này. Bạn muốn tiếp tục?", "Xác nhận", {
                confirmButtonText: "Xoá",
                cancelButtonText: "Huỷ",
                type: "warning",
            })
            .then(() => {
                this.handleBlock(id);
            })
            .catch(() => {});
        },

        handleEdit(id) {
            this.$router.push({
                name: "chinh-sua-tin-tuc-admin",
                params: { id: id },
            });
        },

        handleBlock(id) {
            AdminNewsApi.delete(
                id,
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Xoá tin tức thành công!",
                    });

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

        gotoDetailPage(id) {
            this.$router.push({
                name: "thong-tin-chi-tiet-tin-tuc-admin",
                params: { id: id },
            });
        },

        showProvince(province) {
            return province.split("-")[0]
        }
    },
}
</script>

<style>

</style>