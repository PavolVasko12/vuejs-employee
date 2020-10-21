<template>
  <div id="loading-holder">
    <img src="../assets/loading.svg" alt="loading icon" />
    <h3>Loading please wait</h3>
  </div>
</template>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  #loading-holder {
    width: 100%;
    max-width: $max-width;
    text-align: center;
    height: 90vh;

    img {
      width: 50px;
      height: 50px;
      animation: spin-animation 1s infinite;
    }

    /* Keyframe for spinning the icon logo */
    @keyframes spin-animation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>