<template>
  <div class="post-detail">
    <div class="block-image">
      <el-carousel trigger="click" class="show-image">
        <el-carousel-item v-for="item in post.images" :key="item">
          <img class="image-detail" :src="item" alt="Anh" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 10px;">
      <el-breadcrumb-item>{{ showPostType() }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ showProvince(post) }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ showDistrict(post) }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ showType() }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h4 class="post-title">{{ post.title }}</h4>
    <table>
      <tr>
        <td style="width: 80%">
          <p class="post-address">
            {{
              post.address
            }}
          </p>
        </td>
      </tr>
    </table>
    <table>
      <tr class="lable-detail">
        <td style="width: 30%; color: gray">Mức giá</td>
        <td style="width: 30%; color: gray">Diện tích</td>
        <td style="width: 30%; color: gray">Ngày đăng</td>
      </tr>
      <tr class="notice-detail">
        <td>{{ showPrice(post) }}</td>
        <td>{{ post.size + " m&sup2;" }}</td>
        <td>{{ formatDate(post.published_at) }}</td>
      </tr>
      <tr></tr>
    </table>
    <h5 class="sub-title">Thông tin mô tả</h5>
    <div v-html="showDescription()"></div>
    <h5 class="sub-title">Đặc điểm bất động sản</h5>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 111.000000 93.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,93.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M40 800 l0 -70 30 0 c23 0 30 4 30 20 0 20 7 20 320 20 313 0 320 0 320 -20 0 -16 7 -20 30 -20 l30 0 0 70 0 70 -30 0 c-23 0 -30 -4 -30 -20 0 -20 -7 -20 -320 -20 -313 0 -320 0 -320 20 0 16 -7 20 -30 20 l-30 0 0 -70z"/>
          <path d="M103 640 c-64 -39 -68 -53 -68 -265 0 -212 4 -226 68 -265 30 -19 52 -20 317 -20 265 0 287 1 317 20 64 39 68 53 68 265 0 212 -4 226 -68 265 -30 19 -52 20 -317 20 -265 0 -287 -1 -317 -20z m608 -69 c24 -19 24 -22 24 -196 0 -174 0 -177 -24 -196 -22 -18 -42 -19 -291 -19 -249 0 -269 1 -291 19 -24 19 -24 22 -24 196 0 174 0 177 24 196 22 18 42 19 291 19 249 0 269 -1 291 -19z"/>
          <path d="M920 626 c0 -18 6 -25 23 -28 22 -3 22 -3 25 -225 l2 -223 -25 0 c-20 0 -25 -5 -25 -25 0 -24 2 -25 75 -25 73 0 75 1 75 24 0 18 -6 25 -22 28 l-23 3 0 220 0 220 23 3 c16 3 22 10 22 28 0 23 -2 24 -75 24 -73 0 -75 -1 -75 -24z"/>
          </g>
          </svg> Diện tích
        </div>
      </el-col>
      <el-col :span="6"><div>{{ post.size + " m&sup2;" }}</div></el-col>
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 113.000000 115.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,115.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M441 1074 c-189 -51 -344 -218 -382 -411 -82 -425 356 -766 747 -582 126 59 229 174 275 304 101 288 -72 613 -366 690 -73 19 -202 18 -274 -1z m301 -83 c133 -51 236 -162 278 -299 70 -226 -52 -474 -278 -563 -82 -33 -242 -33 -324 0 -223 88 -347 336 -280 558 47 155 154 262 312 315 75 25 213 20 292 -11z"/>
          <path d="M655 798 c-2 -7 -5 -22 -7 -33 -3 -17 -12 -20 -71 -23 -58 -3 -67 -5 -67 -22 0 -17 9 -19 68 -22 l67 -3 2 -42 c1 -24 0 -43 -2 -43 -2 0 -21 11 -41 25 -59 40 -139 28 -185 -29 -57 -69 -42 -210 27 -265 40 -32 136 -30 169 3 26 26 35 24 35 -6 0 -15 6 -19 28 -16 l27 3 3 187 2 187 33 3 c42 4 43 31 2 38 -23 4 -31 11 -34 30 -5 36 -46 57 -56 28z m-43 -215 c44 -40 43 -159 -3 -195 -36 -30 -93 -27 -128 7 -28 27 -39 97 -22 148 21 61 105 84 153 40z"/>
          </g>
          </svg> Mức giá
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showPrice(post) }}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 117.000000 108.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,108.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
            <path d="M57 1013 c-4 -3 -7 -224 -7 -490 l0 -483 540 0 540 0 0 214 c0 160 -3 217 -12 223 -7 4 -103 28 -213 53 l-200 45 -3 170 c-1 93 -6 173 -10 177 -8 8 -557 98 -599 98 -16 0 -33 -3 -36 -7z m331 -109 l242 -39 0 -377 0 -378 -65 0 -65 0 0 83 c0 51 -5 88 -12 95 -17 17 -239 17 -256 0 -7 -7 -12 -44 -12 -95 l0 -83 -50 0 -50 0 0 421 c0 333 3 420 13 417 6 -3 121 -23 255 -44z m502 -442 l165 -38 3 -157 3 -157 -181 0 -180 0 0 195 c0 150 3 195 13 195 6 -1 86 -18 177 -38z m-460 -292 l0 -60 -70 0 -70 0 0 60 0 60 70 0 70 0 0 -60z"/>
            <path d="M247 773 c-5 -8 -10 -57 -8 -81 1 -9 14 -12 44 -10 l42 3 0 45 c0 45 0 45 -37 48 -20 2 -38 -1 -41 -5z"/>
            <path d="M238 618 c-4 -11 -4 -40 1 -81 1 -5 20 -7 44 -5 l42 3 0 45 0 45 -41 3 c-27 2 -43 -1 -46 -10z"/>
            <path d="M384 606 c-3 -14 -3 -38 0 -52 6 -23 11 -25 49 -22 l42 3 0 45 0 45 -42 3 c-38 3 -43 1 -49 -22z"/>
            <path d="M239 473 c-8 -81 1 -96 53 -91 32 3 33 4 33 48 l0 45 -42 3 c-24 2 -43 0 -44 -5z"/>
            <path d="M387 474 c-10 -10 -9 -66 2 -82 5 -8 23 -12 47 -10 l39 3 0 45 0 45 -40 3 c-23 2 -44 0 -48 -4z"/>
            <path d="M747 274 c-4 -4 -7 -25 -7 -46 l0 -39 48 3 47 3 0 40 c0 40 0 40 -40 43 -23 2 -44 0 -48 -4z"/>
            <path d="M890 235 l0 -45 45 0 c47 0 48 1 48 55 0 32 -4 35 -48 35 l-45 0 0 -45z"/>
            </g>
            </svg> Số tầng
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showFloor() }}</div></el-col>
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 63.000000 52.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M44 467 c-2 -7 -3 -105 -2 -217 3 -186 5 -205 21 -208 13 -3 17 3 17 22 l0 26 255 0 255 0 0 -25 c0 -16 6 -25 15 -25 12 0 15 18 15 100 l0 100 -175 0 c-170 0 -175 1 -175 21 0 55 -51 89 -135 89 l-55 0 0 65 c0 52 -3 65 -15 65 -9 0 -18 -6 -21 -13z m168 -174 c10 -9 18 -24 18 -35 0 -16 -9 -18 -75 -18 l-75 0 0 35 0 35 57 0 c38 0 62 -5 75 -17z m375 -125 l-3 -33 -252 -3 -252 -2 0 35 0 35 256 0 255 0 -4 -32z"/>
          </g>
          </svg>
          Số phòng ngủ
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showBedroom() }}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 63.000000 61.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,61.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M326 569 c-26 -20 -47 -73 -38 -96 7 -21 32 -15 32 8 0 54 52 89 102 68 37 -15 50 -62 46 -169 l-3 -85 -212 -3 -213 -2 0 -50 c0 -90 39 -153 101 -162 18 -2 24 -9 24 -28 0 -37 33 -39 37 -3 l3 28 130 0 c108 0 130 -2 131 -15 2 -35 5 -40 18 -40 8 0 16 12 18 27 2 21 10 29 35 35 17 4 43 22 57 39 23 26 26 40 26 100 l0 69 -60 0 -60 0 0 119 c0 117 0 119 -29 150 -24 26 -37 31 -74 31 -30 0 -53 -7 -71 -21z m258 -362 c0 -35 -6 -54 -22 -70 -22 -21 -32 -22 -222 -25 l-200 -3 -30 30 c-23 23 -30 39 -30 69 0 21 3 42 7 46 4 3 117 5 252 4 l246 -3 -1 -48z"/>
          </g>
          </svg>
          Số toilet
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showToilet() }}</div></el-col>
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="25px" viewBox="0 0 62.000000 68.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,68.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M50 569 c-18 -35 -30 -72 -28 -87 l3 -27 115 0 115 0 3 30 c2 17 -7 52 -24 87 l-28 58 -63 0 -63 0 -30 -61z m148 -14 c12 -25 22 -50 22 -55 0 -6 -35 -10 -80 -10 -45 0 -80 4 -80 10 0 5 10 30 22 55 20 41 25 45 58 45 33 0 38 -4 58 -45z"/>
          <path d="M275 408 c-2 -7 -6 -31 -7 -53 -3 -33 -7 -41 -26 -43 -22 -3 -23 -6 -20 -105 3 -97 4 -102 26 -105 14 -2 22 -10 22 -23 0 -12 7 -19 20 -19 13 0 20 7 20 20 0 19 7 20 104 20 98 0 105 -1 108 -20 4 -28 22 -30 26 -3 2 14 11 23 25 25 21 3 22 9 25 105 3 99 2 102 -20 105 -20 3 -24 10 -28 53 l-5 50 -133 3 c-101 2 -133 0 -137 -10z m235 -59 c0 -22 -5 -32 -20 -36 -15 -4 -20 -14 -20 -39 l0 -34 -54 0 c-54 0 -55 0 -58 32 -2 25 -9 34 -28 38 -25 6 -36 29 -26 56 4 11 28 14 106 14 l100 0 0 -31z m-190 -109 l5 -35 88 -3 c85 -3 87 -2 88 20 1 13 2 30 3 38 1 19 52 26 58 8 3 -7 5 -38 4 -68 l-1 -55 -152 -3 -153 -3 0 71 0 71 28 -3 c22 -2 28 -9 32 -38z"/>
          <path d="M127 403 c-4 -3 -7 -82 -7 -175 0 -161 1 -168 20 -168 19 0 20 7 20 175 0 139 -3 175 -13 175 -8 0 -17 -3 -20 -7z"/>
          </g>
          </svg>
          Nội thất
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showFurniture() }}</div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="label-infor">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="25px" height="23px" viewBox="0 0 47.000000 58.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,58.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
          <path d="M56 541 c-4 -6 -8 -355 -6 -499 l0 -22 203 2 202 3 3 190 2 189 -72 73 -72 73 -128 0 c-70 0 -129 -4 -132 -9z m204 -85 c0 -80 23 -104 103 -108 l62 -3 3 -142 3 -143 -176 0 -175 0 0 225 0 225 90 0 90 0 0 -54z m150 -68 c0 -12 -68 -10 -91 2 -15 9 -19 22 -19 63 l0 51 55 -54 c30 -30 55 -58 55 -62z"/>
          </g>
          </svg>
          Giấy tờ
        </div>
      </el-col>
      <el-col :span="6"><div>{{ showLegalDocuments() }}</div></el-col>
    </el-row>
    <h5 class="sub-title">Thông tin liên hệ</h5>
    <div class="user-contact">
      <router-link class="link-to-detail" :to="`/admin/quan-ly-nguoi-dung/${ownerInfo.id}`">
        <div class="user-infor">
          <img v-if="ownerInfo.avatar" :src="ownerInfo.avatar" alt="avatar" class="user-avatar">
          <div v-else class="avatar-placeholder">
            <span class="avatar-letter"> {{ showName() }}</span>
          </div>
          <div class="owner-name">
            <h5>{{ ownerInfo.name }}</h5>
          </div>
        </div>
      </router-link>
      <div class="user-contact-infor">
        <el-button @click="coppyClipboard(ownerInfo.phone)" type="primary">
          <svg width="30" height="26" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.85116 2.49006C6.74047 2.34768 6.60075 2.23047 6.44129 2.14624C6.28182 2.062 6.10626 2.01265 5.92625 2.00148C5.74625 1.99031 5.56593 2.01756 5.39727 2.08144C5.22862 2.14531 5.07548 2.24433 4.94803 2.37194L3.00928 4.31256C2.10366 5.22006 1.76991 6.50444 2.16553 7.63132C3.80754 12.2955 6.47858 16.5302 9.98053 20.0213C13.4716 23.5232 17.7063 26.1942 22.3705 27.8363C23.4974 28.2319 24.7818 27.8982 25.6893 26.9926L27.628 25.0538C27.7556 24.9264 27.8547 24.7732 27.9185 24.6046C27.9824 24.4359 28.0097 24.2556 27.9985 24.0756C27.9873 23.8956 27.938 23.72 27.8537 23.5606C27.7695 23.4011 27.6523 23.2614 27.5099 23.1507L23.1843 19.7869C23.0322 19.669 22.8552 19.5871 22.6669 19.5474C22.4785 19.5078 22.2835 19.5115 22.0968 19.5582L17.9905 20.5838C17.4424 20.7208 16.8682 20.7135 16.3237 20.5627C15.7793 20.4119 15.2832 20.1227 14.8837 19.7232L10.2787 15.1163C9.87885 14.717 9.58927 14.221 9.43812 13.6765C9.28697 13.132 9.2794 12.5577 9.41616 12.0094L10.4437 7.90319C10.4904 7.71643 10.494 7.52151 10.4544 7.33312C10.4148 7.14473 10.3329 6.96781 10.2149 6.81569L6.85116 2.49006ZM3.53241 0.95819C3.86052 0.62997 4.25471 0.375309 4.68879 0.211117C5.12288 0.046925 5.58692 -0.0230412 6.05012 0.00586428C6.51332 0.0347698 6.96507 0.161886 7.37537 0.378771C7.78567 0.595657 8.14514 0.897349 8.42991 1.26381L11.7937 5.58756C12.4105 6.38069 12.628 7.41382 12.3843 8.38881L11.3587 12.4951C11.3056 12.7077 11.3085 12.9305 11.367 13.1418C11.4255 13.353 11.5376 13.5456 11.6924 13.7007L16.2993 18.3076C16.4546 18.4627 16.6475 18.575 16.8591 18.6335C17.0707 18.692 17.2938 18.6947 17.5068 18.6413L21.6112 17.6157C22.0923 17.4954 22.5945 17.486 23.0798 17.5884C23.5651 17.6907 24.0208 17.902 24.4124 18.2063L28.7362 21.5701C30.2905 22.7794 30.433 25.0763 29.0418 26.4657L27.103 28.4044C25.7155 29.7919 23.6418 30.4013 21.7087 29.7207C16.7609 27.9798 12.2685 25.1473 8.56491 21.4332C4.85107 17.7301 2.01855 13.2384 0.277406 8.29132C-0.401344 6.36006 0.208031 4.28444 1.59553 2.89694L3.53428 0.95819H3.53241Z" fill="black"/>
          </svg>
          <span class="owner-contact">{{ ownerInfo.phone }}</span>
        </el-button>
        <el-button @click="coppyClipboard(ownerInfo.email)">
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4.5C0 3.50544 0.395088 2.55161 1.09835 1.84835C1.80161 1.14509 2.75544 0.75 3.75 0.75H26.25C27.2446 0.75 28.1984 1.14509 28.9016 1.84835C29.6049 2.55161 30 3.50544 30 4.5V19.5C30 20.4946 29.6049 21.4484 28.9016 22.1516C28.1984 22.8549 27.2446 23.25 26.25 23.25H3.75C2.75544 23.25 1.80161 22.8549 1.09835 22.1516C0.395088 21.4484 0 20.4946 0 19.5V4.5ZM3.75 2.625C3.25272 2.625 2.77581 2.82254 2.42417 3.17417C2.07254 3.52581 1.875 4.00272 1.875 4.5V4.90688L15 12.7819L28.125 4.90688V4.5C28.125 4.00272 27.9275 3.52581 27.5758 3.17417C27.2242 2.82254 26.7473 2.625 26.25 2.625H3.75ZM28.125 7.09312L19.2975 12.39L28.125 17.8219V7.09312ZM28.0612 19.9856L17.4862 13.4775L15 14.9681L12.5138 13.4775L1.93875 19.9838C2.0453 20.3827 2.28059 20.7354 2.60811 20.987C2.93562 21.2385 3.33702 21.3749 3.75 21.375H26.25C26.6627 21.3751 27.0639 21.2389 27.3914 20.9877C27.7189 20.7365 27.9544 20.3843 28.0612 19.9856ZM1.875 17.8219L10.7025 12.39L1.875 7.09312V17.8219Z" fill="black"/>
          </svg>
          <span class="owner-contact">{{ ownerInfo.email }}</span>
        </el-button>
      </div>
    </div>
    
    <h5 class="sub-title">Xem trên bản đồ</h5>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.773614641663!2d105.77094637508127!3d21.041742380610884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455463beecfb9%3A0xfbe932c60551b2fa!2zxJDhuqFpIGjhu41jIGtpbmggdOG6vyBxdeG7kWMgZMOibiAtIENoxrDGoW5nIHRyw6xuaCDEkcOgbyB04bqhbyB04burIHhh!5e0!3m2!1svi!2s!4v1704121420401!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</template>

