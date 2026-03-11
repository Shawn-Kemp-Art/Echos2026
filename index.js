
document.body.innerHTML = '<style>div{color: grey;text-align:center;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;width:500px;height:100px;}</style><body><div id="loading"><p>This could take a while, please give it at least 5 minutes to render.</p><br><h1 class="spin">⏳</h1><br><h3>Press <strong>?</strong> for shortcut keys</h3><br><p><small>Output contains an embedded blueprint for creating an IRL wall sculpture</small></p></div></body>';
paper.install(window);
window.onload = function() {

document.body.innerHTML = '<style>body {margin: 0px;text-align: center;}</style><canvas resize="true" style="display:block;width:100%;" id="myCanvas"></canvas>';

setquery("fxhash",$fx.hash);
var initialTime = new Date().getTime();

//file name 
var fileName = $fx.hash;

var canvas = document.getElementById("myCanvas");

paper.setup('myCanvas');
paper.activate();

//console.log(tokenData.hash)
console.log('#'+$fx.iteration)

canvas.style.background = "white";

//Set a seed value for Perlin
//var seed = Math.floor($fx.rand()*10000000000000000);
var seed = parseInt($fx.hash.slice(2, 10), 16);

//initialize perlin noise 
var noise = new perlinNoise3d();
noise.noiseSeed(seed);

//read in query strings
var qcolor1 = "AllColors";
if(new URLSearchParams(window.location.search).get('c1')){qcolor1 = new URLSearchParams(window.location.search).get('c1')}; //colors1
var qcolor2 = "None";
if(new URLSearchParams(window.location.search).get('c2')){qcolor2 = new URLSearchParams(window.location.search).get('c2')}; //colors2
var qcolor3 = "None";
if(new URLSearchParams(window.location.search).get('c3')){qcolor3 = new URLSearchParams(window.location.search).get('c3')}; //colors3
var qcolors = R.random_int(1,6);
if(new URLSearchParams(window.location.search).get('c')){qcolors = new URLSearchParams(window.location.search).get('c')}; //number of colors
var qsize = "2";
if(new URLSearchParams(window.location.search).get('s')){qsize = new URLSearchParams(window.location.search).get('s')}; //size
var qcomplexity = R.random_int(1,10);
if(new URLSearchParams(window.location.search).get('d')){qcomplexity = new URLSearchParams(window.location.search).get('d')}; //size
var qcomplexity = qcomplexity*4;
var qlayers = 12;
if(new URLSearchParams(window.location.search).get('l')){qlayers = new URLSearchParams(window.location.search).get('l')}; //layers

var qorientation = R.random_int(1,2) < 2 ? "portrait" : "landscape";
var qwavyness = R.random_int(10,250);
var qswirly = R.random_int(5,50);
var qdripfrequency = R.random_int(0,100)/100;
var qdripstart = R.random_int(1,9);
var qdripRadius = R.random_int(1,10);
var qoriginx = R.random_int(0,1000);
var qoriginy = R.random_int(0,1000);
var qmatwidth = R.random_int(50,100);
var qframecolor = R.random_int(0,3) < 1 ? "Random" : R.random_int(1,3) < 2 ? "White" : "Mocha";


//FXparams

definitions = [
    {
        id: "layers",
        name: "Layers",
        type: "number",
        default: qlayers,
        options: {
            min: 6,
            max: 100,
            step: 1,
        },  
    },
    {
        id: "orientation",
        name: "Orientation",
        type: "select",
        default: qorientation,
        options: {options: ["portrait", "landscape"]},
    },
    {
        id: "aspectratio",
        name: "Aspect ratio",
        type: "select",
        default: "4:5",
        options: {options: ["1:1", "2:5","3:5","4:5","54:86","296:420"]},
    },
    {
        id: "size",
        name: "Size",
        type: "select",
        default: qsize,
        options: {options: ["1", "2", "3"]},
    },
    {
        id: "colors",
        name: "Max # of colors",
        type: "number",
        default: qcolors,
        options: {
            min: 1,
            max: 12,
            step: 1,
        },  
    },
    {
        id: "colors1",
        name: "Pallete 1",
        type: "select",
        default: qcolor1,
        options: {options: palleteNames},
    },
    {
        id: "colors2",
        name: "Pallete 2",
        type: "select",
        default: qcolor2,
        options: {options: palleteNames},
    },
    {
        id: "colors3",
        name: "Pallete 3",
        type: "select",
        default: qcolor3,
        options: {options: palleteNames},
    },
    {
        id: "framecolor",
        name: "Frame color",
        type: "select",
        default: qframecolor,
        options: {options: ["Random","White","Mocha"]},
    },
    {
        id: "spokes",
        name: "Rays",
        type: "number",
        default: qcomplexity,
        options: {
            min: 6,
            max: 40,
            step: 1,
        },  
    },
    {
        id: "wavyness",
        name: "Wavyness",
        type: "number",
        default: qwavyness,
        options: {
            min: 10,
            max: 250,
            step: 1,
        },  
    },
    {
        id: "swirly",
        name: "Swirlyness",
        type: "number",
        default: qswirly,
        options: {
            min: 5,
            max: 50,
            step: 1,
        },  
    },
    {
        id: "dripfrequency",
        name: "Chance of drips",
        type: "number",
        default: qdripfrequency,
        options: {
            min: 0,
            max: 1,
            step: .01,
        },  
    },
    {
        id: "dripstart",
        name: "Drip begin",
        type: "number",
        default: qdripstart,
        options: {
            min: 1,
            max: 9,
            step: 1,
        },  
    },
    {
        id: "dripRadius",
        name: "Drip end",
        type: "number",
        default: qdripRadius,
        options: {
            min: 1,
            max: 10,
            step: 1,
        },  
    },
    {
        id: "originx",
        name: "Origin X",
        type: "number",
        default: qoriginx,
        options: {
            min: 0,
            max: 1000,
            step: 1,
        },  
    },
    {
        id: "originy",
        name: "Origin Y",
        type: "number",
        default: qoriginy,
        options: {
            min: 0,
            max: 1000,
            step: 1,
        },  
    },
    {
        id: "matwidth",
        name: "Mat size",
        type: "number",
        default: qmatwidth,
        options: {
            min: 50,
            max: 200,
            step: 10,
        },  
    },
 
   
    ]


$fx.params(definitions)
var scale = $fx.getParam('size');
var stacks = $fx.getParam('layers');
var numofcolors = $fx.getParam('colors');


//Set the properties for the artwork where 100 = 1 inch
var wide = 800; 
var high = 1000; 

if ($fx.getParam('aspectratio')== "1:1"){wide = 800; high = 800};
if ($fx.getParam('aspectratio')== "2:5"){wide = 400; high = 1000};
if ($fx.getParam('aspectratio')== "3:5"){wide = 600; high = 1000};
if ($fx.getParam('aspectratio')== "4:5"){wide = 800; high = 1000};
if ($fx.getParam('aspectratio')== "54:86"){wide = 540; high = 860};
if ($fx.getParam('aspectratio')== "296:420"){wide =705; high = 1000};


var ratio = 1/scale;//use 1/4 for 32x40 - 1/3 for 24x30 - 1/2 for 16x20 - 1/1 for 8x10
var minOffset = ~~(7*ratio); //this is aproximatly .125"
var framewidth = ~~($fx.getParam('matwidth')*ratio*scale); 
var framradius = 0;


// Set a canvas size for when layers are exploded where 100=1in
var panelWide = 1600; 
var panelHigh = 2000; 
 
paper.view.viewSize.width = 2400;
paper.view.viewSize.height = 2400;


var colors = []; var palette = []; 

//set a allete based theme and number of colors
//for (c=0; c<numofcolors; c=c+1){palette[c] = this[$fx.getParam('pallete')][R.random_int(0, this[$fx.getParam('pallete')].length-1)]}  
//console.log(palette);

// set a pallete based on color schemes
var newPalette = [];
newPalette = this[$fx.getParam('colors1')].concat(this[$fx.getParam('colors2')],this[$fx.getParam('colors3')]);
for (c=0; c<numofcolors; c=c+1){palette[c] = newPalette[R.random_int(0, newPalette.length-1)]}  
console.log(newPalette);

//randomly assign colors to layers
for (c=0; c<stacks; c=c+1){colors[c] = palette[R.random_int(0, palette.length-1)];};

//or alternate colors
p=0;for (var c=0; c<stacks; c=c+1){colors[c] = palette[p];p=p+1;if(p==palette.length){p=0};}

console.log(colors);

if ($fx.getParam('framecolor')=="White"){colors[stacks-1]={"Hex":"#FFFFFF", "Name":"Smooth White"}};
if ($fx.getParam('framecolor')=="Mocha"){colors[stacks-1]={"Hex":"#4C4638", "Name":"Mocha"}};


var woodframe = new Path();var framegap = new Path();
var fColor = frameColors[R.random_int(0, frameColors.length-1)];
fColor = {"Hex":"#60513D","Name":"Walnut"};
var frameColor = fColor.Hex;

//adjust the canvas dimensions
w=wide;h=high;
var orientation="Portrait";
 
if ($fx.getParam('orientation')=="landscape"){wide = h;high = w;orientation="Landscape";};
if ($fx.getParam('orientation')=="portrait"){wide = w;high = h;orientation="Portrait";};

//setup the project variables
var distribution = R.random_int(600, ~~(Math.sqrt(high*high+wide*wide)));
var origin = new Point($fx.getParam('originx'), $fx.getParam('originy'));
var spokes = $fx.getParam('spokes');
var wavyness = $fx.getParam('wavyness');
var swirly = $fx.getParam('swirly');
var dripRadius = $fx.getParam('dripRadius');
var dripfrequency = 1-$fx.getParam('dripfrequency');
var dripstart = $fx.getParam('dripstart');

console.log(orientation+': '+~~(wide/100/ratio)+' x '+~~(high/100/ratio))  
console.log(stacks+" layers");
console.log(numofcolors+" colors");
console.log("Frame Color: "+fColor.Name);
console.log("Origin: "+origin);
console.log("Spokes: "+spokes);
console.log("Wavyness: "+wavyness);
console.log("Swirlyness: "+swirly);
console.log("Distribution: "+distribution);
console.log("Drip Radius: "+dripRadius);
console.log("Drip frequency: "+dripfrequency);
console.log("Drip start: "+dripstart);

//Set the line color
linecolor={"Hex":"#4C4638", "Name":"Mocha"};


//************* Draw the layers ************* 


sheet = []; //This will hold each layer
var px=0;var py=0;var pz=0;var prange=.1; 
var center = new Point(wide/2,high/2)
var longestDim = wide;if (wide<high){longestDim=high;}


//---- Draw the Layers

// Declared here so the keyboard listener and sendAllExports can access them
var features = {};
var renderTime;

(async () => {

paper.view.autoUpdate = false;

for (z = 0; z < stacks; z++) {
    pz=z*prange;
    drawFrame(z); // Draw the initial frame

         //-----Draw each layer
        if(z<stacks-1){
            if (z==stacks-2){oset = minOffset}else{oset = ~~(minOffset*(stacks-z-1))}
            rays(z);
        }

    frameIt(z);// finish the layer with a final frame cleanup

    cutMarks(z);
    hanger(z);// add cut marks and hanger holes
    if (z == stacks-1) {signature(z);}// sign the top layer
    sheet[z].scale(2.2);
    sheet[z].position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);

    var group = new Group(sheet[z]);

    console.log(z)//Show layer completed in console

    // Paint this layer immediately so the user sees progress
    paper.view.update();
    await new Promise(resolve => setTimeout(resolve, 0));

}//end z loop

//--------- Finish up the preview -----------------------

    // Build the features and trigger an fxhash preview
    features.Size =  ~~(wide/100/ratio)+" x "+~~(high/100/ratio)+" inches";
    features.Width = ~~(wide/100/ratio);
    features.Height = ~~(high/100/ratio);
    features.Depth = stacks*0.0625;
    features.Layers = stacks;
    for (l=stacks;l>0;l--){
    var key = "layer: "+(stacks-l+1)
    features[key] = colors[l-1].Name
    }
    console.log(features);
    $fx.features(features);


    outsideframe = new Path.Rectangle(new Point(0,0),new Size(wide, high), framradius)
    sheet[stacks] = outsideframe;
    sheet[stacks].style = {fillColor: "#ffffff", strokeColor: linecolor.Hex, strokeWidth: 1*ratio,shadowColor: new Color(0,0,0,[0.3]),shadowBlur: 20,shadowOffset: new Point((stacks-z)*2.3, (stacks-z)*2.3)};
    sheet[stacks].scale(2.2);
    sheet[stacks].position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
    sheet[stacks].sendToBack();

    paper.view.autoUpdate = true;
    paper.view.update();

    //floatingframe();
    //upspirestudio(features); //#render and send features to upspire.studio

    //$fx.preview();

//Begin send to studio.shawnkemp.art **************************************************************
     studioAPI.setApiBase('https://studio-shawnkemp-art.vercel.app');
     if(new URLSearchParams(window.location.search).get('skart')){sendAllExports()};
//End send to studio.shawnkemp.art **************************************************************

      var finalTime = new Date().getTime();
    renderTime = (finalTime - initialTime)/1000
    console.log ('Render took : ' +  renderTime.toFixed(2) + ' seconds' );

})();

