<template>
    <el-dialog class="report-dialog"  title="Báo cáo bài đăng không đúng thông tin" width="400px" :visible.sync="dialogContact">
      <el-form>
        <el-form-item>
            <span style="font-weight: 550">Nội dung báo cáo</span>
            <el-checkbox-group class="report-dialog-options" v-model="content">
                <el-checkbox v-for="(option, index) in options" :label="option.label" :key="index">{{option.label}}</el-checkbox>
            </el-checkbox-group>
            <span style="font-weight: 550">Phản hồi khác</span>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="Nội dung báo cáo"
                v-model="other_content">
            </el-input>
            <span style="font-weight: 550">Thông tin của bạn</span>
          <el-input class="input-contact" v-model="nameContact" autocomplete="off" placeholder="Họ tên"></el-input>
          <el-input class="input-contact" v-model="phoneContact" autocomplete="off" placeholder="Số điện thoại*"></el-input>
          <span v-if="submitted && !$v.phoneContact.required" class="p-error">Số điện thoại không được để trống!</span>
          <span v-if="submitted && !$v.phoneContact.isPhoneNumber" class="p-error">Số điện thoại không đúng</span>
          <el-input class="input-contact" v-model="emailContact" autocomplete="off" placeholder="Email*"></el-input>
          <span v-if="submitted && !$v.emailContact.required" class="p-error">Email không được để trống!</span>
          <span v-if="submitted && !$v.emailContact.email" class="p-error">Email không đúng</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" class="btn-investor-contact" @click="handleConfirm()" type="primary">Gửi thông tin</el-button>
      </span>
    </el-dialog>
</template>

<script>
import ReportApi from "@/api/report"
import { required, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    validations: {
        phoneContact: {
            required,
            isPhoneNumber(value) {
            return this.isPhoneNumber(value)
          }
        },
        emailContact: {
            required,
            email,
        }
    },
    computed: mapState({
        userInfor: (state) => state.user,
    }),
    data() {
        return {
            nameContact: "",
            phoneContact: "",
            emailContact: "",
            content: [],
            options: [
                {
                    label: "Địa chỉ của bất động sản",
                    value: "Địa chỉ của bất động sản",
                },
                {
                    label: "Các thông tin về: giá, diện tích, mô tả ...",
                    value: "Các thông tin về: giá, diện tích, mô tả ...",
                },
                {
                    label: "Ảnh",
                    value: "Ảnh",
                },
                {
                    label: "Trùng với tin rao khác",
                    value: "Trùng với tin rao khác",
                },
                {
                    label: "Tin không có thật",
                    value: "Tin không có thật",
                },
                {
                    label: "Bất động sản đã bán",
                    value: "Bất động sản đã bán",
                },
            ],
            other_content: "",
            dialogContact: false,
            loading: false,
            submitted: false,
        }
    },
    methods: {
        handleConfirm() {
            this.submitted = true
            if(this.$v.$invalid) {
                return false
            }
            if(this.other_content) {
                this.content.push(this.other_content)
            }
            let resultString =this.content.join(";");
            ReportApi.create(
                {
                    'post_id' : this.$route.params.id,
                    'name' : this.nameContact,
                    'phone' : this.phoneContact,
                    'email' : this.emailContact,
                    'content' : resultString,
                },
                () => {
                    this.loading = false
                    this.submitted = false
                    this.dialogContact = false
                },
                () => {
                    this.loading = false
                }
            )
        },
    },
    watch: {
        isActive(newVal) {
            if(this.dialogContact != newVal) {
                this.dialogContact = newVal
                if(this.userInfor.id) {
                    this.phoneContact = this.userInfor.phone,
                    this.nameContact = this.userInfor.name,
                    this.emailContact = this.userInfor.email
                }
            }
        },

        dialogContact(newVal) {
            if(!newVal) {
                this.submitted = false
                this.content = [],
                this.other_content = ''
                this.$emit('closeReportModal')
            }
        }
    }
}
</script>

<style scoped>
.report-dialog-options {
    display: flex;
    flex-direction: column;
}
</style>