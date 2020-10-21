<template>
  <footer>
    <div id="footer-inner">
      <a href="/sitemap.xml" target="_blank">Sitemap</a>
      <div>
        <a href="https://www.github.com/pavolvasko12" target="_blank"><img class="logo" src="../assets/github.svg" alt="github logo" ></a>
        <a href="https://www.linkedin.com/in/pavolvasko/" target="_blank"><img class="logo" src="../assets/linkedin.svg" alt="linkedin logo" ></a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  footer {
    background-color: $secondary-color;
    width: calc(100% - 30px);
    padding: 10px 15px;
    color: $white;

    #footer-inner {
      max-width: $max-width;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        color: $white;
        text-decoration: none;
      }

      .logo {
        width: 40px;
        margin-left: 10px;
      }
    }
  }
</style>