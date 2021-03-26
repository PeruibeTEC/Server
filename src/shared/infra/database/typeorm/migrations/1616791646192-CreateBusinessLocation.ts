import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBusinessLocation1614868979176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_business_location',
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
            length: '205',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
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
            name: 'business_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'tb_business_location',
      new TableForeignKey({
        name: 'BusinessId',
        columnNames: ['business_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_business',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_business_location', 'BusinessId');
    await queryRunner.dropTable('tb_business_location');
  }
}
