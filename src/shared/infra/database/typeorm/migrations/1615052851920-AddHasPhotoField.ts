import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddingTheHasPhotoField1615052851920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_project_comment',
      new TableColumn({
        name: 'has_photo',
        type: 'boolean',
      }),
    );

    await queryRunner.addColumn(
      'tb_post',
      new TableColumn({
        name: 'has_photo',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_post', 'has_photo');
    await queryRunner.dropColumn('tb_project_comment', 'has_photo');
  }
}
