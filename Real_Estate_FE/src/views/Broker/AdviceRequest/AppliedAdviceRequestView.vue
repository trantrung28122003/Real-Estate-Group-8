<template>
  <div class="container">
    <div class="nav">
      <h4>Danh sách các yêu cầu tư vấn đã đăng ký</h4>
      <div class="search-and-type">
        <el-input
          placeholder="Tìm kiếm theo tiêu đề, mô tả"
          class="search-field"
          v-model="search"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="listRequest(1)"
          ></el-button>
        </el-input>
        <div class="type-post">
          <el-button
            :class="{ active_selected: type === 'sell' }"
            @click="type = 'sell'"
            style="width: 100px; margin-right: -10px"
            >Mua</el-button
          >
          <el-button
            :class="{ active_selected: type === 'rent' }"
            @click="type = 'rent'"
            style="width: 100px; margin-right: -10px"
            >Thuê</el-button
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="tabRequest in tabrequests"
        :key="tabRequest.name"
        :label="tabRequest.label"
        :name="tabRequest.name"
      >
        <div class="content-tab">
          <list-advice-requests
            class="content-tab-post"
            :requests="requests"
            @requestDeleted="listRequest(1)"
          />
          <div class="paginate-page" v-if="requests.length">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="perPage"
              :page-count="totalPage"
              @current-change="handleChangPage"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AdviceRequestApi from "@/api/adviceRequest";
import ListAdviceRequests from "@/components/Broker/AdviceRequets/ListAdviceRequests.vue";
export default {
  components: {
    ListAdviceRequests,
  },
  mounted() {
    this.listRequest(1);
  },
  data() {
    return {
      type: "sell",
      activeName: "ALL",
      search: "",
      requests: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      tabrequests: [
        {
          label: "Tất cả",
          name: "ALL",
        },
        {
          label: "Đã đăng ký",
          name: "APPLIED",
        },
        {
          label: "Đang tư vấn",
          name: "ACCEPTED",
        },
        {
          label: "Đã huỷ",
          name: "DELETED",
        },
      ],
    };
  },

  methods: {
    handleChangPage(val) {
      this.listRequest(val);
    },

    listRequest(page) {
      AdviceRequestApi.listAppliedRequests(
        page,
        {
          search: this.search,
          status: this.activeName,
          type: this.type,
        },
        (response) => {
          this.requests = response.data.data;
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        }
      );
    },
  },
  watch: {
    activeName() {
      this.listRequest(1);
    },
    type() {
      this.listRequest(1);
    },
  },
};
</script>

<style scoped>
.container{
  padding-top: 30px;
}
.nav {
  display: flex;
  flex-direction: column;
}

.search-and-type {
  display: flex;
  position: relative;
  flex-direction: row;
  margin: 10px 0 10px 0;
}
.search-field {
  width: 400px;
}

.type-post {
  position: absolute;
  right: 20px;
}

.active_selected {
  background-color: red !important;
  color: white !important;
}

.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>