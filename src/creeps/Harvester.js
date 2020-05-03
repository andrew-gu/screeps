// import * as utils from '../utils/GameUtils';
let utils = require('../utils/GameUtils')

class HarvestRunner {
    constructor () {
        this.body = [MOVE, WORK, WORK, CARRY];
        this.role = "harvester";
        console.log('HarvestRunner instantiated');
    }
    /**
     * 
     * @param {Creep} creep 
     * @param {StructureSpawn} spawn 
     */
    spawnHarvester (spawn) {
        let room = spawn.room;

        let harvesterCount = Memory.harvesterCount ? Memory.harvesterCount : 0;
        let response = spawn.spawnCreep(this.body, room.name + this.role + harvesterCount, 
            { 
                memory: {
                    role: 'harvester', 
                }
            });
        // increment global harvesterCount
        if (response === 0 ) { harvesterCount === 0 ? Memory.harvesterCount = 1 : Memory.harvesterCount += 1; }

    }
    run (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            var target_source = null;
            for (var i = 0; i < sources.length; i++) {
                var source = sources[i];
                console.log(source.pos.x, source.pos.y);
                if (utils.creepsMovingTo(source.pos) < 3) {
                    target_source = source;
                    break;
                }
            }
            if (target_source == null) { return; }
            if (creep.harvest(target_source) == ERR_NOT_IN_RANGE) {
                utils.moveToDest(creep, target_source, { visualizePathStyle: { stroke: '#ffaa00' } });

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
                    utils.moveToDest(creep, targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}
module.exports = HarvestRunner;