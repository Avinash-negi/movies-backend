import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Movie } from './movie.model';
import { TABLE_NAMES } from '../common/constants';

@Table({ tableName: TABLE_NAMES.USERS, timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({ type: DataType.STRING, unique: true })
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  name?: string;

  @HasMany(() => Movie)
  movies?: Movie[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

