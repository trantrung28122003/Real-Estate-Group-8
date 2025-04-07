<template>
  <div class="news-view">
    <div class="title-page">
      <h1> {{ title }} </h1>
    </div>
    <div class="sub-title-page">
      <span style="width: 70%">{{ subtitle }}</span>
    </div>
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-12">
        <news-list/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-12 col-12">
        <most-viewed-news />
        <location-news/>
      </div>
    </div>
  </div>
</template>

<script>
import NewsList from '@/components/News/NewsList.vue';
import MostViewedNews from '@/components/News/MostViewedNews.vue';
import LocationNews from '@/components/News/LocationNews.vue';
export default {
  data() {
    return {
      title: "",
      subtitle: "",
    }
  },
  components: {
    'news-list': NewsList,
    'most-viewed-news' : MostViewedNews,
    'location-news': LocationNews,
  },
  mounted() {
    this.setTitle()
  },
  methods: {
    setTitle() {
      const queryParams = this.$route.query
      if(queryParams.p) {
        if(queryParams.p == 'hn') {
          this.title = "Bất động sản Hà Nội"
          this.subtitle = "Thị trường bất động sản Hà Nội lớn thứ hai cả nước, sau TP.HCM, là nơi tập trung nhu cầu lớn về nhà ở và đầu tư, kinh doanh bất động sản. Trong chủ đề này, chúng tôi cập nhật những thông tin mới và đầy đủ nhất về thị trường bất động sản Hà Nội, đáp ứng nhu cầu về mua, bán, đầu tư, thuê, cho thuê của người tìm kiếm."
        } else {
          this.title = "Bất động sản TP.HCM"
          this.subtitle = "Có nền kinh tế phát triển nhanh và mạnh nhất nước, TP.HCM được xem là một trong những thị trường bất động sản tiềm năng và thu hút đầu tư cao nhất tại khu vực Đông Nam Á. Trong đó, các quận trung tâm 1 và 3 luôn được xem là các vị trí vàng để đầu tư, kinh doanh bất động sản. Trong chủ đề này, chúng tôi sẽ cập nhật đầy đủ thông tin về thị trường mua, bán, cho thuê bất động sản TP.HCM."
        }
      } else {
        this.title = "Tin tức bất động sản mới nhất"
        this.subtitle = "Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch, nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của chúng tôi."
      }
    }
  },
  watch: {
    '$route.query': function () {
      this.setTitle()
    }
  }
};
</script>

<style scoped>
.news-view {
  margin: 2% 10% 0 10%;
}

.title-page {
  display: flex;
  justify-content: center;
  margin: 20px 0px 10px 0px
}

.sub-title-page {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 10px 0px 30px 0px;
}

.news-page-content {
  display: flex;
  flex-direction: row;
}
</style>