// Declared outside the async IIFE so the keyboard listener (line ~800) can call them
async function sendAllExports() {

        paper.view.update();
        // Send canvas as PNG
        await studioAPI.sendCanvas(myCanvas, $fx.hash, $fx.hash+".png");

        // Send SVG
        await studioAPI.sendSVG(project.exportSVG({asString: true}), $fx.hash, $fx.hash+".svg");

        // send colors
        var content = JSON.stringify(features,null,2);

        // Send text/JSON
        await studioAPI.sendText(JSON.stringify(colors), $fx.hash, "Colors-"+$fx.hash+".json");

        // 2. Add frame
        floatingframe();
        paper.view.update();
        // 3. Framed PNGs (Black, White, Walnut, Maple)
        var frameOptions = [
            { name: "Black", hex: "#1f1f1f" },
            { name: "White", hex: "#f9f9f9" },
            { name: "Walnut", hex: "#60513D" },
            { name: "Maple", hex: "#ebd9c0" }
        ];
        for (var i = 0; i < frameOptions.length; i++) {
            woodframe.style = { fillColor: frameOptions[i].hex };
            var fileName = "Framed" + frameOptions[i].name + "-" + $fx.hash;
            paper.view.update();

            await studioAPI.sendCanvas(myCanvas,  $fx.hash, fileName+".png");
        }
        // 4. Remove frame
        floatingframe();
        // 5. Blueprint SVG
        for (var z = 0; z < stacks; z++) {
            sheet[z].style = {
                fillColor: null,
                strokeWidth: 0.1,
                strokeColor: lightburn[stacks - z - 1].Hex,
                shadowColor: null,
                shadowBlur: null,
                shadowOffset: null
            };
            sheet[z].selected = true;
        }
        paper.view.update();

        // Send SVG
        await studioAPI.sendSVG(project.exportSVG({asString: true}), $fx.hash, "Blueprint-" + $fx.hash+".svg");
        // 6. Plotting SVG
        for (var z = 0; z < stacks; z++) {
            sheet[z].style = {
                fillColor: null,
                strokeWidth: 0.1,
                strokeColor: plottingColors[stacks - z - 1].Hex,
                shadowColor: null,
                shadowBlur: null,
                shadowOffset: null
            };
            sheet[z].selected = true;
        }
        for (var z = 0; z < stacks; z++) {
            if (z < stacks - 1) {
                for (var zs = z + 1; zs < stacks; zs++) {
                    var savedStyle = sheet[z].style;
                    var newSheet = clipSubtract(sheet[z], sheet[zs]);
                    newSheet.style = savedStyle;
                    sheet[z].remove();
                    sheet[z] = newSheet;
                }
            }
        }
        paper.view.update();
        // Send SVG
        await studioAPI.sendSVG(project.exportSVG({asString: true}), $fx.hash, "Plotting-" + $fx.hash+".svg");

        // Send features
        await studioAPI.sendFeatures($fx.hash, features);

        console.log("All exports sent!");
        studioAPI.signalComplete();
    }

        async function refreshit() {
        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
        canvas.toBlob(function(blob) {saveAs(blob, tokenData.hash+' - '+renderTime.toFixed(0)+'secs.png');});
        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
        window.open('./index.html?testing=true', '_blank');
        }

