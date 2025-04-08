<template>
    <div>
        <div v-if="brokers && brokers.length">
            <div class="single-broker-card" v-for="broker in brokers" :key="broker.id">
                <div>
                    <router-link :to="`/nha-moi-gioi/${broker.id}`">
                        <img class="broker-avatar-single-card" :src="broker.info.avatar" alt="" />
                    </router-link>
                </div>
                <div class="broker-single-card-info">
                    <p class="card-title">{{ broker.info.name }}</p>
                    <div>
                        <span style="margin-top: 10px;">
                            <i class="el-icon-location-outline"></i>
                            {{ broker.address ?  broker.address : 'Đang cập nhật'}}
                        </span>
                    </div>
                    <div>
                        <span>
                            <svg data-v-167ecec1="" width="16" height="16" viewBox="0 0 30 30" fill="#000000" xmlns="http://www.w3.org/2000/svg"><path data-v-167ecec1="" d="M6.85116 2.49006C6.74047 2.34768 6.60075 2.23047 6.44129 2.14624C6.28182 2.062 6.10626 2.01265 5.92625 2.00148C5.74625 1.99031 5.56593 2.01756 5.39727 2.08144C5.22862 2.14531 5.07548 2.24433 4.94803 2.37194L3.00928 4.31256C2.10366 5.22006 1.76991 6.50444 2.16553 7.63132C3.80754 12.2955 6.47858 16.5302 9.98053 20.0213C13.4716 23.5232 17.7063 26.1942 22.3705 27.8363C23.4974 28.2319 24.7818 27.8982 25.6893 26.9926L27.628 25.0538C27.7556 24.9264 27.8547 24.7732 27.9185 24.6046C27.9824 24.4359 28.0097 24.2556 27.9985 24.0756C27.9873 23.8956 27.938 23.72 27.8537 23.5606C27.7695 23.4011 27.6523 23.2614 27.5099 23.1507L23.1843 19.7869C23.0322 19.669 22.8552 19.5871 22.6669 19.5474C22.4785 19.5078 22.2835 19.5115 22.0968 19.5582L17.9905 20.5838C17.4424 20.7208 16.8682 20.7135 16.3237 20.5627C15.7793 20.4119 15.2832 20.1227 14.8837 19.7232L10.2787 15.1163C9.87885 14.717 9.58927 14.221 9.43812 13.6765C9.28697 13.132 9.2794 12.5577 9.41616 12.0094L10.4437 7.90319C10.4904 7.71643 10.494 7.52151 10.4544 7.33312C10.4148 7.14473 10.3329 6.96781 10.2149 6.81569L6.85116 2.49006ZM3.53241 0.95819C3.86052 0.62997 4.25471 0.375309 4.68879 0.211117C5.12288 0.046925 5.58692 -0.0230412 6.05012 0.00586428C6.51332 0.0347698 6.96507 0.161886 7.37537 0.378771C7.78567 0.595657 8.14514 0.897349 8.42991 1.26381L11.7937 5.58756C12.4105 6.38069 12.628 7.41382 12.3843 8.38881L11.3587 12.4951C11.3056 12.7077 11.3085 12.9305 11.367 13.1418C11.4255 13.353 11.5376 13.5456 11.6924 13.7007L16.2993 18.3076C16.4546 18.4627 16.6475 18.575 16.8591 18.6335C17.0707 18.692 17.2938 18.6947 17.5068 18.6413L21.6112 17.6157C22.0923 17.4954 22.5945 17.486 23.0798 17.5884C23.5651 17.6907 24.0208 17.902 24.4124 18.2063L28.7362 21.5701C30.2905 22.7794 30.433 25.0763 29.0418 26.4657L27.103 28.4044C25.7155 29.7919 23.6418 30.4013 21.7087 29.7207C16.7609 27.9798 12.2685 25.1473 8.56491 21.4332C4.85107 17.7301 2.01855 13.2384 0.277406 8.29132C-0.401344 6.36006 0.208031 4.28444 1.59553 2.89694L3.53428 0.95819H3.53241Z" fill="#000000"></path></svg> 
                            {{ broker.info.phone }}
                        </span>
                    </div>
                    <div style="margin-top: 5px;" v-if="broker.number_consultations">
                        <span>
                            Số lần tư vấn: {{ broker.number_consultations }}
                        </span>
                    </div>
                    <div v-if="broker.rating" style="margin-top: 5px;" >
                        <el-rate
                            v-model="broker.rating" 
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                        ></el-rate>
                    </div>
                </div>
                <div class="brokerage-areas-single-card">
                    <p class="card-title" style="color: #000000"> Loại bất động sản và khu vực môi giới </p>
                    <ul>
                        <li v-for="(brokerageArea, index) in broker.areas" :key="index">
                            {{ showBrokerageArea(brokerageArea) }}
                        </li>
                    </ul>
                </div>
                <div
                    style="position: absolute; right: 15px;  display: flex; flex-direction: column"
                >
                    <el-tooltip v-if="!brokerAccepted" content="Chọn nhà môi giới" placement="top">
                        <el-button
                            :disabled="disabled "
                            @click="openConfirm(broker.id)"
                            type="primary"
                            icon="el-icon-check"
                            size="small"
                        >
                        </el-button>
                    </el-tooltip>
                    <el-tooltip v-else content="Bỏ chọn nhà môi giới" placement="top">
                        <el-button
                            @click="handleCheckDelete(broker)"
                            type="danger"
                            icon="el-icon fa fa-trash-alt"
                            size="small"
                        >
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="Đánh giá nhà môi giới" placement="bottom">
                        <el-button
                            v-if="brokerAccepted && !broker.isRating"
                            :disabled="disabled "
                            @click="openReviewDialog(broker)"
                            type="primary"
                            icon="el-icon-star-off"
                            size="small"
                        >
                        </el-button>
                    </el-tooltip>
                </div>
            </div>
            <el-dialog class="dialog-review widget-review" :title="dialogTitle" width="400px" :visible.sync="openDialog" :before-close="closeDialog">
                <el-form >
                    <span class="dialog-content-title">
                        Sau khi nhận được tư vấn từ nhà môi giới, bạn cảm thấy hài lòng về nhà tư vấn này không?
                        <span v-if="typeDialog=='delete'">Trước khi bỏ chọn nhà môi giới khỏi yêu cầu của bạn, bạn có thể để lại đánh giá cho nhà môi giới ở bên dưới.</span>
                    </span>
                    <el-form-item>
                        <el-rate class="rating-review" v-model="rating"></el-rate>
                        <el-input class="input-contact" type="textarea" :autosize="{ minRows: 4}" v-model="review" autocomplete="off" placeholder="Đánh giá"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="closeDialog" class="btn-investor-contact">Huỷ</el-button>
                    <el-button @click="typeDialog=='delete' ? handleDelete() : handleReview()" class="btn-investor-contact" type="primary">{{ typeDialog=='rating' ? 'Gửi đánh giá' :  (rating ? 'Gửi đánh giá và bỏ chọn' : 'Bỏ chọn nhà môi giới') }}</el-button>
                </span>
            </el-dialog>
        </div>
        <list-post-error v-else />
    </div>
