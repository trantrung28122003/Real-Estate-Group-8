<template>
  <div>
    <el-table
      border
      :data="reports"
      stripe
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column align="center" fixed prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column align="center" label="Bài đăng" width="100">
        <template slot-scope="scope">
          <router-link class="link-to-detail" :to="`/admin/danh-sach-tin-dang/${scope.row.post_id}`">{{
            scope.row.post_id
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Nội dung báo cáo" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Họ tên" width="200">
        <template slot-scope="scope">
          <span style="font-weight: 600; color: #0e58a0">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" prop="email" label="Email">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="Điện thoại"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="Trạng thái" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">
            Đã xử lý
          </el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="danger">
            Đã xóa
          </el-tag>
          <el-tag v-else> Đang chờ xử lý </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Báo cáo vào" width="120">
        <template slot-scope="scope">
          <span>{{ showTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="Hành động"
        width="150"
      >
        <template slot-scope="scope">
            <el-tooltip effect="dark" content="Đánh dấu là đã xử lý" placement="top">
                <el-button @click="openProcessedConfirm(scope.row.id)" :disabled="scope.row.status != 0" type="primary" size="mini" icon="el-icon-check"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="Đánh dấu là không xử lý" placement="bottom">
                <el-button @click="openDeleteConfirm(scope.row.id)" :disabled="scope.row.status != 0" type="danger" size="mini" icon="el-icon-delete"></el-button>
            </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AdminReportApi from "@/api/admin/adminReport";
import { Notification } from "element-ui";
export default {
  props: {
    reports: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedImageUrl: null,
      isModalVisible: false,
    };
  },
  methods: {
    openProcessedConfirm(id) {
      this.$confirm(
        "Bạn đã xử lý báo cáo này?",
        "Xác nhận",
        {
          confirmButtonText: "Tiếp tục",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.handleProcessed(id);
        })
        .catch(() => {});
    },
    handleProcessed(id) {
      AdminReportApi.processed(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đánh dấu đã xử lý thành công",
          });
          this.$emit("handleChange");
        },
        (error) => {
          if (error?.response?.data?.code) {
            if (error.response.data.code === 403) {
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
      );
    },
    openDeleteConfirm(id) {
      this.$confirm(
        "Báo cáo này không đúng sự thật? Bạn muốn xóa báo cáo này?",
        "Xác nhận",
        {
          confirmButtonText: "Xóa",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.handleDelete(id);
        })
        .catch(() => {});
    },
    handleDelete(id) {
      AdminReportApi.delete(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã xóa báo cáo thành công!",
          });
          this.$emit("handleChange");
        },
        (error) => {
          if (error?.response?.data?.code) {
            if (error.response.data.code === 403) {
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
      );
    },
  },
};
</script>

<style>
</style>