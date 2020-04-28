'use strict';

function spawnCreepType(spawn, creepType) {
    var creepBody;
    var creepID = Memory.creepID ? Memory.creepID : 0;
    Memory.creepID = creepID;
    switch (creepType) {
        case 'harvester'  :
            creepBody = [MOVE, WORK, CARRY];
            break;
        default:
            return;
    }
    return spawn.spawnCreep(creepBody, creepID, { memory: creepType });
}

var loop = function () {
    console.log(Game.time);
    for ( var sname in Game.spawns) {
        var spawn = Game.spawns[sname];
        spawnCreepType(spawn, 'harvester');
    }

    for (var cname in Game.creeps) {
        var creep = Game.creeps[cname];

    }
};

module.exports.loop = loop;
