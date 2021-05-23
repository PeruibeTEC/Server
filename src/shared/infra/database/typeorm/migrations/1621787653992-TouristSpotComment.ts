import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TouristSpotComment1621787653992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_tourist_spot_comment',
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
            name: 'content',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'tourist_spot_id',
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
      'tb_tourist_spot_comment',
      new TableForeignKey({
        name: 'touristSpotId',
        columnNames: ['tourist_spot_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_tourist_spot',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_tourist_spot_comment',
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
    await queryRunner.dropForeignKey(
      'tb_tourist_spot_comment',
      'touristSpotId',
    );
    await queryRunner.dropForeignKey('tb_tourist_spot_comment', 'userId');
    await queryRunner.dropTable('tb_tourist_spot_comment');
  }
}
