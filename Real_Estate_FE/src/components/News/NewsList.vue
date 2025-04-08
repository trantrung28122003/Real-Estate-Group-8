<template>
  <div class="container">
    <div class="single-news" v-for="item in news" :key="item.id">
      <div>
        <router-link :to="`/tin-tuc/${item.id}`">
          <img class="image-rent-sell-post" :src="item.image" alt="" />
        </router-link>
      </div>
      <div class="content-single-news">
        <router-link
          class="link-to-detail"
          :to="`/tin-tuc/${item.id}`"
        >
          <span class="news-title">{{ item.title }}</span>
        </router-link>
        <div class="news-date-author">
          <span>{{ showTime(item.created_at) }} - {{ item.author }}</span>
        </div>
        <div class="news-sub-title">
          <p>{{ item.subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import NewsApi from "@/api/news"
export default {
  data() {
    return {
      news: [],
      currentPage: 1,
      totalPage: 0,
      perPage: 0,
      total: 0,
    }
  },
  created() {
    this.listNews(1)
  },
  methods: {
    listNews(page, type = '') {
      const queryParams = this.$route.query
      if(queryParams.p) {
        type = queryParams.p
      }
      NewsApi.list(
        page,
        {
          'type': type ? type : 'headline',
        },
        (response) => {
          this.news = response.data.data
          this.currentPage = page
          this.perPage = response.data.per_page
          this.totalPage = response.data.last_page
          this.total = response.data.total
        },
      )
    },
    handleChangPage(val) {
      this.listNews(val)
    },
  },
  watch: {
    '$route.query': function (newVal) {
      this.listNews(1, newVal.p)
    }
  }
};
</script>

<style scoped>
.single-news {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.news-title {
  font-size: 16px;
  font-weight: 600;
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px 0px 5px 0px;
}

.news-sub-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0px 5px 0px;
}

.news-date-author {
  color: grey;
}

@media screen and (max-width:1260px){
  .single-news {
    width: 100%;
  }
}

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.content-single-news {
  margin: 10px 20px 0 20px;
}
</style>