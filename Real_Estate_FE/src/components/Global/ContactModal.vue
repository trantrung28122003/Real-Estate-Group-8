<template>
    <el-dialog class="dialog-contact" title="Yêu cầu liên hệ lại" width="400px" :visible.sync="dialogContact">
      <el-form >
        <span>{{ title }}</span>
        <el-form-item >
          <el-input class="input-contact" v-model="nameContact" autocomplete="off" placeholder="Họ tên*"></el-input>
          <span v-if="submitted && !$v.nameContact.required" class="p-error">Bạn phải điền tên của bạn!</span>
          <el-input class="input-contact" v-model="phoneContact" autocomplete="off" placeholder="Số điện thoại*"></el-input>
          <span v-if="submitted && !$v.phoneContact.required" class="p-error">Bạn phải điền số điện thoại!</span>
          <span v-if="submitted && !$v.phoneContact.isPhoneNumber" class="p-error">Số điện thoại không đúng</span>
          <el-input class="input-contact" type="textarea" :autosize="{ minRows: 4}" v-model="mailContent" autocomplete="off" placeholder="Lời nhắn"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" class="btn-investor-contact" @click="sendMail()" type="primary">Gửi thông tin</el-button>
      </span>
    </el-dialog>
</template>

<script>
import EmailApi from "@/api/email"
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
    },
    validations: {
        nameContact: {
            required,
        },
        phoneContact: {
            required,
            isPhoneNumber(value) {
            return this.isPhoneNumber(value)
          }
        }
    },
    computed: mapState({
        userInfor: (state) => state.user,
    }),
    data() {
        return {
            nameContact: "",
            phoneContact: "",
            mailContent: "",
            title: "",
            dialogContact: false,
            loading: false,
            submitted: false,
            to_email: "",
        }
    },
    methods: {
        sendMail() {
            this.submitted = true
            if(this.$v.$invalid) {
                return false
            }
            this.loading = true
            EmailApi.sendContactEmail(
                {
                    'user_name' : this.nameContact,
                    'phone' : this.phoneContact,
                    'content' : this.mailContent,
                    'to_email' : this.email
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
                if(this.type == "user") {
                    this.title = "Chúng tôi sẽ kết nối bạn với chủ bất động sản"
                    this.to_email = this.email
                } else if(this.type == "broker") {
                    this.title = "Chúng tôi sẽ kết nối bạn với nhà môi giới"
                    this.to_email = this.email
                } else {
                    this.title = "Chúng tôi sẽ kết nối bạn với doanh nghiệp"
                    this.to_email = "huybang.trinh@gmail.com"
                }
                if(this.userInfor.id) {
                    this.phoneContact = this.userInfor.phone,
                    this.nameContact = this.userInfor.name
                }
            }
        },

        dialogContact(newVal) {
            if(!newVal) {
                this.submitted = false
                this.name = ""
                this.selected = []
                this.$emit('closeContactModal')
            }
        }
    }
}
</script>

<style>

</style>