Lampwriter.Views.notesShow = Backbone.View.extend({

  template: JST['notes/show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync remove change", this.render);
  },

  events: {
    'dblclick #title': 'editTitle',
    'dblclick #body': 'editBody',
    'dblclick .editing-body': 'updateBody',
    'dblclick .editing-title': 'updateTitle',
    'click #delete': 'deleteNote'
  },

  render: function () {
    var renderedContent = this.template({ note: this.model });
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

  editTitle: function(){
    $('#title').replaceWith("<form class='title-form'><input type='text' name='note[title]' value='" + this.model.get('title') + "'>");
    $('#show').toggleClass("editing-title");
  },

  updateTitle: function(){
    $('#show').toggleClass("editing-title");
    var params = $('.title-form').serializeJSON();
    var note = Lampwriter.notes.getOrFetch(this.model.id);
    note.save(params, {
      patch: true,
      success: function(params) {
        Backbone.history.navigate("/notes/"+note.id, { trigger: true });
      }
    });
  },

  editBody: function(){
    $('#body').replaceWith("<form class='body-form'><textarea name='note[body]' rows='8' cols='40'>" + this.model.get('body') + "</textarea>");
    $('#show').toggleClass("editing-body");
  },

  updateBody: function(){
    $('#show').toggleClass("editing-body");
    var params = $('.body-form').serializeJSON();
    var note = Lampwriter.notes.getOrFetch(this.model.id);
    note.save(params, {
      patch: true,
      success: function(params) {
        Backbone.history.navigate("/notes/"+note.id, { trigger: true });
      }
    });
  }

});
