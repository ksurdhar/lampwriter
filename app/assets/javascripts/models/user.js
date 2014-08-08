Lampwriter.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  parse: function(jsonResp){
    if (jsonResp.relationships) {
      this.relationships().set(jsonResp.relationships);
      delete jsonResp.relationships;
    }

    return jsonResp;
  }
});
