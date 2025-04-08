<template>
    <div class="project-list-single">
        <h4>{{ title }}</h4>
        <p>Hiện đang có {{ projects.length }} dự án</p>
        
        <div v-for="project in projects" :key="project.id">
            <router-link class="link-to-detail" :to="`/chi-tiet-du-an/${project.id}`">
                <single-project :project="project"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import SingleProject from './SingleProject.vue';
import projectType from '@/data/projectType';
export default {
    props: {
        projects: {
          type: Array,
          default : () => []
        },
        filters: {
            type: Object,
            // default : () => {}
        }
    },

    components: {
        'single-project' : SingleProject,
    },

    mounted() {
        this.setTitle()
    },

    data() {
        return {
            projectType: projectType,
            title: ''
        }
    },

    methods: {
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
    width: 80%;
}

.paginate-page{
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>