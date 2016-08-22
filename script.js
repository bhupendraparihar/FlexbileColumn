function Column(){
	var list = [];
	this.fill = function(a){
		this.list = a;
	}
	this.render = function(){
		console.log(this.list);
		var listItems = this.list.reduce(function(previousValue, currentValue, currentIndex, array) {
  			return previousValue + "<li>"+ currentValue + "</li>";
		},"");
		$('body').append("<ul>" + listItems + "</ul>");
	}
}

function getElementsWithIndexRange(arr,start,end){
	return arr.filter(function(elem, index){
		return index>=start && index<=end;
	})
}

function FlexibleColumn(items,maxCol, minColHeight){
	var n = items.length;
	var maxCol = maxCol;
	var minColHeight = minColHeight;
	
	this.fillColumns  = function(){
		var start;
		var end;
		var  k;
		var newCol
		var noOfColToFill = Math.min(maxCol, Math.floor(n/minColHeight));
		var gap = n - ((Math.floor(n/noOfColToFill)+1)*noOfColToFill);
		if(n < 2*minColHeight){
			var newCol = new Column();
			newCol.fill(items);
			newCol.render();
			return;
		}else if(n%noOfColToFill == 0){
			
			start = 0;
			k = n/noOfColToFill;
			end = k-1;
			for(var i = 1; i <= noOfColToFill; i++) {
				newCol = new Column();
				newCol.fill(getElementsWithIndexRange(items,start,end));
				newCol.render();
				start = end +1;
				end += k;
			}
			return;
		}

		k = Math.floor(n/noOfColToFill) + 1;
			start = 0;
			end = k-1;
			
		for(var i = 1; i <= noOfColToFill; i++){
			newCol = new Column();
			newCol.fill(getElementsWithIndexRange(items,start,end));
			newCol.render();
			start = end +1;
			if(i >= noOfColToFill + gap){
				end+=k-1;
			}else{
				end += k;	
			}
		}

		return;
	}
}

(function(){
	var numbers = [];
	for(var i = 1; i <= 100; i++){
		numbers.push(i);
		var fc = new FlexibleColumn(numbers, 3, 3);
		fc.fillColumns();
		$('body').append('<div class="clear"></div>');
	}
})();