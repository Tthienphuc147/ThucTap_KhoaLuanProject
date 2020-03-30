$(document).ready(function() {
	var ajax_sending=false;
	$('.btn_themsp').click(function(e) {
		e.preventDefault()
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		var sanphamid=$(this).attr('sanphamid')
		var soluong=$('.input_soluong').val()
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/add',
			type: 'POST',
			data: {sanphamid:sanphamid,soluong:soluong},
		})
		.done(function(data) {
			console.log("success");

			if(data.thongbao==false){
				if(data.over==true){
					alert('Số lượng sản phẩm trong giỏ đã vượt quá 10')
				}
				else{
					alert('Số lượng sản phẩm trong kho hiện tại: '+data.soluong)
				}
				
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('.badge_cart').load('count_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
		});
		
	});
	$('.btn_muangay').click(function(e) {
		e.preventDefault()
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		var sanphamid=$(this).attr('sanphamid')
		var soluong=$('.input_soluong').val()
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/add',
			type: 'POST',
			data: {sanphamid:sanphamid,soluong:soluong},
		})
		.done(function(data) {
			console.log("success");

			if(data.thongbao==false){
				if(data.over==true){
					alert('Số lượng sản phẩm trong giỏ đã vượt quá 10')
				}
				else{
					alert('Số lượng sản phẩm trong kho hiện tại: '+data.soluong)
				}
				
			}
			else{
				window.location.href = "thanhtoan";
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('.badge_cart').load('count_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
		});
		
	});

	$('body').on('click','.btn_themnhanh',function(e) {
		e.preventDefault()
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		var sanphamid=$(this).attr('sanphamid')
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/add',
			type: 'POST',
			data: {sanphamid:sanphamid,soluong:1},
		})
		.done(function(data) {
			console.log("success");
			console.log(data);
			if(data.thongbao==false){
				if(data.over==true){
					alert('Số lượng sản phẩm trong giỏ đã vượt quá 10')
				}
				else{
					alert('Số lượng sản phẩm trong kho hiện tại: '+data.soluong)
				}
			}

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('.badge_cart').load('count_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
		});
		
	});

	$('.btn_delete_all_cart').click(function(e) {
		e.preventDefault()
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/delete_all',
			type: 'POST',
		})
		.done(function(data) {
			console.log("success");
			console.log(data);
		})
		.always(function(data){
			$('.badge_cart').load('count_cart')
			$('.box_row_cart').html('')
			$('.count_cart_small').load('count_cart')
			$('.total_cart_small').load('total_cart')
			$('.total_cart_biger').load('total_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
		})
	});
	$('.input_soluong_cart').change(function(e){
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		
		var soluong=$(this).val()
		var rowid=$(this).attr('rowid')
		var err=0;
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/update',
			type: 'POST',
			async:false,
			data: {rowid:rowid,soluong:soluong},
		})
		.done(function(data) {
			console.log("success");
			console.log(data);
			if(data.thongbao==false){
				
				if(data.over==true){
					alert('Số lượng sản phẩm trong giỏ đã vượt quá 10')
				}
				else{
					err=data.soluong;
					alert('Số lượng sản phẩm trong kho hiện tại: '+data.soluong)
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('.badge_cart').load('count_cart')
			$('.count_cart_small').load('count_cart')
			$('.total_cart_small').load('total_cart')
			$('.total_cart_biger').load('total_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
			
			
		});
		if(err!=0){
			$(this).val(err)
		}
		
		
	})
	$('.btn_delete_cart').click(function(e){
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		var rowid=$(this).attr('rowid')
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/cart/delete',
			type: 'POST',
			data: {rowid:rowid},
		})
		.done(function(data) {
			console.log("success");
			console.log(data);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('#'+rowid).remove()
			$('.badge_cart').load('count_cart')
			$('.count_cart_small').load('count_cart')
			$('.total_cart_small').load('total_cart')
			$('.total_cart_biger').load('total_cart')
			$('.box_info_cart').load('cart_mini')
			setTimeout(function(){
				ajax_sending=false

			},200);
		});
	})
	$('body').on('click','.btn_send_danhgia',function(e){
		e.preventDefault()
		if(ajax_sending==true){
			return false;
		}
		ajax_sending=true
		$(this).attr('disabled',true)
		var rate=$('.rating_diem').rating('rate')
		var content=$('.rating_content').val()
		var idsanpham=$(this).attr('idsanpham')
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: 'ajax/rating',
			type: 'post',
			data: {Diem: rate,NoiDung:content,idSanPham:idsanpham},
		})
		.done(function(data) {
			console.log("success");
			if(data.error==false){
				$('#menu_danhgia').load('ajax/rating/'+idsanpham)
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			setTimeout(function(){
				ajax_sending=false
			},200);
		});
	})
	$(document).ready(function() {
		$('body').on('click','.btn_del_danhgia',function(e){
			iddanhgia=$(this).attr('iddanhgia')
			idsanpham=$(this).attr('idsanpham')
			$.get('ajax/danhgia/del/'+iddanhgia,function(data){
				console.log(data);
				if(data.error==false){
					$('#menu_danhgia').load('ajax/rating/'+idsanpham)
				}
			})
		})
	});
});