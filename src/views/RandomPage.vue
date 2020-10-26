<template>
  <article>
    <div v-if="!loading">
      <div class="heading-holder">
        <h1 class="heading">Random Page</h1>
        <div class="fancy-cards first"></div>
        <div class="fancy-cards second"></div>
      </div>
      <!-- Pass random employee to EmployeeCard component -->
      <EmployeeCard :employee="this.$store.getters.getRandomEmployee"></EmployeeCard>
      <button class="button-random" @click="onClickGenerateNewRandomEmployee()">Random Employee</button>
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

  /**
   * @description check whether we have values stored in store, if so then initialize
   * If not try to check if values saved in session storage
   * If nothing there then do the API call again and fill initialize
   */
  created(): void {
    if (this.$store.getters.getAllEmployeesLength > 0) {
        this.initilize();
    } else {
      this.$store.dispatch(storeValues.ASSIGNE_EMPLOYEES_FROM_SESSION).then(response => {
        (response) ? this.initilize() : this.getAllEmployeesFromAPI();
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

  /**
 * @description dispatch data to store, and wait to the resulr from API, if success then initialize
 */
  getAllEmployeesFromAPI() {
  this.$store.dispatch(storeValues.GET_ALL_EMPLOYEES_FROM_API)
    .then(() => {
      this.initilize();
    })
    .catch(error => {
      window.alert(`Unexpected error, please refresh the page: ${error}`);
      this.loading = false;
    });
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  .button-random {
    margin-top: 50px;
    font-size: 1.1em;
    display: flex;
    padding: 10px 40px 10px 10px;
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

    &:after {
      content: "";
      background: url("../assets/shuffle.svg") no-repeat;
      background-size: 24px auto;
      height: 24px;
      width: 24px;
      right: 10px;
      top: 8px;
      position: absolute;
      transition: 1s cubic-bezier(0.23, 1, 0.320, 1);
    }
    &:hover {
      padding: 10px 60px 10px 40px;
      cursor: pointer;

      &:after {
        right: 5px;
        transform: rotate(360deg);
      }
    }
  }

</style>
