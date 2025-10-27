// Load the data from the script tag
const dataArrayForLollipop3dAsString = document.getElementById('dataArray').innerText;
const dataDots = JSON.parse(dataArrayForLollipop3dAsString);
console.log(dataDots);

// Select the A-Frame scene
let scene = d3.select("a-scene")
    // .append("a-sphere")
    // .attr("radius", 0.2) // Set a fixed radius for each sphere
    // .attr("position", "-0.5 1.75 -1")
    // .attr("color", `black`)


// Define scales to map data values to A-Frame coordinates
// The domain should cover the full range of your data.
// The range should define the coordinate space in your A-Frame scene.
const x_scale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 3]);

// const y_scale = d3.scaleLinear()
//     .domain([0, 100])
//     .range([1, 5]);

const y_scale = d3.scaleBand() // Creates band scale x-axis - i.e. maps categorical range to a continuous range
            .range([1, 5]) // On-screen width
            .domain(data.map(function (d) { return d.condition; })) // Data-perspective width; as wide as the number of x-axis categories

const z_scale = d3.scaleLinear()
    .domain([0, 100])
    .range([-1, -4]);



// Create a color scale for conditions
// const color_scale = d3.scaleOrdinal(d3.schemeCategory10);

// Use D3's data-join to create spheres for each data point

// scene.append("a-entity")
//     .data(data)
//     .enter()
//     .append("a-sphere")
//     .attr("radius", 0.1) // Set a fixed radius for each sphere
//     // .attr("position", "0 1 -1")
//     .attr('position', "1 1 -1")
//     .attr("color", "green");

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 5 1 -1; color: red")

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 0 6 -1; color: green")

scene.append("a-entity")
    .attr("line","start: 0 1 -1; end: 0 1 -6; color: blue")

scene.selectAll("a-sphere.starting")
    .data(dataDots)
    .enter()
    .append("a-sphere")
    .attr("radius", 0.1) // Set a fixed radius for each sphere
    // .attr("position", "0 1 -1")
    .attr('position', function(d, i) {
            let x = x_scale(d.xPos1);
            let z = z_scale(0);
            let y = y_scale(d.condition);
            console.log(d,d.condition,y_scale(d.condition),y);
            return x + " " + y + " " + z;
          })
    .attr("color", "green");

scene.selectAll("a-sphere.ending")
    .data(dataDots)
    .enter()
    .append("a-sphere")
    .attr("radius", 0.1) // Set a fixed radius for each sphere
    // .attr("position", "0 1 -1")
    .attr('position', function(d, i) {
            let x = x_scale(d.xPos2);
            let y = y_scale(d.condition);
            let z = z_scale(0);
            console.log(d,d.condition,y_scale(d.condition),y);
            return `${x} ${y} ${z}`;
            // return x + " " + y + " " + z;
          })
    .attr("color", "purple");

scene.selectAll("a-entity.lollipopstick")
.data(dataDots)
.enter()
.append("a-entity")
    // .attr("line","start: 0 1 -1; end: 2 2 -2; color: black")
    .attr("line", function(d, i) {
            let x1 = x_scale(d.xPos1)
            let z1 = z_scale(0);
            let y1 = y_scale(d.condition);
            let x2 = x_scale(d.xPos2)
            let z2 = z_scale(0);
            let y2 = y_scale(d.condition);
            console.log(`start: ${x1} ${y1} ${z1}; end: ${x2} ${y2} ${z2}; color: black`);
            zPosOffset = zPosOffset + 5
            return `start: ${x1} ${y1} ${z1}; end: ${x2} ${y2} ${z2}; color: black`
        })

// Add axis lines for better visualization of the 3D space
// X-axis
// scene.append("a-entity").attr("line", "start: -60 0 0; end: 60 0 0; color: #FFF;");
// // Y-axis
// scene.append("a-entity").attr("line", "start: 0 -60 0; end: 0 60 0; color: #FFF;");
// // Z-axis
// scene.append("a-entity").attr("line", "start: 0 0 -60; end: 0 0 60; color: #FFF;");

// Navigation additions from: https://claude.ai/chat/1ca4def1-b7d7-4ea6-b109-4e75ed1de386
AFRAME.registerComponent('vertical-controls', {
            init: function() {
                this.moveSpeed = 0.1;
                this.keys = {};
                
                // Track key states
                window.addEventListener('keydown', (e) => {
                    this.keys[e.key.toLowerCase()] = true;
                });
                
                window.addEventListener('keyup', (e) => {
                    this.keys[e.key.toLowerCase()] = false;
                });
            },
            
            tick: function() {
                let pos = this.el.object3D.position;
                
                // Q key to move up
                if (this.keys['q']) {
                    pos.y += this.moveSpeed;
                }
                
                // E key to move down
                if (this.keys['e']) {
                    pos.y -= this.moveSpeed;
                }
            }
        });

        // Add the component to the camera rig
        document.querySelector('#rig').setAttribute('vertical-controls', '');