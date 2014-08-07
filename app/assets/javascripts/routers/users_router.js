Lampwriter.Routers.Users = Backbone.Router.extend({

  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "greetView",
    "users": "userIndex",
    "users/:id": "userShow"
  },

  greetView: function(){
    var view = new Lampwriter.Views.greetView();
    this._swapView(view);
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
