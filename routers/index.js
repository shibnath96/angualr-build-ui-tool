var express = require('express');
var router = express.Router();
var fileReader = require('../libs/fileReader');

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/project-explorer', function(req, res) {
    var folderPath = req.query.folderPath;
    
    fileReader(folderPath + '/angular.json').then( fileData => {

        var json = JSON.parse(fileData);

        projectContentKey = json.projects;

        var projectContentKeyArray = Object.keys(projectContentKey).filter( function(a) {
            return ( a.includes('-game-engine') &&  !a.includes('game-engine-e2e') || a.includes('-authoring-engine') &&  !a.includes('authoring-engine-e2e'));
        }).sort();

        var groupArray = makeGroup(projectContentKeyArray);

        res.render('explore-projects',{
            groupArray: groupArray
        })

    }).catch( err => {
        res.send(err);
    })
});

router.post('/make-the-build', (req, res) => {
    var buildOption = req.body.buildOption;
    console.log(buildOption);

    if ( buildOption.split('|').length > 1  ) {
        //Multi-build process
        res.send('Multi-build! ---> ' + buildOption);
    } else {
        //Single-build process
        res.send('Single-build! ---> ' + buildOption);
    }
});

module.exports = router;

function makeGroup( data ) {
    var i = 0;
    var groupArray = [];
    while( i < data.length ) {

        groupArray.push({
            authoring: data[i],
            game: data[i+1],
            title: data[i].split('-')[0]
        })
        
        i += 2;
    }

    return groupArray;
}