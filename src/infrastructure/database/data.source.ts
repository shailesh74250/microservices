import { DataSource } from 'typeorm';
import { databaseConfig } from '../../config/database.config'; // Adjust path if needed

const connectionSource = new DataSource(databaseConfig);
export default connectionSource;
