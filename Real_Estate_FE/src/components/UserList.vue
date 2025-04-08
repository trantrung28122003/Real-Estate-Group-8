<template>
    <div class="container">
      <h4 class="list_titles" v-if="total"> {{ showTitle() + '(' + total + ')' }} </h4>
      <h4 class="list_titles" v-else> {{ showTitle() }} </h4>
      <div v-if="total" class="row">
        <div
          class="col-6 col-md-4 col-lg-3 post-card"
          v-for="post in posts"
          :key="post.id"
        >
          <el-card :body-style="{ padding: '0px' }">
            <router-link
              style="text-decoration: none"
              :to="`/chi-tiet-bai-dang/${post.id}`"
            >
              <div class="show-post-image">
                <img
                  :src="post.image"
                  alt="Post image"
                  class="el-card-cover"
                  style="height: 200px"
                />
                <div class="number-image">
                  <i class="el-icon-picture-outline">
                    {{ post.number_image }}</i
                  >
                </div>
              </div>
            </router-link>
            <div style="padding: 14px">
              <router-link
                style="text-decoration: none; color: black"
                :to="`/chi-tiet-bai-dang/${post.id}`"
              >
                <div class="card-title">{{ post.title }}</div>
                <div class="post-subtitle">
                  {{ showPrice(post) }} ・ {{ post.size }}m²
                </div>
                <div class="post-location">
                  <i class="el-icon-location-outline"></i>
                  {{ showAddress(post) }}
                </div>
              </router-link>
              <div class="post-published-bookmark">
                <div>{{ showTime(post.published_at) }}</div>
                <el-button v-if="user && user.email" class="post-heart" @click="bookmark(post)">
                  <i
                    v-if="post.bookmark == 1"
                    class="fa-solid fa-heart fa-lg"
                    style="color: red"
                  ></i>
                  <i v-else class="fa-regular fa-heart fa-lg"></i>
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <list-post-error v-else />
      <div v-if="total && total > 4" class="paginate-page">
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
import PostApi from "@/api/post"
import ListPostError from './NoneToDisplay/ListPostError.vue'
import BookmarkApi from "@/api/bookmark"
import { mapActions, mapState } from 'vuex';
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
    user_id: {
      type: Number,
      default: null,
    }
  },
  components: {
    ListPostError
  },
  computed: mapState({
    user: (state) => state.user,
    bookmarkCount: (state) => state.bookmarkCount,
  }),
  data() {
    return {
      posts: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    };
  },
  mounted() {
    // Lấy dữ liệu ban đầu khi trang được tạo
    this.listPost(1);
  },
  methods: {
    listPost(page) {
      PostApi.listByUser(
        page,
        {
          type: this.type,
          user_id: this.user_id ? this.user_id : this.$route.params.id,
        },
        (response) => {
          this.posts = response.data.data;
          this.currentPage = page;
          this.perPage = response.data.per_page;
          this.totalPage = response.data.last_page;
          this.total = response.data.total;
        },
      );
    },
    handleChangPage(val) {
      this.listPost(val);
    },
    showTitle() {
        if (this.type == "sell") {
            return 'Danh sách tin đăng bán'
        } else {
            return 'Danh sách tin đăng cho thuê'
        }
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
    user_id() {
      this.listPost(1);
    }
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

.paginate-page {
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