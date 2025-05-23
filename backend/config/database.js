import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('echovote', 'postgres', 'iamgoingtoUSC@1', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize; 