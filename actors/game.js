require('tribe').register.actor(function (actor) {
    this.lead = actor.envelopes.lead().asScalar()

    // publish a game.won message when a player has
    // 3 or more points and a lead of 2 or more points
    actor.envelopes.players()
        .forEach(player => player.points()
            .when(points => points >= 3 && this.lead() >= 2)
            .then(() => actor.publish('game.won', { playerId: player.key })))

    actor.handles('points', function (data) {
        data.forEach(x => actor.publish({ topic: 'point', data: x, silent: true }))
        if(data[0].count > data[1].count) actor.publish('game.won', { playerId: data[0].playerId })        
        if(data[0].count < data[1].count) actor.publish('game.won', { playerId: data[1].playerId })        
    })
})
