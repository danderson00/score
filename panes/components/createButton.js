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
        var data = {};
        data[pane.data.valueProperty] = this.fields.value()
        data[pane.data.idProperty] = this.uuid()

        pane.pubsub.publish('player.name', data) 
        this.toggle()
        this.fields.value('')
    }
})