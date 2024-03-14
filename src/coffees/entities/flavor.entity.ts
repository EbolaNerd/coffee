import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffee.entity";
import { ManyToMany } from "typeorm";

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToMany(type => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[]
}