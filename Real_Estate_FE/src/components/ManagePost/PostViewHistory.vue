<template>
  <div v-if="total">
    <div class="container">
      <h4>Tin đăng đã xem</h4>
      <div class="row">
        <div
          class="col-6 col-md-4 col-lg-3 post-card"
          v-for="post in posts"
          :key="post?.id"
        >
          <router-link style="text-decoration: none" :to="`/chi-tiet-bai-dang/${post.id}`">
            <el-card :body-style="{ padding: '0px', height: '370px' }">
              <div class="show-post-image">
                <img :src="post.image" alt="Post image" class="el-card-cover" style="height: 200px;">
                <div class="number-image"><i class="el-icon-picture-outline"> {{ post.number_image }}</i> </div>
              </div>
              <div style="padding: 14px;">
                <div class="card-title">{{ post.title }}</div>
                <div class="post-subtitle">{{ showPrice(post) }} ・ {{ post.size }} m²</div>
                <div class="post-location">
                  <i class="el-icon-location"></i> {{ showAddress(post) }}
                </div>
                <div class="post-published-bookmark">
                  <div>{{ showTime(post.published_at) }}</div>
                </div>
              </div>
            </el-card>
          </router-link>
        </div>
      </div>
      <div class="paginate-page">
        <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="total_page" @current-change="handleChangPage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PostApi from "@/api/post"
export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      total_page: 0,
      perPage: 0,
      user_id: 1,
      total: 0,
    };
    
  },
  mounted() {
    this.getPosts(1);
  },
  methods: {
    getPosts(page) {
      PostApi.history(
        page,
        {
          'guest_id': localStorage.getItem('guest_id')
        },
        (response) => {
          this.posts = response.data.data;
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.total_page = response.data.last_page;
          this.total = response.data.total;
        }
      )
    },
    handleChangPage(val) {
      this.getPosts(val)
    },
  },
  watch: {
    '$route.params.id'() {
      this.getPosts(1);
    }
  }
};
</script>

<style scoped>
.paginate-page{
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.post-published-bookmark{
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 15px 0px 5px 5px;
  color: grey;
}
</style>