//vvvvvvvvvvvvvvv CLIPPER BOOLEAN ENGINE vvvvvvvvvvvvvvv
// Replaces Paper.js boolean ops (unite/subtract/intersect) with Clipper.js
// for dramatically faster performance. Paths are flattened to polygons,
// processed by Clipper, then reconstructed as Paper.js CompoundPaths.

var CLIP_SCALE = 100;   // Sub-pixel integer precision for Clipper
var CLIP_FLATTEN = 0.1;  // Bezier-to-polygon tolerance (lower = smoother, more pts)

function _toClipperPaths(paperItem) {
    var clone = paperItem.clone({ insert: false });
    clone.flatten(CLIP_FLATTEN);
    var children = (clone.className === 'CompoundPath') ? clone.children : [clone];
    var result = [];
    for (var i = 0; i < children.length; i++) {
        var segs = children[i].segments;
        if (segs.length < 3) continue;
        var pts = new Array(segs.length);
        for (var j = 0; j < segs.length; j++) {
            pts[j] = { X: Math.round(segs[j].point.x * CLIP_SCALE),
                       Y: Math.round(segs[j].point.y * CLIP_SCALE) };
        }
        result.push(pts);
    }
    clone.remove();
    return result;
}

function _fromClipperPaths(clipperPaths) {
    if (!clipperPaths || clipperPaths.length === 0) return new Path();
    var compound = new CompoundPath({});
    for (var i = 0; i < clipperPaths.length; i++) {
        var pts = clipperPaths[i];
        if (pts.length < 3) continue;
        var paperPts = new Array(pts.length);
        for (var j = 0; j < pts.length; j++) {
            paperPts[j] = new Point(pts[j].X / CLIP_SCALE, pts[j].Y / CLIP_SCALE);
        }
        compound.addChild(new Path({ segments: paperPts, closed: true, insert: false }));
    }
    compound.reorient(false, true);
    return compound;
}

