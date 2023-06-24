<script>
export default {
    data() {
        return {
            recommendedCrews: [
        { id: 4, title: '반려동물사랑', description: '강아지고양이고슴도치', name: '강호동' },
        { id: 5, title: '치킨', description: '치킨은 안 질리지', name: '닭최고' },
        { id: 6, title: '서브웨이', description: '서브웨이 조합 추천', name: '햄최몇' },
      ]
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
                <!--<button type="submit" class="Crew-button" @click="JoinCrew">크루가입</button>-->
                <router-link to="/CrewEdit">
                    <button class="Crew-button">글작성</button>
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
            <div class="post-box" v-for="crewpost in recommendedCrews" :key="crewpost.id">
                <div class="postbox-img"></div>
                <div class="postbox-summary">
                    <div>
                        <img src="..\assets\img\star.png" class="star" />
                        <div class="post-title">{{ crewpost.title }}</div>
                        <div class="post-contents">{{ crewpost.description }}</div>
                    </div>
                    <div class="postcircle">

                    </div>
                    <div class="postusername">
                        <span style="font-weight: lighter">by </span>
                        <span style="font-weight: bold">{{ crewpost.name }}</span>
                    </div>

                </div>
            </div>
        </div>
        <div class="crew-post-title">
            크루 게시물 보기
        </div>
        <div class="crew-post-container">
            <div class="post-box" v-for="crewpost in recommendedCrews" :key="crewpost.id">
                <div class="postbox-img"></div>
                <div class="postbox-summary">
                    <div>
                        <div class="post-title">{{ crewpost.title }}</div>
                        <div class="post-contents">{{ crewpost.description }}</div>
                    </div>
                    <div class="postcircle">

                    </div>
                    <div class="postusername">
                        <span style="font-weight: lighter">by </span>
                        <span style="font-weight: bold">{{ crewpost.name }}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
