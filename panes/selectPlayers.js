require('tribe').register.model(function (pane) {
    this.score = () => {
        this.fields.teams().forEach(team => this.publish('player.selected', team()().selectProperties('playerId', 'name'))())            
    }
})