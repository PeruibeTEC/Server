import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddingTheBgPhotoFieldAndDeletingTable1615053103161
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_business_photo');
    await queryRunner.addColumn(
      'tb_business',
      new TableColumn({
        name: 'background_photo',
        type: 'varchar',
        length: '3000',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'tb_event',
      new TableColumn({
        name: 'background_photo',
        type: 'varchar',
        length: '3000',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'tb_business_product',
      new TableColumn({
        name: 'url',
        type: 'varchar',
        length: '3000',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_business_product', 'url');
    await queryRunner.dropColumn('tb_event', 'background_photo');
    await queryRunner.dropColumn('tb_business', 'background_photo');
    await queryRunner.createTable(
      new Table({
        name: 'tb_business_photo',
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
            name: 'business_id',
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
      'tb_business_photo',
      new TableForeignKey({
        name: 'BusinessId',
        columnNames: ['business_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_business',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
