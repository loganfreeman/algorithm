// A Grid Row
var GridRow = Backbone.Marionette.ItemView.extend({
    template: "#row-template",
    tagName: "tr"
});

// The grid view
var GridView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    template: "#grid-template",
    itemView: GridRow,
    
    appendHtml: function(collectionView, itemView){
        collectionView.$("tbody").append(itemView.el);
    }
});



// ----------------------------------------------------------------
// Below this line is normal stuff... models, templates, data, etc.
// ----------------------------------------------------------------
var userData = [
    {
        username: "dbailey",
        fullname: "Derick Bailey"
    },
    {
        username: "jbob",
        fullname: "Joe Bob"
    },
    {
        username: "fbar",
        fullname: "Foo Bar"
    }
];
    

var User = Backbone.Model.extend({});

var UserCollection = Backbone.Collection.extend({
    model: User
});

var userList = new UserCollection(userData);

var gridView = new GridView({
    collection: userList
});

gridView.render();
console.log(gridView.el);
$("#grid").html(gridView.el);
