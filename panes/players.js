require('tribe').register.model(function (pane) {
    this.average = x => {
        var played = x.gamesPlayed().asScalar(),
            wins = x.wins().asScalar()
        return ko.computed(() => wins() / played())
    }
})