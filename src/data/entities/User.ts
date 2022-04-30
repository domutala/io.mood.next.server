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
    blocked?: boolean;
    phone?: string;

    // access
    admin: "write" | "read" | null;
    leave: "write" | "read" | null;
    effectif: "write" | "read" | null;

    [key: string]: any;
  };

  @Column({ type: "boolean", default: false })
  super?: boolean;

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
