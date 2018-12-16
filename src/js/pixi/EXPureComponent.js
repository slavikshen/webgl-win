import { PureComponent } from "react";

class EXPureComponent extends PureComponent {

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	isMounted() {
		return this._isMounted;
	}

}

export default EXPureComponent;