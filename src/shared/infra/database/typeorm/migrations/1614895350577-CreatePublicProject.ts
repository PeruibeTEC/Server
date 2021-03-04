import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePublicProject1614895350577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_public_project',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '150',
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
            name: 'starting_date',
            type: 'date',
          },
          {
            name: 'ending_date',
            type: 'date',
          },
          {
            name: 'price',
            type: 'float',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_public_project');
  }
}
