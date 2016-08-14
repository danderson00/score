require('tribe').register.model(function (pane) {
    this.itemText = pane.data.itemText
    this.value = pane.data.value

    if(pane.data.required)
        this.value.extend({ required: true })

    this.selectItem = (item, event) => {
        var currentValue = pane.data.value()

        if(currentValue) {
            $(event.target).removeClass('selected')
            $(pane.element).removeClass('itemSelected')
            pane.data.value(undefined)
        } else {
            $(event.target).addClass('selected')
            $(pane.element).addClass('itemSelected')
            pane.data.value(pane.data.itemValue ? item[pane.data.itemValue] : item)
        }
    }
})
