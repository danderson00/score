require('tribe').register.model(function (pane) {
    this.score = () => {
        this.fields.teams().forEach(team => this.publish('player.selected', team()().selectProperties('playerId', 'name'))())
    }

    this.recordScore = () => {
        this.fields.teams().forEach(team => {
            pane.pubsub.publish('player.selected', team()().selectProperties('playerId', 'name'))
        })
        
        pane.pubsub.publish('points', this.fields.teams().map((team, index) => ({ 
            playerId: team()().select('playerId'), 
            count: this.fields['team' + (index + 1) + 'Score'] 
        })))
    }
})