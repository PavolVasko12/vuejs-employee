<template>
  <div id="app">
    <Navigation></Navigation>
    <div id="holder">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Navigation from './components/Navigation.vue';
  import Footer from './components/Footer.vue';

  @Component({
    components: {
      Navigation,
      Footer
    },
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  @import "./styles/variables.scss";

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $primary-color;

    #holder {
      width: 100%;
      padding: 150px 0;
      max-width: 1000px;
      margin: auto;

      @media(max-width: 767px) {
        width: calc(100% - 30px);
        padding: 100px 0;
      }

      .heading {
        border-bottom: 4px solid $aquamarine;
        margin-bottom: 50px;
        font-size: 3rem;

        @media(max-width: 767px) {
          font-size: 2rem;
        }
      }

      .multiple-employee-card {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        background-color: $gray;
        border-radius: 5px;

        @media(max-width: 767px) {
          display: block;
          padding: 10px 30px;
        }
      }
    }

    .button {
      font-size: 1em;
      display: inline-block;
      padding: 5px 10px;
      transition: cubic-bezier(0.25, 0.46, 0.45, 0.94) 200ms;
      background-color: $primary-color;
      color: $white;
      margin-right: 1em;
      border-radius: 2px;
      text-decoration: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: none;

      &:hover {
        opacity: .9;
        box-shadow: 2px 2px 5px lightgray;
        cursor: pointer;
      }
    }
  }
</style>
