import "@styles/main.scss"
/*
	getList(){

		fetch("/assets/requests/list.json")
		.then( response => response.json() )
		.then( data => {

			for( let key in data ){
				const elem = data[ key ];
				this.add({
					id: elem.id,
					title: elem.title,
					order: elem.srt
				}, elem.parent_id );
			};

		}).catch( error => {

		});

		return;
	};
 */

class Tree{


	constructor(){
		this.main = document.getElementById( "main" );
	}


	rootText(){
		this.rootTitle =  document.createElement( "p" );
		this.rootTitle.className = "root-title";
		this.rootTitle.innerText = "Choose your destiny";
		this.root.appendChild(this.rootTitle );
	}

	rootButtons(){

		this.btn={
			addElem: document.createElement( "p" ),
			deleteElem:document.createElement( "p" )
		};

		this.btn.addElem.className = "root-add";
		this.btn.addElem.innerText = "Add Element";

		this.btn.deleteElem.className = "root-remove";
		this.btn.deleteElem.innerText = "Remove Element";

		for( let key in this.btn ){

			this.btn.elems = this.btn[ key ];
			this.root.appendChild( this.btn.elems );
		}

		this.btn.addElem.addEventListener("click", () =>this.addLine() );
		this.btn.deleteElem.addEventListener("click", () =>this.deleteLine() );
	}

	addLine(){
		this.line = document.createElement( "p" );
		this.line.className = "line";
		this.blockElems.appendChild( this.line );
	}

	deleteLine(){

		this.blockElems.removeChild(this.blockElems.childNodes[0]);
		console.log(this.blockElems.childNodes);
	}

	start(){

		this.root = document.createElement( "div" );
		this.root.className = "root";

		this.blockElems =  document.createElement( "div" );
		this.blockElems.className = "block-elem";
		this.root.appendChild( this.blockElems );

		this.rootText();
		this.rootButtons();

		this.main.appendChild( this.root );

		console.log( this.main );
	}


}
//
//let tree = new Tree();
//tree.start();

class Branch{

	constructor(){
		this.elem = document.createElement( "div" );
		this.parent = null;
		this.list = [1,2,3,4];
	};

	add(){
		let branch = new Branch();
		branch.parent = this;
		this.list.push( branch );
	};
	removeChild( branch ){

		if( !branch )
			return;

		let index = -1;

		for( let child of this.list ){

			index++;

			if( child.elem === branch.elem ){
				branch.elem.remove();
				this.list.splice( index, 1 );
			}

		}

	};
	remove(){

		if( !this.parent )
			return;

		this.parent.removeChild( this );

	};
	rename(){};
	expand(){};
	reduce(){};
}
class Tree2{

	constructor(){
		this.branch = new Branch();
	};

};

let tree = new Tree2();
document.body.appendChild( tree.branch.elem );