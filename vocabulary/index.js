var equal = require('deep-equal')

// these are common expressions that can be used in Rx expressions throughout the app
require('tribe').register.vocabulary({
    'players': e => e.where(x => x.data.playerId).groupBy(x => x.data.playerId),
    'allPlayers': e => e.where(x => x.data.playerId).groupByEach(x => x.data.playerId),
    'games': e => e.where(x => x.data.gameId).groupBy(x => x.data.gameId),
    'forPlayer': (e, playerId) => e.where(x => equal(x.data.playerId, playerId)),

    'gamesPlayed': e => e.topic('player.selected').count(),
    'wins': e => e.topic('game.won').count(),

    'points': e => e.topic('point').sum(x => parseInt(x.data.count) || 1),
    'lead': e => e.players().select(x => x.points()).range(),

    'selectedName': e => e.topic('player.selected').data('name'),
    'playerName': e => e.topic('player.name').data('name')
})
