import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';

class TContainer extends PureComponent {

	constructor() {
		super();
		this.state = {
			title: "test",
			
		}
	}

	componentDidMount() {

		// mount three.js
		var dom = ReactDOM.findDOMNode(this);
		var frame = dom.getBoundingClientRect();
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, frame.width / frame.height, 0.1, 1000 );
		camera.position.set( 0, 0, 100 );
		camera.lookAt( 10, 40, 50 );

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( frame.width, frame.height );
			
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var cube = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
		scene.add( cube );
		camera.position.z = 5;

		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
		geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
		geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x0000ff } ) );
		scene.add( line );

		this.setState({scene,camera,renderer},()=>{
			dom.appendChild( renderer.domElement );
			var animate = function () {
				// requestAnimationFrame( animate );
				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				renderer.render( scene, camera );
			};
			animate();
		});

	}

	componentWillUnmount() {

		var { state } = this;
		var { renderer } = state;
		if( renderer ) {
			renderer.dispose();
			var dom = renderer.domElement;
			dom.parentNode.removeChild(dom);
		}

	}

	render() {
		
		var { state } = this;
		return (
			<div style={{width:640,height:480}}/>
		)

	}



}

export default TContainer;