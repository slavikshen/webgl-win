import React from "react";
import ReactDOM from "react-dom";
import EXPureComponent from './EXPureComponent';
import * as PIXI from 'pixi.js'


class PContainer extends EXPureComponent {

	constructor(props) {
		super(props);
		this.state = {
			title: "test",
		}
	}

	componentDidMount() {

		super.componentDidMount();
		// mount pixi stage
		this._mountPixiContainer(this.props);

	}

	componentWillUnmount() {
		super.componentWillUnmount();
		// release all memory and GPU resources
		this._releasePixiContainer();
	}

	_mountPixiContainer(props) {

		var { width, height, backgroundColor } = props;

		var root = ReactDOM.findDOMNode(this);

		var renderer = PIXI.autoDetectRenderer(width, height, { backgroundColor });
		
		root.appendChild(renderer.view);

		// create the root of the scene graph
		var stage = new PIXI.Container();

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage('https://d1yn1kh78jj1rr.cloudfront.net/image/preview/Bwb4bH4iOliyzsy5m7/graphicstock-cute-cartoon-bunny-rabbit_rLrUZvHqQZ_SB_PM.jpg');

		// create a new Sprite using the texture
		var bunny = new PIXI.Sprite(texture);

		// center the sprite's anchor point
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;

		// move the sprite to the center of the screen
		bunny.position.x = 200;
		bunny.position.y = 150;

		stage.addChild(bunny);

		this._pctx = { renderer, stage }
		// start animating
		var animate = () =>{
			if( this.isMounted() ) {
				// console.log('animate '+this.props.id)
				var ctx = this._pctx;
				if( ctx ) {
					var { renderer, stage } = ctx;
					// just for fun, let's rotate mr rabbit a little
					bunny.rotation += 0.1;
					// render the container
					renderer.render(stage);
					ctx.aniId = requestAnimationFrame(animate);
				}
			// } else {
			// 	console.log('unmounted')
			}
		}

		animate();
	}

	_releasePixiContainer() {

		// console.log('release '+this.props.id)
		
		var { _pctx } = this;
		if( _pctx ) {
			delete this._pctx;
			if( _pctx._aniId ) {
				cancelAnimationFrame(_pctx._aniId);
			}
			var { renderer, stage } = _pctx;
			// destroy renderer and remove view
			renderer.destroy(true);
			// release GPU resource in the stage
			// stage.destroy({children:true,texture:true,baseTexture:true});
			stage.removeChildren(0);
			setTimeout(function(){
				stage.destroy({children:true,texture:true,baseTexture:true});
			},1000)
		}
		

	}

	componentWillReceiveProps( nextProps ) {

		var { props } = this;
		var { width, height } = nextProps;
		if( width !== props.width || height !== props.height ) {
			this._resizeStage(width,height);
		}

	}

	_resizeStage( width, height ) {
		var { state } = this;
		var { renderer } = state;
		if( renderer ) {
			renderer.resize( width, height );
		}
	}

	render() {
		return (
			<div className='pcontainer'/>
		)

	}



}

PContainer.defaultProps = {
	backgroundColor: 0x1099bb // for test
}

export default PContainer;