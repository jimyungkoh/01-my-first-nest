-- AlterTable
CREATE SEQUENCE cartitem_id_seq;
ALTER TABLE "CartItem" ALTER COLUMN "id" SET DEFAULT nextval('cartitem_id_seq');
ALTER SEQUENCE cartitem_id_seq OWNED BY "CartItem"."id";
