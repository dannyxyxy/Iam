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
    editor: Editor
  },
  
  data() {
    return {
      title: "",
      selectedPhoto: null,
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
  },
  methods: {
    async saveContent() {
      const title = this.title;
      const content = this.editor.getMarkdown();
      const userLocalInfo = JSON.parse(
        commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)
      );
      const crew = this.crewName;

      const boardData = {
        crewTitle: title,
        crewContents: content,
        userEmail: userLocalInfo.userEmail,
        crewName: crew,
      };

      const data = await apiClient("crew/writecrewBoard", boardData);
      if (data && data.resultCode === 1) {
        alert("글 작성 완료!");
        await router.push("/CrewPost");
      } else {
        alert("글이 저장되지 않았습니다.");
      }
    },
      handleFileChange(event) {
        const file = event.target.files[0];
        this.selectedPhoto = URL.createObjectURL(file);
      },
      savePhoto() {
        // 선택한 사진을 저장하는 로직을 구현하세요
        // 예: 서버에 사진을 업로드하거나, 상태 관리를 통해 홈 페이지에서 사용할 수 있도록 전달
        console.log(this.selectedPhoto);
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
