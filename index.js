// Move the mouse across the screen as a sine wave.
var robot = require("robotjs");
var screenSize = robot.getScreenSize();

var impSize = {x:Math.round(screenSize.width/10)-1, y:Math.round(screenSize.height/10)-1};
// // Speed up the mouse.
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;
// robot.keyTap("")
// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }

// let robot = require("robotjs");
// let Jimp = require('jimp');

// const img = robot.screen.capture(0, 0, width, height).image;
// new Jimp({data: img, width, height}, (err, image) => {
//        image.write('file.jpg');
// });
const child_process=require("child_process");
const { createWriteStream } = require("fs");
console.log(impSize);
function takeSnap(x, y)
{
    return new Promise((resolve, rejects)=>{
        let gest = child_process.spawn('ffmpeg', ['-video_size', `${impSize.x}x${impSize.y}`, '-f', 'x11grab', '-i', `${process.env.DISPLAY}+${x},${y}`,'-vframes','1', '-f', 'mjpeg', '-']);
        gest.stdout.pipe(createWriteStream(`scr/images-${x}-${y}.jpg`));
        gest.stdout.on('end',()=>resolve())
        gest.stderr.setEncoding('utf-8');
        gest.stderr.on('error',data=>{
            rejects(data);
        });
    });
}

async function startpage(){
    for(let y = 0; y < screenSize.height-impSize.y; y+= impSize.y)
        for (let x = 0; x < screenSize.width-impSize.x; x+=impSize.x) {
            await takeSnap(x, y);
        }
}

startpage()
.catch(err=>console.log(errr))

// const { rejects } = require("assert");
// let gest = child_process.spawn('ffmpeg', ['-video_size', '100x100', '-f', 'x11grab', '-i', `${process.env.DISPLAY}+${100},${100}`,'-vframes','1', '-f', 'mjpeg', '-']);
// gest.stdout.pipe(createWriteStream('images.jpg'));
// gest.stderr.setEncoding('utf-8');
// gest.stderr.on('data',data=>{
//     console.log(data);
// });