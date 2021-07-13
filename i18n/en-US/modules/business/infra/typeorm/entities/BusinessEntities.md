|       Title       |           Description           |
| :---------------: | :-----------------------------: |
| Business Entities | Understanding Business Entities |

The files on ./src/modules/business/infra/typeorm/entities make it possible to represent the database clearly, without using migrations directly. To see how migrations work exactly go to [CreateTableMigrations](https://github.com/PeruibeTEC/Server/blob/main/i18n/en-US/shared/infra/typeorm/entities/CreateTableMigrations.md).

## Purpose

By doing this, we can have know more precisely which data types each column has and how they interact with other tables, making it easier to develop the server. Here is an example from the Business.ts entity:

```ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import BusinessType from './BusinessType';

@Entity('tb_business')
export default class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @Column({
    length: 255,
    unique: true,
  })
  email_login: string;

  @Column({
    length: 655,
  })
  password: string;

  @Column({
    length: 3000,
  })
  description: string;

  @Column({
    length: 3000,
  })
  profile_photo: string;

  @Column({
    length: 3000,
    nullable: true,
  })
  background_photo: string;

  @Column('time')
  operating_time: Date;

  @Column('time')
  closing_time: Date;

  @Column({
    length: 160,
  })
  closing_day: string;

  @Column({ nullable: true })
  business_type_id: string;

  @ManyToOne(() => BusinessType)
  @JoinColumn({ name: 'business_type_id' })
  businessType: BusinessType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

As you can see, all the columns are clear in their name and what they use as types. Some important aspects to note are as follows:

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import <Entity> from '<EntityPath>';
```

Here we import the dependencies to our table, be it from typeorm or from other entities, making it possible to create foreign keys.

```ts
@Entity('<EntityName>')
export default class <EntityName> {
  @PrimaryGeneratedColumn('<GenerationType>')
  <name>: <type>;

  @Column({
    <constraints>,
  })
  <name>: <type>;

  @ManyToOne(() => <ForeignEntity>)
  @JoinColumn({ <ForeignColumnName>: '<InnerColumnName>' })
  <name>: <ForeignEntity>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

As we can see, the entity receives it's name (the table name), and gets exported as the document name (in this case, Business). After that we start putting the specific columns, be it for normal columns, primary keys or even foreign keys. The last two columns (CreateDateColumn and UpdateDateColumn) are used when we deal with expired sessions or with updates on data on the table. This info becomes crucial when dealing with JWT tokens.

_This code snippet was taken from [Business.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts) on 07/12/2021._
