$(document).ready(function(){
	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins : [ 'dayGrid' ],
		locale: 'ko',
		eventLimit: true, // for all non-TimeGrid views
		views: {
		  timeGrid: {
		    eventLimit: 4 // adjust to 6 only for timeGridWeek/timeGridDay
		  }
		},
		eventRender: function(info){
			var header = $('<div />', {
		        text: info.event.title
		      }).css({
		    	'border-bottom': '1px solid',
		    	'font-size': '16px',
		        'border-bottom-color': info.event.backgroundColor,
		        'width': '200px',
		        'padding': '10px',
		        'color': '#696969'
		      });
			var content = $('<strong />', {
		        text: '작업내용: '
		      }).css({
		    	 'color': '#000',
		    	 'display': 'inline-block',
		      	 'margin': '12px'
		      });
			var tag = $('<div />').css({
				'text-align': 'left'
			});
			$(tag).append(header);
			$(tag).append(content);
			$(tag).append(info.event.extendedProps.description);
			//tag = document.getElementById('timeline');
			tippy(info.el, {
				  animation: 'scale',
				  theme: 'light',
				  followCursor: 'initial',
				  //content: '<strong>내용: </strong>'+info.event.extendedProps.description
				  content: tag.get(0)
			})
			
			return filter(info);
		},
		eventMouseEnter: function(info){
			$(info.el).css("cursor",'pointer');
		}
		  
	});
	$.ajax({
		url : 'calendarPro',
		method : "POST",
		success : function(res) {
			$(res).each(function(i, v) {
				calendar.addEvent({
					id : 'p'+i,
					type : 'p',
					title : v.pro_name,
					start : v.pro_start,
					end : v.pro_end,
					description: v.pro_info,
					backgroundColor : '#f06595',
					borderColor: $('body').css('background-color')
				});				
			})
		}
	})
	$.ajax({
		url : 'calendarSchTd',
		method : "POST",
		success : function(res) {
			$(res).each(function(i, v) {
				calendar.addEvent({
					id : 's'+i,
					type : 's',
					title : v.sch_name,
					start : v.sch_start,
					end : v.sch_end,
					description: v.sch_info,
					teamList: v.stList,
					backgroundColor : '#9775fa',
					borderColor: $('body').css('background-color')
				});		
				$(v.todoList).each(function(j,val){
					calendar.addEvent({
						id : 't'+j,
						type : 't',
						title : val.t_name,
						start : val.t_start,
						end : val.t_end,
						description: val.t_name,
						teamList: val.id,
						backgroundColor : '#4d638c',
						borderColor: $('body').css('background-color')
					});	
				})
			})
		}
	})

	calendar.render();
	function filter(info){
		var teamList = info.event.extendedProps.teamList
		var isMe = true;
		if(teamList instanceof Array){
			teamList = $.map(teamList,function (v,i) {
				return v.id;
			});
		}
		if($('.isMe').val()=='person' && teamList instanceof Array){
			isMe = teamList.indexOf($('#sessionId').val())>=0;
		}else if($('.isMe').val()=='person' && typeof teamList != 'undefined'){
			isMe = teamList == $('#sessionId').val();
		}
		
		var type = $('input:checkbox.filterType:checked').map(function () {
			return $(this).val();
		}).get();
		$('.filterBox').show();
		$('.fc-right').before($('.filterBox'))
		return type.indexOf(info.event.extendedProps.type)>=0 && isMe;
	}
	$('.filterType').on('click', function(){
		calendar.rerenderEvents();
	})
	
	$('.isMe').on('change',function(){
		calendar.rerenderEvents();
	})
})