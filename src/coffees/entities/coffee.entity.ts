import { ManyToMany } from "typeorm";
import { JoinTable } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  brand: string;
  
  @JoinTable()
  @ManyToMany(type => Flavor, (flavor) => flavor.coffees)
  flavors: string[];
}