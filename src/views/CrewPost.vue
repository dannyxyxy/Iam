<script>
export default {
    data() {
        return {
            crewName: '',
            crewDescription: '',
            crewImage: null,
            crewImagePreview: ''
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
                <!--<button type="submit" class="CrewJoin-button" @click="JoinCrew">크루가입</button>-->
                <router-link to="/CrewEdit">
                    <button class="CrewJoin-button">글작성</button>
                </router-link>
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
                        <img src="..\assets\img\star.png" class="star" />
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
                        <img src="..\assets\img\star.png" class="star" />
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
                        <img src="..\assets\img\star.png" class="star" />
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
            </div>
        </div>
    </div>
</template>
