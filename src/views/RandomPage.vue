<template>
  <article>
    <div v-if="!loading">
      <h1 class="heading">Random Page</h1>
      <!-- Pass random employee to EmployeeCard component -->
      <EmployeeCard :employee="this.$store.getters.getRandomEmployee"></EmployeeCard>
      <button class="button" @click="onClickGenerateNewRandomEmployee()">Random Employee</button>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </article>
</template>

<script lang="ts">
import { storeValues } from '@/enums/store.enum';
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import Loading from '../components/Loading.vue';

@Component({
  components: {
    EmployeeCard,
    Loading
  }
})
export default class HomePage extends Vue {
  loading = true;

  created(): void {
    if (this.$store.getters.getAllEmployeesLength > 0) {
      this.initilize();
    } else {
      this.$store.dispatch('getAllEmployeesFromApi')
        .then(() => {
          this.initilize();
        })
        .catch(error => {
          window.alert(`Unexpected error, please refresh the page: ${error}`);
          this.loading = false;
      });
    }
  }

  initilize(): void {
    this.$store.commit(
      storeValues.ASSIGN_RANDOM_EMPLOYEE,
      this.selectRandomEmployee(this.generateRandomNumberInRange(this.$store.getters.getAllEmployeesLength, 0)) 
    );
    this.loading = false;
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
    return this.$store.getters.getAllEmployees[number];
  }

  /**
   * @description Generate new random employee on click and update store value
   */
  onClickGenerateNewRandomEmployee = (): void => {
    this.$store.commit(
      storeValues.ASSIGN_RANDOM_EMPLOYEE,
      this.selectRandomEmployee(this.generateRandomNumberInRange(this.$store.getters.getAllEmployeesLength, 0))
    )
  }
}
</script>

<style scoped lang="scss">

  button {
    margin-top: 100px;
  }

</style>
