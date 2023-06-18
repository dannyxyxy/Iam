<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  data() {
    //데이터 변수값 저장
    return {
      isDarkMode: false,
      user: "danny",
      title: "나를 성장시켜준 환상적인 미국 서부",
      contents:
        "",
      likeCount: 0,
      day: 3,
      category1: "여행",
      category2: "미국서부",
      category3: "YOLO",
      showPageUpButton: false,
      comments: ["댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요1","댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요2"], // 댓글 데이터 배열 추가
      newComment: "", // 새로운 댓글을 입력 받는 변수 추가
      editIndex: -1, // 수정 중인 댓글의 인덱스를 저장하는 변수
      editedComment: "", // 수정 중인 댓글의 내용을 저장하는 변수
    };
  },
  mounted() {
    // 스크롤 이벤트를 감지하는 리스너 등록
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // 컴포넌트가 소멸할 때 리스너 제거
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    //함수만드는곳 this. 꼭 붙힐것
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    submitComment() {
      if (this.commentText) {
        this.comments.push(this.commentText);
        this.commentText = "";
      }
    },
    deleteComment(index) {
      this.comments.splice(index, 1);
    },
    editComment(index) {
      this.editIndex = index; // 수정 버튼을 클릭한 댓글의 인덱스를 저장
      this.editedComment = this.comments[index]; // 수정 중인 댓글의 내용을 가져옴
    },
    cancelEdit() {
      this.editIndex = -1; // 수정 취소 시 editIndex 초기화
      this.editedComment = ""; // 수정 취소 시 editedComment 초기화
    },
    saveEdit(index) {
      if (this.editedComment.trim() !== "") {
        this.comments[index] = this.editedComment; // 댓글 수정 적용
        this.editIndex = -1; // 수정 완료 시 editIndex 초기화
        this.editedComment = ""; // 수정 완료 시 editedComment 초기화
      }
    },
    handleScroll() {
      // 스크롤 위치 확인
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // 일정 스크롤 위치 이상이면 페이지 업 버튼을 보여줌, 그렇지 않으면 숨김
      this.showPageUpButton = scrollTop > 1;
    },
    scrollToTop() {
      // 페이지 맨 위로 스크롤 이동
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 스무스한 스크롤 이동을 위해 behavior 속성을 추가
      });
    },
  },

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div class="title">
      {{ title }}
    </div>
    <section id="info">
      <div class="meta-info">
        <p>
          &nbsp; by <span class="bold">{{ user }}</span>
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p>{{ day }}일전</p>
      </div>
      <div>
        <button class="like-btn2" @click="likeCount++">
          <i class="fas fa-heart"></i><img src="../assets/img/heart.png" />{{
            likeCount
          }}
        </button>
      </div>
    </section>
    <div class="button-container5">
      <!-- 추후 카테고리로 라우팅하거나 a 태그로 링크 활용가능 -->
      <button>{{ category1 }}</button>
      <button>{{ category2 }}</button>
      <button>{{ category3 }}</button>
    </div>
    <div class="apple">
      <Carousel>
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
    <div class="contents">
      {{ contents }}
    </div>
    <div class="actions">
      <button class="e-button" @click="editPost">글 수정</button>
      <button class="d-button" @click="deletePost">글 삭제</button>
    </div>
    <div class="comments-section">
      <h2>댓글</h2>

      <form @submit.prevent="addComment">
        <input type="text" v-model="newComment" placeholder="댓글을 입력하세요">
        <button type="submit">댓글 작성</button>
      </form>

      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          {{ comment }}
          <div class="comment-buttons">
            <button @click="editComment(index)" class="edit-button">수정</button>
            <button @click="deleteComment(index)" class="delete-button">삭제</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="page">
      <button
        class="page-up-button"
        v-if="showPageUpButton"
        @click="scrollToTop"
      >
        UP
      </button>
    </div>
  </div>
</template>
