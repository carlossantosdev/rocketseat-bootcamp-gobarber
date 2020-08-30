import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated
} from 'typeorm'

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  @Generated('uuid')
  public token: string

  @Column({ name: 'user_id' })
  public userId: string

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date
}

export default UserToken
