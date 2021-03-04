import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTouristMigration1614894905189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_tourist_housing',
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
            name: 'state',
            type: 'char',
            length: '2',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'is_foreigner',
            type: 'boolean',
          },
          {
            name: 'country_foreigner',
            length: '25',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tb_tourist_housing',
      new TableForeignKey({
        name: 'userId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_tourist_housing', 'userId');
    await queryRunner.dropTable('tb_tourist_housing');
  }
}
