import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pixelspeak', 'postgres', 'yashwanthnaidu', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;
