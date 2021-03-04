import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTouristSpotPhoto1614790199637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_tourist_spot_photo',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'url',
            type: 'varchar',
            length: '3000',
          },
          {
            name: 'tourist_spot_id',
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
      'tb_tourist_spot_photo',
      new TableForeignKey({
        name: 'TouristSpotId',
        columnNames: ['tourist_spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_tourist_spot',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_tourist_spot_photo', 'TouristSpotId');
    await queryRunner.dropTable('tb_tourist_spot_photo');
  }
}