function _clipBool(a, b, clipType) {
    var savedStyle = a.style;
    var clipper = new ClipperLib.Clipper();
    clipper.AddPaths(_toClipperPaths(a), ClipperLib.PolyType.ptSubject, true);
    clipper.AddPaths(_toClipperPaths(b), ClipperLib.PolyType.ptClip, true);
    var solution = new ClipperLib.Paths();
    clipper.Execute(clipType, solution,
        ClipperLib.PolyFillType.pftNonZero,
        ClipperLib.PolyFillType.pftNonZero);
    var result = _fromClipperPaths(solution);
    result.style = savedStyle;
    return result;
}

function clipUnite(a, b)     { return _clipBool(a, b, ClipperLib.ClipType.ctUnion); }
function clipSubtract(a, b)  { return _clipBool(a, b, ClipperLib.ClipType.ctDifference); }
function clipIntersect(a, b) { return _clipBool(a, b, ClipperLib.ClipType.ctIntersection); }
//^^^^^^^^^^^^^ END CLIPPER BOOLEAN ENGINE ^^^^^^^^^^^^^


//vvvvvvvvvvvvvvv PROJECT FUNCTIONS vvvvvvvvvvvvvvv
 
function rays(z){
            p = [];
            // Cache per-layer constants outside the spoke loop
            var wavyFactor = ~~(wavyness*((z+1)/swirly));
            var diagonal   = ~~(Math.sqrt(high*high+wide*wide));
            var angleStep  = ~~(365/spokes);

            for (l=0; l<spokes; l++){
                p[0] =  new Point(0,0);
                p[1] = new Point(~~(distribution*.2),  wavyFactor);
                p[2] = new Point(~~(distribution*.3), -wavyFactor);
                p[3] = new Point(~~(distribution*.4),  wavyFactor);
                p[4] = new Point(~~(distribution*.5), -wavyFactor);
                p[5] = new Point(~~(distribution*.6),  wavyFactor);
                p[6] = new Point(~~(distribution*.7), -wavyFactor);
                p[7] = new Point(~~(distribution*1.1), wavyFactor);
                p[8] = new Point(diagonal,    -wavyFactor);
                p[9] = new Point(diagonal+10, -wavyFactor);

                lines = new Path();
                lines.add(p[0]);
                lines.add(p[1]);
                lines.add(p[2]);
                lines.add(p[3]);
                lines.add(p[4]);
                lines.add(p[5]);
                lines.add(p[6]);
                lines.add(p[7]);
                lines.add(p[8]);
                lines.add(p[9]);
                lines.smooth();

                // offsetStroke produces clean bezier curves — flatten(4)/smooth removed
                // to keep vertex count low for faster downstream boolean ops
                mesh = PaperOffset.offsetStroke(lines, minOffset,{ cap: 'butt' });
                lines.remove();

                for (n=dripstart;n<dripRadius;n++){
                    if (noise.get(l,n,z)>dripfrequency){
                        var circlePath = new Path.Circle(p[n-1], noise.get(l,n)*(minOffset*2)*(z+1));
                        var meshMinusCircle = clipSubtract(mesh, circlePath);
                        mesh.remove();
                        mesh = meshMinusCircle;
                        // circlePath still in layer — needed for PaperOffset below
                        ring = PaperOffset.offsetStroke(circlePath, minOffset, { cap: 'round' });
                        var meshPlusRing = clipUnite(mesh, ring);
                        mesh.remove();
                        ring.remove();
                        circlePath.remove();
                        mesh = meshPlusRing;
                    }
                }

                mesh.rotate(angleStep*l, p[0]);
                mesh.position.x += origin.x;
                mesh.position.y += origin.y;
                join(z,mesh);
                mesh.remove();
            }
}




