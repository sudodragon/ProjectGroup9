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
