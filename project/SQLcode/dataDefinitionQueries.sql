CREATE TABLE `ranks` (
    `rankID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `rankName` VARCHAR(50) NOT NULL,
    `pay` INT NOT NULL,
    `minYears` INT
);

CREATE TABLE `missions` (
    `missionID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `directive` VARCHAR(255),
    `status` INT NOT NULL,
    `location` VARCHAR(255) NOT NULL
);

CREATE TABLE `ships` (
    `shipID` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `shipName` VARCHAR(50) NOT NULL,
    `registry` VARCHAR(50) NOT NULL,
    `class` VARCHAR(50) NOT NULL,
    `currentLocation` VARCHAR(255),
    `missionID` INT,
    FOREIGN KEY (`missionID`) REFERENCES `missions` (`missionID`)
);

CREATE TABLE `personnel` (
    `personnelID` int(11) NOT NULL AUTO_INCREMENT,
    `firstName` varchar(50) NOT NULL,
    `lastName` varchar(50) NOT NULL,
    `rankID` int(11),
    `shipID` int(11),
    PRIMARY KEY (`personnelID`),
    FOREIGN KEY (`rankID`) REFERENCES `ranks` (`rankID`),
    FOREIGN KEY (`shipID`) REFERENCES `ships` (`shipID`)
);

CREATE TABLE `duties` (
    `dutyID` int(11) NOT NULL AUTO_INCREMENT,
    `dutyName` varchar(50) NOT NULL,
    `priority` tinyint(1) NOT NULL,
    `responsibilities` varchar(255) NOT NULL,
    PRIMARY KEY (`dutyID`)
);

CREATE TABLE `personnel_duties` (
    `personnelID` int(11) NOT NULL,
    `dutyID` int(11) NOT NULL,
    PRIMARY KEY (`personnelID`, `dutyID`),
    FOREIGN KEY (`personnelID`) REFERENCES `personnel` (`personnelID`),
    FOREIGN KEY (`dutyID`) REFERENCES `duties` (`dutyID`)
);

-- Sample data
INSERT INTO ranks (rankName, pay, minYears) 
VALUES 
    ("Cadet", 30000, 3), 
    ("Chief", 50000, 6), 
    ("Ensign", 35000, 4),
    ("Lieutenant", 80000, 7), 
    ("Commander", 100000, 7),
    ("Captain", 110000, 10);

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES 
    ("USS Enterprise", "NCC-1701", "Constitution-class", "Space"),
    ("USS Endeavour", "NCC-1895", "Constitution-class", "Space"),
    ("USS Entente", "NCC-2120", "Dreadnought", "Space"),
    ("USS Merced", "NCC-87075", "California-class", "Space"),
    ("SS Manila", "NGA-20124", "Transport", "Repair Dock");

INSERT INTO missions (directive, status, location)
VALUES 
    ("Find Klingon ambassador", 1, "Klingon"),
    ("Find Spock", 3, "Vulcan"),
    ("Guard shpiing lanes", 1, "Starbase 83"),
    ("Investigate subspace anomaly", 2, "Crab Nebula"),
    ("Transport Ambassador Pike", 3, "Feringenar");

INSERT INTO personnel (firstName, lastName)
VALUES 
    ('James', 'Kirk'),
    ('Spock', 'Unknown'),
    ('Jean-Luc', 'Picard');

INSERT INTO duties (dutyName, priority, responsibilities)
VALUES 
    ('Ship Command', '1', 'Oversee ship. Command crew.'),
    ('Hyperspace Maintenance', '2', 'Maintain hyperspace reactor.'),
    ('Kitchen', '3', 'Prepare crew meals. Maintain clean kitchen');

INSERT INTO personnel_duties (personnelID, dutyID)
VALUES 
    ((SELECT personnelID FROM personnel where personnelID = 1),
    (SELECT dutyID FROM duties where dutyID = 1)),
    ((SELECT personnelID FROM personnel where personnelID = 2),
    (SELECT dutyID FROM duties where dutyID = 2)),
    ((SELECT personnelID FROM personnel where personnelID = 3),
    (SELECT dutyID FROM duties where dutyID = 3));