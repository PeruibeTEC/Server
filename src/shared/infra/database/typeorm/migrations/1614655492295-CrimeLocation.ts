import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CrimeLocation1614655492295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_crime_location',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'latitude',
            type: 'decimal',
            precision: 10,
            scale: 7,
          },
          {
            name: 'longitude',
            type: 'decimal',
            precision: 10,
            scale: 7,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_crime_location');
  }
}
