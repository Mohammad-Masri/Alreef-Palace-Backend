/* eslint-disable prettier/prettier */
import { EmployeePaymentTypes } from 'src/config/server_constant';

export const employee_payment_types = [
  {
    key: EmployeePaymentTypes.SALARY,
    name: 'راتب',
  },
  {
    key: EmployeePaymentTypes.REWARD,
    name: 'منحة',
  },
  {
    key: EmployeePaymentTypes.ADVANCE,
    name: 'سلفة',
  },
];

export default employee_payment_types;
