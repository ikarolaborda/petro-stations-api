import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1723124307067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'poi',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'zipCode',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'houseNumber',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'opening_hours',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'day',
            type: 'varchar',
          },
          {
            name: 'open',
            type: 'varchar',
          },
          {
            name: 'close',
            type: 'varchar',
          },
          {
            name: 'poiId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['poiId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'poi',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'pump',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'fuelProducts',
            type: 'json',
          },
          {
            name: 'poiId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['poiId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'poi',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pump');
    await queryRunner.dropTable('opening_hours');
    await queryRunner.dropTable('poi');
  }
}
