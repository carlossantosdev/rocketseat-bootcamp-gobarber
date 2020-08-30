import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public avatar: string

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date
}

export default User
