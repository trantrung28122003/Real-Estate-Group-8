<template>
  <div>
    <div v-if="requests && requests.length">
      <div class="d-flex flex-wrap">
        <div
          class="col-md-12 col-lg-6 request-single-card"
          v-for="request in requests"
          :key="request.id"
        >
          <div class="request-single-card-content">
            <div>
              <router-link
                class="link-to-detail"
                :to="`/thong-tin-chi-tiet-yeu-cau/${request.id}`"
              >
                <span class="advice-request-card-title">{{
                  request.title
                }}</span>
              </router-link>
              <div>
                <span class="advice-request-description">{{
                  request.description
                }}</span>
              </div>
              <span> Tài chính </span>
              <span style="color: red; font-weight: 600">
                {{
                  request.data.size
                    ? showPrice(request.data.price) + " ・ " + request.data.size
                    : showPrice(request.data.price)
                }}
              </span>
              <span v-if="request.data.bedroom">
                {{ " ・ " + request.data.bedroom }}
                <i class="el-icon fa fa-bed"></i>
              </span>
              <div class="post-location">
                <i class="el-icon-location-outline"></i>
                {{ showAddress(request) }}
              </div>
              <div
                v-if="!request.status"
                class="published_at rent-sell-post-published"
              >
                Đã đăng vào {{ showTime(request.created_at) }}
              </div>
              <div v-else class="published_at rent-sell-post-published">
                Cập nhật lần cuối vào {{ showTime(request.updated_at) }}
              </div>
              <div class="action-post">
                <div
                  style="
                    margin: 10px 5px 10px 0px;
                    display: flex;
                    justify-content: end;
                  "
                >
                  <el-badge
                    v-if="request.countBroker && request.status"
                    :value="request.countBroker"
                    class="item"
                  >
                    <el-avatar
                      v-if="request.brokerAvatar"
                      :src="request.brokerAvatar"
                      icon="el-icon-user-solid"
                    ></el-avatar>
                    <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
                  </el-badge>
                </div>
                <!-- <el-button
                  v-if="request.status"
                  icon="el-icon fa fa-pencil"
                  @click="gotoUpdate(request.id)"
                  size="small"
                ></el-button> -->
                <el-button
                  v-if="request.status"
                  type="danger"
                  icon="el-icon fa fa-trash-alt"
                  size="small"
                  @click="openDeleteConfirm(request.id)"
                >
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <list-post-error v-else />
  </div>
</template>

<script>
import AdviceRequestApi from "@/api/adviceRequest";
import { Notification } from "element-ui";
import ListPostError from "../NoneToDisplay/ListPostError.vue";
export default {
  props: {
    requests: {
      type: Array,
    },
  },
  components: {
    ListPostError,
  },
  methods: {
    gotoUpdate(id) {
      this.$router.push(`/chinh-sua-thong-tin-yeu-cau/${id}`);
    },
    openDeleteConfirm(id) {
      this.$confirm("Bạn sẽ xoá yêu cầu này. Bạn muốn tiếp tục?", "Cảnh báo", {
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(id);
        })
        .catch(() => {});
    },
    handleDelete(id) {
      AdviceRequestApi.delete(
        id,
        () => {
          Notification.success({
            title: "Thành công",
            message: "Xoá yêu cầu thành công!",
          });
          this.$emit("requestDeleted");
        },
        () => {
          Notification.error({
            title: "Thất bại",
            message: "Xoá yêu cầu thất bại!",
          });
        }
      );
    },
    showPrice(price) {
      return price / 1000 >= 1
        ? (price / 1000).toFixed(2) + " tỷ"
        : price + " triệu";
    },
  },
};
</script>

<style>
.action-post {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>