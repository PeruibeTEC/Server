import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStolenItems1615300946131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_stolen_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'items',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'amount',
            type: 'INT',
          },
          {
            name: 'crime_id',
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
      'tb_stolen_items',
      new TableForeignKey({
        name: 'crimeId',
        columnNames: ['crime_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_crime',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_crime', 'crime_id');
    await queryRunner.dropTable('tb_stolen_items');
  }
}
