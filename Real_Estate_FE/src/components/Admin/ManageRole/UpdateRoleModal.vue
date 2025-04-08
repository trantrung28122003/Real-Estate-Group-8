<template>
    <el-dialog :title="'Cập nhật quyền ' + role.name" width="500px" :visible.sync="isActiveDialog">
        <el-form>
            <el-form-item >
                <label class="label">Tên quyền:<span class="required-field"> *</span></label>
                <el-input v-model="name" autocomplete="off" placeholder="VD: Quản lý người dùng"></el-input>
                <span v-if="submitted && !$v.name.required" class="p-error">Tên quyền không được để trống!</span>
            </el-form-item>
            <el-form-item>
                <label class="label">Chức năng có thể thực hiện:<span class="required-field"> *</span></label>
                <el-select class="select-input" v-model="selected" clearable filterable multiple placeholder="Select">
                    <el-option
                        v-for="(item, index) in permissions"
                        :key="index"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span v-if="submitted && !$v.selected.isArray" class="p-error">Phải có ít nhất 1 hành động!</span>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isActiveDialog = false">Huỷ</el-button>
            <el-button :loading="loading" @click="handleUpdate()" type="primary">Cập nhật</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import AdminRoleApi from "@/api/admin/adminRole"
import { Notification } from "element-ui"
export default {
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        permissions: {
            type: Object,
            default: () => {},
        },
    },
    validations: {
        name: {
            required,
        },
        selected: {
            isArray(value) {
                return this.isArray(value)
            }
        }
    },
    data() {
        return {
            isActiveDialog: this.isActive,
            name: "",
            selected: [],
            loading: false,
            role: {},
            submitted: false,
        }
    },
    methods: {
        handleUpdate() {
            this.submitted = true
            if(this.$v.$invalid) {
                return false
            }
            this.loading = true
            AdminRoleApi.update(
                this.role.id,
                {
                    'name': this.name,
                    'permissions': this.selected
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Cập nhật quyền thành công",
                    })
                    this.submitted = false
                    this.loading = false
                    this.isActiveDialog = false
                    this.$emit('updateRole')
                },
                (error) => {
                    if(error?.response?.data?.code) {
                        if(error.response.data.code === 403) {
                            Notification.error({
                                title: "Thất bại",
                                message: error.response.data.error,
                            });
                        }
                    } else {
                        Notification.error({
                            title: "Thất bại",
                            message: error?.response?.data?.error,
                        });
                    }
                    this.submitted = false
                    this.loading = false
                }
            )
        }
    },
    watch: {
        isActive(newVal) {
            if(this.isActiveDialog != newVal) {
                this.isActiveDialog = newVal
                this.role = { ...this.data }
                this.name = this.role.name
                this.role.permissions.forEach(permission => {
                    this.selected.push(this.getFromObject(this.permissions, permission)?.id)
                });
            }
        },

        isActiveDialog(newVal) {
            if(!newVal) {
                this.submitted = false
                this.name = ""
                this.selected = []
                this.$emit('closeUpdateDialog')
            }
        },
    }
}
</script>

<style scoped>
.label{
  font-weight: 600;
}

.select-input {
    width: 100%;
}
</style>