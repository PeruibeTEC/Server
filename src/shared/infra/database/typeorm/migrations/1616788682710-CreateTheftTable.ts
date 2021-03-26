import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTheftTable1616788682710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_theft',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'time',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'theft_location_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
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
      'tb_theft',
      new TableForeignKey({
        name: 'TheftLocationId',
        columnNames: ['theft_location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_theft_location',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_theft',
      new TableForeignKey({
        name: 'UserId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_theft', 'TheftLocationId');
    await queryRunner.dropForeignKey('tb_user', 'UserId');
    await queryRunner.dropTable('tb_theft');
  }
}
