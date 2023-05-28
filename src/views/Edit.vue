<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default {
  mounted() {
        const editor = new Editor({
      el: this.$refs.editorRef,
      initialEditType: 'markdown',
      previewStyle: 'horizontal', 
      height: '500px', 
    });

    //  초기 텍스트 설정
    editor.setMarkdown('#  여기에 글을 작성하세요');

    this.editor = editor;

    // 에디터 내용 변경 이벤트 처리
    editor.on('change', () => {
      const content = editor.getMarkdown();
      console.log('Editor content:', content);
    });
  },
  methods: {
    saveContent() {
      const content = this.editor.getMarkdown();
      // 여기에서 저장 로직을 구현하면 됩니다.
      console.log('Saving content:', content);
    },
  },
};
</script>

<template>
  
  <div class = editdiv>
    <div ref="editorRef"></div>
    <button class="savebutton" @click="saveContent">저장</button>
  </div>
 
</template>

<style scoped></style>
