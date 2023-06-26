<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { get, apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../utils/constants.js";

import router from "../router/index.js";
export default defineComponent({
    name: "App",
    data() {
        return {
            id: 0,
            crewId: "",
            profileImg: "",
            crewName: "",
            crewIntro: "",
            ownerName: "",
            writeTime: "",
            crewTitle: "",
            crewContents: "",
            CrewEdit: "/CrewEdit",
        };
    },
    setup() {
        const boardData = ref({
            id: 0,
            crewId: "",
            profileImg: "",
            crewName: "",
            crewIntro: "",
            ownerName: "",
            crewMember: 0,
        });
        const getcrewBoardDetail = async () => {
            await get("crew/getcrewBoardDetail", location.search)
                .then((data) => {
                    if (data) {
                        console.log(data);
                        boardData.value = data.data;
                    } else {
                        alert("크루 정보를 불러올 수 없습니다.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("크루 정보를 불러오는 중에 오류가 발생했습니다.");
                });
        };
        const crewData = ref({
            id: 0,
            writeTime: "",
            CrewId: "",
            crewTitle: "",
            crewContents: "",
            profileImg: "",
        });
        
        const getcrewBoardList = async () => {
            await get("crew/getcrewBoardList", location.search)
                .then((data) => {
                    if (data) {                        
                        crewData.value = data.data;
                        console.log(data);
                    } else {
                        alert("게시물 정보를 불러올 수 없습니다.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("게시물 정보를 불러오는 중에 오류가 발생했습니다.");
                });
        };
        onMounted(() => {
            getcrewBoardDetail();
            getcrewBoardList();
        });

        return {
            boardData,
            crewData,
        };
    },
    methods: {
        handleImageUpload(event) {
            // 크루 대표 사진 업로드 처리 로직
            this.crewImage = event.target.files[0];
            this.previewCrewImage();
        },
        previewCrewImage() {
            // 크루 대표 사진 미리보기 로직
            if (this.crewImage) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.crewImagePreview = reader.result;
                };
                reader.readAsDataURL(this.crewImage);
            } else {
                this.crewImagePreview = '';
            }
        },
        createCrew() {
            // 크루 생성 처리 로직
            console.log('크루 이름:', this.crewName);
            console.log('크루 소개:', this.crewDescription);
            console.log('크루 대표 사진:', this.crewImage);
            // 크루 생성 API 호출 등 추가 작업 수행
        },
        JoinCrew() {
            alert('크루 가입이 완료되었습니다');
        },
        joinCrew(crewId) {
            // 가입 버튼 클릭 시 동작하는 메서드
            // crewId를 이용하여 가입 로직을 구현하세요.
            // 예시: 가입 API 호출 또는 가입 상태 변경 등의 작업을 수행합니다.
            console.log('크루 가입', crewId);
            alert('크루 가입이 완료되었습니다');
        },
        navigateToNewPage() {
      const value = 'Your value from the previous page';

      // Save the value to local storage or session storage
      localStorage.setItem('previousPageValue', value); // or sessionStorage.setItem('previousPageValue', value)
    }
    }

});
</script>


<template>
    <div class="maintext">

        <div class="preview-img" /> 
        <div class="centered-text">
            {{ boardData.crewName }}
        </div>
        <div class="crew-text">
            <div class="crew-name-container">
                <div class="crew-name">
                    {{ boardData.crewName }}
                </div>
                <div class="crewDay">day 3일전</div>
                <!--<button type="submit" class="Crew-button" @click="JoinCrew">크루가입</button>-->
                <router-link
                :to="{ name: 'CrewEdit', query: { id: boardData._id } }"
              >
                    <button class="Crew-button" @click="navigateToNewPage">글작성</button>
                </router-link>
            </div>

            <div class="description-space">
                <div class="crew-description">
                    {{ boardData.crewIntro }}
                </div>
            </div>
        </div>

        <div class="crew-post-title">
            크루 게시물 보기
        </div>
        <div class="crew-post-container">
            <div class="post-box">
                <div class="postbox-img">{{ crewData.profileImg }}</div>
                <div class="postbox-summary">
                    <div>
                        <div class="post-title">{{ crewData.crewTitle }}</div>
                        <div class="post-contents">{{ crewData.crewContents }}</div>
                    </div>
                    <div class="postcircle">

                    </div>
                    <div class="postusername">
                        <span style="font-weight: lighter">by </span>
                        <span style="font-weight: bold">{{ crewData.CrewId }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
