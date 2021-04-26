import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBusinessRating1619361809390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_business_rating',
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
            name: 'value',
            type: 'int',
          },
          {
            name: 'business_id',
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
      'tb_business_rating',
      new TableForeignKey({
        name: 'businessId',
        columnNames: ['business_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_business',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_business_rating',
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
    await queryRunner.dropForeignKey('tb_business_rating', 'businessId');
    await queryRunner.dropForeignKey('tb_business_rating', 'userId');
    await queryRunner.dropTable('tb_business_rating');
  }
}
