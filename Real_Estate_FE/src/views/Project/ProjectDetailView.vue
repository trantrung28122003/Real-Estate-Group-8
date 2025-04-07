<template>
  <div class="container project-detail">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-bottom: 10px"
    >
      <el-breadcrumb-item>Dự án</el-breadcrumb-item>
      <el-breadcrumb-item>{{ showProvince(project) }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ showDistrict(project) }}</el-breadcrumb-item>
      <el-breadcrumb-item>Căn hộ chung cư</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>{{ project.name }}</h2>
    <span class="label">{{ project.address }}</span>
    <span @click="scrollTo('#project-loaction')" style="margin-left: 10px; cursor: pointer; color: #0d6efd">
      Xem bản đồ <i class="el-icon-right"></i
    >
    </span>

    <el-carousel class="project-image-list" :interval="2000" type="card" height="400px">
      <el-carousel-item v-for="item in project.images" :key="item">
        <el-image
          :src="item"
          fit="contain">
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="row project-info" style="min-width: 900px; margin-bottom: 80px">
      <div class="col-8" style="min-width: 600px">
        <h4 class="list_titles">Tổng quan {{ project.name }}</h4>
        <div v-for="(item, index) in listProjectInfor" :key="index">
          <div v-if="project[item.name]">
            <el-row :gutter="20">
              <el-col class="label" :span="4"> {{ item.label }}</el-col>
              <el-col v-if="item.name === 'investor'" :span="20">
                <a
                  class="link-to-detail"
                  :href="`/doanh-nghiep/${project.investor.id}`"
                >
                  <h6>{{ project[item.name].name }}</h6></a
                ></el-col
              >
              <el-col v-else-if="item.name === 'apartment'" :span="20"
                >{{ project[item.name] }} căn</el-col
              >
              <el-col v-else-if="item.name === 'building'" :span="20"
                >{{ project[item.name] }} toà</el-col
              >
              <el-col v-else-if="item.name === 'start_price'" :span="20"
                >{{ showProjectPrice(project) }}
              </el-col>
              <el-col v-else-if="item.name === 'size'" :span="20">{{
                showProjectSize(project)
              }}</el-col>
              <el-col v-else :span="20">{{ project[item.name] }}</el-col>
            </el-row>
            <hr />
          </div>
        </div>

        <div>
          <div class="render-html" v-html="project.description" style="width: 95%"></div>
        </div>
        <div id="project-loaction">
          <h4 class="list_titles">Vị trí dự án {{ project.name }}</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.247274130735!2d106.72601367485603!3d10.715401189429684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175250035d50c45%3A0xb8ec6c61056ad0c7!2zVGhlIEF1cm9yYSBQaMO6IE3hu7kgSMawbmc!5e0!3m2!1svi!2s!4v1704270322667!5m2!1svi!2s"
            width="100%"
            height="450"
            style="border: 0"
            :allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div class="col-4 project-contact-information-animation">
        <div class="project-contact-information">
          <div class="investor-information">
            <router-link
              class="link-to-detail"
              :to="`/doanh-nghiep/${project.investor.id}`"
            >
              <img :src="project.investor.logo" alt="" />
              <h5 style="color: #000">{{ project.investor.name }}</h5>
            </router-link>
            <div class="investor-information-single">
              <span class="label"> Số dự án : </span>
              <span :span="16">{{ project.investor.count_project ? project.investor.count_project : 'N/A' }}</span>
            </div>

            <div class="investor-information-single" v-if="project.investor.website">
              <span class="label"> Website : </span>
              <a class="link-to-detail" :href="project.investor.website" target="_blank" :span="16">
                {{ project.investor.website }}
              </a>
            </div>

            <el-button class="btn-investor-contact" @click="coppyClipboard(project.investor.phone_number)" type="primary">
              <svg data-v-167ecec1="" width="16" height="16" viewBox="0 0 30 30" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path data-v-167ecec1="" d="M6.85116 2.49006C6.74047 2.34768 6.60075 2.23047 6.44129 2.14624C6.28182 2.062 6.10626 2.01265 5.92625 2.00148C5.74625 1.99031 5.56593 2.01756 5.39727 2.08144C5.22862 2.14531 5.07548 2.24433 4.94803 2.37194L3.00928 4.31256C2.10366 5.22006 1.76991 6.50444 2.16553 7.63132C3.80754 12.2955 6.47858 16.5302 9.98053 20.0213C13.4716 23.5232 17.7063 26.1942 22.3705 27.8363C23.4974 28.2319 24.7818 27.8982 25.6893 26.9926L27.628 25.0538C27.7556 24.9264 27.8547 24.7732 27.9185 24.6046C27.9824 24.4359 28.0097 24.2556 27.9985 24.0756C27.9873 23.8956 27.938 23.72 27.8537 23.5606C27.7695 23.4011 27.6523 23.2614 27.5099 23.1507L23.1843 19.7869C23.0322 19.669 22.8552 19.5871 22.6669 19.5474C22.4785 19.5078 22.2835 19.5115 22.0968 19.5582L17.9905 20.5838C17.4424 20.7208 16.8682 20.7135 16.3237 20.5627C15.7793 20.4119 15.2832 20.1227 14.8837 19.7232L10.2787 15.1163C9.87885 14.717 9.58927 14.221 9.43812 13.6765C9.28697 13.132 9.2794 12.5577 9.41616 12.0094L10.4437 7.90319C10.4904 7.71643 10.494 7.52151 10.4544 7.33312C10.4148 7.14473 10.3329 6.96781 10.2149 6.81569L6.85116 2.49006ZM3.53241 0.95819C3.86052 0.62997 4.25471 0.375309 4.68879 0.211117C5.12288 0.046925 5.58692 -0.0230412 6.05012 0.00586428C6.51332 0.0347698 6.96507 0.161886 7.37537 0.378771C7.78567 0.595657 8.14514 0.897349 8.42991 1.26381L11.7937 5.58756C12.4105 6.38069 12.628 7.41382 12.3843 8.38881L11.3587 12.4951C11.3056 12.7077 11.3085 12.9305 11.367 13.1418C11.4255 13.353 11.5376 13.5456 11.6924 13.7007L16.2993 18.3076C16.4546 18.4627 16.6475 18.575 16.8591 18.6335C17.0707 18.692 17.2938 18.6947 17.5068 18.6413L21.6112 17.6157C22.0923 17.4954 22.5945 17.486 23.0798 17.5884C23.5651 17.6907 24.0208 17.902 24.4124 18.2063L28.7362 21.5701C30.2905 22.7794 30.433 25.0763 29.0418 26.4657L27.103 28.4044C25.7155 29.7919 23.6418 30.4013 21.7087 29.7207C16.7609 27.9798 12.2685 25.1473 8.56491 21.4332C4.85107 17.7301 2.01855 13.2384 0.277406 8.29132C-0.401344 6.36006 0.208031 4.28444 1.59553 2.89694L3.53428 0.95819H3.53241Z" fill="#ffffff"></path></svg> 
              {{ project.investor.phone_number }}
            </el-button>

            <el-button class="btn-investor-contact" type="info" @click="handleOpenDialogContact()">
              <svg data-v-167ecec1="" width="16" height="18" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-167ecec1="" d="M0 4.5C0 3.50544 0.395088 2.55161 1.09835 1.84835C1.80161 1.14509 2.75544 0.75 3.75 0.75H26.25C27.2446 0.75 28.1984 1.14509 28.9016 1.84835C29.6049 2.55161 30 3.50544 30 4.5V19.5C30 20.4946 29.6049 21.4484 28.9016 22.1516C28.1984 22.8549 27.2446 23.25 26.25 23.25H3.75C2.75544 23.25 1.80161 22.8549 1.09835 22.1516C0.395088 21.4484 0 20.4946 0 19.5V4.5ZM3.75 2.625C3.25272 2.625 2.77581 2.82254 2.42417 3.17417C2.07254 3.52581 1.875 4.00272 1.875 4.5V4.90688L15 12.7819L28.125 4.90688V4.5C28.125 4.00272 27.9275 3.52581 27.5758 3.17417C27.2242 2.82254 26.7473 2.625 26.25 2.625H3.75ZM28.125 7.09312L19.2975 12.39L28.125 17.8219V7.09312ZM28.0612 19.9856L17.4862 13.4775L15 14.9681L12.5138 13.4775L1.93875 19.9838C2.0453 20.3827 2.28059 20.7354 2.60811 20.987C2.93562 21.2385 3.33702 21.3749 3.75 21.375H26.25C26.6627 21.3751 27.0639 21.2389 27.3914 20.9877C27.7189 20.7365 27.9544 20.3843 28.0612 19.9856ZM1.875 17.8219L10.7025 12.39L1.875 7.09312V17.8219Z" fill="#ffffff"></path></svg>
              Yêu cầu liên hệ lại
            </el-button>
            <ContactModal :isActive="dialogContact" :email="project?.investor?.email" :type="'enterprise'" @closeContactModal="dialogContact = !dialogContact" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <project-for-you />
    </div>
  </div>
