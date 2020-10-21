<template>
  <!-- Add dynamic class deppending on input from parent component -->
  <div :class="multiple ? 'multiple' : 'single'" class="detail-card">
    <div class="detail-card__header">
      <p><span>Name: </span>{{ employee.employee_name }}</p>
    </div>
    <div class="detail-card__body">
      <p><span>ID: </span>{{ employee.id }}</p>
      <p><span>Age: </span>{{ employee.employee_age }}</p>
      <p><span>Salary: </span>{{ employee.employee_salary }} &euro;</p>
      <p><span>Profile Image: </span>{{ employee.profile_image }}</p>
    </div>
  </div>
</template>


<script lang="ts">
  import { Employee } from '@/interfaces/employee.interface';
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class EmployeeCard extends Vue {
    @Prop() private employee!: Employee;
    @Prop() private multiple?: boolean; // Whether we are displaying multiple Employees (affects the scss styling)
  }
</script>


<style scoped lang="scss">
  @import "../styles/variables.scss";

  .detail-card {
    margin: 20px 0;

    &__header {
      background-color: $gray;
      padding: 10px 15px;
      border-radius: 5px 5px 0 0;
      font-size: 1.2em;

      span {
        font-weight: 600;
      }
    }

    &__body {
      padding: 10px 15px;
      background-color: $light-gray;
      font-size: 1em;

      span {
        font-weight: 600;
      }

      p {
        line-height: 150%;
      }
    }
  }

  .multiple {
    width: 30%;
    font-size: 0.8em;

    .detail-card__header {
      background-color: $aquamarine;
    }

    @media(max-width: 767px) {
      width: 100%;
    }
  }
</style>