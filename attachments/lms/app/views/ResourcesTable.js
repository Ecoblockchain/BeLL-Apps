$(function() {

  App.Views.ResourcesTable = Backbone.View.extend({

    tagName: "table",
	isAdmin:null,
    className: "table table-striped",

    //template: $('#template-ResourcesTable').html(),
	events : {
		"click #backButton": function (e) {
			if(this.collection.skip>0)
			{
				this.collection.skip = this.collection.skip-20
			}
			this.collection.fetch({async:false})
			if(this.collection.length>0)
			{
				this.render()
			}
		},
		"click #nextButton": function (e){
			this.collection.skip = this.collection.skip+20
			this.collection.fetch({async:false})
			if(this.collection.length>0)
			{
				this.render()
			}
		}
	},
    initialize: function(){
      //this.$el.append(_.template(this.template))
     
    },
  addOne: function(model){
      var resourceRowView = new App.Views.ResourceRow({model: model,admin:this.isAdmin})
      resourceRowView.isManager = this.isManager
      resourceRowView.render()  
      this.$el.append(resourceRowView.el)
    },

    addAll: function(){
           if(this.collection.length==0)
           {
                  this.$el.append("<tr><td>No resource found</td></tr>")
           } 
    if(this.isadmin > -1){
    	this.isAdmin=1
    }
    else{
    	this.isAdmin=0
    }
      this.collection.forEach(this.addOne, this)
    },

    render: function() {
       this.$el.html("<tr><th>Title</th><th colspan='6'>Actions</th></tr>")
      this.addAll()
      this.$el.append('<br/><br/>')
      if(this.collection.skip!=0)
      {
      	this.$el.append('<a class="btn btn-success" id="backButton">Back</a>&nbsp;&nbsp;')
      }
      this.$el.append('<a class="btn btn-success" id="nextButton">Next</a>')
    }

  })

})

