require('tribe').register.model(function (pane) {
    this.selectPlayer = (player, event) => {
        var currentValue = pane.data()

        if(currentValue) {
            $(event.target).removeClass('selected')
            $(pane.element).removeClass('playerSelected')
            pane.data(undefined)
        } else {
            $(event.target).addClass('selected')
            $(pane.element).addClass('playerSelected')
            pane.data(player)
        }
    }
})
