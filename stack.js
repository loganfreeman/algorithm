var node = function() {
	var data;
	var next = null;
}

var stack = function() {
	this._top = null;

	this.push = function(data) {
		if (this._top === null) {
			this._top = new node();
			this._top.data = data;
		} else {
			var temp = new node();
			temp.data = data;
			temp.next = this._top;
			this._top = temp;
		}
	};

	this.pop = function() {
		if (!this._top)
			return null;
		var temp = this._top;
		var data = this._top.data;
		this._top = this._top.next;
		temp = null;
		return data;
	};

	this.print = function() {
		var node = this._top;
		while (node !== null) {
			console.log(node.data);
			node = node.next;
		}
	};

	this.empty = function() {
		return this._top === null;
	}

	this.top = function() {
		if (this.empty())
			return null;
		return this._top.data;
	};
}

module.exports = stack;