var fs = require("fs")

console.log('main.js updated')
var AVROS = require("avros")
var instance = new AVROS()
instance.Serve(9889)
instance.AppInformation("File Manager", "icon.png")

// File cube = 11011
/*
var hardDrive = {
  "type": "cube",
  "scale": {
    "x": "0.01",
    "y": "0.01",
    "z": "0.01"
  },
  "children": [{
    "type": "plane",
    "id": 11011,
    "scale": {
      "x": "0.01",
      "y": "0.01",
      "z": "0.01"
    }
  }]
}*/

var cube = {
  "type": "cube",
  "id": 11012,
  "scale": {
    "x": "0.01",
    "y": "0.01",
    "z": "0.01"
  }
}


var plane = {
  "type": "plane",
  "id": 11011,
  "parent": 11012,
  "scale": {
    "x": "0.01",
    "y": "0.01",
    "z": "0.01"
  }
}

instance.on("player enter", function(player) {
  console.log("Player "+player+" entered")


    var t1 = new Transform(instance.players[player].head.position, instance.players[player].head.rotation);

    t1.translate(new Vector3(0,0,0.5))
    t1.rotate(90, 0, 0)

    plane.position = t1.localPosition
    plane.rotation = t1.localRotation

    //firstPlane.rotation.mulVector3(new Vector3(90,90,90));

    //var quat = Quaternion.Euler(0, 0, 0);
    //quat.mul(instance.players[player].head.rotation);
    //firstPlane.rotation = quat
    //firstPlane.rotation.mul(new Quaternion.Euler(90, 90, 90))

    var cube = instance.Construct(cube)
    instance.DescribeObject(cube, player)
    var plane = instance.Construct(plane)
    instance.DescribeObject(plane, player)
})
