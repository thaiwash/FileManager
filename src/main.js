var fs = require("fs")



console.log('main.js updated')
var AVROS = require("avros")
var instance = new AVROS()
instance.Serve(9889)
instance.AppInformation("File Manager", "icon.png")


class CyberneticExplorer extends AVROS {
  constructor(instance) {
    super()
    var self = this
    this.I = instance
    this.I.on("player enter", function(player) {
      self.SpawnHardDrives(player)
    })
  }
}

Object.assign(CyberneticExplorer.prototype, require("./HardDrive"))

var ce = new CyberneticExplorer(instance)

/*
var cubeId = instance.generateId()

var frontPlaneId = instance.generateId()
var backPlaneId = instance.generateId()

// Example cube
var cube = {
  "id": "434343",
  "type": "cube",
  "scale": {
    "x": "0.1",
    "y": "0.14",
    "z": "0.02"
  },
  "children": [{
    "id": frontPlaneId,
    "type": "plane",
    "position": {
      "x": "0.0",
      "y": "0.0",
      "z": "-0.51"
    },
    "scale": {
      "x": "0.1",
      "y": "0.1",
      "z": "0.1"
    },
    "rotation": {
      "x": "90",
      "y": "180",
      "z": "0"
    }
  }, {
    "id": backPlaneId,
    "type": "plane",
    "position": {
      "x": "0.0",
      "y": "0.0",
      "z": "0.51"
    },
    "scale": {
      "x": "0.1",
      "y": "0.1",
      "z": "0.1"
    },
    "rotation": {
      "x": "90",
      "y": "180",
      "z": "0"
    }
  }]
}

const {
  createCanvas,
  loadImage
} = require('canvas')

function createHardDrive(planeId, pngImage, driveData) {

  //var canvas = createCanvas(200, 200)
  //var ctx = canvas.getContext('2d')


  loadImage('img/' + pngImage).then(function(img) {
    var canvas = createCanvas(img.width, img.height)
    var ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0, img.width, img.height)


    if (!isVoid(driveData)) {
      console.log(driveData)



      //for(var i = 0; )
      ctx.beginPath()
      ctx.moveTo(135, 360)
      ctx.lineTo(280, 360)
      ctx.stroke()

      ctx.fillStyle = "#000000"
      ctx.font = '12px Courier New'
      ctx.fillText(driveData.device, 135, 350)

      var inc = 40

      ctx.beginPath()
      ctx.moveTo(135, 350 + inc)
      ctx.lineTo(280, 350 + inc)
      ctx.stroke()

      ctx.fillStyle = "#000000"
      ctx.font = '12px Courier New'
      ctx.fillText(driveData.description, 135, 340 + inc)

      var inc = 80

      ctx.beginPath()
      ctx.moveTo(135, 350 + inc)
      ctx.lineTo(280, 350 + inc)
      ctx.stroke()

      ctx.fillStyle = "#000000"
      ctx.font = '12px Courier New'
      ctx.fillText(formatSizeUnits(driveData.size), 135, 340 + inc)
      var inc = 120

      ctx.beginPath()
      ctx.moveTo(135, 350 + inc)
      ctx.lineTo(280, 350 + inc)
      ctx.stroke()

      ctx.fillStyle = "#000000"
      ctx.font = '12px Courier New'
      ctx.fillText(driveData.mountpoints[0].path, 135, 340 + inc)
    }
    instance.SetTexture(planeId, canvas)
  })
}

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}


instance.on("player enter", function(player) {
  console.log("Player " + player + " entered")
  instance.SpawnAsInterest(player, cube)

  instance.AddTag(cube.id, "Grabable")
  instance.AddTag(cube.id, "Scalable")

    fetchDrives(function(drives) {
      var hds = []
      for (var i = 0; i < drives.length; i ++) {
        for (var i2 = 0; i2 < drives[i].mountpoints.length; i2 ++) {
          hds.push({
            "device": drives[i].device,
            "description": drives[i].description,
            "size": drives[i].size,
            "path": drives[i].mountpoints[i2].path,
            "path": drives[i].mountpoints[i2]
          })
        }
      }
      createHardDrive(frontPlaneId, "hdFront.png", drives[0])
      createHardDrive(backPlaneId, "hdBack.png")
    })

})
*/
