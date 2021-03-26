import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTheftLocationTable1616788259803
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_theft_location',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
    await queryRunner.dropTable('tb_theft_location');
  }
}
