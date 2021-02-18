CREATE TABLE ranks (
    rankID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    rankName VARCHAR(255) NOT NULL,
    pay INT NOT NULL,
    minYears INT
);

CREATE TABLE missions (
    missionID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    directive VARCHAR(255),
    status INT NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE ships (
    shipID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    shipName VARCHAR(255) NOT NULL,
    registry VARCHAR(255) NOT NULL,
    class VARCHAR(255) NOT NULL,
    currentLocation VARCHAR(255),
    missionID INT,
    FOREIGN KEY (missionID) REFERENCES missions (missionID)
);

CREATE TABLE `personnel` (
    `personnelID` int(11) NOT NULL AUTO_INCREMENT,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `rankID` int(11),
    `shipID` int(11),
    PRIMARY KEY (`personnelID`),
    FOREIGN KEY (`rankID`) REFERENCES `ranks` (`rankID`),
    FOREIGN KEY (`shipID`) REFERENCES `ships` (`shipID`)
);

CREATE TABLE `duties` (
    `dutyID` int(11) NOT NULL AUTO_INCREMENT,
    `dutyName` varchar(255) NOT NULL
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

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Cadet", 30000, 3);

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Chief", 50000, 6);

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Ensign", 35000, 4);

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Lieutenant", 80000, 7);

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Commander", 100000, 7);

INSERT INTO ranks (rankName, pay, minYears) 
VALUES ("Captain", 110000, 10);

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES ("USS Enterprise", "NCC-1701", "Constitution-class", "Space");

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES ("USS Endeavour", "NCC-1895", "Constitution-class", "Space");

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES ("USS Entente", "NCC-2120", "Dreadnought", "Space");

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES ("USS Merced", "NCC-87075", "California-class", "Space");

INSERT INTO ships (shipName, registry, class, currentLocation) 
VALUES ("SS Manila", "NGA-20124", "Transport", "Repair Dock");

INSERT INTO missions (directive, status, location)
VALUES ("Find Klingon ambassador", 1, "Klingon");

INSERT INTO missions (directive, status, location)
VALUES ("Find Spock", 3, "Vulcan");

INSERT INTO missions (directive, status, location)
VALUES ("Guard shpiing lanes", 1, "Starbase 83");

INSERT INTO missions (directive, status, location)
VALUES ("Investigate subspace anomaly", 2, "Crab Nebula");

INSERT INTO missions (directive, status, location)
VALUES ("Transport Ambassador Pike", 3, "Feringenar");

-- Sample data
INSERT INTO personnel (firstName, lastName)
VALUES 
    ('James', 'Kirk'),
    ('Spock', 'Unknown'),
    ('Jean-Luc', 'Picard');

-- Sample data
INSERT INTO duties (dutyName, priority, responsibilities)
VALUES 
    ('Ship Command', '1', 'Oversee ship. Command crew.'),
    ('Hyperspace Maintenance', '2', 'Maintain hyperspace reactor.'),
    ('Kitchen', '3', 'Prepare crew meals. Maintain clean kitchen');

-- Sample data
INSERT INTO personnel_duties (personnelID, dutyID)
VALUES 
    ((SELECT personnelID FROM personnel where personnelID = 1),
    (SELECT dutyID FROM duties where dutyID = 1)),
    ((SELECT personnelID FROM personnel where personnelID = 2),
    (SELECT dutyID FROM duties where dutyID = 2)),
    ((SELECT personnelID FROM personnel where personnelID = 3),
    (SELECT dutyID FROM duties where dutyID = 3));