(function (global, library) {
    global.cascade = library.bind(global)
})(this, function () {
    var loopRenderer = function (element, data) {
        var childElements = []

        var keys = Object.keys(data)
        for (var x = 0; x < keys.length; x++) {
            var span = document.createElement("span")
            span.textContent = data[keys[x]]
            span.slot = keys[x]
            childElements.push(span)
        }

        element.append(...childElements)
    }

    // var slotListMap = Object.create(null) --> since setting attributes is heavy, we can probably 
    var templateMap = Object.create(null)
    var elementsMap = Object.create(null)
    
    var cascadeTemplates = document.getElementsByClassName("cascade")

    for (var x = 0; x < cascadeTemplates.length; x++) {
        var cascadeTemplate = cascadeTemplates[x]
        var templateName = cascadeTemplate.getAttribute("data-name")
        
        if (templateName && cascadeTemplate.tagName === "TEMPLATE") {
            templateMap[templateName] = cascadeTemplate

            var templateType = cascadeTemplate.getAttribute("data-type")
            var templateColl = cascadeTemplate.getAttribute("data-coll")
            
            var collection = db.getCollection(templateColl)

            if (collection) {
                elementsMap[templateName] = (function (collection, child) {
                    return class extends HTMLElement {
                        constructor() {
                            super()
                            this.collection = collection
                            this.child = child

                            if (templateType === "loop") {
                                var view = collection.addDynamicView()

                                view.on("rebuild", (function (scope) {
                                    
                                })(this))
                            }
                        }

                        
                    }
                })(collection)
            }

            customElements.define(templateName, class extends HTMLElement {

            })
        }
    }
})