import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ name: 'provider_id' })
  public providerId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  public provider: User

  @Column({ name: 'user_id' })
  public userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @Column('timestamp with time zone')
  public date: Date

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date
}

export default Appointment
