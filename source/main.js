import "@styles/main.scss"
import "@styles/tree.scss"

class Element{

	constructor(){
		this.name = "";
		this.id = Element.count++;
		this.parent = null;
		this.children = [];
		this.table = {};
		this.isExpanded = false;

		this.ui = {
			wrap: document.createElement( "div" ),
			expand: document.createElement( "div" ),
			name: document.createElement( "div" ),
			add: document.createElement( "div" ),
			remove: document.createElement( "div" ),
			children: document.createElement( "div" )
		};

		this.ui.wrap.className = "tree-element";
		this.ui.expand.className = "tree-element-expand tree-element-expand-closed";
		this.ui.name.className = "tree-element-name";
		this.ui.add.className = "tree-element-add";
		this.ui.remove.className = "tree-element-remove";
		this.ui.children.className = "tree-element-children tree-element-children-closed";

		this.ui.wrap.append( this.ui.name );
		this.ui.wrap.append( this.ui.expand );
		this.ui.wrap.append( this.ui.add );
		this.ui.wrap.append( this.ui.remove );
		this.ui.wrap.append( this.ui.children );

		this.ui.expand.addEventListener( "click", ( event ) => {

			if( this.isExpanded )
				this.reduce();
			else
				this.expand();

		});
		this.ui.add.addEventListener( "click", ( event ) => {
			let element = new Element();
			element.rename( "Name: " + element.id );
			this.expand();
			this.add( element );
		});
		this.ui.remove.addEventListener( "click", ( event ) => {

			if( !this.parent )
				return;

			this.parent.remove( this );

		});

	};

	index( needle ){

		let index = -1;

		for( const element of this.children ){

			index++;

			if( element.id === needle.id )
				return index;

		};

		return -1;
	};
	add( element ){

		if( this.index( element ) > -1 )
			return;

		this.children.push( element );
		element.parent = this;

		//#DOM
		this.ui.children.append( element.ui.wrap );

	};
	remove( element ){

		const index = this.index( element );

		if( index === -1 )
			return;

		this.children.splice( index, 1 );
		element.parent = null;

		//#DOM
		element.ui.wrap.remove();

	};
	rename( name ){

		this.name = name || "";

		//#DOM
		this.ui.name.innerHTML = this.name;

	};
	expand(){
		this.ui.children.classList.remove( "tree-element-children-closed" );
		this.ui.expand.classList.remove( "tree-element-expand-closed" );
		this.isExpanded = true;
	};
	reduce(){
		this.ui.children.classList.add( "tree-element-children-closed" );
		this.ui.expand.classList.add( "tree-element-expand-closed" );
		this.isExpanded = false;
	};
	getList( root, treeTable ){

		fetch( "/assets/requests/list.json" )
			.then( response => response.json() )
			.then( data => {

				let array = [];

				for( let key in data ){

					const params = {
						id: data[ key ].id,
						name: data[ key ].title,
						order: data[ key ].srt,
						parent: data[ key ].parent_id
					};
					array.push( params );

					if( !treeTable[ params.id ] )
						treeTable[ params.id ] = new Element();

					treeTable[ params.id ].rename( params.name );

				};

				array.sort(function( a, b ){
					return a.order - b.order;
				});

				for( let key in array ){

					const params = array[ key ];
					let element = treeTable[ params.id ];
					let parent = treeTable[ params.parent ];

					if( parent ){
						parent.add( element );
					}else{
						root.add( element );
					};

				};

			}).catch( error => {

		});

	};

};
Element.count = 0;

let tree = new Element();
tree.rename( "Tree" );
tree.expand();
tree.getList( tree, tree.table );
document.body.append( tree.ui.wrap );