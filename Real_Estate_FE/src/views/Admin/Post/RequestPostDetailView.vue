<template>
  <div style="width: 100%">
    <admin-post-detail />
    <div class="accept-reject-action">
      <el-button type="primary" @click="acceptRequest()">Duyệt bài</el-button>
      <el-button type="danger" @click="rejectRequest()" style="width: 100px"
        >Từ chối</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostApi from "@/api/admin/adminPost";
import { Notification } from "element-ui";
import AdminPostDetail from "@/components/Admin/Post/AdminPostDetail.vue";
export default {
  components: {
    AdminPostDetail,
  },
  computed: mapState({
    postRequestCount: (state) => state.postRequestCount,
  }),
  data() {
    return {
      requestNumber: 0,
    };
  },
  methods: {
    acceptRequest() {
      PostApi.acceptRequest(
        this.$route.params.id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã duyệt tin đăng thành công!",
          });
          this.updateRequestCount();
          this.$router.push("/admin/danh-sach-tin-cho-duyet");
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

    rejectRequest() {
      PostApi.rejectRequest(
        this.$route.params.id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Đã huỷ yêu cầu duyệt tin!",
          });
          this.updateRequestCount();
          this.$router.push("/admin/danh-sach-tin-cho-duyet");
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
    ...mapActions(["commitSetPostRequestCount"]),
    updateRequestCount() {
      this.requestNumber = this.postRequestCount;
      this.requestNumber -= 1;
      this.commitSetPostRequestCount(this.requestNumber);
    },
  },
};
</script>

<style scoped>
.accept-reject-action {
  padding-right: 15%;
  margin: 30px 0 20px;
  display: flex;
  justify-content: flex-end;
}
</style>