//^^^^^^^^^^^^^ END PROJECT FUNCTIONS ^^^^^^^^^^^^^ 




//--------- Helper functions ----------------------- 
function floatingframe(){
    var frameWide=~~(34*ratio);var frameReveal = ~~(12*ratio);
  if (framegap.isEmpty()){
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(~~(wide+frameReveal*2), ~~(high+frameReveal*2)), framradius)
        var insideframe = new Path.Rectangle(new Point(frameReveal, frameReveal),new Size(wide, high))
        framegap = clipSubtract(outsideframe, insideframe);
        outsideframe.remove();insideframe.remove();
        framegap.scale(2.2);
        framegap.position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
        framegap.style = {fillColor: '#1A1A1A', strokeColor: "#1A1A1A", strokeWidth: 1*ratio};
    } else {framegap.removeChildren()} 
    
    if (woodframe.isEmpty()){
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide+frameWide*2+frameReveal*2, high+frameWide*2+frameReveal*2), framradius)
        var insideframe = new Path.Rectangle(new Point(frameWide, frameWide),new Size(wide+frameReveal*2, high+frameReveal*2))
        woodframe = clipSubtract(outsideframe, insideframe);
        outsideframe.remove();insideframe.remove();
        woodframe.scale(2.2);
        woodframe.position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
        var framegroup = new Group(woodframe);
        woodframe.style = {fillColor: frameColor, strokeColor: "#1A1A1A", strokeWidth: 2*ratio,shadowColor: new Color(0,0,0,[0.5]),shadowBlur: 20,shadowOffset: new Point(10*2.2, 10*2.2)};
    } else {woodframe.removeChildren()} 
    //fileName = "Framed-"+$fx.hash;
}


