<script>
export default {
  data() {
    return {
      recommendedCrews: [
        { id: 4, name: '크루 4', avatar: 'hi.jpg', description: '크루 4에 대한 설명입니다.', memberCount: 20, postCount: 50 },
        { id: 5, name: '크루 5', avatar: 'avatar5.png', description: '크루 5에 대한 설명입니다.', memberCount: 15, postCount: 30 },
        { id: 6, name: '크루 6', avatar: 'avatar6.png', description: '크루 6에 대한 설명입니다.', memberCount: 12, postCount: 25 },
      ]
    };
  },
   methods: {
    joinCrew(crewId) {
      // 가입 버튼 클릭 시 동작하는 메서드
      // crewId를 이용하여 가입 로직을 구현하세요.
      // 예시: 가입 API 호출 또는 가입 상태 변경 등의 작업을 수행합니다.
      console.log('크루 가입', crewId);
    }
  }
}
</script>

<template>
<div class="maintext">
  <div class="group-page">
    <div class="content-container">
      <div class="recommended-crews">
        <h2>추천 크루</h2>
        <div class="crew-box-container">
          <div class="crew-box" v-for="crew in recommendedCrews" :key="crew.id">
            <div class="crew-image">
             
              <img src="../assets/img/hi.jpg" class="crew-avatar">
            
            </div>
            <div class="crew-info">
              <h3>{{ crew.name }}</h3>
              <p class="crew-description">{{ crew.description }}</p>
              <div class="crew-stats">
                <p class="stat-label">멤버 {{ crew.memberCount }}명</p>
                <div class="dot"></div>
                <p class="stat-label">게시물 {{ crew.postCount }}개</p>
              </div>
              <button class="join-button">크루 가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
