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

  html, body {
    height: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $primary-color;
    display: flex;
    flex-direction: column;
    height: 100%;

    #holder {
      width: 100%;
      padding: 120px 0;
      max-width: 1000px;
      margin: auto;
      flex: 1 0 auto;

      @media(max-width: 767px) {
        width: calc(100% - 30px);
        padding: 100px 0;
      }

      .heading-holder {
        width: 100%;
        position: relative;

        .heading {
          margin-bottom: 50px;
          font-size: 3rem;
          opacity: 0;
          margin-left: -100%;
          animation: show-from-left 1s forwards;
          z-index: 10;
          transition: 500ms ease-in-out;
  
          @media(max-width: 767px) {
            font-size: 2rem;
          }
        }

        .fancy-cards {
          position: absolute;
          max-width: 70%;
          top: 0;
          z-index: -1;
          border-radius: 10px;
          -webkit-box-shadow: 5px 5px 21px -3px #717171; 
          box-shadow: 5px 5px 21px -3px #717171;
          background-color: $coral;
          animation: grow-right 3s forwards;
        }

        .first {
          width: 160px;
          height: 160px;
          opacity: .6;
        }

        .second {
          width: 300px;
          height: 150px;
          background-color: $aquamarine;
          opacity: .9;
          top: 20px;
          animation: grow-left 1.5s forwards;
        }

        &:hover {
          .heading {
            letter-spacing: 10px;
          }
        }
      }

      @keyframes grow-right {
        0% {
          transform: scale(0) rotate(0deg);
        }
        100% {
          transform: scale(1.6) rotate(30deg);
        }
      }

      @keyframes grow-left {
        0% {
          transform: scale(0) rotate(0deg);
        }
        100% {
          transform: scale(1.3) rotate(-30deg);
        }
      }


      @keyframes show-from-left {
        0% {
          margin-left: -100%;
          opacity: 0;
        }
        100% {
          margin-left: 0;
          opacity: 1;
        }
      }

      .multiple-employee-card {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        background-color: $gray;
        border-radius: 5px;
        position: relative;
        width: calc(100% - 60px);

        @media(max-width: 767px) {
          display: block;
          padding: 15px;
          width: calc(100% - 30px);
        }

        .multiple {
          position: relative;
        }

        @media(min-width: 768px) {
          .card-1 {
            right: calc(100% - 36%);
            animation: bounce-2 500ms forwards;
            animation-delay: 300ms;
            position: absolute;
            z-index: 20;
          }
  
          .card-2 {
            right: calc(100% - 40%);
            animation: bounce-3 500ms forwards;
            animation-delay: 300ms;
            position: absolute;
            z-index: 21;
          }
        }

      }
    }

    @keyframes bounce-2 {
      0% { right: calc(100% - 36%); }
      100% { right: calc(100% - (67% - 30px)); }
    }
    @keyframes bounce-3 {
      0% { right: calc(100% - 40%); }
      100% { right: calc(100% - (100% - 30px)); }
    }

    .button {
      font-size: 1em;
      display: inline-block;
      padding: 5px 30px;
      background-color: $primary-color;
      color: $white;
      margin-right: 1em;
      border-radius: 25px;
      text-decoration: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: none;
      position: relative;
      transition: 1s cubic-bezier(0.23, 1, 0.320, 1);

      @media(max-width: 767px) {
        margin-right: 0;
      }

      &:before {
        content: "";
        background-color: $secondary-color;
        color: #000;
        width: 100%;
        height: 100%;
        margin-left: 0;
        position: absolute;
        border-radius: 25px;
        left: 0;
        top: 0;
        opacity: 1;
        transition: 1s cubic-bezier(0.23, 1, 0.320, 1);
      }

      &:hover {
        transform: scale(1.1);
        cursor: pointer;

        &:before {
          width: 0;
          margin-left: 100%;
          opacity: 0;
          content: "";
        }
      }

      span {
        position: relative;
        z-index: 20;
      }
    }
  }
</style>