function rangeInt(range,x,y,z){
    var v = ~~(range-(noise.get(x,y,z)*range*2));
    return (v);
}

// Add shape s to sheet z
function join(z,s){
    var savedStyle = sheet[z].style;
    var result = clipUnite(s, sheet[z]);
    result.style = savedStyle;
    s.remove();
    sheet[z].remove();
    sheet[z] = result;
}

// Subtract shape s from sheet z
function cut(z,s){
    var savedStyle = sheet[z].style;
    var result = clipSubtract(sheet[z], s);
    result.style = savedStyle;
    sheet[z].remove();
    s.remove();
    sheet[z] = result;
}

function drawFrame(z){
    var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
    var insideframe = new Path.Rectangle(new Point(framewidth, framewidth),new Size(wide-framewidth*2, high-framewidth*2))
    sheet[z] = clipSubtract(outsideframe, insideframe);
    outsideframe.remove();insideframe.remove();
}


function solid(z){ 
    outsideframe = new Path.Rectangle(new Point(0,0),new Size(wide, high), framradius)
    //outsideframe = new Path.Circle(new Point(wide/2),wide/2)
    sheet[z] = outsideframe;
    outsideframe.remove();

}



function frameIt(z){
        //Trim to size
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
        //var outsideframe = new Path.Circle(new Point(wide/2, wide/2),wide/2);
        var clipped = clipIntersect(outsideframe, sheet[z]);
        outsideframe.remove();
        sheet[z].remove();
        sheet[z] = clipped;

        //Make sure there is still a solid frame
        var outsideframe2 = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
        var insideframe = new Path.Rectangle(new Point(framewidth, framewidth),new Size(wide-framewidth*2, high-framewidth*2))
        var frame = clipSubtract(outsideframe2, insideframe);
        outsideframe2.remove();insideframe.remove();
        var united = clipUnite(sheet[z], frame);
        sheet[z].remove();
        frame.remove();
        sheet[z] = united;

        sheet[z].style = {fillColor: colors[z].Hex, strokeColor: linecolor.Hex, strokeWidth: 1*ratio,shadowColor: new Color(0,0,0,[0.3]),shadowBlur: 20,shadowOffset: new Point((stacks-z)*2.3, (stacks-z)*2.3)};
}

