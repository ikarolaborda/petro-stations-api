import { createConnection } from 'typeorm';
import { POI } from '../poi/entities/poi.entity';
import { OpeningHours } from '../poi/entities/opening-hours.entity';
import { Pump } from '../poi/entities/pump.entity';

async function runSeed() {
  const connection = await createConnection();

  const poiRepository = connection.getRepository(POI);
  const openingHoursRepository = connection.getRepository(OpeningHours);
  const pumpRepository = connection.getRepository(Pump);

  const poi = new POI();
  poi.status = 'ONLINE';
  poi.country = 'Country';
  poi.zipCode = '12345';
  poi.city = 'City';
  poi.street = 'Street';
  poi.houseNumber = '123';

  await poiRepository.save(poi);

  const openingHours = new OpeningHours();
  openingHours.day = 'Monday';
  openingHours.open = '08:00';
  openingHours.close = '18:00';
  openingHours.poi = poi;

  await openingHoursRepository.save(openingHours);

  const pump = new Pump();
  pump.name = 'Pump 1';
  pump.fuelProducts = [{ type: 'Diesel', price: 1.23 }];
  pump.poi = poi;

  await pumpRepository.save(pump);

  await connection.close();
}

runSeed()
  .then(() => console.log('Seeding complete'))
  .catch(console.error);
