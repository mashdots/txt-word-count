const fs = require('fs');
var ProgressBar = require('progress');
var path = 'hf.txt';


function wash(data) {
  let product = value;
  if (seq == 1) {
    return data.replace(/[\n]/g, ' ').replace(/[^A-Za-z0-9 ]/g, '')
  } else if (seq == 2) {
    return data.replace(/[^A-Za-z0-9 ]/g, '')
  }
}

fs.readFile(path, "utf8", function(error, data) {
  if (error) {
    console.error("read error:  " + error.message);
  } else {
    let resultObj = { logged: [], counted: {} };
    let cleanedDoc = data.replace(/[\n]/g, ' ').replace(/[^A-Za-z0-9 ]/g, '').split(' ');
    var len1 = cleanedDoc.length;
    let bar1 = new ProgressBar('Processing :total words: [:bar]', {
      complete: '=',
      incomplete: ' ',
      width: 40,
      total: len1
    });

    cleanedDoc.forEach(function(word, index) {
      let testSub = word.toString().toLowerCase();
      if (resultObj.logged.includes(testSub)) {
        resultObj.counted[testSub] += 1;
      } else {
        resultObj.counted[testSub] = 1;
        resultObj.logged.push(testSub);
      }
      bar1.tick();
    });

    console.log('Beginning sort . . .');
    resultObj.logged.sort(function(a, b) {
      return resultObj.counted[b] - resultObj.counted[a];
    });

    console.log(`Done! ${resultObj.logged.length} words sorted.`);
    console.log(`The most-used word is: "${resultObj.logged[0]}". It was used ${resultObj.counted[resultObj.logged[0]]} times.`);
  }
});
