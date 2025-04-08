<template>
    <div class="project-list-single" style="margin-top: 10px;">
        <div v-for="project in projects" :key="project.id">
            <single-project :project="project" :isOwner="true" @delete-project="handleDelete()"/>
        </div>
    </div>
</template>

<script>
import SingleProject from '../../Project/SingleProject.vue';
import projectType from '@/data/projectType';
export default {
    props: {
        projects: {
          type: Array,
          default : () => []
        },
    },

    components: {
        'single-project' : SingleProject,
    },

    data() {
        return {
            projectType: projectType,
            title: ''
        }
    },

    methods: {
        getStatusClass(project) {
            return {
                'status-pending': project.status === 'Sắp mở bán',
                'status-completed': project.status === 'Đang mở bán',
                'status-handed': project.status === 'Đã bàn giao',
                'status-in-progress': project.status == ''
            };
        },
        setTitle() {
            this.title = 'Dự án'
            if(this.filters.type_id) {
                this.title = projectType[this.filters.type_id]
            }
            if(this.filters.province || this.filters.district) {
                this.title += " tại " + this.showAddress({province: this.filters.province, district: this.filters.district})
            } else {
                this.title += " trên toàn quốc"
            }
        },
        handleDelete() {
            this.$emit('handle-delete-project')
        }
    },

    watch: {
        filters() {
            this.setTitle()
        }
    }
}
</script>

<style scoped>

.project-list-single {
    width: 90%;
}

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>