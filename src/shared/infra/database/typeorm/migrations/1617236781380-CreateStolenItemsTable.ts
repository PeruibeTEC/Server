import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStolenItemsTable1617236781380 implements MigrationInterface {
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
            type: 'integer',
          },
          {
            name: 'theft_id',
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
        name: 'TheftId',
        columnNames: ['theft_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_theft',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_stolen_items', 'TheftId');
    await queryRunner.dropTable('tb_stolen_items');
  }
}