function cutMarks(z){
    if (z<stacks-1 && z!=0) {
          for (etch=0;etch<stacks-z;etch++){
                var layerEtch = new Path.Circle(new Point(50+etch*10,25),2)
                cut(z,layerEtch)
            } 
        }
}

function signature(z){
    shawn = new CompoundPath(sig);
    shawn.strokeColor = 'green';
    shawn.fillColor = 'green';
    shawn.strokeWidth = 1;
    shawn.scale(ratio*.9)
    shawn.position = new Point(wide-framewidth-~~(shawn.bounds.width/2), high-framewidth+~~(shawn.bounds.height));
    cut(z,shawn)
}

function hanger (z){
    if (z < stacks-2 && scale>0){
        var r = 30*ratio;
        rt = 19*ratio;
        if (z<3){r = 19*ratio}
        layerEtch = new Path.Rectangle(new Point(framewidth/2, framewidth),new Size(r*2, r*3), r)
        layerEtch.position = new Point(framewidth/2,framewidth);   
        cut(z,layerEtch)

        layerEtch = new Path.Rectangle(new Point(wide-framewidth/2, framewidth),new Size(r*2, r*3), r)
        layerEtch.position = new Point(wide-framewidth/2,framewidth);   
        cut(z,layerEtch)

        layerEtch = new Path.Rectangle(new Point(wide/2, framewidth/2),new Size(r*4, r*2), r)
        layerEtch.position = new Point(wide/2,framewidth/2);   
        cut(z,layerEtch)
    }
}





//--------- Interaction functions -----------------------
var interactiontext = "Interactions\nB = Blueprint mode\nV = Export SVG\nP = Export PNG\nC = Export colors as TXT\nE = Show layers\nF = Add floating frame\nL = Format for plotting"

