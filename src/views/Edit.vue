<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";
import { ref } from "vue";
import { CONSTANTS } from "../utils/constants.js";

export default {
  data(){
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
    editor.setMarkdown("여기에 글을 작성하세요");

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
      const { userIdx } = commonUtil.getLocalStorage(
        CONSTANTS.KEY_LIST.USER_INFO
      );
      const boardData = {
        boardTitle: "",
        boardContents: content,
        userName: userIdx,
      };
      // 여기에서 저장 로직을 구현하면 됩니다.
      console.log("Saving content:", content);

      const data = await apiClient("board/writeBoard", boardData);
      console.log(data);
      if (data.resultCode === 1) {
        // 데이터 전송 성공 시 로직
      } else {
        // 데이터 전송 실패 시 로직
      }
    },
  },
};
</script>

<template>
  <div class="editdiv">
    <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-input">
    <div ref="editorRef" class="editor"></div>
    <button class="savebutton" @click="saveContent">저장</button>
  </div>
</template>

<style scoped></style>
