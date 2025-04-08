<template>
  <div>
    <el-table
      border
      :data="brokers"
      stripe
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column align="center" fixed prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column align="center" label="Avatar" width="100">
        <template slot-scope="scope">
          <el-image
            class="hover-pointer avt"
            v-if="scope.row.avatar"
            fit="cover"
            @click="openPreviewImage(scope.row.avatar)"
            :src="scope.row.avatar"
          ></el-image>
          <el-avatar
            v-else
            shape="circle"
            :size="60"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Giấy đăng ký kinh doanh"
        width="170"
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
      <el-table-column
        align="center"
        label="Loại bất động sản và khu vực môi giới"
        width="300"
      >
        <template slot-scope="scope">
          <ul>
            <li v-for="(brokerageArea, index) in scope.row.areas" :key="index">
              <span>{{ showBrokerageArea(brokerageArea) }} </span>
            </li>
          </ul>
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
    <preview-image
      :imageUrl="selectedImageUrl"
      :isVisible="isModalVisible"
      @close="closePreviewImage()"
    />
  </div>
</template>

<script>
import AdminBrokerApi from "@/api/admin/adminBroker";
import { Notification } from "element-ui";
import PreviewImage from "@/components/Global/PreviewImage.vue";
export default {
  props: {
    brokers: {
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

    openDeleteConfirm(broker) {
      this.$confirm(
        "Bạn muốn khoá tài khoản của " + broker.name + ". Bạn muốn tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "Khoá",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.handleBlock(broker.id);
        })
        .catch(() => {});
    },
    handleBlock(id) {
      AdminBrokerApi.blockAccount(
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
    acceptRequest(id) {
      AdminBrokerApi.acceptRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã duyệt yêu cầu thành công!",
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
    openRejectConfirm(broker) {
      this.$confirm(
        "Bạn muốn từ chối yêu cầu đăng ký của " +
          broker.name +
          ". Bạn muốn tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "Tiếp tục",
          cancelButtonText: "Huỷ",
          type: "warning",
        }
      )
        .then(() => {
          this.rejectRequest(broker.id);
        })
        .catch(() => {});
    },

    rejectRequest(id) {
      AdminBrokerApi.rejectRequest(
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