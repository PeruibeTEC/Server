import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEventBusiness1614869786281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_event_business',
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
            length: '100',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'start_time',
            type: 'time',
          },
          {
            name: 'end_time',
            type: 'time',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'background_photo',
            type: 'varchar',
            length: '3000',
            isNullable: true,
          },
          {
            name: 'business_id',
            type: 'uuid',
          },
          {
            name: 'event_type_business_id',
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
      'tb_event_business',
      new TableForeignKey({
        name: 'BusinessId',
        columnNames: ['business_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_business',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_event_business',
      new TableForeignKey({
        name: 'EventTypeBusinessId',
        columnNames: ['event_type_business_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_event_type_business',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_event_business', 'BusinessId');
    await queryRunner.dropForeignKey(
      'tb_event_business',
      'EventTypeBusinessId',
    );
    await queryRunner.dropTable('tb_event_business');
  }
}
