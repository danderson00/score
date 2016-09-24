var uuid = require('node-uuid').v4,
    pubsub = require('tribe').pubsub

suite('score.facets.game', function () {
    test("publishes game.over when player wins three points", function () {
        var scope = pubsub.createLifetime({ testId: uuid() })
        return scope.obtainFacet('game').then(function (facet) {
            var won = sinon.spy()
            scope.subscribe('game.over', won)
            scope.publish('player.selected', { playerId: '1' })
            scope.publish('player.selected', { playerId: '2' })
            scope.publish('point', { playerId: '1' })
            scope.publish('point', { playerId: '1' })
            scope.publish('point', { playerId: '1' })
            expect(won.callCount).to.equal(1)
            expect(won.firstCall.args[0].playerId).to.deep.equal(['1', '2'])
            expect(won.firstCall.args[0].winner).to.equal('1')
            scope.end()
        })
    })

    test("publishes correct winner when points are published as a single message", function () {
        var scope = pubsub.createLifetime({ testId: uuid() })
        return scope.obtainFacet('game').then(function (facet) {
            var won = sinon.spy()
            scope.subscribe('game.over', won)
            scope.publish('player.selected', { playerId: '1' })
            scope.publish('player.selected', { playerId: '2' })
            scope.publish('points', [{ playerId: '1', count: 2 }, { playerId: '2', count: 4 }])
            expect(won.callCount).to.equal(1)
            expect(won.firstCall.args[0].playerId).to.deep.equal(['1', '2'])
            expect(won.firstCall.args[0].winner).to.equal('2')
            scope.end()
        })
    })
})