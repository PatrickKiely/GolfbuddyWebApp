function pd( func ) {
  return function( event ) {
    event.preventDefault()
    func && func(event)
  }
}

document.ontouchmove = pd()

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g,
  escape:      /\{\{-(.+?)\}\}/g,
  evaluate:    /\{\{=(.+?)\}\}/g
};

var AppRouter = Backbone.Router.extend({
	routes : {
		'coursedetails': 'coursedetails',
		'course': 'showTocourseList',
	},

	coursedetails : function() { 
	    var self = this
		_.bindAll(self)
        
		},
	
	showTocourseList : function() { 
	    var self = this
		_.bindAll(self)
		},
})

var i = 0

var app = {
  model: {},
  view: {},
  tabs: {
   home:    { index:i++, icon:'home_24', },
	course:  { index:i++, icon:'list_24', },
	friends:   { index:i++, icon:'friends_24',}, 
    score:  { index:i++, icon:'calc_24', },
    more: { index:i++, icon:'more_24', },
  },
  platform: /Android/.test(navigator.userAgent)?'android':'ios',
  initialtab: 'home'
}

console.log(app)


var bb = {
  model: {},
  view: {},
  social: [{name:'twitter'},{name:'facebook'}]
}


bb.init = function() {

  bb.model.State = Backbone.Model.extend({    
    defaults: {
      current: 'none'
    },
    
  })
  
  var scrollContent = {
    scroll: function() {
      var self = this
      setTimeout( function() {
        if( self.scroller ) {
          self.scroller.refresh()
        } else {
          self.scroller = new iScroll( $("div[data-role='listview']")[0] )
        }
      },1)
    }}
  
 

bb.model.Item = Backbone.Model.extend(_.extend({    
    defaults: {
      text: '',
      handicap: '',
      score: '',
      notes: '',
      DOP: '',
     },
    initialize: function() {
      var self = this
      _.bindAll(self)
    },
		
		toggle : function() {
			this.save({
				checked : !this.get("checked")
				
			});
		}

  }))  
  
bb.model.Items = Backbone.Collection.extend(_.extend({    
    model: bb.model.Item,
	url: '/api/rest/golf',

    initialize: function() {
      var self = this
      _.bindAll(self)
      self.count = 0
      self.on('reset',function() {
        self.count = self.length
      })
    },

	additem: function(text, handicap, score, notes, DOP) {
      var self = this
      var item = new bb.model.Item({
        text : text,
		handicap : handicap,
		score: score,
		notes : notes,
		DOP : DOP,
		
      })
      self.count++
	  self.add(item)
      item.save() 
	}

  }))

     bb.view.Head = Backbone.View.extend(_.extend({    
    events: {
		'tap #cancel': function(){ 
		var self = this
		_.bindAll(self)
		self.hideAddItem()
		},
		
		'tap #noupdate': function(){ 
		var self = this
		_.bindAll(self)
		console.log('here1')
		self.hideshowDetails()
		},
		
		
		'tap #add': function(){ 
		var self = this
		_.bindAll(self)
		self.setElement("div[id='main']")
		self.elem = {
		
			add : self.$el.find('#add'),
			cancel : self.$el.find('#cancel'),
			newitem : self.$el.find('#newitem'),
			newitemtext : self.$el.find('#newitemtext'),
	//		newitemtext : self.$el.find('#text'),
			handicap : self.$el.find('#handicap'),
			score : self.$el.find('#score'),
			notes : self.$el.find('#notes'),
			DOP : self.$el.find('#DOP'),
			save : self.$el.find('#save'),
			
			}	
			
		self.showAddItem()
		},
	  
		
		'tap #details': function(){ 
		var self = this
		_.bindAll(self)
		self.showDetails()
		},

		
		'tap #newitemtext' : function() {
			var self = this
			_.bindAll(self)
			$('#newitemtext').focus();
		},
		
		'tap #handicap' : function() {
			var self = this
			_.bindAll(self)
			$('#handicap').focus();
		},
		
		'tap #score' : function() {
			var self = this
			_.bindAll(self)
			$('#score').focus();
		},
		
		'tap #notes' : function() {
			var self = this
			_.bindAll(self)
			$('#notes').focus();
		},
		
		'tap #DOP' : function() {
			var self = this
			_.bindAll(self)
			$('#DOP').focus();
		},
		
		'tap #save' : function() {
			var self = this
				_.bindAll(self)
			self.setElement("div[id='main']")
			self.elem = {
				newitemtext : self.$el.find('#newitemtext'),
				add : self.$el.find('#add'),
				cancel : self.$el.find('cancel'),
				handicap : self.$el.find('#handicap'),
			    score : self.$el.find('#score'),
			    notes : self.$el.find('#notes'),
				DOP : self.$el.find('#DOP'),
                newitem : self.$el.find('#newitem')				
			}
		var text = self.elem.newitemtext.val()
		var handicap = self.elem.handicap.val()
		var score = self.elem.score.val()
		var notes = self.elem.notes.val()
		var DOP = self.elem.DOP.val()
				
		if(0 == text.length) {
			return
			}
		self.items.additem(text, handicap, score, notes, DOP)
		self.hideAddItem()
		},

		'tap #update' : function() {
			var self = this
				_.bindAll(self)
			self.setElement("div[id='main']")
			self.elem = {
				newitemtext : self.$el.find('#newitemtext'),
				add : self.$el.find('#add'),
				cancel : self.$el.find('cancel'),
				handicap : self.$el.find('#handicap'),
			    score : self.$el.find('#score'),
			    notes : self.$el.find('#notes'),
				DOP : self.$el.find('#DOP'),
                newitem : self.$el.find('#newitem')				
			}
		var text = self.elem.newitemtext.val()
		var handicap = self.elem.handicap.val()
		var score = self.elem.score.val()
		var notes = self.elem.notes.val()
		var DOP = self.elem.DOP.val()
				
		if(0 == text.length) {
			return
			}
		self.items.additem(text, handicap, score, notes, DOP)
		self.hideAddItem()
		},
		
		'tabchange #tab_home': function(){ 
		var self = this
		_.bindAll(self)
		self.hideAddButton()
		},
		
		'tap #faqshow': function(){ 
		var self = this
		_.bindAll(self)
		self.showFAQ()
		},

		'tap #aboutshow': function(){ 
		var self = this
		_.bindAll(self)
		self.showAbout()
		},
		
		'tap #contactshow': function(){ 
		var self = this
		_.bindAll(self)
		self.showContact()
		},

		'tap #mapshow': function(){ 
		var self = this
		_.bindAll(self)
		self.showMap()
		}
		
    },

    initialize: function( items ) {
		var self = this
		_.bindAll(self)
		self.items = items
		self.setElement("div[data-role='header']")
		self.elem = {
			add: self.$el.find('#add'),
			title: self.$el.find('h1')
      }
      
		self.tm = {
			title: _.template( self.elem.title.html() )
      }

    },

    render: function() {
	
      var self = this
      _.bindAll(self)
      self.setElement("div[data-role='header']")      
	  			self.elem = {
				add : self.$el.find('#add'),
				title : self.$el.find('#titlebar')
			}
      var loaded = 'loaded' == app.model.state.get('items')
      self.elem.title.html( self.tm.title({
        title: loaded ? self.items.length+' Items' : 'Loading...'
      }) )

      if( loaded ) {
        self.elem.add.show()
      }
    },
	
	showAddItem: function(){
		$('#add').hide();
		$('#cancel').show();
		$('#newitem').slideDown();
		
		$('#newitemtext').focus();
	},
	
	hideAddItem: function(){
		$('#add').show();
		$('#cancel').hide();
		$('#newitem').slideUp();
		$('#newitemtext').val('').blur()	
	},
	
	hideAddButton: function (){
		$('#add').hide()
	},
	
	showDetails: function(){
	//	$('#update').show();
	//	$('#cancel').show();
		
	//	$('#content_course').hide();
	//	$('#content_details').show();
	//	$('#newitemtext').focus();
		console.log('hide content_details');
	//	$('#content_details').hide(); 
	},

	hideshowDetails: function(){
		console.log('here');
		$('#content_details').hide();
	},


	showFAQ: function(){
		$('#faqdown').show();
		$('#aboutdown').hide();
		$('#contactdown').hide();
		$('#mapdown').hide();
	},

	showAbout: function(){
		$('#faqdown').hide();
		$('#aboutdown').show();
		$('#contactdown').hide();
		$('#mapdown').hide();	
	},
	
	showContact: function(){
		$('#faqdown').hide();
		$('#aboutdown').hide();
		$('#contactdown').show();
		$('#mapdown').hide();	
	},
	
	showMap: function(){
		$('#faqdown').hide();
		$('#aboutdown').hide();
		$('#contactdown').hide();
		$('#mapdown').show();	
	},


	
}))





   bb.view.SocialMsg = Backbone.View.extend({    
    initialize: function( items ) {
      var self = this
      _.bindAll(self)

      self.elem = {msg:{}}
      app.social.forEach(function(service){
        self.elem.msg[service.name] = $('#social_msg_'+service.name)
        self.elem.msg[service.name].tap(function(){
          self.socialmsg(service)
        })
      })

      app.model.state.on('change:user',self.render)
    },

    render: function() {
      var self = this

      var user = app.model.state.get('user')
      app.social.forEach(function(service){
        var btn = self.elem.msg[service.name].show()

        if( user && user.service === service.name ) {
          btn.show()
        }
        else {
          btn.hide()
        }
      })
    },

    socialmsg: function( service ) {
      console.log(service.name)

      var death = app.model.state.get('death')

      http.post('/user/socialmsg/'+death.getTime(),{},function(res){
        alert( res.ok ? 'Message sent!' : 'Unable to send message.')
      })
    }
  })
  
  bb.view.Navigation = Backbone.View.extend({    
    initialize: function( items ) {
      var self = this
      _.bindAll(self)

      self.elem = {
        header: $("#header"),
        footer: $("#footer")
      }

      self.elem.header.css({zIndex:1000})
      self.elem.footer.css({zIndex:1000})

      function handletab(tabname) {
        return function(){
          app.model.state.set({current:tabname})
        }
      }

      var tabindex = 0
      for( var tabname in app.tabs ) {
        console.log(tabname)
        $("#tab_"+tabname).tap(handletab(tabname))
      }

      app.scrollheight = window.innerHeight - self.elem.header.height() - self.elem.footer.height()
      if( 'android' == app.platform ) {
        app.scrollheight += self.elem.header.height()
      }
    },

    render: function() {
    }
  })


  bb.view.Content = Backbone.View.extend({    
    initialize: function( initialtab ) {
      var self = this
      _.bindAll(self)

      self.current = initialtab
      self.scrollers = {}

      app.model.state.on('change:current',self.tabchange)

      window.onresize = function() {
        self.render()
      }

      app.model.state.on('scroll-refresh',function(){
        self.render()
      })
    },

    render: function() {
      var self = this

      app.view[self.current] && app.view[self.current].render()

	  console.log('Showing self.current : ' + self.current + ' : ' + app.scrollheight)
	  
      var content = $("#content_"+self.current)
      if( !self.scrollers[self.current] ) {
        self.scrollers[self.current] = new iScroll("content_"+self.current)      
      }

      content.height( app.scrollheight ) 

      setTimeout( function() {
        self.scrollers[self.current].refresh()
      },300 )
    },

    tabchange: function() {
      var self = this

      var previous = self.current
      var current = app.model.state.get('current')
      console.log( 'tabchange prev='+previous+' cur='+current)

      $("#content_"+previous).hide().removeClass('leftin').removeClass('rightin')
      $("#content_"+current).show().addClass( app.tabs[previous].index <= app.tabs[current].index ?'leftin':'rightin')
      self.current = current

      self.render()
    }
  })


  bb.view.home = Backbone.View.extend({
    initialize: function() {
      var self = this
      _.bindAll(self)
	}
    
  },scrollContent)
  

  bb.view.List = Backbone.View.extend(_.extend({    
    initialize: function( items ) {
    var self = this
    _.bindAll(self)
    self.setElement('#list')
    self.items = items
    self.items.on('destroy',self.render)
	self.items.on('sync', self.appenditem)	
	self.items.on('fetch',self.render)
    },
    render: function() {
      var self = this
      self.$el.empty()
      self.items.each(function(item){
        self.appenditem(item)
		})
		return this;
	},
    appenditem: function(item) {
      var self = this
      var itemview = new bb.view.Item({
        model: item
      })    
	  self.$el.append(itemview.el)
	  self.scroll()
    }
  },scrollContent))
  
  
  

  bb.view.Item = Backbone.View.extend(_.extend({    
    events: {
	
		'tap #noupdate': function(){ 
		var self = this
		_.bindAll(self)
		var itemdata = self.model.attributes
		console.log('hiding item : ' + '#rm_' + itemdata.id + '_content_details' + ' hide')
		$('#rm_' + itemdata.id + '_content_details').hide()		
		self.hideshowDetails()
		},
		
		
		'tap .delete-item' : function() {
		var self = this
		_.bindAll(self)
		var itemdata = self.model.attributes
		self.model.destroy()
		//$('#rm_' + itemdata.id).slidedown()	
		},
		
		'tap .show-item' : function() {
		var self = this
		_.bindAll(self)
		var itemdata = self.model.attributes
		console.log('showing item : ' +'#rm_' + itemdata.id + '_content_details')
		$('#rm_' + itemdata.id + '_content_details').show()		
		},

		'swiperight .tm' : function() {
			var self = this
			_.bindAll(self)
			var itemdata = self.model.attributes
			app.model.items.each(function(item){
				$('#rm_' + item.attributes.id).hide()
			})
			$('#rm_' + itemdata.id + '_delete').show()
		},
		/*
		'swipeleft .tm' : function() {
			var self = this
			_.bindAll(self)
			var itemdata = self.model.attributes
			app.model.items.each(function(item){
				$('#rm_' + item.attributes.id).hide()
			})
			$('#rm_' + itemdata.id + '_content_details').show()
			console.log('#rm_' + itemdata.id + '_content_details')
		},
		*/
		
		'swipeleft .tm' : function() {
			var self = this
			_.bindAll(self)
		var itemdata = self.model.attributes
		console.log('showing item : ' +'#rm_' + itemdata.id + '_content_details')
		
		$('#rm_' + itemdata.id + '_delete').hide()
		$('#rm_' + itemdata.id + '_content_details').show()	
		
		},
		/*
		'swipeleft .tm' : function() {
			var self = this
			_.bindAll(self)
			var itemdata = self.model.attributes
			$('#rm_' + itemdata.id+;_delete').hide()
		}*/
    },

    initialize: function() {
      var self = this
      _.bindAll(self)
      self.render()
	 
    },

	render: function() {
      var self = this
      var html = self.tm.item( self.model.toJSON() )
      self.$el.append( html ) 
	  console.log('hiding content');
//	  $('#content_details').hide();

    }
  },{
    tm: {
      item: _.template( $('#list').html() )
    },
	
	hideshowDetails: function(){
		console.log('here');
		$('#content_details').slideUp();
	},
	
  }))


  bb.view.friends = Backbone.View.extend({
    initialize: function() {
      var self = this
      _.bindAll(self)

      self.elem = {
      }
      
    },
    
    render: function() {
    }
  })

  bb.view.score = Backbone.View.extend({
    initialize: function() {
      var self = this
      _.bindAll(self)

      self.elem = {
      }
    },
    render: function() {
    }
  })

  bb.view.more = Backbone.View.extend({
    initialize: function() {
      var self = this
      _.bindAll(self)

      self.elem = {
      }
    },
    render: function() {
    }
  })
  
  /* new page for details coursedetails = Lists */
 bb.view.coursedetails = Backbone.View.extend(_.extend({    
    initialize: function( items ) {
    var self = this
    _.bindAll(self)
    self.setElement('#coursedetails')
    self.items = items
    self.items.on('destroy',self.render)
	self.items.on('sync', self.appenditem)	
	self.items.on('fetch',self.render)
    },


    render: function() {
      var self = this
      self.$el.empty()
      self.items.each(function(SavedCourse){
        self.appenditem(SavedCourse)
		})
		return this;
	},


    appenditem: function(SavedCourse) {
      var self = this
      var itemview = new bb.view.SavedCourse({
        model: SavedCourse
      })    
	  self.$el.append(itemview.el)
	  self.scroll()
    }

  },scrollContent))
  
  
  
  
  
 bb.view.SavedCourse = Backbone.View.extend(_.extend({    
    events: {
			
		'tap .delete-item' : function() {
		var self = this
		_.bindAll(self)
		var itemdata = self.model.attributes
	//	$('#rm_' + itemdata.id).slidedown()	
		self.model.destroy()
		},
/*
		'tap .show-item' : function() {
		var self = this
		_.bindAll(self)
		var itemdata = self.model.attributes
		$('#rm_' + itemdata.id).slidedown()		
		},
	*/	
		'swiperight .tm' : function() {
			var self = this
			_.bindAll(self)
			var itemdata = self.model.attributes
			app.model.items.each(function(item){
				$('#rm_' + item.attributes.id).hide()
			})
			$('#rm_' + itemdata.id).show()
		},
		'swipeleft .tm' : function() {
			var self = this
			_.bindAll(self)
			var itemdata = self.model.attributes
			$('#rm_' + itemdata.id).hide()
		}
    },

    initialize: function() {
      var self = this
      _.bindAll(self)
      self.render()
    },

	render: function() {
      var self = this
      var html = self.tm.item( self.model.toJSON() )
      self.$el.append( html ) 
    }
  },{
    tm: {
      item: _.template( $('#coursedetails').html() )
    }
  }))
  
  

 bb.model.Map = Backbone.Model.extend({
	 
	  defaults: { 
		  			zoom: 15,
		  			mapTypeId: google.maps.MapTypeId.ROADMAP
	  			},
  initialize: function() {
	  var self = this
  },
 
 })

  bb.view.Location = Backbone.View.extend(_.extend({  
	   el: '#gmap',
	    initialize: function() {
	    	 console.log(this.model)
	    	  var self = this

	    	  this.map = new google.maps.Map(
	    	            this.el,
	    	            this.model.toJSON()

	    	        ); 
	    	
	      navigator.geolocation.getCurrentPosition(function(position) {
	    	        var latitude = position.coords.latitude;
	    	        var longitude = position.coords.longitude;
	    	        var geolocpoint = new google.maps.LatLng(latitude, longitude);
	    	      //  this.map.setCenter(geolocpoint, 13);
	    	      self.map.setCenter(geolocpoint,40);
				  
				   console.log("latitude "+latitude)
					console.log("longitude "+longitude)
					console.log("geolocpoint "+geolocpoint)
	    	  })
	    	
	       this.render();
	    },
	    render: function() {
	        return this;
	    },
  }))
  

    
  bb.view.Welcome = Backbone.View.extend(_.extend({  
	  events: {
		   'tap #welcome': function(){ 
		        var self = this
				{
				    $.mobile.changePage("#main",  { transition: "slideup", changeHash: false });	
					return false
				}   
		      }
		 
			},
	   
		   initialize: function() {
		     var self = this
			 self.setElement('#welcome')
		   },
		
		   render: function() {
		     var self = this
		   }
 }))
 
 
  
}



