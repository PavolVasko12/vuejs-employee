<template>
  <article>
    <div v-if="!loading">
      <div class="heading-holder">
        <h1 class="heading">Category Page</h1>
        <div class="fancy-cards first"></div>
        <div class="fancy-cards second"></div>
      </div>
      <div class="filter-holder">
        <span v-bind:class="[categoryShowing === 'mostPaid' ?  'active' : '']" @click="toogleCategory('mostPaid')">Most Paid</span>
        <span v-bind:class="[categoryShowing === 'leastPaid' ?  'active' : '']" @click="toogleCategory('leastPaid')">Least Paid</span>
        <span v-bind:class="[categoryShowing === 'oldest' ?  'active' : '']" @click="toogleCategory('oldest')">Oldest</span>
        <span v-bind:class="[categoryShowing === 'youngest' ?  'active' : '']" @click="toogleCategory('youngest')">Youngest</span>
      </div>
      <div v-if="categoryShowing === 'mostPaid'">
        <h2>The most paid employees</h2>
        <div class="multiple-employee-card">
          <EmployeeCard 
              v-for="(employee, index) in mostPaidEmployees" 
              v-bind:class="'card-'+ index"
              v-bind:key="employee.id"
              :employee=employee
              :multiple=true>
            </EmployeeCard>
        </div>
      </div>
      <div v-if="categoryShowing === 'leastPaid'">
        <h2>The least paid employees</h2>
        <div class="multiple-employee-card">
          <EmployeeCard 
              v-for="(employee, index) in leastPaidEmployees" 
              v-bind:class="'card-'+ index"
              v-bind:key="employee.id" 
              :employee=employee
              :multiple=true>
            </EmployeeCard>
        </div>
      </div>
      <div v-if="categoryShowing === 'oldest'" >
        <h2>The oldest employees</h2>
        <div class="multiple-employee-card">
          <EmployeeCard 
              v-for="(employee, index) in oldestEmployees" 
              v-bind:class="'card-'+ index"
              v-bind:key="employee.id" 
              :employee=employee
              :multiple=true>
            </EmployeeCard>
        </div>
      </div>
      <div v-if="categoryShowing === 'youngest'">
        <h2>The youngest employees</h2>
        <div class="multiple-employee-card">
          <EmployeeCard 
              v-for="(employee, index) in youngestEmployees"
              v-bind:class="'card-'+ index" 
              v-bind:key="employee.id" 
              :employee=employee
              :multiple=true>
            </EmployeeCard>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading></Loading>
    </div>
  </article>
</template>

<script lang="ts">
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue } from 'vue-property-decorator';
  import EmployeeCard from '../components/EmployeeCard.vue';
  import { main } from '../enums/main.enum';
  import Loading from '../components/Loading.vue';
  import { storeValues } from '@/enums/store.enum';

  @Component({
    components: {
      EmployeeCard,
      Loading
    }
  })
  export default class CategoryPage extends Vue {

    mostPaidEmployees: Employee[] = [];
    leastPaidEmployees: Employee[] = [];
    youngestEmployees: Employee[] = [];
    oldestEmployees: Employee[] = [];
    loading = true;
    categoryShowing = 'mostPaid';

    /**
     * @description check whether we have values stored in store, if so then initialize
     * If not try to check if values saved in session storage
     * If nothing there then do the API call again and fill initialize
     */
    created() {
      if (this.$store.getters.getAllEmployeesLength > 0) {
        this.initialize();
      } else {
        this.$store.dispatch(storeValues.ASSIGNE_EMPLOYEES_FROM_SESSION).then(response => {
          (response) ? this.initialize() : this.onGetAllEmployeesFromAPI();
        });
      }
    }

   /**
   * @description initialize all neccesery data on start
   */
    initialize(): void {
      this.mostPaidEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.SALARY], [main.DESC]).slice(0,3);
      this.leastPaidEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.SALARY], [main.ASC]).slice(0,3);
      this.oldestEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.AGE], [main.DESC]).slice(0,3);
      this.youngestEmployees = Vue.lodash.orderBy(this.$store.getters.getAllEmployees, [main.AGE], [main.ASC]).slice(0,3);
      this.loading = false;
    }


   /**
   * @description dispatch data to store, and wait to the resulr from API, if success then initialize
   */
    onGetAllEmployeesFromAPI() {
      this.$store.dispatch(storeValues.GET_ALL_EMPLOYEES_FROM_API)
        .then(() => {
          this.initialize();
        })
        .catch(error => {
          window.alert(`Unexpected error, please refresh the page: ${error}`);
          this.loading = false;
      });
    }

    toogleCategory(category: string): void {
      this.categoryShowing = category;
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/variables.scss";

  .filter-holder {
    display: flex;
    width: 60%;
    margin: 200px auto 50px;
    justify-content: space-between;

    span {
      font-weight: 600;
      transition: 200ms ease-in-out;

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      color: $coral;
      border-bottom: 2px dashed $coral;
      font-weight: 800;
    }

    @media(max-width: 767px) {
      width: 100%;
    }
  }
  h2 {
    margin-top: 50px;
  }
</style>