<script>
import { Notification } from "element-ui"
import AdminPostApi from "@/api/admin/adminPost"
import postType from '@/data/postType';
export default {
  data() {
    return {
      post: {
        description: "",
        province: "",
        district: ""
      },
      history: null,
      PostType: postType,
      ownerInfo: {
        name: "",
        email: "",
        phone: "",
        avatar: "",
        id: ""
      },
    };
  },
  mounted() {
    this.getDetail(this.$route.params.id);
  },
  methods: {
    getDetail($id) {
      AdminPostApi.detail(
        $id,
        (response) => {
          this.post = response.data
          this.ownerInfo = response.data.user
        },
        (error) => {
          if(error?.response?.data?.code) {
            if(error.response.data.code === 403) {
              Notification.error({
                title: "Thất bại",
                message: error.response.data.error,
              });
              this.goBack()
            }
          }
        }
      )
    },
    loadPostData() {
      window.location.href = this.$route.fullPath
    },
    showFloor() {
      if(this.post.floor){
        return this.post.floor + " tầng"
      } else {
        return "N/A"
      }
    },
    showBedroom() {
      if(this.post.bedroom){
        return this.post.bedroom + " phòng"
      } else {
        return "N/A"
      }
    },
    showToilet() {
      if(this.post.toilet){
        return this.post.toilet + " phòng"
      } else {
        return "N/A"
      }
    },
    showLegalDocuments(){
      if(this.post.legal_documents){
        return this.post.legal_documents
      } else {
        return "N/A"
      }
    },
    showFurniture() {
      if(this.post.furniture){
        return this.post.furniture
      } else {
        return "N/A"
      }
    },
    showDescription() {
      return this.post.description.replace(/\n/g, '<br>');
    },
    
    showType() {
      return this.PostType[this.post.type_id]
    },
    showPostType() {
      if(this.post.type == 'sell') {
        return "Bán"
      } else {
        return "Cho thuê"
      }
    },
    showName() {
      return this.ownerInfo.name ? this.ownerInfo.name.split(" ")[this.ownerInfo.name.split(" ").length - 1][0] : ""
    },
  },
  watch: {
    '$route.params.id': 'loadPostData'
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
.post-detail {
  padding: 0 15% 0 15%;
}

.user-infor{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
}

.owner-name {
  margin-top: 5px;
  color: #000;
}

.el-button+.el-button {
  margin-left: 0px;
}

.owner-contact {
  padding-top: 10px;
  margin: 10px;
  font-size: 18px;
  font-weight: 500;
}

.user-avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.user-contact {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: #ccc 1px solid;
  border-radius: 10px;
  padding: 20px;
}

.image-detail {
  width: 100%;
  height: 100%;
  margin: 20px 0 20px 0;
}

.sub-title {
  margin: 20px 0px 20px 0px;
}

.show-image {
  height: fit-content;
  align-content: center;
}

.block-image {
  margin-bottom: 20px;
}

.user-contact-infor {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.user-contact-infor button {
  margin-bottom: 10px;
}

.icon-show {
  height: 24px;
  width: 24px;
}
.post-address {
  font-size: 16px;
  font-weight: 600;
}
.post-title {
  color: #0e58a0;
}

.notice-detail {
  font-size: 18px;
  font-weight: 600;
  margin: 5px 0 5px 0;
}

.label-infor svg {
  margin: 0px 5px 5px 0px;
}

.label-infor{
  font-weight: 600;
}
</style>