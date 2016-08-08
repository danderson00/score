require('tribe').register.facet(function (facet) {
    facet.isDistributed()
    
    this.lead = facet.envelopes.lead().asScalar()

    // publish a game.won message when a player has
    // 3 or more points and a lead of 2 or more points
    facet.envelopes.players()
        .forEach(player => player.points()
            .when(points => points >= 3 && this.lead() >= 2)
            .then(() => facet.publish('game.won', { playerId: player.key })))

    facet.handles('points', function (data) {
        data.forEach(x => facet.publish({ topic: 'point', data: x, silent: true }))
        if(data[0].count > data[1].count) facet.publish('game.won', { playerId: data[0].playerId })        
        if(data[0].count < data[1].count) facet.publish('game.won', { playerId: data[1].playerId })        
    })
})
