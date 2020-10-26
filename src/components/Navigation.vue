<template>
  <div>
    <nav :class="{display: displayNavMenu}">
      <!-- Dynamically render nav menu items -->
      <ul>
        <li v-for="menuItem in menuItems" v-bind:key="menuItem.id">
          <router-link v-bind:class="menuItem.title.toLowerCase()" class="button" :to="`${menuItem.link}`"><span>{{ menuItem.title }}</span></router-link>
        </li>
      </ul>
    </nav>
    <!-- Only displays when screen smaller than 767px (Triggers opening/closing mobile nav menu) -->
    <span id="toogle-nav" @click="toogleMenu()"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { MenuItems } from '../interfaces/menu-items.interface';

@Component
export default class Navigation extends Vue {
  menuItems: MenuItems[] = [
    { title: 'Home', id: 1, link: '/' },
    { title: 'Random', id: 2, link: '/random' },
    { title: 'Categories', id: 3, link: '/categories' }
  ];
  displayNavMenu = false;

  /**
   * @description watcher for url changes o close the navigation menu and set the title for a specific page
   */
  @Watch('$route', { immediate: true, deep: true })
  // eslint-disable-next-line
  onRouterChange(route: any) {
    window.scrollTo(0,0);
    document.title = 'Pavol Vasko | ' + route.name;
    this.displayNavMenu = false;
  }

  /**
   * @description toggle navigation menu
   */
  toogleMenu(): void {
    this.displayNavMenu = !this.displayNavMenu;
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  nav {
    width: 100%;
    height: auto;
    padding: 10px 0;
    position: fixed;
    display: flex;
    background-color: $coral;
    z-index: 1000;

    @media(max-width: 767px) {
      display: flex;
      margin-top: -100vh;
      height: 100vh;
      padding: 0;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: 500ms ease-in-out;
    }

    ul {
      list-style-type: none;
      max-width: $max-width;
      margin: auto;
      width: 100%;

      li {
        display: inline;
        margin: 0 5px;
        padding: 0;

        a {
          position: relative;
          padding: 5px;
        }

        .router-link-exact-active {
          color: $coral !important;
          font-weight: 600;
        }

        &:first-of-type {
          margin-left: 0;
        }

        @media(max-width: 767px) {
          display: block;
          margin: 20px 0;
          font-size: 1.5em;
        }
      }
    }
  }

  .display {
    display: flex;
    margin-top: 0;
  }
  
  #toogle-nav {
    display: none;
    position: fixed;
    right: 0px;
    width: 30px;
    margin: 10px;
    transition: ease-in-out 200ms;

    &:before {
      content: "";
      background: url("../assets/menu.svg") no-repeat;
      background-size: 30px auto;
      height: 30px;
      width: 30px;
      left: 0px;
      top: 0px;
      position: absolute;
    }

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    @media(max-width: 767px) {
      display: block;
      position: fixed;
      z-index: 1001;
    }
  }
</style>