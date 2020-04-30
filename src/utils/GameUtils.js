/**
 * 
 * @param {Creep} creep 
 * @param {ResourceConstant} resourceType 
 */
function findAvailableResource(creep, resourceType=RESOURCE_ENERGY) {

}
/**
 * 
 * @param {Creep} creep 
 * @param {Object} pos 
 * @param {Object} opts
 */
function moveToDest(creep, target, opts={}) {
    creep.moveTo(target, opts);
    creep.memory.dest = {x:target.pos.x, y:target.pos.y};
}

/**
 * 
 * @param {RoomPosition} pos 
 */
function creepsMovingTo(pos) {
    var count = 0;
    for (var cname in Game.creeps) {
        var creep = Game.creeps[cname];
        var cdest = new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name);
        if (dist(pos, cdest) < 2) {
            count += 1;
        }
    }
    return count;
}

/**
 * 
 * @param {RoomPosition} pos1 
 * @param {RoomPosition} pos2 
 */
function dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
}


module.exports = {
    moveToDest,
    creepsMovingTo,
}