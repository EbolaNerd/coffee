import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entities';
import { COFFEE_BRANDS, COFFEE_PRICES } from './coffees.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ["buddy brew", "nescafe"]
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule.forFeature(coffeesConfig)],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    },
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
      inject: [CoffeeBrandsFactory]
    },
    {
      provide: COFFEE_PRICES,
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeePrices = await Promise.resolve(["$10", "$12"])
        return coffeePrices;
      },
      inject: [Connection]
    }
  ],
  exports: [CoffeesService]
})
export class CoffeesModule {}
