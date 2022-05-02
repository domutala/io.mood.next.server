import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * cette table contient les information de l'utilisateur.
 * @author domutala
 * @version 0.2.0
 */
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  data!: {
    photo?: string;
    name: string;
    mail: string;
    username?: string;
    password?: string;
    [key: string]: any;
  };

  @Column({ type: "string", nullable: true })
  uid?: string;

  @Column({ type: "boolean", default: false })
  blocked?: boolean;

  @Column({ type: "boolean", default: false })
  certificy?: boolean;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
