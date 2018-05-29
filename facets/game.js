require('tribe').register.facet(function (facet) {
    facet.isDistributed()

    // make certain pieces of state available through observables
    this.lead = facet.envelopes.lead().asScalar()
    this.playerIds = facet.envelopes.allPlayers().select(x => x.key).asArray()
    this.winner = ko.observable()

    // set the winner when a player has 3 or more points and a lead of 2 or more points
    facet.envelopes.players()
        .forEach(player => player.points()
            .when(points => points >= 3 && this.lead() >= 2)
            .then(() => this.winner(player.key)))
    
    // publish the game.over event when the winner observable is set
    this.winner.subscribe(winner => facet.publish('game.over', { playerId: this.playerIds(), winner: winner }))

    // this handles scoring a game by specifying the outcome, i.e. number of points per player, in a single message
    facet.handles('points', (data) => {
        data.forEach(x => facet.publish({ topic: 'point', data: x, silent: true }))
        if(this.winner())
            facet.publish('game.over', { playerId: this.playerIds(), winner: this.winner() })
    })
})
