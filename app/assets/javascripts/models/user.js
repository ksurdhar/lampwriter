Lampwriter.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  notes: function(){
    if(!this._notes){
      this._notes = new Lampwriter.Collections.notes([],{
        user: this
      });
    }
    return this._notes;
  },

  parse: function(jsonResp){
    if (jsonResp.notes) {
      this.notes().set(jsonResp.notes);
      delete jsonResp.notes;
    }

    return jsonResp;
  }
});
