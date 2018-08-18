// [x, y, blue or red where blue = 0, red = 1]
let b1 = [1, 1, 0];
let b2 =  [2, 1,   0];
let b3 =  [2, .5, 0];
let b4 =  [3,   1, 0];

let r1 =  [3, 1.5, 1];
let r2 =  [3.5,   .5, 1];
let r3 =  [4, 1.5, 1];
let r4 =  [5.5,   1,   1];

let unknownFlower = [4.5, 1, 'should be red'];

let allPoints = [b1,b2,b3,b4,r1,r2,r3,r4];

let sigmoid = x => 1/(1+Math.exp(-x));

let train = () => {
    // start with random weight1 w1, weight2 w2, and bias b
    let w1 = Math.random()*0.2 - 0.1;
    let w2 = Math.random()*0.2 - 0.1;
    let b = Math.random()*0.2 - 0.1;

    let learningRate = 0.2;

    for (let i = 0; i < 50000; i++) {
        // pick random index from our training data so we can train it many many times b/c we only have a couple real data points so we want to get those same data points again to train on.
        let randomIndex = Math.floor(Math.random() * allPoints.length);
        let point = allPoints[randomIndex];
        // what we want our NN to predict, we give it what the expcted value is so it knows what to learn from
        let expectedTarget = point[2];

        // feed forward
        let z = w1*point[0] + w2*point[1] + b;
        let pred = sigmoid(z) // gives us a probability aka the output

        // compare model prediction w/ target
        // this is the cost function
        let cost = (pred - expectedTarget) ** 2;

        // find deriv of cost fx to find where its the lowest aka dcost/dpred
        let dcost_dpred = 2 * (pred - expectedTarget);

        // bring derivative through sigmoid
        // derivative of sigmoid can be written using more sigmoids! d/dz sigmoid(z) = sigmoid(z)*(1-sigmoid(z))
        let dpred_dz = sigmoid(z) * (1-sigmoid(z));

        // how does z change when w1 change ie. when w1 changes, its proportional to how much point[0] aka the 1st feature of the flower
        let dz_dw1 = point[0]
        // how does z change when w2 change
        let dz_dw2 = point[1]
        // how does z change when b change, since b is constant, it just changes by 1
        let dz_db = 1;

        // now we can get the partial derivatives using the chain rule
        // notice the pattern? We're bringing how the cost changes through each function, first through the square, then through the sigmoid
        // and finally whatever is multiplying our parameter of interest becomes the last part
        // this is similar to backwards propogation b/c were going backwards
        let dcost_dw1 = dcost_dpred * dpred_dz * dz_dw1;
        let dcost_dw2 = dcost_dpred * dpred_dz * dz_dw2;
        let dcost_db =  dcost_dpred * dpred_dz * dz_db;

        // now we update our parameters!
        w1 -= learningRate * dcost_dw1;
        w2 -= learningRate * dcost_dw2;
        b -= learningRate * dcost_db;
    }

    return {w1: w1, w2: w2, b:b}
}

let trainedOutput = train();

console.log(trainedOutput)

 // var dataB1 =   [1, 1, 0];
 //    var dataB2 = [2, 1,   0];
 //    var dataB3 = [2, .5, 0];
 //    var dataB4 = [3,   1, 0];

 //    var dataR1 = [3, 1.5, 1];
 //    var dataR2 = [3.5,   .5, 1];
 //    var dataR3 = [4, 1.5, 1];
 //    var dataR4 = [5.5,   1,   1];

 //    //unknown type (data we want to find)
 //    var dataU = [4.5,  1, "it should be 1"];

 //    var all_points = [dataB1, dataB2, dataB3, dataB4, dataR1, dataR2, dataR3, dataR4];

 //    function sigmoid(x) {
 //      return 1/(1+Math.exp(-x));
 //    }

 //    // training
 //    function train() {
 //      let w1 = Math.random()*.2-.1;
 //      let w2 = Math.random()*.2-.1;
 //      let b = Math.random()*.2-.1;
 //      let learning_rate = 0.2;
 //      for (let iter = 0; iter < 50000; iter++) {
 //        // pick a random point
 //        let random_idx = Math.floor(Math.random() * all_points.length);
 //        let point = all_points[random_idx];
 //        let target = point[2]; // target stored in 3rd coord of points

 //        // feed forward
 //        let z = w1 * point[0] + w2 * point[1] + b;
 //        let pred = sigmoid(z);

 //        // now we compare the model prediction with the target
 //        let cost = (pred - target) ** 2;

 //        // now we find the slope of the cost w.r.t. each parameter (w1, w2, b)
 //        // bring derivative through square function
 //        let dcost_dpred = 2 * (pred - target);

 //        // bring derivative through sigmoid
 //        // derivative of sigmoid can be written using more sigmoids! d/dz sigmoid(z) = sigmoid(z)*(1-sigmoid(z))
 //        let dpred_dz = sigmoid(z) * (1-sigmoid(z));

 //        // I think you forgot these in your slope calculation? 
 //        let dz_dw1 = point[0];
 //        let dz_dw2 = point[1];
 //        let dz_db = 1;

 //        // now we can get the partial derivatives using the chain rule
 //        // notice the pattern? We're bringing how the cost changes through each function, first through the square, then through the sigmoid
 //        // and finally whatever is multiplying our parameter of interest becomes the last part
 //        let dcost_dw1 = dcost_dpred * dpred_dz * dz_dw1;
 //        let dcost_dw2 = dcost_dpred * dpred_dz * dz_dw2;
 //        let dcost_db =  dcost_dpred * dpred_dz * dz_db;

 //        // now we update our parameters!
 //        w1 -= learning_rate * dcost_dw1;
 //        w2 -= learning_rate * dcost_dw2;
 //        b -= learning_rate * dcost_db;
 //      }

 //      return {w1: w1, w2: w2, b: b};
 //    }
    
 //    console.log(train())