app.init_browser = function() {
  if( browser.android ) {
    $("#main div[data-role='content']").css({
      bottom: 0
    })
  }
}

app.boot = function() {
  document.ontouchmove = function(e){ e.preventDefault(); }
  $( '#main' ).live( 'pagebeforecreate',function(){
    app.boot_platform()
  })
}

console.log("Platform : "+app.platform)

app.boot_platform = function() {
  if( 'android' == app.platform ) {
    $('#header').hide()
    $('#footer').attr({'data-role':'header'})
    $('#content').css({'margin-top':59})
  }
}

app.init_platform = function() {
  if( 'android' == app.platform ) {
    $('li span.ui-icon').css({'margin-top':-4})
  }
}

app.start = function() {
  $("#tab_"+app.initialtab).tap()
}

app.erroralert = function( error ) {
  alert(error)
}


app.init = function() {
  console.log('start init')

  app.init_platform()
  
  bb.init()
  
	//app.view.Welcome = new bb.view.Welcome();
	//app.view.Welcome.render();		
	
	app.model.state = new bb.model.State()
	app.model.items = new bb.model.Items()


	app.view.head = new bb.view.Head(app.model.items)
	app.view.head.render()
  
	app.view.list = new bb.view.List(app.model.items)
  
	app.view.navigation = new bb.view.Navigation(app.initialtab)
	app.view.navigation.render()

	app.view.content = new bb.view.Content(app.initialtab)
	app.view.content.render()
  
	app.view.home    = new bb.view.home()
	//app.view.coursedetails   = new bb.view.coursedetails()
	app.view.score  = new bb.view.score()
	app.view.more = new bb.view.more()
  
	
	app.model.map = new   bb.model.Map();
	app.view.Location = new bb.view.Location({model:  app.model.map});		
  
	app.mygolfRouter = new AppRouter();

	app.model.items.fetch( {
    success: function() {
    app.model.state.set({items:'loaded'})
    app.view.list.render()
    }
  })
  
  app.model.SavedCourse.fetch( {
    success: function() {
      app.model.state.set({items:'loaded'})
      app.view.list.render()
    }
  })
  app.start()

  console.log('end init')
  
}


app.boot()
$(app.init)
