
let Builder = require('./creeps/Builder')
let HarvestRunner = require('./creeps/Harvester')
let Upgrader = require('./creeps/Upgrader')
let Constants = require('./utils/Constants')



function main() {

    // Iterate over sources in each room to save them
    for (let rname in Game.rooms) {
        let room = Game.rooms[rname];
        let sources = room.find(FIND_SOURCES);
        // Memory.rooms.$RNAME.sources : { sourceId : harvesterCount }
        for (let source of sources) {
            if (!room.memory.sources[source.id]) {
                room.memory.sources[source.id] = 0;
            }
        }   
    }
    
    // Iterate over spawns 
    for ( let sname in Game.spawns) {
        let spawn = Game.spawns[sname];
        let room = spawn.room;
        // Memory.rooms.$RNAME.spawns : [sname0, sname1, ... ]
        // (room.memory.spawns) ? room.memory.spawns.push(sname) : room.memory.spawns = [sname];
        
        

    
    }


}

module.exports.loop = main;