</template>

<script>
import ListPostError from '@/components/NoneToDisplay/ListPostError.vue'
import AdviceRequestApi from '@/api/adviceRequest'
import BrokerApi from '@/api/broker'
import { Notification } from "element-ui"
export default {
    props: {
        brokers: {
          type: Array,
        },
        brokerAccepted: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        },
        hasBrokerAccepted: {
            type: Boolean,
        }
    },
    data() {
        return {
            openDialog: false,
            rating: null,
            review: null,
            dialogTitle: "",
            brokerId: null,
            typeDialog: null,
        }
    },
    components: {
      ListPostError
    },
    methods: {
        openConfirm(broker_id) {
            this.$confirm('Chúng tôi sẽ gửi toàn bộ thông tin liên hệ của bạn cho nhà môi giới này. Xác nhận chọn nhà môi giới này?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Huỷ',
            }).then(() => {
                AdviceRequestApi.acceptBroker(
                    {
                        'request_id' : this.$route.params.id,
                        'broker_id' : broker_id
                    },
                    ()=>{
                        Notification.success({
                            title: "Thành công",
                            message: "Thông tin của bạn đã được gửi đến nhà môi giới! Hãy chờ liên hệ lại!",
                        });
                        this.$emit("acceptBroker");
                    }
                )
            }).catch(() => {
            })
        },
        openReviewDialog(broker) {
            this.dialogTitle = "Đánh giá nhà môi giới " + broker.info.name
            this.brokerId = broker.id
            this.brokerName = broker.broker
            this.typeDialog = 'rating'
            this.openDialog = true
        },
        closeDialog() {
            this.rating = null
            this.review = null
            this.brokerId = null
            this.openDialog = false
        },
        handleCheckDelete(broker) {
            this.brokerId = broker.id
            this.brokerName = broker.broker
            if(broker.isRating) {
                this.$confirm('Bạn muốn bỏ nhà môi giới này khỏi yêu cầu tư vấn?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Huỷ',
                }).then(() => {
                    this.handleDelete()
                }).catch(() => {})
            } else {
                this.typeDialog = 'delete'
                this.dialogTitle = "Đánh giá nhà môi giới " + broker.info.name
                this.openDialog = true
            }
        },
        handleDelete() {
            AdviceRequestApi.deleteBroker(
                {
                    'request_id' : this.$route.params.id,
                    'broker_id' : this.brokerId,
                    'rating' : this.rating,
                    'review' : this.review
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: this.rating ? "Đánh giá nhà môi giới thành công!" : "Đã bỏ chọn nhà môi giới khỏi yêu cầu!",
                    });
                    this.$emit("deleteBroker");
                }
            )
        },
        handleReview() {
            BrokerApi.review(
                {
                    'request_id' : this.$route.params.id,
                    'broker_id' : this.brokerId,
                    'rating' : this.rating,
                    'review' : this.review
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Đánh giá nhà môi giới thành công",
                    });
                    this.closeDialog()
                    this.$emit("review");
                }
            )
        },
    },
}
</script>

<style scoped>
.el-button+.el-button {
  margin-left: 0px;
  margin-top: 10px;
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