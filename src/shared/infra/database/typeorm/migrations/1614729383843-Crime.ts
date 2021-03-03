import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Crime1614729383843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_crime',
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
            isNullable: true,
          },
          {
            name: 'time',
            type: 'time',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'stolen_items',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'crime_type_id',
            type: 'uuid',
          },
          {
            name: 'crime_location_id',
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
      'tb_crime',
      new TableForeignKey({
        name: 'CrimeTypeId',
        columnNames: ['crime_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_crime_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_crime',
      new TableForeignKey({
        name: 'CrimeLocationId',
        columnNames: ['crime_location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_crime_location',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_crime', 'CrimeLocationId');
    await queryRunner.dropForeignKey('tb_crime', 'CrimeTypeId');
    await queryRunner.dropTable('tb_crime');
  }
}
