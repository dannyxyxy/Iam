<script>
<<<<<<< HEAD
export default {
    data() {
        return {
            crewName: '',
            crewDescription: '',
            crewImage: null,
            crewImagePreview: ''
=======
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
                        if (data.crewName == boardData.crewName) {
                            crewData.value = data.data;
                            console.log(data);
                        }
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
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
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
<<<<<<< HEAD
        }
    }
};
</script>

<template>
    <div class="maintext">
        
            <div class="preview-img">
                크루사진
                <div class="centered-text">
                    <h1>크루이름</h1>
                </div>
            </div>
            <div class="crew-text">
                <div class="crew-name-container">
                    <div class="crew-name">
                        크루이름
                    </div>
                    <div class="crewDay">day 3일전</div>
                    <button class="join-button">크루 가입</button>
                </div>

                <div class="description-space">
                    <div class="crew-description">
                        크루 소개
                    </div>
                </div>
            </div>
            <div class="crew-post-title">
                크루 대표글
            </div>
            <div class="crew-post-container">
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <img src="..\assets\img\star.png" class="star"/>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                        
                    </div>
                </div>
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <img src="..\assets\img\star.png" class="star"/>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
                            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                    </div>
                </div>
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <img src="..\assets\img\star.png" class="star"/>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
                            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="crew-post-title">
                크루 게시물 보기
            </div>
            <div class="crew-post-container">
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
                            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                    </div>
                </div>
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
                            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                    </div>
                </div>
                <div class="post-box">
                    <div class="postbox-img"></div>
                    <div class="postbox-summary">
                        <div>
                            <div class="post-title">제목</div>
                            <div class="post-contents">내용</div>
                        </div>
                        <div class="postcircle">
                            
                        </div>
                        <div class="postusername">
                            <span style="font-weight: lighter">by </span>
                            <span style="font-weight: bold">이름</span>
                        </div>
                    </div>
=======
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
                    {{ boardData.crewName }}
                </div>
                <div class="crewDay">day 2일전</div>
                <!--<button type="submit" class="Crew-button" @click="JoinCrew">크루가입</button>-->
                <router-link to="/CrewEdit">
                    <button class="Crew-button">글작성</button>
                </router-link>
            </div>

            <div class="description-space">
                <div class="crew-description">
                    {{ boardData._crewIntro }}
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
                </div>
            </div>
        </div>

<<<<<<< HEAD

=======
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
                    <div class="post-day" v-for="data in crewData" :key="data._id">
                        <p>{{ data.writeTime }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
>>>>>>> 2d5904f06dfbeec2a98285db8234a28f0fa88d43
</template>
