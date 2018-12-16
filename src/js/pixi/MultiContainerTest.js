import React from "react";
import PContainer from './PContainer';

class MultiContainerTest extends React.PureComponent {

	constructor( props ) {
		super( props );
		this.state = this._generateTest(0);
	}

	_generateTest(prev) {
		
		var count = (prev+1)%5+1;
		var cases = [];
		for( var i = 1; i < count; i++ ) {
			var wprops = { width: i*50, height: i*50 }
			cases.push(wprops);
		}

		return { cases }

	}

	_resetTest() {

		var change = this._generateTest(this.state.cases.length);
		this.setState(change);

	}

	render() {

		var { state } = this;
		var { cases } = state;

		return (
			<div>
				<div>
					<button onClick={(e)=>this._resetTest(e)}>Reset Tests</button>
				</div>
				<div>
					{ cases.map((c,idx)=>{
							return <PContainer {...c} key={idx} id={Math.ceil(Math.random()*1000)}/>
						})
					}
				</div>
			</div>
		)

	}

}

export default MultiContainerTest;