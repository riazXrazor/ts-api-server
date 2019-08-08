import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  /**
   * Date of creation
   */
  @Column("timestamp")
  public createdAt!: Date;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public updatedAt!: Date;
}
