<template>
    <div class="widget-review">
        <div class="info-panel" @mouseenter="expandInfo" @mouseleave="collapseInfo">
            <el-button v-if="user && user.id" @click="openDialog=true" type="warning" icon="el-icon-star-off" circle></el-button>
            <el-button v-else type="warning" icon="el-icon-star-off" circle></el-button>
            <el-rate v-if="showInfo" class="avg-rating" 
                v-model="avgRating" 
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
            ></el-rate>
            <el-tooltip v-if="showInfo" :content="tooltipConten" placement="bottom" effect="dark">
                <img class="tooltip_icon" width="12" height="12" style="margin-right: 10px" :src="`https://d31wum4217462x.cloudfront.net/img/question-circle.svg`" alt="tooltip_icon" />
            </el-tooltip>
        </div>
        <el-dialog class="dialog-review" title="Đánh giá hệ thống gợi ý" width="400px" :visible.sync="openDialog" :before-close="closeDialog">
            <el-form >
                <span class="dialog-content-title">Để hệ thống gợi ý trở nên chính xác và hữu ích hơn cho người dùng. Chúng tôi rất mong được nhận
                    những góp ý của mọi người. Vậy nên nếu cảm thấy hệ thống gợi ý còn chưa phù hợp, mọi người có thể
                    nêu góp ý ở bên dưới. Xin cảm ơn!!
                </span>
                <el-form-item>
                    <el-rate class="rating-review" v-model="$v.rating.$model"></el-rate>
                    <span v-if="submitted && !$v.rating.greaterThanZero" class="p-error rating-review">Không để trống số sao!</span>
                    <el-input class="input-contact" type="textarea" :autosize="{ minRows: 4}" v-model="$v.review.$model" autocomplete="off" placeholder="Đánh giá - góp ý"></el-input>
                    <span v-if="submitted && !$v.review.required" class="p-error">Không để trống góp ý!</span>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createOrUpdateReview()" class="btn-investor-contact" type="primary">Gửi đánh giá</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import ReviewApi from "@/api/review"
import { Notification } from 'element-ui'
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            showInfo: false,
            tooltipConten: 'Điểm đánh giá về hệ thống gợi ý.',
            openDialog: false,
            avgRating: null,
            rating: null,
            review: null,
            submitted: false,
        }
    },
    computed: mapState({
        user: (state) => state.user,
    }),
    mounted() {
        this.getAvgRating();
    },
    validations: {
        rating: {
            required,
            greaterThanZero(value) {
                return value > 0;
            }
        },
        review: {
            required
        }
    },
    methods: {
        getAvgRating() {
            ReviewApi.avgRating(
                (response) => {
                this.avgRating = response.data.avgRating ? response.data.avgRating : null;
                }
            )
        },
        createOrUpdateReview() {
            this.submitted = true
            if(this.$v.$invalid) {
                return false
            }
            ReviewApi.createOrUpdate(
                {
                    'rating' : this.rating,
                    'review' : this.review
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Đánh giá/Góp ý thành công",
                    });
                    this.openDialog = false
                    this.getAvgRating()
                    this.rating = null
                    this.review = null
                },
                () => {
                    Notification.error({
                        title: "Thất bại",
                        message: "Đánh giá thất bại",
                    });
                }
            )
        },
        closeDialog() {
            this.openDialog = false
            this.rating = null
            this.review = null
        },
        expandInfo() {
            this.showInfo = true;
        },
        collapseInfo() {
            this.showInfo = false;
        }
    }
}
</script>

<style scoped>
.info-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    border-radius: 100px 0px 0px 100px !important;
    top: 50%;
    right: 0;
    background-color: #ffffff;
    border: 1px solid #ccc;
    transition: width 10s;
    z-index: 99999;
}

button {
    cursor: pointer;
}

.avg-rating {
    margin: 0 5px 0 10px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 10s;
}

.info-panel:hover .avg-rating {
    overflow: visible;
    width: auto;
}

.review-suggest-function{
  display: flex;
  flex-direction: row;
  align-content: center;
}

.dialog-content-title {
  word-break: break-word;
}

.rating-review {
  margin: 10px;
  display: flex;
  justify-content: center;
}
</style>