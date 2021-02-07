
const {
  createCanvas,
  loadImage
} = require('canvas')


async function fetchDrives(cb) {
  const drivelist = require('drivelist');

  const drives = await drivelist.list();
  cb(drives)
};


async function CreateTexture(instance, id, desc) {
  console.log("hello!")
   await WithPromise(instance, id, desc)
 }

function WithPromise(instance, id, desc){
      return new Promise(function (resolve) {

         var pngImage = "hdBack.png"
         if (!isVoid(desc)) {
             pngImage = "hdFront.png"
         }

        loadImage('img/' + pngImage).then(function(img) {
          var canvas = createCanvas(img.width, img.height)
          var ctx = canvas.getContext('2d')

         ctx.drawImage(img, 0, 0, img.width, img.height)


         if (!isVoid(desc)) {

            //for(var i = 0; )
            ctx.beginPath()
            ctx.moveTo(135, 360)
            ctx.lineTo(280, 360)
            ctx.stroke()

            ctx.fillStyle = "#000000"
            ctx.font = '12px Courier New'
            ctx.fillText(desc.device, 135, 350)

            var inc = 40

            ctx.beginPath()
            ctx.moveTo(135, 350 + inc)
            ctx.lineTo(280, 350 + inc)
            ctx.stroke()

            ctx.fillStyle = "#000000"
            ctx.font = '12px Courier New'
            ctx.fillText(desc.description, 135, 340 + inc)

            var inc = 80

            ctx.beginPath()
            ctx.moveTo(135, 350 + inc)
            ctx.lineTo(280, 350 + inc)
            ctx.stroke()

            ctx.fillStyle = "#000000"
            ctx.font = '12px Courier New'
            ctx.fillText(FormatSizeUnits(desc.size), 135, 340 + inc)
            var inc = 120

            ctx.beginPath()
            ctx.moveTo(135, 350 + inc)
            ctx.lineTo(280, 350 + inc)
            ctx.stroke()

            ctx.fillStyle = "#000000"
            ctx.font = '12px Courier New'
            console.log(desc)
            ctx.fillText(desc.path, 135, 340 + inc)
          }
          instance.SetTexture(id, canvas)
          resolve()
        })
      })
  }

module.exports = {
  /**
   * Application name and icon for avros menu
   * @param {Number} AppName - Application name
   * @param {Number} AppIcon - Application icon
   */

  "SpawnHardDrives": function(human) {
    //this.I.SpawnAsInterest(human, this.CreateHardDrive())
    var self = this
    fetchDrives(function(drives) {
      //console.log(self.I.players["Anonymous"].head.position.x)
      // rearrange drive info
      var HardDriveDescription = []
      for (var i = 0; i < drives.length; i++) {
        for (var i2 = 0; i2 < drives[i].mountpoints.length; i2++) {
          HardDriveDescription.push({
            "device": drives[i].device,
            "description": drives[i].description,
            "size": drives[i].size,
            "path": drives[i].mountpoints[i2].path
          })
        }
      }

      var HardDriveObject = []
      console.log(HardDriveDescription)
      for (var i = 0; i < HardDriveDescription.length; i++) {
        var cube = self.CreateHardDrive(HardDriveDescription[i])
        cube.position = {
          x: (0.15 * i) - ((HardDriveDescription.length * 0.15) / 2),
          y: 0,
          z: 0
        }
        HardDriveObject.push(cube)
      }
      var HardDrives = {
        id: "356",
        type: "empty",
        children: HardDriveObject
      }
      self.I.SpawnAsInterest(human, HardDrives)

                        self.I.io.sockets.emit("add tag", {
                          "object_id": HardDrives.id + "",
                          "tag": "Scalable"
                        })

      self.SpawnTextures(HardDriveObject, HardDriveDescription)
    })

  },

  "SpawnTextures": function(DriveObject, HardDriveDescription) {

    var frontPlane = false
    var cnt = 0
    for (var i = 0; i < DriveObject.length; i ++) {


                        this.I.io.sockets.emit("add tag", {
                          "object_id": DriveObject[i].id + "",
                          "tag": "Grabable"
                        })
                  this.I.io.sockets.emit("add tag", {
                    "object_id": DriveObject[i].id + "",
                    "tag": "GrabMyParent"
                  })

      for (var i2 = 0; i2 < 2; i2 ++) {
        if (!frontPlane) {
          CreateTexture(this.I, DriveObject[i].children[i2].id, HardDriveDescription[cnt])
          cnt ++
        } else {
          CreateTexture(this.I, DriveObject[i].children[i2].id)
        }
        frontPlane = !frontPlane
      }
    }


    /*
const {
  createCanvas,
  loadImage
} = require('canvas')


var canvas = createCanvas(200, 200)
var ctx = canvas.getContext('2d')
*/
  },

  "GenerateId": function() {
    var min = 1;
    var max = 100000;
    return (Math.floor(Math.random() * (+max - +min)) + +min);
  },

  "CreateHardDrive": function() {
    var cubeId = this.GenerateId()
    var frontPlaneId = this.GenerateId()
    var backPlaneId = this.GenerateId()

    // Example cube
    return {
      "id": cubeId + '',
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
  }


}





function FormatSizeUnits(bytes) {
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
