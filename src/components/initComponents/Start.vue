<template>
  <div class="container">
    <div class="content">
      <div class="title">
        Real human<br />
        insights
      </div>

      <div class="subtitle">
        One global partner
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;

  background-color: #8ed462;

  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-80px);
}

.title {
  font-size: clamp(6rem, 9vw, 12rem);
  font-weight: 600;
  color: #242424;
  text-align: center;
  line-height: 1;
}

.subtitle {
  margin-top: 50px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: #242424;
  text-align: center;
}

:global(body) {
  margin: 0;
  padding: 0;
}
</style>