</template>

<script>
import ContactModal from '@/components/Global/ContactModal.vue'
import ProjectApi from '@/api/project'
import ListProjectInfor from "@/data/listProjectInfor"
import ProjectForYou from "@/components/Home/ProjectForYou.vue"
import { mapState } from 'vuex'
export default {
  components: {
    "project-for-you": ProjectForYou,
    ContactModal,
  },

  computed: mapState({
    user: (state) => state.user,
  }),

  created() {
    this.getDetail()
  },

  data() {
    return {
      dialogContact: false,
      listProjectInfor: ListProjectInfor,
      project: {
        province: "",
        district: "",
        investor: {
          id: ""
        }
      },
      nameContact: "",
      phoneContact: "",
      mailContent: "",
    };
  },

  methods: {
    getDetail() {
      ProjectApi.detail(
        this.$route.params.id,
        (response) => {
          this.project = response.data
        }
      )
    },
    showProjectPrice(project) {
        if(project.end_price) {
            if(project.start_price / 1000 >= 1) {
                return (project.start_price / 1000).toFixed(2) + " - " + (project.end_price / 1000).toFixed(2) + " tỷ/m²"
            } else if(project.end_price / 1000 < 1) {
                return project.start_price + " - " + project.end_price + " triệu/m²"
            } else {
                return project.start_price + " triệu/m²" + " - " + (project.end_price / 1000).toFixed(2) + " tỷ/m²"
            }
        } else {
            return project.start_price / 1000 >= 1 ? (project.start_price / 1000).toFixed(2) + " tỷ/m²" : project.start_price + " triệu/m²";
        }
    },

    showProjectSize(project) {
      return project.size + " " + project.size_unit;
    },

    handleOpenDialogContact() {
      this.dialogContact = !this.dialogContact
    },

    copyRefCodeToClipboard(data) {
      navigator.clipboard.writeText(data)
      let tooltip = document.getElementById('myTooltipText')
      tooltip.innerHTML = 'Đã sao chép'
    },
    mouseOutCopy() {
      let tooltip = document.getElementById('myTooltipText')
      tooltip.innerHTML = 'Sao chép'
    },
  },

};
</script>

<style scoped>
.project-detail {
  padding-top: 3%;
}

.project-info {
  width: 90%;
  margin-top: 30px;
}

.project-image-list {
  margin-top: 20px;
  width: 95%;
  border-radius: 10px;
}

.project-image {
  width: 100%;
  height: 360px;
}

.image {
  width: 100%;
}

#project-loaction {
  width: 100%;
}

.el-button+.el-button {
  margin-left: 0px;
}

.el-dialog {
  border-radius: 10px;
}

.label {
  font-weight: 600;
}

.investor-information-single {
  margin-top: 5px;
}

.el-carousel__item {
  background-color: #686666;
  display: flex;
  justify-content: center;
}

.render-html >>> img {
  width: -webkit-fill-available !important;
  height: auto !important;
}

.render-html >>> figcaption {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
</style>