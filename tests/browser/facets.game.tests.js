var uuid = require('node-uuid').v4,
    pubsub = require('tribe').pubsub

suite('score.facets.game', function () {
    test("publishes game.won when player wins three points", function () {
        var scope = pubsub.createLifetime({ testId: uuid() })
        return scope.obtainFacet('game').then(function (facet) {
            var won = sinon.spy()
            scope.subscribe('game.won', won)
            scope.publish('player.selected', { playerId: '1' })
            scope.publish('player.selected', { playerId: '2' })
            scope.publish('point', { playerId: '1' })
            scope.publish('point', { playerId: '1' })
            scope.publish('point', { playerId: '1' })
            expect(won.callCount).to.equal(1)
            scope.end()
        })
    })
})