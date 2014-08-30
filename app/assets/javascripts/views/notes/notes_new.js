Lampwriter.Views.notesNew = Backbone.View.extend({

  template: JST["notes/new"],

  initialize: function(options) {
    this.listenToOnce(this.model, "sync", this.render);
    options.id ? this.id = options.id : this.id = null;
  },

  events: {
    "click #delete-note": "deleteNote",
    "click #go-back": "goBack",
    "keyup #note-form": "resetSaveTimeout"
  },

  render: function () {
    if (this.model.escape("title") == "Untitled"){
      this.model.set("title", "");
    }
    var renderedContent = this.template({
      note: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  deleteNote: function(){
    var note = Lampwriter.notes.get(this.model.id);
    note.destroy({
      success: function(params) {
        Backbone.history.navigate("/notes", { trigger: true });
      }
    });
  },

  displaySave: function(){
    $("#save-icon").addClass("saved transitioning");
    setTimeout(function(){ $("#save-icon").removeClass("saved") }, 2000);
    setTimeout(function(){ $("#save-icon").removeClass("transitioning") }, 4500);
  },

  goBack: function(){
    Backbone.history.navigate("/notes/"+this.id, { trigger: true });
  },

  resetSaveTimeout: function(event) {
    var that = this;
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(function() { that.updateBody(event) }, 1500);
  },

  updateBody: function(event) {
    var that = this;
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      patch: true,
      success: function(data) {
        that.displaySave();
      }
    });
  },  
});
