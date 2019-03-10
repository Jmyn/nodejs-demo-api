CREATE SCHEMA `demo` ;

  CREATE TABLE `demo`.`person_role` (
  `idperson_role` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idperson_role`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);

CREATE TABLE `demo`.`person` (
  `idperson` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`idperson`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `person_person_role_fk_idx` (`role` ASC) VISIBLE,
  CONSTRAINT `person_person_role_fk`
    FOREIGN KEY (`role`)
    REFERENCES `demo`.`person_role` (`idperson_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  CREATE TABLE `demo`.`student` (
  `idstudent` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `enrol_date` DATETIME NULL,
  PRIMARY KEY (`idstudent`),
  INDEX `student_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `student_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    CREATE TABLE `demo`.`teacher` (
  `idteacher` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `hire_date` DATETIME NULL,
  PRIMARY KEY (`idteacher`),
  INDEX `teacher_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `teacher_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    CREATE TABLE `demo`.`registry` (
  `idregistry` INT NOT NULL AUTO_INCREMENT,
  `register_person_from` INT NOT NULL,
  `register_person_to` INT NOT NULL,
  PRIMARY KEY (`idregistry`),
  INDEX `registry_person_to_fk_idx` (`register_person_to` ASC) VISIBLE,
  INDEX `registry_person_from_fk_idx` (`register_person_from` ASC) VISIBLE,
  CONSTRAINT `registry_person_from_fk`
    FOREIGN KEY (`register_person_from`)
    REFERENCES `demo`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `registry_person_to_fk`
    FOREIGN KEY (`register_person_to`)
    REFERENCES `demo`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `demo`.`suspension` (
  `idsuspension` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `suspend_startdate` DATE NOT NULL,
  `suspend_enddate` DATE NULL,
  PRIMARY KEY (`idsuspension`),
  INDEX `suspension_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `suspension_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `demo`.`registry` 
DROP FOREIGN KEY `registry_person_from_fk`,
DROP FOREIGN KEY `registry_person_to_fk`;
ALTER TABLE `demo`.`registry` 
ADD CONSTRAINT `registry_person_from_fk`
  FOREIGN KEY (`register_person_from`)
  REFERENCES `demo`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `registry_person_to_fk`
  FOREIGN KEY (`register_person_to`)
  REFERENCES `demo`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
ALTER TABLE `demo`.`suspension` 
DROP FOREIGN KEY `suspension_person_fk`;
ALTER TABLE `demo`.`suspension` 
ADD CONSTRAINT `suspension_person_fk`
  FOREIGN KEY (`personid`)
  REFERENCES `demo`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

CREATE SCHEMA `demo_test` ;

  CREATE TABLE `demo_test`.`person_role` (
  `idperson_role` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idperson_role`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);

CREATE TABLE `demo_test`.`person` (
  `idperson` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`idperson`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `person_person_role_fk_idx` (`role` ASC) VISIBLE,
  CONSTRAINT `person_person_role_fk`
    FOREIGN KEY (`role`)
    REFERENCES `demo_test`.`person_role` (`idperson_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  
  CREATE TABLE `demo_test`.`student` (
  `idstudent` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `enrol_date` DATETIME NULL,
  PRIMARY KEY (`idstudent`),
  INDEX `student_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `student_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo_test`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    CREATE TABLE `demo_test`.`teacher` (
  `idteacher` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `hire_date` DATETIME NULL,
  PRIMARY KEY (`idteacher`),
  INDEX `teacher_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `teacher_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo_test`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
    CREATE TABLE `demo_test`.`registry` (
  `idregistry` INT NOT NULL AUTO_INCREMENT,
  `register_person_from` INT NOT NULL,
  `register_person_to` INT NOT NULL,
  PRIMARY KEY (`idregistry`),
  INDEX `registry_person_to_fk_idx` (`register_person_to` ASC) VISIBLE,
  INDEX `registry_person_from_fk_idx` (`register_person_from` ASC) VISIBLE,
  CONSTRAINT `registry_person_from_fk`
    FOREIGN KEY (`register_person_from`)
    REFERENCES `demo_test`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `registry_person_to_fk`
    FOREIGN KEY (`register_person_to`)
    REFERENCES `demo_test`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `demo_test`.`suspension` (
  `idsuspension` INT NOT NULL AUTO_INCREMENT,
  `personid` INT NOT NULL,
  `suspend_startdate` DATE NOT NULL,
  `suspend_enddate` DATE NULL,
  PRIMARY KEY (`idsuspension`),
  INDEX `suspension_person_fk_idx` (`personid` ASC) VISIBLE,
  CONSTRAINT `suspension_person_fk`
    FOREIGN KEY (`personid`)
    REFERENCES `demo_test`.`person` (`idperson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `demo_test`.`registry` 
DROP FOREIGN KEY `registry_person_from_fk`,
DROP FOREIGN KEY `registry_person_to_fk`;
ALTER TABLE `demo_test`.`registry` 
ADD CONSTRAINT `registry_person_from_fk`
  FOREIGN KEY (`register_person_from`)
  REFERENCES `demo_test`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `registry_person_to_fk`
  FOREIGN KEY (`register_person_to`)
  REFERENCES `demo_test`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
ALTER TABLE `demo_test`.`suspension` 
DROP FOREIGN KEY `suspension_person_fk`;
ALTER TABLE `demo_test`.`suspension` 
ADD CONSTRAINT `suspension_person_fk`
  FOREIGN KEY (`personid`)
  REFERENCES `demo_test`.`person` (`idperson`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
  
#add role
INSERT INTO `demo`.`person_role` (`role_name`) VALUES ('teacher');
INSERT INTO `demo`.`person_role` (`role_name`) VALUES ('student');
#add role end

#add role
INSERT INTO `demo_test`.`person_role` (`role_name`) VALUES ('teacher');
INSERT INTO `demo_test`.`person_role` (`role_name`) VALUES ('student');
#add role end