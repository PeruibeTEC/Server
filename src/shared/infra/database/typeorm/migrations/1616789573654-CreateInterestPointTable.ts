import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInterestPointTable1616789573654
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_interest_point',
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
            length: '200',
          },
          {
            name: 'telephone',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'street',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'number',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'district',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'interest_point_id',
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
      'tb_interest_point',
      new TableForeignKey({
        name: 'InterestPointTypeId',
        columnNames: ['interest_point_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_interest_point_type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_interest_point', 'InterestPointId');
    await queryRunner.dropTable('tb_interest_point');
  }
}
