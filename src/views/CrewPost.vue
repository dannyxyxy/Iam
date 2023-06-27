<script>
import "vue3-carousel/dist/carousel.css";
import { get } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";

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
        const boardData = ref({});
        const getcrewBoardDetail = async () => {
            await get("crew/getCrewBoardDetail", location.search)
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
        const crewData = ref({});

        const getcrewBoardList = async () => {
            await get("crew/getCrewBoardList", location.search)
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
    }

});
</script>


<template>
    <div class="crewpost-container">
        <!--<div class="preview-img" />
        <div class="centered-text">
            {{ boardData._events }}
        </div>-->
        <div class="crew-text">
            <div class="crew-name-container">
                <div class="crew-name">
                    {{ boardData._events }}
                </div>
                <div class="crewDay">day 3일전</div>
                <!--<button type="submit" class="Crew-button" @click="JoinCrew">크루가입</button>-->
                <router-link to="/CrewEdit">
                    <button class="Crew-button">글작성</button>
                </router-link>
            </div>

            <div class="description-space">
                <div class="crew-description">
                    {{ boardData._eventsCount }}
                </div>
            </div>
        </div>

        <div class="crew-post-title">
            크루 게시물 보기
        </div>
        <div class="crew-post-container">
            <div class="post-box">
                <div class="postbox-img" v-for="data in crewData" :key="data._id">
                    <p>{{ data.profileImg }}</p>
                </div>
                <div class="postbox-summary">
                    <div>
                        <div class="post-title" v-for="data in crewData" :key="data._id">
                            <p>{{ data.crewTitle }}</p>
                        </div>
                        <div class="post-contents" v-for="data in crewData" :key="data._id">
                            <p>{{ data.crewContents }}</p>
                        </div>
                    </div>
                    <div class="postusername" v-for="data in crewData" :key="data._id">
                        <p>{{ data.userEmail }}</p>
                    </div>
            </div>
        </div>
    </div>
</div></template>
