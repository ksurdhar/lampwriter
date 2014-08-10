Lampwriter.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "greetView",
    "users": "usersIndex",
    "users/:id": "usersShow",
    "notes": "notesIndex",
    "notes/new": "notesEdit",
    "notes/:id": "notesShow",
    "notes/:id/edit": "notesEdit"
  },

  notesIndex: function(){
    Lampwriter.notes.fetch();

    var view = new Lampwriter.Views.notesIndex({
      collection: Lampwriter.notes
    });
    this._swapView(view);
  },

  notesEdit: function(){
    var view = new Lampwriter.Views.notesNew();
    this._swapView(view);
  },

  greetView: function(){
    var view = new Lampwriter.Views.greetView();
    this._swapView(view);
  },

  usersIndex: function(){
    Lampwriter.users.fetch();

    var view = new Lampwriter.Views.usersIndex({
      collection: Lampwriter.users
    });
    this._swapView(view);
  },

  usersShow: function(id){
    var user = Lampwriter.users.getOrFetch(id);

    var view = new Lampwriter.Views.userShow({
      model: user
    });
    this._swapView(view);
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});