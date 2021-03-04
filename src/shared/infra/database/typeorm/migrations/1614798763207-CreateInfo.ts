import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInfo1614798763207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_info',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'telephone',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'info_type_id',
            type: 'uuid',
          },
          {
            name: 'info_address_id',
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
      'tb_info',
      new TableForeignKey({
        name: 'InfoTypeId',
        columnNames: ['info_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_info_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_info',
      new TableForeignKey({
        name: 'InfoAddressId',
        columnNames: ['info_address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_info_address',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_info', 'InfoAddressId');
    await queryRunner.dropForeignKey('tb_info', 'InfoTypeId');
    await queryRunner.dropTable('tb_info');
  }
}
