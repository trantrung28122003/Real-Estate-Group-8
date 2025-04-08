<template>
  <div>
    <el-table border :data="projects" stripe style="width: 100%; margin-top: 20px">
      <el-table-column align="center" prop="id" label="ID" width="80" fixed>
      </el-table-column>
      <el-table-column align="center" label="Loại dự án" width="100">
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
      <el-table-column align="center" label="Tên dự án" width="220">
        <template slot-scope="scope">
          <span style="font-weight: 600; color: #0e58a0">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Trạng thái dự án" width="220">
        <template slot-scope="scope">
            <span v-if="scope.row.project_status" :class="getStatusClass(scope.row)">{{ projectStatus[scope.row.project_status] }} {{ scope.row.note ? " - " + scope.row.note : "" }}</span>
            <span v-else :class="getStatusClass(scope.row)">Đang cập nhật {{ scope.row.note ? " - " + scope.row.note : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="220" label="Địa chỉ">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Giá" width="150">
        <template slot-scope="scope">
          <span>{{ showProjectPrice(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Diện tích" width="100">
        <template slot-scope="scope">
          <span>{{ showProjectSize(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Cập nhật vào" width="120">
        <template slot-scope="scope">
          <span>{{showTime(scope.row.updated_at)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Hành động" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="goToDetails(scope.row)"
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
import projectType from "@/data/projectType"
import AdminProjectApi from "@/api/admin/adminProject"
import { Notification } from "element-ui"
import projectStatus from '@/data/projectStatus'
export default {
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ProjectType: projectType,
      projectStatus : projectStatus,
    };
  },
  methods: {
    goToDetails(project) {
      this.$router.push({
        name: "chi-tiet-du-an-admin",
        params: { id: project.id },
      });
    },
    openConfirmDelete(project) {
      this.$confirm("Bạn muốn xoá dự án này?", "Xác nhận", {
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
        type: "warning",
      })
        .then(() => {
          AdminProjectApi.delete(
            project.id,
            () => {
              Notification.success({
                title: "Thành công",
                message: "Đã xoá dự án thành công!",
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
                  message: "Xoá dự án thất bại",
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    acceptRequest(id) {
      AdminProjectApi.acceptRequest(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã duyệt dự án có id" + id + " thành công!",
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
              message: "Duyệt dự án thất bại",
            });
          }
        }
      );
    },

    rejectRequest(id) {
      AdminProjectApi.rejectRequest(
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
              message: "Hành động thất bại!",
            });
          }
        }
      );
    },
    showType(type_id) {
      return this.ProjectType[type_id];
    },
  },
};
</script>

<style scoped>
span {
  word-break: break-word;
}
</style>