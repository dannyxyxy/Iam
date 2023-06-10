<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";
import { onMounted, ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";

export default {
  data() {
    return {
      title: "",
    };
  },

  mounted() {
    const editor = new Editor({
      el: this.$refs.editorRef,
      initialEditType: "markdown",
      previewStyle: "horizontal",
      height: "500px",
    });

    //  초기 텍스트 설정
    editor.setMarkdown("여기에 글을 작성하세요.");

    this.editor = editor;

    // 에디터 내용 변경 이벤트 처리
    editor.on("change", () => {
      const content = editor.getMarkdown();
      console.log("Editor content:", content);
    });
  },
  methods: {
    async saveContent() {
      const title = this.title;
      const content = this.editor.getMarkdown();
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );

      const boardData = {
        boardTitle: title,
        boardContents: content,
        userIdx: userLocalInfo.userIdx,
      };

      const data = await apiClient("board/writeBoard", boardData);
      if (data.resultCode === 1) {
        alert("글 작성 완료!");
        await router.push("/");
      } else {
        alert("글이 저장되지 않았습니다.");
      }
    },
  },
  setup() {
    const getLoginInfo = async () => {
      const loginCheck = commonUtil.loginCheck();
      if (!loginCheck) {
        alert("로그인 후에 이용해주세요");
        await router.push("/");
      }
    };
    onMounted(getLoginInfo);
  },
};
</script>

<template>
  <div class="maintext" :class="{ 'dark-mode': isDarkMode }">
    <div class="editdiv">
      <input
        type="text"
        v-model="title"
        placeholder="제목을 입력하세요."
        class="title-input"
      />
      <div ref="editorRef" class="editor"></div>
      <button class="savebutton" @click="saveContent">저장</button>
    </div>
  </div>
</template>

<style scoped></style>
