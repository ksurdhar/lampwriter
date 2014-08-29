Lampwriter.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "greetView",
    "users": "usersIndex",
    "users/:id": "usersShow",
    "notes": "notesIndex",
    "notes/new": "notesNew",
    "notes/:id": "notesShow",
    "notes/:id/edit": "notesEdit"
  },

  notesIndex: function(){
    Lampwriter.notes.getFirstPage();

    var view = new Lampwriter.Views.notesIndex({
      collection: Lampwriter.notes
    });
    this._swapView(view);
  },

  notesShow: function(id){
    var note = Lampwriter.notes.getOrFetch(id);

    var view = new Lampwriter.Views.notesShow({
      model: note
    });
    this._swapView(view);
  },

  notesNew: function(){
    $.ajax({
      url: "/notes",
      type: 'POST',
      success: function(newNote) {
        var note = new Lampwriter.Models.Note(newNote);
        Lampwriter.notes.add(note);
        Backbone.history.navigate("#/notes/" + note.id + "/edit", {trigger: true});
      }
    });
  },

  notesEdit: function(id){
    var note = Lampwriter.notes.getOrFetch(id);

    var view = new Lampwriter.Views.notesNew({
      id: id,
      model: note
    });
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

    var view = new Lampwriter.Views.usersShow({
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
