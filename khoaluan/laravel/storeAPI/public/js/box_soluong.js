$( document ).ready(function() {    
	$('.btn-number').click(function(e){        
		e.preventDefault();                
		var fieldName = $(this).attr('data-field');        
		var type      = $(this).attr('data-type');        
		var input = $("input[name='"+fieldName+"']");        
		var currentVal = parseInt(input.val());        
		if (!isNaN(currentVal)) {            
			if(type == 'minus') {                
				var minValue = parseInt(input.attr('min'));                 
				if(!minValue) minValue = 1;                
				if(currentVal > minValue) {                    
					input.val(currentVal - 1).change();                
				}                 
				if(parseInt(input.val()) == minValue) {                    
					$(this).attr('disabled', true);                
				}                
			} 
			else if(type == 'plus') {                
				var maxValue = parseInt(input.attr('max'));                
				if(!maxValue) maxValue = 10;                
				if(currentVal < maxValue) {                    
					input.val(currentVal + 1).change();                
				}                
				if(parseInt(input.val()) == maxValue) {                    
					$(this).attr('disabled', true);                
				}                
			}        
		} 
		else {            
			input.val(0);        
		}    
	});    
	$('.input-number').focusin(function(){       
		$(this).data('oldValue', $(this).val());    
	});    
	$('.input-number').change(function() {                
		var minValue =  parseInt($(this).attr('min'));        
		var maxValue =  parseInt($(this).attr('max'));        
		if(!minValue) minValue = 1;        
		if(!maxValue) maxValue = 10;        
		var valueCurrent = parseInt($(this).val());                
		var name = $(this).attr('name');        
		if(valueCurrent >= minValue) {            
			$(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')        
		} 
		else {            
			alert('Số lượng tối thiểu là 1');            
			$(this).val($(this).data('oldValue'));        
		}        
		if(valueCurrent <= maxValue) {            
			$(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')        
		} else {            
			alert('Số lượng tối đa là 10');            
			$(this).val($(this).data('oldValue'));        
		}                    
	});    

});