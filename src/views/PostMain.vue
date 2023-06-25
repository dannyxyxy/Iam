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
    //데이터 변수값 저장
    return {
      isDarkMode: false,
      user: "",
      title: "",
      contents: "",
      likeCount: 0,
      day: "",
      category1: "여행",
      category2: "미국서부",
      category3: "YOLO",
      showPageUpButton: false,
      comments: [
        "댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요1",
        "댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요2",
      ], // 댓글 데이터 배열 추가
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
    copyLink() {
      const dummyTextArea = document.createElement("textarea");
      dummyTextArea.value = window.location.href;
      document.body.appendChild(dummyTextArea);
      dummyTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(dummyTextArea);
      alert("링크가 복사되었습니다.");
    },
    toggleMode() {
      this.isDarkMode = !this.isDarkMode;
    },

    async submitComment() {
      const content = this.newComment;
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      const data = await apiClient("board/writeComment", {
        commentContents: content,
        userIdx: userLocalInfo.userIdx,
        postId: location.search,
      });
      if (data.resultCode === 1) {
        alert("글 작성 완료!");
        await router.push("/");
      } else {
        alert("글이 저장되지 않았습니다.");
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

  setup() {
    const boardData = ref({
      id: "",
      writeTime: "",
      boardTitle: "",
      boardContents: "",
      userName: "",
      likeCount: 0,
    });
    const getBoardDetail = async () => {
      await get("board/getBoardDetail", location.search)
        .then((data) => {
          if (data) {
            boardData.value = data.data;
          } else {
            alert("게시물 정보를 불러올 수 없습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("게시물 정보를 불러오는 중에 오류가 발생했습니다.");
        });
    };

    const commentData = ref({
      id: "",
      writeTime: "",
      commentContents: "",
      userName: "",
      likeCount: 0,
    });

    const getCommentList = async () => {
      await get("board/getCommentList", location.search)
        .then((data) => {
          if (data) {
            commentData.value = data.data;
          } else {
            alert("댓글 정보를 불러올 수 없습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("댓글 정보를 불러오는 중에 오류가 발생했습니다.");
        });
    };

    onMounted(() => {
      getBoardDetail();
      getCommentList();
    });

    return {
      boardData,
      commentData,
    };
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
      {{ boardData.boardTitle }}
    </div>
    <section id="info">
      <div class="meta-info">
        <p>
          &nbsp; by <span class="bold">{{ boardData.userName }}</span>
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p>{{ boardData.writeTime }}작성</p>
      </div>
      <div>
        <button class="copy-button" @click="copyLink">링크 복사</button>
      </div>
    </section>
    <div class="contents">
      {{ boardData.boardContents }}
    </div>
    <div class="actions">
      <div class="actions_button">
        <button class="d-button" @click="editPost">글 수정</button>
        <button class="d-button" @click="deletePost">글 삭제</button>
      </div>
    </div>

    <div class="comments-section">
      <h2>댓글</h2>
      <form @submit.prevent="submitComment">
        <input
          type="text"
          v-model="newComment"
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">댓글 작성</button>
      </form>

      <ul>
        <li v-for="(comment, index) in commentData" :key="index">
          <section id="info">
            <div class="meta-info">
              <p>
                &nbsp; by <span class="bold">{{ comment.userName }}</span>
              </p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p>{{ comment.writeTime }}</p>
            </div>
          </section>
          {{ comment.commentContents }}
          <div class="comment-buttons">
            <button @click="editComment(index)" class="edit-button">
              수정
            </button>
            <button @click="deleteComment(index)" class="delete-button">
              삭제
            </button>
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

<style>
.comment-buttons {
  float: left;
}

.edit-button {
  margin: 10px;
}

.comment_box {
  padding: 10px;
}
</style>
