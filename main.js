'use strict';

function run (creep) {
    if (creep.store.getFreeCapacity() > 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
    else {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}

var _ = require('lodash');

var loop = function () {
    for ( var sname in Game.spawns) {
        var spawn = Game.spawns[sname];
        var creepBody = [MOVE, MOVE, WORK, CARRY];
        var creepID = Memory.creepID ? Memory.creepID : 0;
        Memory.creepID = creepID+1;
        var response = spawn.spawnCreep(creepBody, String(creepID));
        if (response === 0 ) { console.log('Creep Spawned'); }
    }

    for (var cname in Game.creeps) {
        var creep = Game.creeps[cname];
        run(creep);

    }

};

module.exports.loop = loop;
