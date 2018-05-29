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
})
