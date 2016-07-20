require('tribe').register.flow(function (flow) {
    flow.startsAt('selectPlayers')
    flow.topic('player.selected').count().when(2).then(flow.to('score'))
    flow.on('game.won').to('complete')
})
