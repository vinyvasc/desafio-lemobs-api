-- Adminer 4.7.7 PostgreSQL dump

\connect "nestjs";

CREATE SEQUENCE aluno_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."aluno" (
    "id" integer DEFAULT nextval('aluno_id_seq') NOT NULL,
    "criado_em" timestamp DEFAULT now() NOT NULL,
    "atualizado_em" timestamp DEFAULT now() NOT NULL,
    "nome" character varying(200) NOT NULL,
    "data_nascimento" date NOT NULL,
    "cpf" character(11) NOT NULL,
    "nota" double precision NOT NULL,
    CONSTRAINT "PK_9611d4cf7a77574063439cf46b2" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_7d72b36d16642eb758366a072c1" UNIQUE ("cpf")
) WITH (oids = false);


CREATE SEQUENCE endereco_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."endereco" (
    "id" integer DEFAULT nextval('endereco_id_seq') NOT NULL,
    "rua" character varying NOT NULL,
    "numero" character varying NOT NULL,
    "complemento" character varying,
    "bairro" character varying,
    "criado_em" timestamp DEFAULT now() NOT NULL,
    "atualizado_em" timestamp DEFAULT now() NOT NULL,
    "alunoId" integer,
    CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id"),
    CONSTRAINT "FK_84cf60714a972517769d69a22b5" FOREIGN KEY ("alunoId") REFERENCES aluno(id) NOT DEFERRABLE
) WITH (oids = false);


-- 2020-10-09 02:26:34.031183+00
