<template>
  <div>
    <el-table border :data="posts" stripe style="width: 100%; margin-top: 20px">
      <el-table-column align="center" prop="id" label="ID" width="80" fixed>
      </el-table-column>
      <el-table-column align="center" label="Loại tin" width="100">
        <template slot-scope="scope">
          <span>{{ showType(scope.row.type_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Ảnh" width="170">
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
      <el-table-column align="center" prop="address" width="220" label="Địa chỉ">
      </el-table-column>
      <el-table-column align="center" label="Giá" width="150">
        <template slot-scope="scope">
          <span>{{ showPrice(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Diện tích" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.size + " m&sup2;" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Cập nhật vào" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">{{
            showTime(scope.row.updated_at)
          }}</span>
          <span v-else>{{ scope.row.published_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Hành động" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="goToPostDetails(scope.row)"
            >Xem</el-button
          >
          <el-button v-if="!scope.row.status == 0" size="mini" type="danger" @click="openConfirmDelete(scope.row)"
            >Xoá</el-button
          >
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
            @click="rejectRequest(scope.row.id)"
            >Huỷ</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import postType from "@/data/postType";
import AdminPostApi from "@/api/admin/adminPost";
import { Notification } from "element-ui";
export default {
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      PostType: postType,
    };
  },
  methods: {
    goToPostDetails(post) {
      if (post.status == 0) {
        this.$router.push({
          name: "tin-cho-duyet-admin",
          params: { id: post.id },
        });
      } else {
        this.$router.push({
          name: "chi-tiet-tin-dang-admin",
          params: { id: post.id },
        });
      }
    },
    openConfirmDelete(post) {
      this.$confirm("Bạn muốn xoá tin đăng này?", "Xác nhận", {
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
        type: "warning",
      })
        .then(() => {
          AdminPostApi.delete(post.id, () => {
            Notification.success({
              title: "Thành công",
              message: "Đã xoá tin đăng!",
            });
            this.$emit("acceptRejectAction");
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
          );
        })
        .catch(() => {});
    },
    acceptRequest(id) {
      AdminPostApi.acceptRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã duyệt tin đăng có id" + id + " thành công!",
          });
          this.$emit("acceptRejectAction");
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
      );
    },

    rejectRequest(id) {
      AdminPostApi.rejectRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã huỷ yêu cầu duyệt tin!",
          });
          this.$emit("acceptRejectAction");
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
      );
    },
    showType(type_id) {
      return this.PostType[type_id];
    },
  },
};
</script>

<style scoped>
span {
  word-break: break-word;
}
</style>