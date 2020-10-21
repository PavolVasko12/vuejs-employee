<template>
  <article>
    <h1 class="heading">Random Page</h1>
    <!-- Pass random employee to EmployeeCard component -->
    <EmployeeCard :employee="store.state.randomEmployee"></EmployeeCard>
    <button class="button" @click="onClickGenerateNewRandomEmployee()">Random Employee</button>
  </article>
</template>

<script lang="ts">
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import store from '../store/store';
  import router from '@/router';

@Component({
  components: {
    EmployeeCard
  }
})
export default class HomePage extends Vue {
  store = store;

  created(): void {
    if (store.state.employees.length > 0) {
      store.state.randomEmployee = this.selectRandomEmployee(this.generateRandomNumberInRange(store.state.employees.length, 0));
    } else {
      router.push({ path: "/"});
    }
  }

  /**
   * @description Generate a random number in the array length range
   * @param max the upper limit of the number
   * @param min the lower limit of the number
   */
  generateRandomNumberInRange = (max: number, min: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * @description select specific employee from the array
   * @param number is the specific employee from an array is going to be fetched
   */
  selectRandomEmployee = (number: number): Employee => {
    return store.state.employees[number];
  }

  /**
   * @description Generate new random employee on click and update store value
   */
  onClickGenerateNewRandomEmployee = (): void => {
    store.state.randomEmployee = this.selectRandomEmployee(this.generateRandomNumberInRange(store.state.employees.length, 0));
  }
}
</script>

<style scoped lang="scss">

  button {
    margin-top: 100px;
  }

</style>
