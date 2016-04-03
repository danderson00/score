require('tribe').register.flow(function (flow) {
    flow.startsAt('selectPlayers')

    flow.on('ui.home').to('home')
    flow.on('ui.score').startChild('game')
})
