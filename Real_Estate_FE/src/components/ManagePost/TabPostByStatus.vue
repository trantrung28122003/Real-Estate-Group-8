<template>
    <div>
      <div v-if="posts && posts.length">
        <div class="single-rent-sell-post" v-for="post in posts" :key="post.id">
            <div>
              <router-link :to="`/chi-tiet-bai-dang/${post.id}`">
                <img class="image-rent-sell-post" :src="post.image" alt="" />
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
              <div v-if="post.status == 0 || post.status == 4 || post.status == 3" class="published_at rent-sell-post-published">
                Đã đăng vào {{ showTime(post.created_at) }}
                <el-tag class="state-post" v-if="post.status == 0" type="warning">Chờ duyệt</el-tag>
                <el-tag class="state-post" v-else-if="post.status == 4" type="danger">Không được duyệt</el-tag>
                <el-tag class="state-post" v-if="post.status == 3" type="danger">Đã xoá</el-tag>

              </div>
              <div v-else class="published_at rent-sell-post-published">
                {{ showTime(post.published_at) }}
                <el-tag class="state-post" v-if="post.status == 1" type="success">Đang hiển thị</el-tag>
                <el-tag class="state-post" v-else-if="post.status == 2" type="info">Hết hạn</el-tag>
              </div>
              <div class="action-post">
                <el-button v-if="post.status == 0 || post.status == 1" icon="el-icon fa fa-pencil" size="small" @click="gotoUpdate(post.id)"> Sửa tin</el-button>
                <el-button v-if="post.status != 3" type="danger" icon="el-icon fa fa-trash-alt" size="small" @click="handleDelete(post.id)"> Xoá tin </el-button>
              </div>
            </div>
        </div>
      </div>
      <list-post-error v-else />
    </div>
</template>

<script>
import PostApi from "@/api/post"
import { Notification } from "element-ui"
import ListPostError from '../NoneToDisplay/ListPostError.vue'
export default {
    props: {
        posts: {
          type: Array,
        }
    },
    components: {
      ListPostError
    },
    methods: {
      gotoUpdate(id) {
        this.$router.push(`/sua-tin/${id}`)
      },
      handleDelete(id) {
        PostApi.delete(
          id,
          () => {
            Notification.success({
              title: "Thành công",
              message: "Xoá tin thành công!",
            });
            this.$emit('postDeleted');
          },
          () => {
            Notification.error({
              title: "Thất bại",
              message: "Xoá tin thất bại!",
            });
        }
        )
      },
    },
}
</script>

<style>
.link-to-detail {
  text-decoration: none;
}

.state-post {
  margin-left: 15px;
}
.action-post {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>