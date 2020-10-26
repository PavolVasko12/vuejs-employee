<template>
  <!-- Add dynamic class deppending on input from parent component -->
  <div :class="multiple ? 'multiple' : 'single'" class="detail-card">
    <div class="detail-card__header">
      <p><span class="detail-card__header__name">Name: </span>{{ employee.employee_name }}</p>
      <img src="../assets/user.svg" alt="User profile image">
    </div>
    <div class="detail-card__body">
      <p><span class="detail-card__body__id">ID: </span>{{ employee.id }}</p>
      <p><span class="detail-card__body__age">Age: </span>{{ employee.employee_age }}</p>
      <p><span class="detail-card__body__salary">Salary: </span>{{ employee.employee_salary }} &euro;</p>
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
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        margin-left: 40px;
      }

      img {
        width: 60px;
        height: auto;
        border-radius: 50%;

        @media(max-width: 767px) {
          width: 30px;
        }
      }

      &__name {
        font-weight: 600;
        position: relative;

        &:before {
          content: "";
          background: url("../assets/name.svg") no-repeat;
          background-size: 24px auto;
          height: 24px;
          width: 24px;
          left: -40px;
          top: 0px;
          position: absolute;
        }
      }
    }

    &__body {
      padding: 10px 15px;
      background-color: $light-gray;
      font-size: 1em;

      &__id,
      &__salary,
      &__age {
        font-weight: 600;
        position: relative;
        padding-left: 40px;

        &:before {
          content: "";
          background: url("../assets/calendar.svg") no-repeat;
          background-size: 24px auto;
          height: 24px;
          width: 24px;
          left: 0;
          top: 0px;
          position: absolute;
        }
      }

      &__salary {
        &:before {
          background: url("../assets/money.svg") no-repeat;
        }
      }

      &__id {
        &:before {
          background: url("../assets/passkey.svg") no-repeat;
        }
      }

      p {
        line-height: 150%;
        padding: 10px 0;
      }
    }
  }

  .multiple {
    width: 30%;
    font-size: 0.8em;

    .detail-card__header {
      background-color: $coral;
      
      img {
        width: 25px;
      }
    }

    .detail-card__body {
      border-left: 1px dashed $coral;
    }

    @media(max-width: 767px) {
      width: 100%;
    }
  }

</style>