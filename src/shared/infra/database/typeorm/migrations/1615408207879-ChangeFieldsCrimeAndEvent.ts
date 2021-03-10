import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ChangeFieldsCrimeAndEvent1615408207879
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_crime',
      new TableColumn({ name: 'title', type: 'varchar', length: '25' }),
    );

    await queryRunner.addColumn(
      'tb_crime',
      new TableColumn({ name: 'stolen_items_id', type: 'uuid' }),
    );

    await queryRunner.dropColumn('tb_crime', 'stolen_items');

    await queryRunner.createForeignKey(
      'tb_crime',
      new TableForeignKey({
        name: 'stolenItemsId',
        columnNames: ['stolen_items_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_stolen_items',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.changeColumn(
      'tb_event',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '160',
        isNullable: true,
      }),
    );

    await queryRunner.changeColumn(
      'tb_event',
      'start_time',
      new TableColumn({ name: 'start_time', type: 'time', isNullable: true }),
    );

    await queryRunner.changeColumn(
      'tb_event',
      'end_time',
      new TableColumn({ name: 'end_time', type: 'time', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_crime', 'title');
    await queryRunner.addColumn(
      'tb_crime',
      new TableColumn({ name: 'stolen_items', type: 'varchar', length: '150' }),
    );
    await queryRunner.dropForeignKey('tb_crime', 'stolenItemsId');
    await queryRunner.dropColumn('tb_event', 'description');
  }
}
