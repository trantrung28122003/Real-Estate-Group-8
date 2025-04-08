<template>
  <div v-if="total">
    <div class="container">
      <h4>Bất động sản dành cho bạn</h4>
      <div class="row">
        <div
          class="col-6 col-md-4 col-lg-3 post-card"
          v-for="post in posts"
          :key="post.id"
        >
          <el-card style="height: 100%;" :body-style="{ padding: '0px'}">
            <router-link style="text-decoration: none" :to="`/chi-tiet-bai-dang/${post.id}`">
              <div class="show-post-image">
                <img :src="post.image" alt="Post image" class="el-card-cover" style="height: 200px;">
                <div class="number-image"><i class="el-icon-picture-outline"> {{ post.number_image }}</i> </div>
              </div>
            </router-link>
              <div style="padding: 14px;">
                <router-link style="text-decoration: none; color: black;" :to="`/chi-tiet-bai-dang/${post.id}`">
                  <div class="card-title">{{ post.title }}</div>
                  <div class="post-subtitle">{{ showPrice(post) }} ・ {{ post.size }}m²</div>
                  <div class="post-location">
                    <i class="el-icon-location-outline"></i> {{ showAddress(post) }}
                  </div>
                </router-link>
                <div class="post-published-bookmark">
                  <div>{{ showTime(post.published_at) }}</div>
                  <el-button v-if="user && user.email" class="post-heart" @click="bookmark(post)">
                    <i v-if="post.bookmark == 1" class="fa-solid fa-heart fa-lg" style="color: red;"></i>
                    <i v-else class="fa-regular fa-heart fa-lg"></i>
                  </el-button>
                </div>
              </div>
          </el-card>
        </div>
      </div>
      <div class="paginate-page">
        <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import BookmarkApi from "@/api/bookmark"
import PostApi from "@/api/post"
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      numberBookmark: null,
      posts: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    }
  },
  computed: mapState({
    user: (state) => state.user,
    bookmarkCount: (state) => state.bookmarkCount,
  }),
  mounted() {
    this.getPosts(1);
  },
  methods: {
    getPosts(page) {
      PostApi.listSuggestPost(
        page,
        {
          'guest_id': localStorage.getItem('guest_id')
        },
        (response) => {
          this.posts = response.data.data;
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        }
      )
    },
    loadPostData() {
      this.getPosts(1)
    },
    handleChangPage(val) {
      this.getPosts(val)
    },
    ...mapActions(['commitSetBookmarkCount']),
    bookmark(post) {
      this.numberBookmark = this.bookmarkCount ? this.bookmarkCount : 0
      post.bookmark = !post.bookmark
      if(post.bookmark == 1) {
        this.numberBookmark += 1
      } else {
        this.numberBookmark -= 1
      }
      this.commitSetBookmarkCount(this.numberBookmark)
      BookmarkApi.bookmark(
        {
          post_id: post.id,
        }
      )
    },
  },
  watch: {
    '$route.params.id': 'loadPostData'
  }
};
</script>

<style scoped>
.post-location {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2px 0px 2px 0px;
}

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

.post-heart {
  position: absolute;
  right: 20px;
  background-color: white;
  height: 30px;
  width: 40px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>