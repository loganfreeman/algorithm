// http://stackoverflow.com/questions/15085716/backbone-marionette-modules-as-widgets-similar-to-twitter-flight
App.WidgetModel = Backbone.Model.extend({
    intialize: function () {
        this.url = this.options.url;
    }
});

App.WidgetView = App.View.ComboboxView = Backbone.View.extend({

    initialize: function () {

        this.model = new App.WidgetModel({}, { url: this.$("a").attr("href") });

    }

    // rest of the view code

});