import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBusinessContact1637433570313 implements MigrationInterface {
  name = 'CreateBusinessContact1637433570313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" DROP CONSTRAINT "BusinessTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" DROP CONSTRAINT "businessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" DROP CONSTRAINT "BusinessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" DROP CONSTRAINT "BusinessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" DROP CONSTRAINT "BusinessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP CONSTRAINT "businessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP CONSTRAINT "BusinessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP CONSTRAINT "EventTypeBusinessId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP CONSTRAINT "UserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP CONSTRAINT "EventTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" DROP CONSTRAINT "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" DROP CONSTRAINT "ProjectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" DROP CONSTRAINT "InterestPointTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" DROP CONSTRAINT "touristSpotId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" DROP CONSTRAINT "TouristSpotId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP CONSTRAINT "touristSpotId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" DROP CONSTRAINT "postId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" DROP CONSTRAINT "postId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP CONSTRAINT "UserId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP CONSTRAINT "TheftLocationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft_items" DROP CONSTRAINT "TheftId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" DROP CONSTRAINT "userId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(160) NOT NULL, "user_id" uuid, "post_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ecbc218bd144d75ac237effc45e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c4e994b2331683a7bd02a4518b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" DROP COLUMN "url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ADD "photo_product_url" character varying(3000) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD "title" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ADD CONSTRAINT "UQ_732d751229f9d858729757ce35b" UNIQUE ("email_login")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ADD "password" character varying(655) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "profile_photo" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "business_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" ADD CONSTRAINT "UQ_2b010a1734c1fcda19d50164b68" UNIQUE ("contact_email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD "value" numeric(2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_business" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_business" ADD "name" character varying(150) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "start_time" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "end_time" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "event_type_business_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_user" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_user" ADD "name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "name" character varying(45) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "start_time" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "end_time" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "description" character varying(160)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "event_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" DROP COLUMN "starting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" ADD "starting_date" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" DROP COLUMN "ending_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" ADD "ending_date" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" ALTER COLUMN "public_project_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" ALTER COLUMN "interest_point_type_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ALTER COLUMN "tourist_spot_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" ALTER COLUMN "tourist_spot_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD "value" numeric(2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ALTER COLUMN "tourist_spot_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ALTER COLUMN "post_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" ALTER COLUMN "post_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" ADD "state" character varying(2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ADD CONSTRAINT "FK_19e2e32450dfdc3e79f584711ef" FOREIGN KEY ("business_type_id") REFERENCES "tb_business_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ADD CONSTRAINT "FK_3c694e8834a57d13f8ffa558f26" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ADD CONSTRAINT "FK_a1ca90fd5ea17ecafccc6ff633b" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" ADD CONSTRAINT "FK_171e4f754acf1241aa806d6dd04" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" ADD CONSTRAINT "FK_1e1efe5b9b9f8b5269f72293589" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ADD CONSTRAINT "FK_0c339d5069bc42bc17ea6b74822" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD CONSTRAINT "FK_07b1237d3f78ae1663e1302e4c1" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD CONSTRAINT "FK_34adb4b1df4e18550f996cdd585" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD CONSTRAINT "FK_9203ded51c53e46e5448e1506f9" FOREIGN KEY ("business_id") REFERENCES "tb_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD CONSTRAINT "FK_a3b8ff6f6a1b6eaddd0e2d89080" FOREIGN KEY ("event_type_business_id") REFERENCES "tb_event_type_business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD CONSTRAINT "FK_8e22238710ccbef0a8b5d8e9b25" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD CONSTRAINT "FK_726bf18a978cf987605683004b5" FOREIGN KEY ("event_type_id") REFERENCES "tb_event_type_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" ADD CONSTRAINT "FK_f28b0cb5d9b34fc74753f5d64af" FOREIGN KEY ("public_project_id") REFERENCES "tb_public_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" ADD CONSTRAINT "FK_47b2e07a6cdd3489c3e0e4bce0a" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" ADD CONSTRAINT "FK_15dd02e560acce5ad1ab8a1d591" FOREIGN KEY ("public_project_id") REFERENCES "tb_public_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" ADD CONSTRAINT "FK_a8626c3edef5cf887002e091410" FOREIGN KEY ("interest_point_type_id") REFERENCES "tb_interest_point_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ADD CONSTRAINT "FK_96023c98cf49062df5157c586a2" FOREIGN KEY ("tourist_spot_id") REFERENCES "tb_tourist_spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ADD CONSTRAINT "FK_b51819a21e312489e09a6c74d49" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" ADD CONSTRAINT "FK_2dedd31e9c0d2d98d24d8ee66c2" FOREIGN KEY ("tourist_spot_id") REFERENCES "tb_tourist_spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD CONSTRAINT "FK_66ac4f26097ccdf857d85c9674c" FOREIGN KEY ("tourist_spot_id") REFERENCES "tb_tourist_spot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD CONSTRAINT "FK_272a253fd4fee0d8d43de689591" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" ADD CONSTRAINT "FK_0f4f57973f33eaf6eccf9bdcfce" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_comment" ADD CONSTRAINT "FK_ba575f7102bb6535c6f99a22065" FOREIGN KEY ("post_id") REFERENCES "tb_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_comment" ADD CONSTRAINT "FK_2c43ff48982c864ab0e8b63b03d" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ADD CONSTRAINT "FK_10a6d26407fe01ec48aeab53ffb" FOREIGN KEY ("post_id") REFERENCES "tb_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ADD CONSTRAINT "FK_1b909945f646b9d7ce1def2955a" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" ADD CONSTRAINT "FK_64aa8600afe03cf4486d1fdafe1" FOREIGN KEY ("post_id") REFERENCES "tb_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD CONSTRAINT "FK_54f3af95d6573483cda1c8a4f77" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD CONSTRAINT "FK_9ec2d2df50236e15f48420a0b86" FOREIGN KEY ("theft_location_id") REFERENCES "tb_theft_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft_items" ADD CONSTRAINT "FK_a83ff3ae3ebf5f1e1fe5c880180" FOREIGN KEY ("theft_id") REFERENCES "tb_theft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" ADD CONSTRAINT "FK_3bd2ce7f6420407df58a7b044d8" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" DROP CONSTRAINT "FK_3bd2ce7f6420407df58a7b044d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft_items" DROP CONSTRAINT "FK_a83ff3ae3ebf5f1e1fe5c880180"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP CONSTRAINT "FK_9ec2d2df50236e15f48420a0b86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP CONSTRAINT "FK_54f3af95d6573483cda1c8a4f77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" DROP CONSTRAINT "FK_64aa8600afe03cf4486d1fdafe1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" DROP CONSTRAINT "FK_1b909945f646b9d7ce1def2955a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" DROP CONSTRAINT "FK_10a6d26407fe01ec48aeab53ffb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_comment" DROP CONSTRAINT "FK_2c43ff48982c864ab0e8b63b03d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_comment" DROP CONSTRAINT "FK_ba575f7102bb6535c6f99a22065"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" DROP CONSTRAINT "FK_0f4f57973f33eaf6eccf9bdcfce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP CONSTRAINT "FK_272a253fd4fee0d8d43de689591"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP CONSTRAINT "FK_66ac4f26097ccdf857d85c9674c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" DROP CONSTRAINT "FK_2dedd31e9c0d2d98d24d8ee66c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" DROP CONSTRAINT "FK_b51819a21e312489e09a6c74d49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" DROP CONSTRAINT "FK_96023c98cf49062df5157c586a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" DROP CONSTRAINT "FK_a8626c3edef5cf887002e091410"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" DROP CONSTRAINT "FK_15dd02e560acce5ad1ab8a1d591"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" DROP CONSTRAINT "FK_47b2e07a6cdd3489c3e0e4bce0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" DROP CONSTRAINT "FK_f28b0cb5d9b34fc74753f5d64af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP CONSTRAINT "FK_726bf18a978cf987605683004b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP CONSTRAINT "FK_8e22238710ccbef0a8b5d8e9b25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP CONSTRAINT "FK_a3b8ff6f6a1b6eaddd0e2d89080"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP CONSTRAINT "FK_9203ded51c53e46e5448e1506f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP CONSTRAINT "FK_34adb4b1df4e18550f996cdd585"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP CONSTRAINT "FK_07b1237d3f78ae1663e1302e4c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" DROP CONSTRAINT "FK_0c339d5069bc42bc17ea6b74822"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" DROP CONSTRAINT "FK_1e1efe5b9b9f8b5269f72293589"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" DROP CONSTRAINT "FK_171e4f754acf1241aa806d6dd04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" DROP CONSTRAINT "FK_a1ca90fd5ea17ecafccc6ff633b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" DROP CONSTRAINT "FK_3c694e8834a57d13f8ffa558f26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" DROP CONSTRAINT "FK_19e2e32450dfdc3e79f584711ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" ADD "state" character(2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" ALTER COLUMN "post_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ALTER COLUMN "post_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ALTER COLUMN "tourist_spot_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" ALTER COLUMN "tourist_spot_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ALTER COLUMN "tourist_spot_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" ALTER COLUMN "interest_point_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" ALTER COLUMN "public_project_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" DROP COLUMN "ending_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" ADD "ending_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" DROP COLUMN "starting_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_public_project" ADD "starting_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "event_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "description" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "end_time" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ALTER COLUMN "start_time" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_user" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_user" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "event_type_business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "end_time" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ALTER COLUMN "start_time" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" DROP COLUMN "date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_business" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_type_business" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" DROP COLUMN "value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" DROP CONSTRAINT "UQ_2b010a1734c1fcda19d50164b68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ALTER COLUMN "business_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "business_type_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "profile_photo" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ADD "password" character varying(665) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" DROP CONSTRAINT "UQ_732d751229f9d858729757ce35b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" DROP COLUMN "photo_product_url"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ADD "url" character varying(3000) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "tb_user_tokens"`);
    await queryRunner.query(`DROP TABLE "tb_comment"`);
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft_items" ADD CONSTRAINT "TheftId" FOREIGN KEY ("theft_id") REFERENCES "tb_theft"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD CONSTRAINT "TheftLocationId" FOREIGN KEY ("theft_location_id") REFERENCES "tb_theft_location"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_theft" ADD CONSTRAINT "UserId" FOREIGN KEY ("user_id", "user_id") REFERENCES "tb_user"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_photo_post" ADD CONSTRAINT "postId" FOREIGN KEY ("post_id", "post_id") REFERENCES "tb_post"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ADD CONSTRAINT "postId" FOREIGN KEY ("post_id", "post_id") REFERENCES "tb_post"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_like" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_post" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD CONSTRAINT "touristSpotId" FOREIGN KEY ("tourist_spot_id", "tourist_spot_id") REFERENCES "tb_tourist_spot"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_rating" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_photo" ADD CONSTRAINT "TouristSpotId" FOREIGN KEY ("tourist_spot_id") REFERENCES "tb_tourist_spot"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ADD CONSTRAINT "touristSpotId" FOREIGN KEY ("tourist_spot_id", "tourist_spot_id") REFERENCES "tb_tourist_spot"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_tourist_spot_comment" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_interest_point" ADD CONSTRAINT "InterestPointTypeId" FOREIGN KEY ("interest_point_type_id") REFERENCES "tb_interest_point_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_photo" ADD CONSTRAINT "ProjectId" FOREIGN KEY ("public_project_id") REFERENCES "tb_public_project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" ADD CONSTRAINT "projectId" FOREIGN KEY ("public_project_id") REFERENCES "tb_public_project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_project_comment" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD CONSTRAINT "EventTypeId" FOREIGN KEY ("event_type_id") REFERENCES "tb_event_type_user"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_user" ADD CONSTRAINT "UserId" FOREIGN KEY ("user_id", "user_id") REFERENCES "tb_user"("id","id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD CONSTRAINT "EventTypeBusinessId" FOREIGN KEY ("event_type_business_id") REFERENCES "tb_event_type_business"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_event_business" ADD CONSTRAINT "BusinessId" FOREIGN KEY ("business_id", "business_id", "business_id", "business_id") REFERENCES "tb_business"("id","id","id","id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_rating" ADD CONSTRAINT "businessId" FOREIGN KEY ("business_id", "business_id") REFERENCES "tb_business"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_product" ADD CONSTRAINT "BusinessId" FOREIGN KEY ("business_id", "business_id", "business_id", "business_id") REFERENCES "tb_business"("id","id","id","id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_location" ADD CONSTRAINT "BusinessId" FOREIGN KEY ("business_id", "business_id", "business_id", "business_id") REFERENCES "tb_business"("id","id","id","id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_contact" ADD CONSTRAINT "BusinessId" FOREIGN KEY ("business_id", "business_id", "business_id", "business_id") REFERENCES "tb_business"("id","id","id","id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ADD CONSTRAINT "userId" FOREIGN KEY ("user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id", "user_id") REFERENCES "tb_user"("id","id","id","id","id","id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business_comment" ADD CONSTRAINT "businessId" FOREIGN KEY ("business_id", "business_id") REFERENCES "tb_business"("id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tb_business" ADD CONSTRAINT "BusinessTypeId" FOREIGN KEY ("business_type_id") REFERENCES "tb_business_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
