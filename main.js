var SpawnHelper = require('structs_Spawn.js');
var Harvester = require('creeps_Harvester.js');
var Builder = require('creeps_Builder.js');
var Upgrader = require('creeps_Upgrader.js');


var loop = function () {
    for ( var sname in Game.spawns) {
        var spawn = Game.spawns[sname];
        SpawnHelper.spawnCreep(spawn, 'harvester');
    }

    for (var cname in Game.creeps) {
        var creep = Game.creeps[cname];

    }
}

module.exports.loop = loop;