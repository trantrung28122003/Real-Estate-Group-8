<template>
  <div id="user_review" class="container">
    <h3>Đánh giá từ người dùng</h3>
    <el-table border :data="reviews" stripe style="width: 100%; margin-top: 20px;">
      <el-table-column align="center" label="Người dùng" width="260">
        <template slot-scope="scope">
          <router-link :to="`/admin/quan-ly-nguoi-dung/${scope.row.id}`" class="username-avt">
            <div style="margin-right: 10px;">
              <el-avatar v-if="scope.row.avatar" shape="circle" :size="60" fit="fill" :src="scope.row.avatar"></el-avatar>
              <el-avatar v-else shape="circle" :size="60" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
            </div>
            <div>
              <span style="font-weight: 600; color: #0e58a0">{{
                scope.row.name
              }}</span>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" width="160" label="Rating">
        <template slot-scope="scope">
             <el-rate v-model="scope.row.rating" disabled></el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Nội dung">
        <template slot-scope="scope">
            <span>{{ scope.row.review }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Thời gian" width="120">
        <template slot-scope="scope">
            <span>{{ showTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="reviews.length" class="paginate-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="perPage"
        :page-count="totalPage"
        @current-change="handleChangPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import AdminDashboardApi from "@/api/admin/adminDashboard";
export default {
  data() {
    return {
      search: "",
      reviews: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  mounted() {
    this.listReview(1)
  },
  methods: {
    listReview(page) {
      AdminDashboardApi.listReview(
        page,
        (response) => {
          this.reviews = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        },
      );
    },

    handleChangPage(val) {
      this.listReview(val)
    },
  },
};
</script>

<style scoped>
.container{
  width: 100%;
  /* padding-right: 20px; */
}
.search-field {
  width: 400px;
  margin-top: 20px;
}
.paginate-page {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.username-avt {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>