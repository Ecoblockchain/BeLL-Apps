$(function() {

  App.Views.GroupSpan = Backbone.View.extend({

    tagName: "td",

    className: 'shelf-box',

    template : $("#template-ShelfSpan").html(),

    render: function () {
      
      var vars = this.model.toJSON()
      this.$el.append(_.template(this.template, vars))
    }

  })

})