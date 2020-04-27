
var Spawn = {

    spawnCreep (spawn, creepType) {
        var creepBody;
        var creepID = Memory.creepID ? Memory.creepID : 0;
        Memory.creepID = creepID;
        switch (creepType) {
            case 'harvester' || 'builder' || 'upgrader':
                creepBody = [MOVE, WORK, CARRY];
                break;
            default:
                return;
        }
        return spawn.spawnCreep(creepBody, creepID, {memory:creepType});
    }
}



module.exports = Spawn;