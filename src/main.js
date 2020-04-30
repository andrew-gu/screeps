// import * as Builder from './creeps/Builder';
// import * as Harvester from './creeps/Harvester';
// import * as Upgrader from './creeps/Upgrader';
var Builder = require('./creeps/Builder')
var HarvestRunner = require('./creeps/Harvester')
var Upgrader = require('./creeps/Upgrader')
/**
 * 
 * @param {StructureSpawn} spawn 
 * @param {Object} creepBody 
 */
function spawnCreepBody(spawn, creepBody = [MOVE, MOVE, WORK, CARRY]) {
    var creepID = Memory.creepID ? Memory.creepID : 0;
    if (spawn.spawnCreep(creepBody,"c" + String(creepID),{dryRun:true}) === 0) {
        Memory.creepID = creepID + 1;
        
    }
    return spawn.spawnCreep(creepBody, "c" + String(creepID));
}

function loop() {

    for ( var sname in Game.spawns) {
        var spawn = Game.spawns[sname];
        spawnCreepBody(spawn);
    }

    var harvestRunner = new HarvestRunner();
    for (var cname in Game.creeps) {
        var creep = Game.creeps[cname];
        
        harvestRunner.run(creep);
        

    }

}

module.exports.loop = loop;