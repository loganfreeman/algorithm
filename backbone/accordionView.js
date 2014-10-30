// The accordion base CompositeView
var AccordionView = Backbone.Marionette.CompositeView.extend({

    constructor: function(){
        Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);
        _.bindAll(this, "saveSelection");
        this.vent = new Backbone.Marionette.EventAggregator();
        this.vent.bind("AccordionView:SaveSelection", this.saveSelection);
        this.bind("item:added", function(view){ view.vent = this.vent; }); 
    },
    saveSelection: function(modelcid) {
        if (this.currentSelectedCid) { 
            var childView = this.children[this.currentSelectedCid];
            if (childView) { childView.itemDeselect(); } 
        }
        this.currentSelectedCid = modelcid;
    }
});

// The accordion base ItemView
var AccordionItemView = Backbone.Marionette.ItemView.extend({

    itemDeselect: function() {
        this.minimize();
        this.model.set({ selected: false });
    },
    itemSelect: function() {
        if (this.model.get("selected") === true) { return; }
        this.model.set({ selected: true });
        this.maximize();
        this.vent.trigger("AccordionView:SaveSelection", this.model.cid);
    },
    minimize: function() {
        this.$el.find(this.elContent).slideUp(this.slideUpSpeed);
    },
    maximize: function() {
        this.$el.find(this.elContent).slideDown(this.slideDownSpeed);
    }
});

// The extended MovieItemView
var MovieItemView = AccordionItemView.extend({
    events: { "click h2": "itemSelect" },
    template: '#movie-item-template',
    className: 'item',
    slideUpSpeed: 400,
    slideDownSpeed: 300,
    elContent: 'p'
});

// The extende MovieView
var MovieAccordionView = AccordionView.extend({
    el: '#movieview',
    template: '#movie-template',
    itemView: MovieItemView,
    appendHtml: function(collectionView, itemView) {
        collectionView.$("#items").append(itemView.el);
    }
});

var item0 = {
    title: 'O brother where art thou',
    text: "Loosely based on Homer's 'Odyssey' the movie deals with the picaresque adventures of Everett Ulysses McGill and his companions Delmar and Pete in 1930s Mississipi. Sprung from a chain gang and trying to reach Everetts home to recover the buried loot of a bank heist they are confronted by a series of strange characters. Among them sirens, a cyclops, bank robber George 'Babyface' Nelson (very annoyed by that nickname), a campaigning Governor, his opponent, a KKK lynch mob, and a blind prophet, who warns the trio that 'the treasure you seek shall not be the treasure you find.'"
};

var item1 = {
    title: 'The Big Lebowski',
    text: 'When "The Dude" Lebowski is mistaken for a millionaire Lebowski, two thugs urinate on his rug to coerce him into paying a debt he knows nothing about. While attempting to gain recompense for the ruined rug from his wealthy counterpart, he accepts a one-time job with high pay-off. He enlists the help of his bowling buddy, Walter, a gun-toting Jewish-convert with anger issues. Deception leads to more trouble, and it soon seems that everyone from porn empire tycoons to nihilists want something from The Dude.'
};

var item2 = {
    title: 'Fargo',
    text: "Jerry works in his father-in-law's car dealership and has gotten himself in financial problems. He tries various schemes to come up with money needed for a reason that is never really explained. It has to be assumed that his huge embezzlement of money from the dealership is about to be discovered by father-in-law. When all else falls through, plans he set in motion earlier for two men to kidnap his wife for ransom to be paid by her wealthy father (who doesn't seem to have the time of day for son-in-law). From the moment of the kidnapping, things go wrong and what was supposed to be a non-violent affair turns bloody with more blood added by the minute. Jerry is upset at the bloodshed, which turns loose a pregnant sheriff from Brainerd, MN who is tenacious in attempting to solve the three murders in her jurisdiction."
};

//Create and render View
var movieCollection = new Backbone.Collection([item0, item1, item2]);
var movieAccordionView = new MovieAccordionView({ collection: movieCollection });
movieAccordionView.render();