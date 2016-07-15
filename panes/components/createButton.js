require('tribe').register.model(function (pane) {
    $(pane.element).css('display', 'inline-block')

    this.toggle = () => {
        var elements = pane.find('.createButton')
        if(elements.hasClass('expanded'))
            elements.removeClass('expanded')
        else
            elements.addClass('expanded')
    }

    this.create = () => {
        pane.pubsub.publish('player.name', { name: this.fields.name(), playerId: this.uuid() }) 
        this.toggle()
        this.fields.name('')
    }
})