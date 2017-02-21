-- ----------------------------
--  Table structure for words
-- ----------------------------
DROP TABLE IF EXISTS "public"."words";
CREATE TABLE "public"."words" (
	"id" int4 NOT NULL DEFAULT nextval('words_id_seq'::regclass),
	"word" varchar(35) NOT NULL COLLATE "default",
	"rank" int4 DEFAULT 0,
	"used" int4 DEFAULT 0
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."words" OWNER TO "ig";

-- ----------------------------
--  Primary key structure for table words
-- ----------------------------
ALTER TABLE "public"."words" ADD PRIMARY KEY ("id") NOT DEFERRABLE INITIALLY IMMEDIATE;