view.onDoubleClick = function(event) {
    alert(interactiontext);
    console.log(project.exportJSON());
    //canvas.toBlob(function(blob) {saveAs(blob, tokenData.hash+'.png');});
};

document.addEventListener('keypress', (event) => {
    
       //Save as SVG 
       if(event.key == "v") {
        sheet[stacks].remove();
            var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
            var key = [];for (l=stacks;l>0;l--){key[stacks-l] = colors[l-1].Name;}; 
            var svg1 = "<!--"+key+"-->" + paper.project.exportSVG({asString:true})
            var url = "data:image/svg+xml;utf8," + encodeURIComponent(svg1);
            var link = document.createElement("a");
            link.download = fileName;
            link.href = url;
            link.click();
            }
            
        if(event.key == "f") {
            floatingframe();  
        }

        if(event.key == "1") {
            frameColor = {"Hex":"#4C46380", "Name":"Black"};
            fileName = "FramedBlack-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "2") {
            frameColor = {"Hex":"#f9f9f9","Name":"White"};
            fileName = "FramedWhite-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "3") {
            frameColor = {"Hex":"#60513D","Name":"Walnut"};
            fileName = "FramedWalnut-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "4") {
            frameColor = {"Hex":"#ebd9c0","Name":"Maple"};
            fileName = "FramedMaple-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
            
        if(event.key == "V") {
            fileName = "Vector-"+$fx.hash;
        }


       //Format for Lightburn
       if(event.key == "b") {
        fileName = "Blueprint-"+$fx.hash;
            for (z=0;z<stacks;z++){
                sheet[z].style = {fillColor: null,strokeWidth: .1,strokeColor: lightburn[stacks-z-1].Hex,shadowColor: null,shadowBlur: null,shadowOffset: null}
                sheet[z].selected = true;}
            }

       //Format for plotting
       if(event.key == "l") {
            fileName = "Plotting-"+$fx.hash;

            for (z=0;z<stacks;z++){
            sheet[z].style = {fillColor: null,strokeWidth: .1,strokeColor: plottingColors[stacks-z-1].Hex,shadowColor: null,shadowBlur: null,shadowOffset: null}
            sheet[z].selected = true;
            }
        
            for (z=0;z<stacks;z++){
                if (z<stacks-1){
                    for (zs=z+1;zs<stacks;zs++){
                        var savedStyle = sheet[z].style;
                        var newSheet = clipSubtract(sheet[z], sheet[zs]);
                        newSheet.style = savedStyle;
                        sheet[z].remove();
                        sheet[z] = newSheet;
                    }
                }
                console.log("optimizing")
            }
            console.log("plottable")
        }

        //new hash
        if(event.key == " ") {
            setquery("fxhash",null);
            location.reload();
            }

        //help
       if(event.key == "h" || event.key == "/") {
            alert(interactiontext);
            }
             
        //Save as PNG
        if(event.key == "p") {
            canvas.toBlob(function(blob) {saveAs(blob, fileName+'.png');});
            }

        //send to studio.shawnkemp.art
        if(event.key == "s") {
            sendAllExports()
            }            

        //Export colors as txt
        if(event.key == "c") {
            content = JSON.stringify(features,null,2);
            console.log(content);
            var filename = "Colors-"+$fx.hash + ".txt";
            var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            saveAs(blob, filename);
            }



       //Explode the layers     
       if(event.key == "e") {   
            //floatingframe();  
            h=0;t=0;maxwidth=3000;
               for (z=0; z<sheet.length; z++) { 
               sheet[z].scale(1000/2300)   
               sheet[z].position = new Point(wide/2,high/2);        
                    sheet[z].position.x += wide*h;
                    sheet[z].position.y += high*t;
                    sheet[z].selected = true;
                    if (wide*(h+2) > panelWide) {maxwidth=wide*(h+1);h=0;t++;} else{h++};
                    }  
            paper.view.viewSize.width = maxwidth;
            paper.view.viewSize.height = high*(t+1);
           }
 
}, false); 
}