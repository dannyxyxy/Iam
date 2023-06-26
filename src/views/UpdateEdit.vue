<script>
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { apiClient } from "../utils/axios.js";
import commonUtil from "../utils/common-util.js";
import { onMounted } from "vue";
import { CONSTANTS } from "../utils/constants.js";
import router from "../router/index.js";

export default {
  components: {
    editor: Editor,
  },
  
  data() {
    return {
      title: "",
      selectedPhoto: null,
      isEditable: false,
    };
  },

  mounted() {
    const editor = new Editor({
      el: this.$refs.editorRef,
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "500px",
    });

    //  초기 텍스트 설정
    editor.setMarkdown("");

    this.editor = editor;

    // 에디터 내용 변경 이벤트 처리
    editor.on("change", () => {
      const content = editor.getMarkdown();
      console.log("Editor content:", content);
    });
    
    //수정 가능한 상태인지 확인
    this.checkEditable();

  },
  methods: {
    async checkEditable() {
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );

      // 원본 글 작성자와 수정자가 동일한 경우 수정 가능한 상태로 설정
      if (userLocalInfo.userIdx === this.originalAuthorIdx) {
        this.isEditable = true;
      }
    },
  }
};
</script>

<template>
  <div class="maintext">
    <input
        type="text"
        v-model="title"
        placeholder="제목을 입력하세요."
        class="title-input"
      />
    
    <div class="editdiv">
      <div ref="editorRef"></div>
    </div>
    <div class="upload">
      <button class="savebutton" @click="saveContent">업로드</button>
    </div>
  </div>
  
</template>

<style scoped></style>
