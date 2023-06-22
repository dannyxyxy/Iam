<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { get } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
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
      comments: ["댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요1", "댓글 테스트입니다. 댓글 테스트입니다. 삭제버튼을 눌러보세요2"],
      newComment: "",
      editIndex: -1,
      editedComment: "",
    };
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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
      this.editIndex = index;
      this.editedComment = this.comments[index];
    },
    cancelEdit() {
      this.editIndex = -1;
      this.editedComment = "";
    },
    saveEdit(index) {
      if (this.editedComment.trim() !== "") {
        this.comments[index] = this.editedComment;
        this.editIndex = -1;
        this.editedComment = "";
      }
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      this.showPageUpButton = scrollTop > 1;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    getBoardDetail() {
      const params = {
      _id: this.$route.query.id,
    };

      get("board/getBoardDetail", params)
          .then((data) => {


            if (data.resultCode === 1) {
              this.boardData = data.data;
            } else {
              alert("게시물 정보를 불러올 수 없습니다.");
            }
            return _id
          })
          .catch((error) => {
            console.error(error);
            alert("게시물 정보를 불러오는 중에 오류가 발생했습니다.");
          });
  },
},

  setup() {
    const boardData = ref({
        id : 0,
        writeTime: "",
        boardTitle: "",
        boardContents: "",
        userName: "",
        likeCount: 0,
      });
    onMounted(() => {
      ("getBoardDetail"); // getBoardDetail 이벤트 발생시킴
    });

    return {
      boardData,
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
      <router-link :to="{ name: 'PostMain', query: { id: boardData.id } }">
        {{ boardData.boardTitle }}
      </router-link>
    </div>
    <section id="info">
      <div class="meta-info">
        <p>
          &nbsp; by <span class="bold">{{ boardData.userName }}</span>
        </p>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <p>{{ boardData.writeTime}}작성</p>
      </div>
      <div>
        <button class="copy-button" @click="copyLink">링크 복사
        </button>
      </div>
    </section>
    <div class="contents">
      {{ boardData.boardContents }}
    </div>
    <div class="actions">
      <button class="d-button" @click="editPost">글 수정</button>
      <button class="d-button" @click="deletePost">글 삭제</button>
    </div>
    <div class="comments-section">
      <h2>댓글</h2>
      <form @submit.prevent="submitComment">
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
