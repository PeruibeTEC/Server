import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1614624999063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '45',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '45',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'small_biography',
            length: '160',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_tourist',
            type: 'tinyint',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_user');
  }
}
