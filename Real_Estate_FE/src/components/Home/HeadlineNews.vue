<template>
  <div>
    <div v-if="showNews.id" class="row show-row">
      <div class="col-xl-6 col-lg-6 col-md-12 col-12">
        <router-link class="link-to-detail" :to="`/tin-tuc/${showNews.id}`">
          <div class="news-item">
            <img :src="showNews.image" alt="News Image" />
            <h4>{{ showNews.title }}</h4>
            <span class="published-at"><i class="el-icon-time"></i> {{ showTime(showNews.created_at) }}</span>
          </div>
        </router-link>
      </div>
      <!-- Hiển thị danh sách các title -->
      <div class="col-xl-6 col-lg-6 col-md-12 col-12 title-list">
        <ul>
          <li v-for="news in newsList" :key="news.id" @click="showDetail(news.id)" @mouseover="showNewsDetail(news)">
            <div class="news-title">
              <a :href="`/tin-tuc/${news.id}`">{{ news.title }}</a>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>

    <div class="row show-collum">
      <div v-for="news in newsList" :key="news.id">
        <router-link class="link-to-detail" :to="`/tin-tuc/${showNews.id}`">
          <div class="news-item news-item-column">
            <div class="news-item-column-img">
              <img :src="news.image" alt="News Image" />
            </div>
            <div>
              <h4>{{ news.title }}</h4>
              <span class="published-at"><i class="el-icon-time"></i> {{ showTime(news.created_at) }}</span>
            </div>
          </div>
        </router-link>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showNews: {
        id: "",
        title: "",
        image: "",
      },
    };
  },
  methods: {
    showDetail(newsId) {
      this.selectedNewsId = newsId;
    },
    showNewsDetail(news) {
      // Hiển thị thông tin chi tiết tin tức khi hover vào title
      this.showNews = news;
    },
  },
  watch: {
    newsList(val) {
      this.showNews = val[0];
    }
  }
};
</script>

<style scoped>
.title-list {
  cursor: pointer;
}

.title-list ul {
  list-style-type: none;
  padding: 0;
}

.title-list li {
  margin: 10px 20px;
  color: black;
}

@media screen and (max-width: 1000px) {
  .show-row {
    display: none;
  }
}

@media screen and (min-width: 1000px) {
  .show-collum {
    display: none;
  }

  .news-item {
    cursor: pointer;
    margin: 10px;
  }

  .news-item img {
    width: 100%;
    height: 300px;
    min-width: 420px;
    border-radius: 10px;
  }
}

.title-list a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0px 5px 0px;
}

.news-item-column {
  display: flex;
  flex-direction: row;
}

.news-item-column-img {
  width: 40%;
}

.news-item-column img {
  width: 100%;
  border-radius: 10px;
}

.news-item h4 {
  color: #000;
  margin-top: 15px;
  line-height: 35px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.published-at {
  color: gray;
}

hr{
  color: rgb(208, 202, 195);
}
</style>