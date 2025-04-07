<template>
  <div class="container">
    <h3>Quản lý tin tức</h3>
    <el-input
        placeholder="Tìm kiếm theo id hoặc tiêu đề"
        class="search-field"
        v-model="search"
        clearable
    >
    </el-input>
    <el-button type="success" style="margin-left: 10px" @click="listNews(1)">Tìm kiếm</el-button>
    <el-button type="primary" @click="handleReset()">Đặt lại</el-button>
    <el-tabs style="margin-top: 20px;" v-model="activeName">
      <el-tab-pane name="listAll">
        <span slot="label">
          Tất cả tin tức
        </span>
        <ListNews :news="news" @deleteNews="listNews(1)"/>
      </el-tab-pane>
      <el-tab-pane name="listOwner">
        <span slot="label">
          Tin tức của bản thân
        </span>
        <ListNews :news="news" @deleteNews="listNews(1)"/>
      </el-tab-pane>
    </el-tabs>
    <div v-if="news.length" class="paginate-page">
      <el-pagination background layout="prev, pager, next" :page-size="perPage" :page-count="totalPage" @current-change="handleChangPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import AdminNewsApi from '@/api/admin/adminNews'
import { Notification } from "element-ui"
import ListNews from '@/components/Admin/ManageNews/ListNews.vue'
export default {
    data() {
        return {
            activeName: 'listAll',
            search: '',
            news: [],
            currentPage: 1,
            totalPage: 0,
            perPage: 0,
            total: 0,
        }
    },
    components: {
        ListNews,
    },
    mounted() {
        this.listNews(1)
    },
    methods: {
        listNews(page) {
            AdminNewsApi.list(
                page,
                {
                    'search': this.search,
                    'tab' : this.activeName
                },
                (response) => {
                    this.news = response.data.data
                    this.currentPage = page
                    this.perPage = response.data.per_page
                    this.totalPage = response.data.last_page
                    this.total = response.data.total
                },
                (error) => {
                    if(error?.response?.data?.code) {
                        if(error.response.data.code === 403) {
                            Notification.error({
                                title: "Thất bại",
                                message: error.response.data.error,
                            });
                            this.goBack()
                        }
                    }
                }
            )
        },

        handleReset() {
            this.search = ''
            this.listNews(1)
        },

        handleChangPage(val) {
            this.listNews(val)
        },
    },
    watch: {
        activeName() {
            this.listNews(1)
        }
    }
}
</script>

<style scoped>
.search-field {
  width: 400px;
  margin-top: 20px;
}
.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.subtitle-display {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>