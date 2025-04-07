<template>
    <div class="container">
      <div class="nav">
        <h4>Danh sách yêu cầu</h4>
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
            <el-button :class="{ active_selected: type === 'sell' }" @click="type = 'sell'" style="width: 100px; margin-right: -10px">Bán</el-button>
            <el-button :class="{ active_selected: type === 'rent' }" @click="type = 'rent'">Cho thuê</el-button>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tabPost in tabPosts" :key="tabPost.name" :label="tabPost.label" :name="tabPost.name" >
          <div class="content-tab">
            <tab-request-by-status class="content-tab-post" :requests="posts" @requestDeleted="listRequest(1)"/>
            <div class="paginate-page" v-if="posts.length">
              <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import AdviceRequestApi from "@/api/adviceRequest"
import TabRequestByStatus from '@/components/ManageAdviceRequest/TabRequestByStatus.vue';
export default {
  components: {
    TabRequestByStatus,
  },
  mounted() {
    this.listRequest(1)
  },
  data() {
    return {
      type: "sell",
      activeName: "all",
      search: "",
      posts: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      tabPosts: [
        {
          label: "Tất cả",
          name: "all"
        },
        {
          label: "Đang hiển thị",
          name: "displaying"
        },
        {
          label: "Đã xoá",
          name: "deleted"
        },
      ]
    };
  },

  methods: {
    handleChangPage(val) {
      this.listRequest(val)
    },

    listRequest(page) {
      AdviceRequestApi.listOwner(
        page,
        {
          'search': this.search,
          'status': this.activeName,
          'type': this.type,
        },
        (response) => {
          this.posts = response.data.data
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        },
      )
    },
  }, 
  watch: {
    activeName() {
      this.listRequest(1)
    },
    type() {
      this.listRequest(1)
    }
  }
};
</script>

<style scoped>
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

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>