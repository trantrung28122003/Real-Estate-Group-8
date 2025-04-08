<template>
    <el-dialog :title="'Cập nhật quyền cho ' + subAdmin.name" width="500px" :visible.sync="isActiveDialog">
        <el-form>
            <el-form-item>
                <label class="label">Quyền:</label>
                <el-select class="select-input" v-model="selected" clearable filterable multiple placeholder="Select">
                    <el-option
                        v-for="(item, index) in roles"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isActiveDialog = false">Huỷ</el-button>
            <el-button :loading="loading" @click="handleUpdate()" type="primary">Cập nhật</el-button>
        </span>
    </el-dialog>
</template>

<script>
import SubAminApi from "@/api/admin/subAdmin"
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
        roles: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isActiveDialog: this.isActive,
            selected: [],
            loading: false,
            subAdmin: {},
        }
    },
    methods: {
        handleUpdate() {
            this.loading = true
            SubAminApi.updateRole(
                this.subAdmin.id,
                {
                    'roles': this.selected
                },
                () => {
                    Notification.success({
                        title: "Thành công",
                        message: "Cập nhật quyền thành công",
                    })
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
                    this.loading = false
                }
            )
        }
    },
    watch: {
        isActive(newVal) {
            if(this.isActiveDialog != newVal) {
                this.isActiveDialog = newVal
                this.subAdmin = { ...this.data }
                this.subAdmin.roles.forEach(role => {
                    this.selected.push(role.id)
                });
            }
        },

        isActiveDialog(newVal) {
            if(!newVal) {
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