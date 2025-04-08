<template>
  <div class="list-sell-rent-post"> 
    <h4>{{ title }}</h4>
    <p>Hiện có {{ total }} bất động sản</p>
    <div class="select-post-type">
      <el-select
        style="margin-bottom: 10px"
        v-model="selectedOrderBy"
        placeholder="Tin mới nhất"
      >
        <el-option value="Tin mới nhất">Tin mới nhất</el-option>
        <el-option value="Giá thấp đến cao">Giá thấp đến cao</el-option>
        <el-option value="Giá cao đến thấp">Giá cao đến thấp</el-option>
        <el-option value="Diện tích lớn đến bé">Diện tích lớn đến bé</el-option>
        <el-option value="Diện tích bé đến lớn">Diện tích bé đến lớn</el-option>
      </el-select>
      <div class="type-post">
        <el-button :class="{ active_selected: type === 'sell' }" @click="type = 'sell'" style="width: 100px; margin-right: -10px">Bán</el-button>
        <el-button :class="{ active_selected: type === 'rent' }" @click="type = 'rent'">Cho thuê</el-button>
      </div>
    </div>
    <div v-if="total" style="width: 80%;">
      <div class="single-rent-sell-post" v-for="post in posts" :key="post.id">
        <div>
          <router-link :to="`/chi-tiet-bai-dang/${post.id}`">
            <img class="image-rent-sell-post" :src="post.image" alt="" />
            <div class="number-image"><i class="el-icon-picture-outline"> {{ post.number_image }}</i> </div>
          </router-link>
        </div>
        <div class="content-rent-sell-post">
          <router-link
            class="link-to-detail"
            :to="`/chi-tiet-bai-dang/${post.id}`"
          >
            <span class="rent-sell-post-title">{{ post.title }}</span>
          </router-link>
          <span style="color: red; font-weight: 600">
            {{ showPrice(post) + " ・ " + post.size + " m&sup2;" }}
          </span>
          <span v-if="post.bedroom">
            {{ " ・ " + post.bedroom }} <i class="el-icon fa fa-bed"></i>
          </span>
          <span v-if="post.toilet">
            {{ " ・ " + post.toilet }} <i class="el-icon fa fa-bath"></i>
          </span>
          <div class="post-location">
            <i class="el-icon-location-outline"></i> {{ showAddress(post) }}
          </div>
          <div class="published_at">{{ showTime(post.published_at) }}</div>
          <el-button :v-if="user && user.email" class="ren-selt-post-bookmark" @click="bookmark(post)">
            <i
              v-if="post.bookmark == 1"
              class="el-icon bookmarked fas fa-heart"
            ></i>
            <i v-else class="el-icon far fa-heart"></i>
          </el-button>
        </div>
      </div>
    </div>
    <list-post-error v-else />
    <div v-if="posts.length" class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BookmarkApi from '@/api/bookmark'
import ListPostError from '../NoneToDisplay/ListPostError.vue'
export default {
  props: {
    title: String,
  },
  components: {
    ListPostError
  },
  computed: mapState({
    user: (state) => state.user,
    postTypes: (state) => state.postTypes,
    bookmarkCount: (state) => state.bookmarkCount
  }),
  mounted() {
    this.listPost(1)
  },
  data() {
    return {
      numberBookmark: null,
      selectedOrderBy: "Tin mới nhất",
      posts: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
      type: "sell",
    };
  },
  methods: {
    listPost(page) {
      BookmarkApi.list(
        page,
        {
          'order_by': this.selectedOrderBy,
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
    handleChangPage(val) {
      this.listPost(val)
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
          'post_id': post.id,
        },
      )
    }
  },
  watch: {
    selectedOrderBy() {
      this.listPost(this.currentPage)
    },
    type() {
      this.listPost(this.currentPage)
    }
  },
};
</script>

<style scoped>

.select-post-type {
  position: relative;
  display: flex;
  flex-direction: row;
}

.type-post {
  position: absolute;
  right: 20px;
}

.active_selected {
  background-color: red !important;
  color: white !important;
}

.ren-selt-post-bookmark {
  position: absolute;
  bottom: 20px;
  right: 30px;
  background-color: white;
  height: 30px;
  width: 30px; /* Tăng kích thước để có kích thước vuông */
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Thêm bóng đổ cho nút */
}

.rent-sell-post-published {
  position: absolute;
  bottom: 5px;
}

.link-to-detail {
  text-decoration: none;
}

.bookmarked {
  color: red;
}

.paginate-page{
  width: 80%;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>