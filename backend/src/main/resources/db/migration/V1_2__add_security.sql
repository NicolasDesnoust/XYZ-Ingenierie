---------------------------------------------------------------------------------------------------------------
-- Tables
---------------------------------------------------------------------------------------------------------------

CREATE TABLE "PUBLIC"."PRIVILEGES"(
    "ID" BIGINT NOT NULL,
    "CODE" VARCHAR(128) NOT NULL,
    "NAME" VARCHAR(255) NOT NULL
);
ALTER TABLE "PUBLIC"."PRIVILEGES" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4" PRIMARY KEY("ID");
ALTER TABLE "PUBLIC"."PRIVILEGES" ADD CONSTRAINT "PUBLIC"."PRIVILEGES_CODE_UNIQUE" UNIQUE("CODE");         

CREATE TABLE "PUBLIC"."ROLES"(
    "ID" BIGINT NOT NULL,
    "CODE" VARCHAR(128) NOT NULL,
    "NAME" VARCHAR(255) NOT NULL
);         
ALTER TABLE "PUBLIC"."ROLES" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2" PRIMARY KEY("ID");         
ALTER TABLE "PUBLIC"."ROLES" ADD CONSTRAINT "PUBLIC"."ROLES_CODE_UNIQUE" UNIQUE("CODE");         

CREATE TABLE "PUBLIC"."ROLE_PRIVILEGES"(
    "ROLE_ID" BIGINT NOT NULL,
    "PRIVILEGE_ID" BIGINT NOT NULL
);  
ALTER TABLE "PUBLIC"."ROLE_PRIVILEGES" ADD CONSTRAINT "PUBLIC"."FK9BH6H5CM4BQ0U3Q9PCOTKYDQ8" FOREIGN KEY("PRIVILEGE_ID") REFERENCES "PUBLIC"."PRIVILEGES"("ID") NOCHECK;       
ALTER TABLE "PUBLIC"."ROLE_PRIVILEGES" ADD CONSTRAINT "PUBLIC"."FKGELPP2J5E63AXP7BCGUWAQEC5" FOREIGN KEY("ROLE_ID") REFERENCES "PUBLIC"."ROLES"("ID") NOCHECK; 

CREATE TABLE "PUBLIC"."USERS"(
    "ID" BIGINT NOT NULL,
    "EMAIL" VARCHAR(255) NOT NULL,
    "FIRSTNAME" VARCHAR(255),
    "LASTNAME" VARCHAR(255),
    "PASSWORD" VARCHAR(255)
);
ALTER TABLE "PUBLIC"."USERS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_4D" PRIMARY KEY("ID");       
ALTER TABLE "PUBLIC"."USERS" ADD CONSTRAINT "PUBLIC"."UK_6DOTKOTT2KJSP8VW4D0M25FB7" UNIQUE("EMAIL");          

CREATE TABLE "PUBLIC"."USER_ROLES"(
    "USER_ID" BIGINT NOT NULL,
    "ROLE_ID" BIGINT NOT NULL
); 
ALTER TABLE "PUBLIC"."USER_ROLES" ADD CONSTRAINT "PUBLIC"."FKRHFOVTCIQ1L558CW6UDG0H0D3" FOREIGN KEY("ROLE_ID") REFERENCES "PUBLIC"."ROLES"("ID") NOCHECK;      
ALTER TABLE "PUBLIC"."USER_ROLES" ADD CONSTRAINT "PUBLIC"."FKHFH9DX7W3UBF1CO1VDEV94G3F" FOREIGN KEY("USER_ID") REFERENCES "PUBLIC"."USERS"("ID") NOCHECK;     

---------------------------------------------------------------------------------------------------------------
-- Données
---------------------------------------------------------------------------------------------------------------

INSERT INTO "PUBLIC"."PRIVILEGES"("ID", "CODE", "NAME") VALUES
	(nextval('HIBERNATE_SEQUENCE'), 'READ_USERS', 'Voir les utilisateurs'),
	(nextval('HIBERNATE_SEQUENCE'), 'CREATE_USERS', 'Créer/Modifier les utilisateurs'),
	(nextval('HIBERNATE_SEQUENCE'), 'DELETE_USERS', 'Supprimer les utilisateurs'),
	(nextval('HIBERNATE_SEQUENCE'), 'READ_REFERENCES', 'Voir les références'),
	(nextval('HIBERNATE_SEQUENCE'), 'CREATE_REFERENCES', 'Créer/Modifier les références'),
	(nextval('HIBERNATE_SEQUENCE'), 'DELETE_REFERENCES', 'Supprimer les références');

INSERT INTO "PUBLIC"."ROLES"("ID", "CODE", "NAME") VALUES
	(nextval('HIBERNATE_SEQUENCE'), 'ADMIN', 'Administrateur'),
	(nextval('HIBERNATE_SEQUENCE'), 'MANAGER', 'Manageur'),
	(nextval('HIBERNATE_SEQUENCE'), 'EMPLOYEE', 'Employé');

INSERT INTO "PUBLIC"."ROLE_PRIVILEGES"("ROLE_ID", "PRIVILEGE_ID") VALUES
    (
		(select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'READ_USERS')
    ),
    (
        (select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'CREATE_USERS')
    ),
    (
        (select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'DELETE_USERS')
    ),
        (
		(select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'READ_REFERENCES')
    ),
    (
        (select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'CREATE_REFERENCES')
    ),
    (
        (select "ID" from "ROLES" where "CODE" = 'ADMIN'),
        (select "ID" from "PRIVILEGES" where "CODE" = 'DELETE_REFERENCES')
    );