Lampwriter.Views.notesNew = Backbone.View.extend({

  template: JST["notes/new"],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    options.id ? this.id = options.id : this.id = null;
  },

  events: {
    "click #submit": "submit",
    "keyup #note-form": "resetSaveTimeout"
  },

  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  // displaySave: function(){
  //   $()
  // },

  resetSaveTimeout: function(event) {
    var that = this;
    // $('#note-edit-group').removeClass('has-success');
    // $('#note-edit-group').addClass('has-warning');
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(function() { that.updateBody(event) }, 500);
  },

  updateBody: function(event) {
    var that = this;
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      patch: true,
      success: function(data) {
        displaySave();
      }
    });
  },

  submit: function (event) {
    event.preventDefault();
    var params = $("#note-form").serializeJSON();
    if(this.id){
      var note = Lampwriter.notes.getOrFetch(this.id);
      note.save(params, {
        patch: true,
        success: function(params) {
          Backbone.history.navigate("/notes/"+note.id, { trigger: true });
        }
      });
    } 
    else{
      var newNote = new Lampwriter.Models.Note(params);
      newNote.save({}, {
        success: function () {
          Lampwriter.notes.add(newNote);
          Backbone.history.navigate("/notes/"+newNote.id, { trigger: true });
        }
      });
    }
  }
});
