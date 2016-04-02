require('tribe').register.actor(function (actor) {
    actor.isDistributed()

    this.lead = actor.envelopes.lead().asScalar()

    // publish a game.won message when a player has
    // 3 or more points and a lead of 2 or more points
    actor.envelopes.players()
        .forEach(player => player.points()
            .when(points => points >= 3 && this.lead() >= 2)
            .then(() => actor.publish('game.won', { playerId: player.key })))
})
