import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('notitications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column('uuid')
  recipientId: string

  @Column()
  content: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Notification