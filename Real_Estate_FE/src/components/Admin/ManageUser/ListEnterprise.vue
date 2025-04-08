<template>
  <div>
    <el-table
      border
      :data="enterprises"
      stripe
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column align="center" fixed prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="left"
        prop="business_number"
        label="Mã số doanh nghiệp"
        width="110"
      >
      </el-table-column>
      <el-table-column align="center" label="Logo" width="200">
        <template slot-scope="scope">
          <el-image
            class="hover-pointer"
            :lazy="true"
            style="width: 120px; height: 80px"
            fit="contain"
            @click="openPreviewImage(scope.row.logo)"
            :src="scope.row.logo"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Giấy đăng ký kinh doanh"
        width="200"
      >
        <template slot-scope="scope">
          <el-image
            class="hover-pointer"
            :lazy="true"
            style="width: 100px; height: 120px"
            fit="contain"
            @click="openPreviewImage(scope.row.certificate_url)"
            :src="scope.row.certificate_url"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Tên doanh nghiệp" width="250">
        <template slot-scope="scope">
          <span style="font-weight: 600; color: #0e58a0">{{
            showEnterpriseName(scope.row)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" prop="email" label="Email">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone_number"
        label="Điện thoại"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="Lĩnh vực chính" width="120">
        <template slot-scope="scope">
          <span>{{ fields[scope.row.main_field].name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Trạng thái" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.account_status" type="success">
            Hoạt động
          </el-tag>
          <el-tag v-else type="danger"> Khoá </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="Hành động"
        width="220"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="goToUserDetails(scope.row.id)"
            >Xem</el-button
          >
          <span style="margin-left: 10px" v-if="scope.row.status == 1">
            <el-button
              v-if="scope.row.account_status == 1"
              size="mini"
              type="danger"
              @click="openDeleteConfirm(scope.row)"
              >Khoá</el-button
            >
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleBlock(scope.row.id)"
              >Mở khoá</el-button
            >
          </span>
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="primary"
            @click="acceptRequest(scope.row.id)"
            >Duyệt</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="danger"
            @click="openRejectConfirm(scope.row)"
            >Huỷ</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <preview-image :imageUrl="selectedImageUrl" :isVisible="isModalVisible" @close="closePreviewImage()" />
  </div>
</template>

<script>
import fields from "@/data/fieldList.js";
import AdminEnterpriseApi from "@/api/admin/adminEnterprise";
import { Notification } from "element-ui";
import PreviewImage from "@/components/Global/PreviewImage.vue";
export default {
  props: {
    enterprises: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fields: fields,
      selectedImageUrl: null,
      isModalVisible: false,
    };
  },
  components: {
    PreviewImage,
  },
  methods: {
    goToUserDetails(id) {
      this.$router.push({
        name: "quan-ly-chi-tiet-nguoi-dung",
        params: { id: id },
      });
    },

    openDeleteConfirm(enterprise) {
      this.$confirm(
        "Bạn muốn khoá tài khoản của " +
          enterprise.name +
          ". Bạn muốn tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "Khoá",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.handleBlock(enterprise.id);
        })
        .catch(() => {});
    },
    handleBlock(id) {
      AdminEnterpriseApi.blockAccount(
        id,
        (response) => {
          Notification.success({
            title: "Thành công",
            message: response.data,
          });
          this.$emit("acceptRejectAction");
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
    openPreviewImage(imageUrl) {
      this.selectedImageUrl = imageUrl;
      this.isModalVisible = true;
    },
    closePreviewImage() {
      this.selectedImageUrl = null
      this.isModalVisible = false
    },
    acceptRequest(id) {
      AdminEnterpriseApi.acceptRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã duyệt yêu cầu đăng ký có id " + id + " thành công!",
          });
          this.$emit("acceptRejectAction");
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

    openRejectConfirm(enterprise) {
      this.$confirm(
        "Bạn muốn từ chối yêu cầu đăng ký của " +
          enterprise.name +
          ". Bạn muốn tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "Tiếp tục",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.rejectRequest(enterprise.id);
        })
        .catch(() => {});
    },

    rejectRequest(id) {
      AdminEnterpriseApi.rejectRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã từ chối yêu cầu đăng ký!",
          });
          this.$emit("acceptRejectAction");
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