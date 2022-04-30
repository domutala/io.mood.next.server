import {
  Entity,
  Column,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export interface Key {
  index: string;
  native?: boolean;
  type: string;
  placeholder: { [key: string]: string };

  array?: { min_length?: number; max_length?: number };
  value?: any;

  props: {
    required?: boolean;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
    options?: { text: string; value: any }[];
  };
}

/**
 * @author domutala
 */
@Entity()
export class Config extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  /**la table liée à la configuration  */
  @Column({ type: "text" })
  table!: string;

  /** Si true la table ne poura pas êtes supprimée  */
  @Column({ type: "boolean", default: false })
  native?: boolean;

  /** Si true la table ne poura pas êtes modifiée  */
  @Column({ type: "boolean", default: false })
  lock?: boolean;

  @Column()
  placeholder!: { fr: string; [key: string]: string | undefined };

  @Column()
  keys!: Key[];

  @Column({ type: "datetime" })
  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: "datetime" })
  @UpdateDateColumn()
  updated_at!: Date;
}
