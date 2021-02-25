-- Select, insert, update, delete

-- Ranks
INSERT INTO ranks (rankName, pay, minYears)
VALUES (#rankName, #pay, #minYears);

SELECT * FROM ranks;

-- Ships
INSERT INTO ships (shipName, registry, class, currentLocation)
VALUES (#shipName, #registry, #class, #currentLocation);

SELECT * FROM ships;

-- Missions
INSERT INTO missions (directive, status, location)
VALUES (#directive, #status, #location);

SELECT * FROM missions;

-- Personnel
INSERT INTO personnel (firstName, lastName)
VALUES (#firstName, #lastName);

UPDATE personnel
SET firstName = #firstName, lastName = #lastName, rankID = (SELECT rankID FROM ranks WHERE rankName = #rankName), 
    shipID = (SELECT shipID FROM ships WHERE shipName = # shipName);

DELETE FROM personnel WHERE firstName = #firstName and lastName = #lastName;

SELECT * FROM personnel WHERE firstName = #firstName and lastName = #lastName;

SELECT * FROM personnel;

-- Duties
INSERT INTO duties (dutyName, priority, responsibilities)
VALUES (#dutyName, #priority, #responsibilities);

SELECT * FROM duties;

-- PersonnelDuties
INSERT INTO personnel_duties (personnelID, dutyID)
VALUES ((SELECT personnelID FROM personnel WHERE firstName = #firstName and lastName = #lastName),
    (SELECT dutyID FROM duties WHERE dutyName = #dutyName));

DELETE FROM personnel_duties WHERE firstName = #firstName and lastName = #lastName and dutyName = #dutyName;

SELECT * FROM personnel_duties;
