$(function() {
    App.Views.MembersView = Backbone.View.extend({

        //     tagName: "",
        //     className: "",
        searchText: "",
        events: {
            "click .Search": function(e) {
                this.renderTable($('#searchText').val().toLowerCase())
            }

        },

        render: function() {
            var OptionStr = "Select Community";
            var name = "SHT";
            var name1 = "PHT";
            /*for(var i=0; i<3; i++){
                name += "<option>" + i + "</option>";
            }*/

            this.$el.append('<div id="parentMembers"><h3 id="membersSearchHeading"><input id="searchText" type="Text" placeholder=""><button id="searchButtonOnMembers" class="Search btn btn-info">'+App.languageDict.attributes.Search+'</button></h3><h3><select id="selectCommunity" class="Search"><option value="">' + OptionStr +'</option>' + '<option>' + name + '</option>' + '<option>' + name1 + '</option>' + '</select>'+App.languageDict.attributes.Members+'<a id="AddNewMember" style="margin-left:20px" class="btn btn-success" href="#member/add">'+App.languageDict.attributes.Add+' '+App.languageDict.attributes.New+' '+App.languageDict.attributes.Member+'</a></h3></div>');
            this.$el.append('<div id="memberTable"></div>');
            this.renderTable(searchText,searchCommunity);
        },
        renderTable: function(searchText) {
            App.startActivityIndicator()
            var that = this
            var config = new App.Collections.Configurations()
            config.fetch({
                async: false
            })
            var currentConfig = config.first()
            var cofigINJSON = currentConfig.toJSON()


            code = cofigINJSON.code
            nationName = cofigINJSON.nationName

            var roles = App.Router.getRoles()
            var members = new App.Collections.Members()
            members.searchText = searchText
            members.fetch({
                success: function(response) {
                    membersTable = new App.Views.MembersTable({
                        collection: response
                    })
                  //  membersTable.community_code = code + nationName.substring(3, 5)
                    membersTable.community_code = code;

                    if (roles.indexOf("Manager") > -1) {
                        membersTable.isadmin = true
                    } else {
                        membersTable.isadmin = false
                    }
                    membersTable.render();
                    $('#memberTable').html(membersTable.el)
                    App.stopActivityIndicator()
                },
                error: function() {
                    App.stopActivityIndicator()
                }
            })

        },

        changeDirection : function () {

            var library_page = $.url().data.attr.fragment;
            if (library_page == "members") {
                if(App.languageDict.get('directionOfLang').toLowerCase()==="right") {
                    $('#parentMembers').addClass('addResource');
                    $('#memberTable').addClass('addResource');
                }

            else
                {
                    $('#parentMembers').removeClass('addResource');
                    $('#memberTable').removeClass('addResource');
                }
            }
        }

    })

})