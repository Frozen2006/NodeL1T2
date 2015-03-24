var fs = require("fs");
var argv = require('optimist').argv;

var _renameIfIsFile = function (file, sourcePath, destPath) {
    fs.stat(sourcePath, function (err, stat) {
        if (stat.isFile()) {
            fs.rename(sourcePath, destPath);
        }
    });
};

var _renameFiles = function (path, pattern, replacement) {
    fs.readdir(path, function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        for (var i = 0; i < data.length; i++) {
            var file = data[i];
            var sourcePath = path + '/' + file;
            var destPath = path + '/' + file.replace(pattern, replacement);
            
            
            if (file.match(pattern)) {
                _renameIfIsFile(file, sourcePath, destPath);               
            }
        }
    });
};



(function () {
    if (argv.length < 2+3) {
        console.log('Specify command line args');
        return;
    }
    
    /*parse */

    _renameFiles(argv.folder, argv.find, argv.replace);
})();