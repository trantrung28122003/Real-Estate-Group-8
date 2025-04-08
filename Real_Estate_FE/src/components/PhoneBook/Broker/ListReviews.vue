<template>
  <div>
    <h4 class="list_titles">Danh sách đánh giá ({{ reviews.length }})</h4>
    <div v-for="(review, index) in visibleReviews" :key="index">
        <div class="single-review">
            <div style="margin-right: 10px;">
                <img style="width: 40px; height: 40px; border-radius: 50%;" v-if="review.avatar" :src="review.avatar" alt="avatar">
                <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
            </div>
            <div>
                <strong>{{ review.name }}</strong>
                <el-rate
                    v-model="review.rating"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                ></el-rate>
                <div><span style="color: grey;">{{ showTime(review.created_at) }}</span></div>
                <span>{{ review.review }}</span>
            </div>
        </div>
        <hr>
    </div>
    <div class="button-show-more">
        <el-button v-if="reviews.length > visibleReviews.length" @click="showMoreReviews">Xem thêm</el-button>
        <el-button v-if="reviews.length <= visibleReviews.length && visibleReviews.length > unit" @click="showLessReviews">Ẩn bớt</el-button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        reviews: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            unit: 5,
            visibleReviewsCount: 5
        };
    },
    computed: {
        visibleReviews() {
            return this.reviews.slice(0, this.visibleReviewsCount)
        }
    },
    methods: {
        showMoreReviews() {
            this.visibleReviewsCount += this.unit
        },
        showLessReviews() {
            this.visibleReviewsCount = this.unit
        }
    }
}
</script>

<style scoped>
.single-review {
    display: flex;
    flex-direction: row;
}
.button-show-more {
    display: flex;
    justify-content: center;
}
</style>