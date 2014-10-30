// Created by Anton Vishnyak


// ----------------------------------------------------------------
// Definition of a menu item
//
// Sub-menus can be defined using a "submenu" attribute
// ----------------------------------------------------------------
var MenuItem = Backbone.Model.extend({
    defaults: {
        // true, false or null/undefined;
        disabled: false,

        // true, false or null/undefined;
        checked: false,

        // 'std', 'separator', 'group-header' or null/undefined;        
        type: "std",

        icon: null,

        text: "",

        // This will be the event that get triggered
        action: false
    },

    initialize: function() {
        var nodes = this.get("submenu");

        if (nodes) {
            this.nodes = new MenuItemCollection(nodes);

            this.unset("submenu");
        }
    }
});



// ----------------------------------------------------------------
// A collection of menu items
// ----------------------------------------------------------------
var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItem
});




// ----------------------------------------------------------------
// Menu view renders individual menu items recursively
// ----------------------------------------------------------------
var MenuViewController = Backbone.Marionette.CompositeView.extend({
    tagName: "li",

    isFirstLevel: false,

    itemView: MenuViewController,

    initialize: function() {
        // grab the child collection from the parent model
        // so that we can render the collection as children
        // of this parent node
        this.collection = this.model.nodes;

        // Bubble up a view refresh to the top
        this.on("item:added", function(view) {
            this.bindTo(view, 'refresh', this.renderTree, this);
        });
    },

    initialEvents: function() {
        // Bind to any changes in the collection and redraw the entire menu chain
        if (this.collection) {
            this.bindTo(this.collection, "add", this.renderTree, this);
            this.bindTo(this.collection, "remove", this.renderTree, this);
            this.bindTo(this.collection, "reset", this.renderTree, this);
        }
    },

    renderTree: function() {
        // Bubble the trigger event up unless this is the first level item
        // once the event reaches the top level item, render the entire tree below
        if (this.isFirstLevel) {
            this.render();
        } else {
            this.trigger('refresh');
        }
    },

    events: {
        'click': 'menuItemSelected'
    },

    menuItemSelected: function(event) {
        event.stopPropagation();

        var target = $(event.delegateTarget);

        // Case: Not a clickable item (header or separator)
        if (!target.hasClass('std') || target.hasClass('disabled')) {
            return;
        }

        // Clickable item
        if (this.collection) {
            target.qtip('show');
        } else {
            $('.qtip').qtip('hide');

            // TODO: Raise event from the this.model.action
            $('#output').append('<div>You clicked: ' + target.first().text() + '</div>');
        }
    },

    beforeRender: function() {
        // Destroy qtip because it is stored outside of the el and would be left
        // hanging around after the render
        this.$el.qtip('destroy');
    },

    appendHtml: function(collectionView, itemView) {
        // ensure we nest the child list inside of 
        // the current list item
        if (collectionView.$("ul").length === 0) {
            
            if (this.isFirstLevel) {
                collectionView.$el.append('<ul style="display: none;" />');
            } else {
                collectionView.$el.append('<ul class="nested" />');
            }

            var list = collectionView.$("ul:first"),
                isNested = list.hasClass('nested');

            collectionView.$el.qtip({
                overwrite: false,
                content: {
                    text: list
                },
                show: {
                    solo: false,
                    ready: false,
                    event: false
                },
                position: {
                    my: "top left",
                    at: isNested ? "top right" : "bottom left"
                },
                hide: {
                    fixed: true,
                    event: 'unfocus'
                },
                style: {
                    classes: "ui-tooltip-menu",
                    tip: false
                }
            });
        }

        collectionView.$("ul:first").append(itemView.el);
    },

    renderModel: function() {
        var that = this;
        var deferredData = $.Deferred();

        var html = that.$el;

        deferredData.resolve(that.buildMenuItem(html, _.extend(that.serializeData(), {
            hasSubMenu: !(that.collection == null),
            isFirstLevel: that.isFirstLevel
        })));

        return deferredData.promise();
    },

    serializeData: function() {
        var data;

        if (this.model) {
            data = this.model.toJSON();
        }

        return data;
    },

    buildMenuItem: function(elem, data) {
        var target = $(document.createElement('span'));

        if ((_.isFunction(data.checked) && data.checked()) || data.checked === true) {
            elem.addClass('active');
        }

        if (!data.type) {
            data.type = 'std';
        }

        if ((_.isFunction(data.disabled) && data.disabled()) || data.disabled === true) {
            elem.addClass('disabled');
        }

        elem.addClass(data.type);

        if (data.type === 'std') {
            if (data.icon) {
                $('<img />').attr('src', data.icon).appendTo(target);
            }

            if (data.text) {
                target.html(data.text);
            }
        } else if (data.type === "group-header") {
            if (data.text) {
                target.text(data.text);
            }
        }

        if (data.hasSubMenu) {
            if (data.isFirstLevel) {
                $('<span class="arrow-down" />').appendTo(target);
            }
            else {
                $('<span class="arrow-right" />').appendTo(target);
            }

            elem.addClass('submenu');
        }

        return target;
    }
});



// ----------------------------------------------------------------
// FirstLevelMenu view generates a MenuViewController and
// overrides the nested attribute so that first level menus
// drop down instead of to the side
// ----------------------------------------------------------------
var FirstLevelMenuViewController = MenuViewController.extend({
    isFirstLevel: true,

    itemView: MenuViewController
});




// ----------------------------------------------------------------
// Toolbar view is the root of a recursive tree structure for each
// item in the collection
// ----------------------------------------------------------------
var ToolBarViewController = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",

    attributes: {
        class: "toolbar"
    },

    itemView: FirstLevelMenuViewController
});



// ----------------------------------------------------------------
// Below this line are the settings that define the menu
// ----------------------------------------------------------------
toolbarData = [
    {
    text: "File",
    submenu: [
        {
        text: "Open..."},
    {
        type: "separator"},
    {
        text: "Click Add Dynamic Menu to see more options.",
        disabled: true}
    ]},
{
    text: "Tools",
    submenu: [
        {
        text: "Account",
        type: "group-header"},
    {
        text: "Sessions"},
    {
        text: "License"},
    {
        text: "Settings"},
    {
        type: "separator"},
    {
        text: "Help",
        submenu: [
            {
            text: "Quick Links"},
        {
            text: "How do I?"},
        {
            text: "Tech Support"}
        ]}
    ]},
    {
        text: 'No Menu'
    }
];

// Create a new toolbar data collection from the toolbarData JSON object;
var menus = new MenuItemCollection(toolbarData);

// Create a toolbar view using the menu collection;
var toolbar = new ToolBarViewController({
    collection: menus
});

// Render the view and insert into the DOM;
toolbar.render();
$("#menu").html(toolbar.el);


// Wire up a button that dynamically adds items to the menu
$('#additem').click(function() {
    menus.at(0).nodes.add({
        text: _.uniqueId('Dynamic Menu '),
        submenu: [
            {
            text: "Extra menu"},
        {
            type: "separator"},
        {
            text: "Delete"}
        ]
    });
});