<template>
    <div class="single-project">
        <router-link style="position: relative;" class="link-to-detail" :to="`/chi-tiet-du-an/${project.id}`">
            <img class="image-project" :src="project.image" loading="lazy" alt="" />
            <div class="number-image"><i class="el-icon-picture-outline"> {{ project.number_image }}</i> </div>
        </router-link>
        <div class="content-project">
            <router-link class="link-to-detail" :to="`/chi-tiet-du-an/${project.id}`">
                <span class="project-name">{{ project.name }}</span>
            </router-link>
            <div class="project-status">
                <span v-if="project.project_status" :class="getStatusClass(project)">{{ projectStatus[project.project_status] }} {{ project.note ? " - " + project.note : "" }}</span>
                <span v-else :class="getStatusClass(project)">Đang cập nhật {{ project.note ? " - " + project.note : "" }}</span>
            </div>
            <div v-if="project.size" class="project-size">
                <span> {{ project.size + " " + project.size_unit}}</span>
            </div>
            <div class="project-location">
                <i class="el-icon-location-outline"></i> {{ project.address }}
            </div>
            <div class="project-description">
                <p style="width: 100%" v-html="showDescription()"></p>
            </div>
            <div v-if="isOwner && (project.status == 0 || project.status == 1)" class="action-project">
                <el-button icon="el-icon fa fa-pencil" size="small" @click="gotoUpdate(project.id)"> Sửa</el-button>
                <el-button type="danger" icon="el-icon fa fa-trash-alt" size="small" @click="handleDelete(project.id)"> Xoá</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import projectStatus from '@/data/projectStatus';
import ProjectApi from '@/api/project'
import { Notification } from 'element-ui'
export default {
    props: {
        isOwner: {
            type: Boolean,
            default: false
        },
        project: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            projectStatus : projectStatus,
        }
    },

    methods: {
        gotoUpdate(id) {
            this.$router.push(`/chinh-sua-du-an/${id}`)
        },
        showDescription() {
            var description = this.project.description
            const figureIndex = description.indexOf('<figure')
            if (figureIndex !== -1) {
                description = description.substring(0, figureIndex)
            }
            description = description.replace(/<strong>/gi, '<span>');
            description = description.replace(/<h1>/gi, '<span>');
            description = description.replace(/<h2>/gi, '<span>');
            description = description.replace(/<h3>/gi, '<span>');
            description = description.replace(/<\/strong>/gi, '</span>');
            description = description.replace(/<\/h1>/gi, '</span>');
            description = description.replace(/<\/h2>/gi, '</span>');
            description = description.replace(/<\/h3>/gi, '</span>');
            return description
        },
        handleDelete(id) {
            ProjectApi.delete(
                id,
                () => {
                    this.$emit('delete-project')
                },
                (error) => {
                    Notification.error({
                        title: "Thất bại",
                        message: error.response.data.error,
                    });
                }
            )
        }
    }

}
</script>

<style scoped>

</style>