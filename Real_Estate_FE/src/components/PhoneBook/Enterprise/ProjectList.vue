<template>
    <div>
        <h4 class="list_titles">Dự án thuộc {{ enterprise_name }}</h4>
        <div>
            <div v-for="project in projects" :key="project.id">
                <router-link class="link-to-detail" :to="`/chi-tiet-du-an/${project.id}`">
                    <single-project :project="project"/>
                </router-link>
            </div>
             <div class="button-show-more">
                <el-button v-if="projects.length > visibleProjects.length" @click="showMoreReviews">Xem thêm</el-button>
                <el-button v-if="projects.length <= visibleProjects.length && visibleProjects.length > unit" @click="showLessReviews">Ẩn bớt</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import SingleProject from '@/components/Project/SingleProject.vue';
export default {
    props: {
        enterprise_name: {
          type: String,
        },
        projects: {
            type: Array,
            default: () => [],
        }
    },

    components: {
        "single-project": SingleProject,
    },

    computed: {
        visibleProjects() {
            return this.projects.slice(0, this.visibleProjectsCount)
        }
    },

    data() {
        return {
            unit: 5,
            visibleProjectsCount: 5
        }
    },

    methods: {
        showMoreReviews() {
            this.visibleProjectsCount += this.unit
        },
        showLessReviews() {
            this.visibleProjectsCount = this.unit
        }
    }
}
</script>

<style scoped>
.button-show-more {
    display: flex;
    justify-content: center;
}
</style>