<template>
  <div>
    <div class="search">
      <p>Hệ thống quản lý và quảng bá bất động sản</p>
    </div>
    <div class="home">
      <div class="news">
        <el-tabs v-model="activeName">
          <el-tab-pane v-for="tab in tabNews" :key="tab.name" :name="tab.name">
            <span class="tabs-item-custom" slot="label"> {{ tab.label }}</span>
            <headline-news :newsList="newsList"/>
          </el-tab-pane>
        </el-tabs>
        <el-button @click="gotoPage('tin-tuc')" class="btn-view-more" type="text">Xem thêm <i class="el-icon-right"></i></el-button>
      </div>
      <RealEstateForYou />
      <ProjectForYou />
      <LocationRealEstateVue />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import RealEstateForYou from "@/components/Home/RealEstateForYou.vue"
import ProjectForYou from "@/components/Home/ProjectForYou.vue"
import LocationRealEstateVue from '@/components/Home/LocationRealEstate.vue'
import HeadlineNews from '@/components/Home/HeadlineNews.vue'
import NewsApi from "@/api/news"

export default {
  data() {
    return {
      selectedType: "",
      searchForm: {
        searchKey: '',
      },
      tabNews: [
        {
          label: "Tin nổi bật",
          name: "headline",
        },
        {
          label: "Tin tức",
          name: "all",
        },
        {
          label: "BĐS TPHCM",
          name: "hcm",
        },
        {
          label: "BĐS Hà Nội",
          name: "hn",
        },
      ],
      activeName: "headline",
      newsList: [],
    };
  },
  components: {
    RealEstateForYou,
    ProjectForYou,
    LocationRealEstateVue,
    HeadlineNews,
  },

  created() {
    this.listNews()
  },

  methods: {
    listNews() {
      NewsApi.listHeadline(
        {
          'type': this.activeName,
        },
        (response) => {
          this.newsList = response.data
        },
      )
    },
  },
  watch: {
    activeName() {
      this.listNews()
    },
  }
};
</script>

<style scoped>
@media screen and (min-width:1260px){
  .home {
    margin: 3% 10% 0 10%;
  }
}

@media screen and (max-width:1260px){
  .home {
    margin: 5% 20px 0 20px;
  }
}

.news {
  position: relative;
  margin: 0px 20px 0 20px;
}

.btn-view-more {
  position: absolute;
  right: 20px;
  top: 0px;
}

.tabs-item-custom {
  height: 45px;
  font-size: 20px;
  font-weight: 500;
}

.search {
  padding: 13rem;
  background-image: url(https://lavenderstudio.com.vn/wp-content/uploads/2017/08/chup-hinh-noi-that-9-1024x683.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search > p {
  display: flex;
  justify-content: center;
  background-color: #409EFF;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 45px;
  padding: 20px;
  border-radius: 20px;
}

.input-form {
  background-color: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 50px;
  width: 80%;
  padding:7px 10px 7px 0;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width: 20%;
}

.search-btn {
  margin: 4px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}
</style>
