-- Ships INSERT
INSERT INTO ships (shipName, registry, class, currentLocation, missionID)
VALUES (#shipName, #registry, #class, #currentLocation, #missionId);

-- Ships SELECT for display, with mission.directive in place of FK
SELECT shipId, shipName, registry, class, currentLocation, directive 
FROM ships 
LEFT JOIN missions ON ships.missionID = missions.missionID;

-- Missions SELECT for use in Ships page
SELECT missionId, directive FROM missions

-- Ranks SELECT
SELECT rankId, rankName, pay, minYears FROM ranks;

-- Ranks INSERT
INSERT INTO ranks (rankName, pay, minYears) VALUES (#rankName, #pay, #minYears);

-- Personnel_duties SELECT for display, with personnel.firstName, personnel.lastName and duties.dutyName also displayed
SELECT personnel_duties.personnelID, firstName, lastName, personnel_duties.dutyID, dutyName 
FROM personnel_duties 
INNER JOIN personnel ON personnel_duties.personnelID = personnel.personnelID 
INNER JOIN duties ON personnel_duties.dutyID = duties.dutyID;

-- Personnel SELECT for PersonToDuty intersection table page
SELECT personnelId, firstName, lastName FROM personnel;

-- Duties SELECT for PersonToDuty intersection table page
SELECT dutyId, dutyName FROM duties;

-- Personnel_duties DELETE
DELETE FROM personnel_duties WHERE personnelID = #personnelID and dutyID = #dutyID;

-- Personnel_duties INSERT
INSERT INTO personnel_duties (personnelID, dutyID) VALUES (#personnelId, #dutId);



-- Personnel SELECT for display, with rankName and shipName displayed in place of FKs
SELECT personnelId, firstName, lastName, rankName, shipName FROM personnel 
LEFT JOIN ships ON personnel.shipID = ships.shipID 
LEFT JOIN ranks on personnel.rankID = ranks.rankID;

-- Personnel SELECT for searching for specific personnel by ID
SELECT personnelId, firstName, lastName, rankName, shipName FROM personnel 
LEFT JOIN ships ON personnel.shipID = ships.shipID LEFT JOIN ranks on personnel.rankID = ranks.rankID 
WHERE personnelId = (#personnelId);

-- Personnel DELETE
DELETE FROM personnel WHERE personnelId = (#personnelId);

-- Personnel SELECT for populating Update Personnel
SELECT personnelID, firstName, lastName, rankName, shipName 
FROM personnel LEFT JOIN ranks ON personnel.rankID = ranks.rankID 
LEFT JOIN ships ON personnel.shipID = ships.shipID 
WHERE personnel.personnelID = #personnelId;

-- Rank SELECT for displaying, deleting or searching Personnel
SELECT rankId, rankName FROM ranks;

-- Ship SELECT for displaying, deleting or searching Personnel
SELECT shipId, shipName FROM ships;

-- Personnel UPDATE
UPDATE personnel 
SET firstName = #fnameUpdate 
    lastName = #lnameUpdate 
    rankID = #rankUpdate 
    shipID = #shipIdUpdate 
    WHERE personnelID = #updatePersonnelID;

-- Personnel INSERT
INSERT INTO personnel (firstName, lastName, rankID, shipID)
VALUES (#firstName, #lastName, #rankId, #shipId);

-- Duties INSERT
INSERT INTO duties (dutyName, priority, responsibilities)
VALUES (#dutyName, #priority, #responsibilities);

-- Duties SELECT
SELECT dutyId, dutyName, priority, responsibilities FROM duties;

-- Missions INSERT and SELECT
INSERT INTO missions (directive, status, location)
VALUES (#directive, #status, #location);

-- Missions SELECT
SELECT missionID, directive, status, location FROM missions;