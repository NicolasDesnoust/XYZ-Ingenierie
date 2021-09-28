---------------------------------------------------------------------------------------------------------------
-- Données
---------------------------------------------------------------------------------------------------------------

INSERT INTO "PUBLIC"."DOMAINS"("ID", "CODE", "NAME") VALUES
	(nextval('HIBERNATE_SEQUENCE'), 'building', 'Bâtiment'),
	(nextval('HIBERNATE_SEQUENCE'), 'water', 'Eau'),
	(nextval('HIBERNATE_SEQUENCE'), 'transport', 'Transport'),
	(nextval('HIBERNATE_SEQUENCE'), 'energy', 'Énergie'),
	(nextval('HIBERNATE_SEQUENCE'), 'urban-planning', 'Aménagement urbain'),
	(nextval('HIBERNATE_SEQUENCE'), 'environment', 'Environnement'),
	(nextval('HIBERNATE_SEQUENCE'), 'industry', 'Industrie');
	
INSERT INTO "PUBLIC"."REFERENCES"("ID", "BENEFIT_AMOUNT", "BENEFIT_DETAILS", "CITY", 
"CLIENT_NAME", "DEPARTMENT", "END_YEAR", "IMAGE_URL", "NAME", "START_YEAR") VALUES
	(nextval('HIBERNATE_SEQUENCE'), '60000', '', 'Marseille', 'ATOS', 
	'Bouches-du-Rhône (13)', '2021', 'https://www.atos-gcv.com', 
	'Gestion de Curriculum Vitae', '2020');

INSERT INTO "PUBLIC"."REFERENCE_DOMAINS"("REFERENCE_ID", "DOMAIN_ID") VALUES
(
	(select "ID" from "REFERENCES" where "NAME" = 'Gestion de Curriculum Vitae'),
	(select "ID" from "DOMAINS" where "CODE" = 'industry')
),
(
	(select "ID" from "REFERENCES" where "NAME" = 'Gestion de Curriculum Vitae'),
	(select "ID" from "DOMAINS" where "CODE" = 'transport')
);
