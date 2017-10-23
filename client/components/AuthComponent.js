import React from 'react';

import AuthService from '../services/AuthService';

import Header from './Header';
import Main from './Main';


export default class AuthComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isLoggedIn:false,
		}

		this.Auth = new AuthService();
	}

	componentDidMount(){
		//Check login
		if(this.Auth.isLoggedIn()){
			this.setState({
				isLoggedIn:true,
				hasError:false,
				error: "",
				info: ""
			})
		}
	}

	componentDidCatch(error, info){
		this.setState({
			hasError:true,
			error: error,
			info: info
		})
	}


	setUserLogin(bool){
		this.setState({
			isLoggedIn: bool,
		})
	}



	render(){
		const {isLoggedIn, hasError, error, info} = this.state;
		const authProps = {
			isAuthenticated: isLoggedIn,
			setUserLogin: this.setUserLogin,
		}

		return(
			<div className="app">
				<Header isLoggedIn={isLoggedIn} />
				
				{hasError?
					(
					<div className="error-promps">
						<h1>Opps, Error!</h1>
						<details style={{whiteSpace:'pre-wrap'}}>
						 {error && error.toString()}
						 <br/>
						{info.componentStack}
						</details>
					</div>
				):(
					<Main props={authProps}/>
				)}

				<footer>
						@All rights reserved by Junlong
					</footer>
			</div>			
		)
	}

}