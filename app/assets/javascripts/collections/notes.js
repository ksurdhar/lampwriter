Lampwriter.Collections.Notes = Backbone.PageableCollection.extend({
  url: "notes",
  model: Lampwriter.Models.Note,

  // comparator: function( model ) {
  //   return model.get('created_at');
  // },

  // changeSort: function(){
  //   this.comparator = function( model ) {
  //     return model.get('title');
  //   }
  // },

  getOrFetch: function (id){
    var note;
    var notes = this;

    if(note = this.get(id)){
      note.fetch();
      return note;
    } else {
      note = new Lampwriter.Models.Note({ id: id });
      note.fetch({
        success: function(){ Lampwriter.notes.add(note) }
      });
      return note
    }
  }
});

window.Lampwriter.notes = new Lampwriter.Collections.Notes([],{
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 5,
    sortKey:"title"
  },

  queryParams: {
    currentPage: "current_page",
    pageSize: "page_size",
    sortKey: "sort_by"
  }
});
