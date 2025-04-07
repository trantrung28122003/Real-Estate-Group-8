<template>
    <div class="news-detail">
        <div class="back-button">
            <el-tooltip class="item" effect="dark" content="Quay lại" placement="top">
                <i @click="goBack()" class="fa-solid fa-arrow-left" style="font-size: 24px; margin-right: 20px; cursor: pointer;"></i>
            </el-tooltip>
            <h2>{{ news.title }}</h2>
        </div>
        <div class="author-time">
            <div>
                <img v-if="news.author?.avatar" :src="news.author.avatar" alt="avatar" class="author-avatar">
                <div v-else class="avatar-placeholder">
                    <span class="avatar-letter">{{ showName() }}</span>
                </div>
            </div>
            <div class="author-name-time">
                <div> Được đăng bởi <span class="author-name">{{news.author?.name}}</span> </div>
                <span>Cập nhật lần cuối vào {{ showTime(news.updated_at) }}</span>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-8 col-lg-8 col-md-12 col-12">
                <p class="news-sub-title">{{ news.subtitle }}</p>
                <div class="render-html" v-html="news.content" style="width: 95%"></div>
                <div class="source-display">
                    <span> Nguồn : {{ news.source }}</span>
                </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-12 col-12">
                <most-viewed-news :isPreview="true"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Notification } from "element-ui"
import AdminNewsApi from "@/api/admin/adminNews"
import MostViewedNews from '@/components/News/MostViewedNews.vue';
export default {
    data() {
        return {
            news: {}
        }
    },

    components: {
        MostViewedNews,
    },

    created() {
        this.getNewsDetail()
    },

    methods: {
        getNewsDetail() {
            AdminNewsApi.detail(
                this.$route.params.id,
                (response) => {
                    this.news = response.data
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
        showName() {
            return this.news.author?.name ? this.news.author.name.split(" ")[this.news.author.name.split(" ").length - 1][0] : ""
        },
    }
}
</script>

<style scoped>
.news-detail {
    padding: 0px 20px 20px 10px;
}

.author-time {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
}

.author-name {
    text-decoration: none;
    color: black;
    font-weight: 700;
}

.author-avatar {
    width: 48px;
    height: 48px;
    border: 1px solid #c8c9c7;
    border-radius: 50%;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.author-name-time {
    margin-left: 15px;
}

.news-sub-title {
    margin: 20px 0px 30px 0px;
    font-weight: 700;
}

.news-content {
    margin: 20px 0px 30px 0px;
}

.source-display {
    padding-block: 11px;
    padding-inline: 15px;
    background-color: #fafafa;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 50px;
    line-height: 35px;
}

.back-button {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.render-html >>> img {
  width: -webkit-fill-available !important;
  height: auto !important;
}

.render-html >>> figcaption {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
</style>