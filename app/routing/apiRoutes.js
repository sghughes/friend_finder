// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require('../data/friends');

module.exports = function(app) {

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post('/api/friends', function(req,res){
        console.log(req.body)
        var newFriendInfo = req.body;

        var startDiff = 100;

        var bestFriend = 0;
        // var answersDiff = 0;

        for (var i =0; i<friends.length; i++){
            var answersDiff = 0;
            for (var j=0; j<newFriendInfo.answers.length; j++){
                var diff = parseInt(friends[i].answers[j])-parseInt(newFriendInfo.answers[j]);
                var absDiff = Math.abs(diff);
                console.log(absDiff);
                answersDiff += absDiff; 
            }
            console.log(answersDiff)

            if(answersDiff<startDiff) {
                bestFriend = i;
                startDiff = answersDiff;
            }
            console.log(bestFriend)

        }

        friends.push(newFriendInfo);
        console.log(friends[bestFriend]);
        res.json(friends[bestFriend]);

    })

 

};

