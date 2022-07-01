import { EmployeePaymentTypes } from '../../config/server_constant';

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
