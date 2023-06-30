<script>
import { get, apiClient } from "../utils/axios.js";
import { onMounted, ref } from "vue";
import { defineComponent } from "vue";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";

export default defineComponent({
  name: "App",
  computed: {
    CONSTANTS() {
      return CONSTANTS;
    },
  },

  data() {
    //데이터 변수값 저장
    return {
      showPageUpButton: false,
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
    async deletePost() {
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      const data = await apiClient("board/deleteBoard", {
        userIdx: userLocalInfo.userIdx,
        postId: location.search,
      });
      if (data.resultCode === 1) {
        alert("글을 삭제했습니다.");
        await router.push("/");
      } else if (data.resultCode === 0 && data.error === "게시물 삭제 오류") {
        alert("본인의 글만 삭제할 수 있습니다.");
      } else {
        alert("삭제 권한이 없습니다.");
      }
    },

    async goToUpdateEdit() {
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      const queryParams = { id: location.search };
      const data = await apiClient("board/goToUpdateEdit", {
        userIdx: userLocalInfo.userIdx,
        postId: queryParams.id,
      });
      if (data.resultCode === 1) {
        await router.push({ name: "UpdateEdit", query: queryParams });
      } else if (data.resultCode === 0 && data.error === "게시물 수정 오류") {
        alert("본인의 글만 수정할 수 있습니다.");
      } else {
        alert("수정 권한이 없습니다.");
      }
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
        alert("댓글 작성 완료!");
        await router.go(0);
      } else {
        alert("댓글이 저장되지 않았습니다.");
      }
    },
    async deleteComment() {
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      const data = await apiClient("board/deleteComment", {
        userIdx: userLocalInfo.userIdx,
        postId: location.search,
      });
      if (data.resultCode === 1) {
        alert("댓글을 삭제했습니다.");
        await router.go(0);
      } else if (data.resultCode === 0 && data.error === "게시물 삭제 오류") {
        alert("본인의 글만 삭제할 수 있습니다.");
      } else {
        alert("삭제 권한이 없습니다.");
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
    const auth = ref(false);
    let colors = `hsl(${parseInt(Math.random() * 24, 10) * 15}, 16%, 75%)`;
    const userLocalInfo = JSON.parse(
      commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
    );
    const boardData = ref({});
    const getBoardDetail = async () => {
      await get("board/getBoardDetail", location.search)
        .then((data) => {
          if (data) {
            boardData.value = data.data;
            if (userLocalInfo.userIdx === boardData.value.userEmail)
              auth.value = true;
          } else {
            alert("게시물 정보를 불러올 수 없습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("게시물 정보를 불러오는 중에 오류가 발생했습니다.");
        });
    };

    const commentData = ref({});
    const getCommentList = async () => {
      await get("board/getCommentList", location.search)
        .then((r) => {
          if (r) {
            commentData.value = r.data;
            for (let item in r.data) {
              r.data[item].color = colors;
            }
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
      auth,
      colors,
    };
  },
});
</script>

<template>
  <div class="postmain-container">
    <div class="title">
      {{ boardData.boardTitle }}
    </div>
    <div class="info-section">
      <div class="meta-info">
        <div class="circle">
          <img
            v-if="boardData.profileImg !== null || undefined"
            :src="CONSTANTS.API_URL + boardData.profileImg"
            alt=""
          />
          <div
            v-else
            class="exchangeImg"
            :style="`background-color: ${colors}`"
          />
        </div>
        <p>by {{ boardData.userName }}</p>
        <p>{{ boardData.writeTime }}</p>
      </div>
      <div class="actions">
        <button v-if="auth" class="action-button" @click="goToUpdateEdit">
          수정
        </button>
        <button v-if="auth" class="action-button" @click="deletePost">
          삭제
        </button>
        <button class="action-button" @click="copyLink">공유</button>
      </div>
    </div>
    <div class="contents">
      {{ boardData.boardContents }}
    </div>

    <div class="comments-container">
      <div class="comments-count">{{ commentData.length }}개의 댓글</div>
      <form @submit.prevent="submitComment">
        <input
          type="text"
          v-model="newComment"
          placeholder="댓글을 입력하세요"
        />
        <button class="action-button" type="submit">작성</button>
      </form>

      <div
        class="comments-section"
        v-for="(comment, index) in commentData"
        :key="index"
      >
        <div class="comments-section-box">
          <div class="circle">
            <img
              v-if="comment.profileImg !== null || undefined || ''"
              :src="CONSTANTS.API_URL + comment.profileImg"
              alt=""
            />
            <div
              v-else
              class="exchangeImg"
              :style="`background-color: ${comment.color}`"
            />
          </div>
          <div class="meta-info">
            {{ comment.userName }}
          </div>
          <div class="comments-contents">
            {{ comment.commentContents }}
          </div>
        </div>

        <div class="actions" id="comment">
          <p>{{ comment.writeTime }}</p>
          <div>
            <button @click="deleteComment(index)" class="action-button">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="page">
      <button v-if="showPageUpButton" @click="scrollToTop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path
            d="M350 177.5c3.8-8.8 2-19-4.6-26l-136-144C204.9 2.7 198.6 0 192 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26s12.5 14.5 22 14.5h88l0 192c0 17.7-14.3 32-32 32H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32l80 0c70.7 0 128-57.3 128-128l0-192h88c9.6 0 18.2-5.7 22-14.5z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
