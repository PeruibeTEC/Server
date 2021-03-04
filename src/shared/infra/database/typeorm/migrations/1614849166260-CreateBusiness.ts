import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBusiness1614849166260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_business',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'email_login',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '665',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '3000',
          },
          {
            name: 'profile_photo',
            type: 'varchar',
            length: '3000',
          },
          {
            name: 'operating_time',
            type: 'time',
          },
          {
            name: 'closing_time',
            type: 'time',
          },
          {
            name: 'closing_day',
            type: 'varchar',
            length: '160',
          },
          {
            name: 'business_type_id',
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
      'tb_business',
      new TableForeignKey({
        name: 'BusinessTypeId',
        columnNames: ['business_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_business_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_business', 'BusinessTypeId');
    await queryRunner.dropTable('tb_business');
  }
}
