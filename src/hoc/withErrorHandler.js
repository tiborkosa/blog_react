import React from 'react';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({
                        error: null
                    });
                const token = localStorage.getItem('tblogToken');
                if(token){
                    req.headers.Authorization = `Bearer ${token}`;
                }
                return req;
              }, (error) => {
                    this.setState({
                        error: error
                    });
                    return Promise.reject(error);
              });
            this.resInterceptor = axios.interceptors.response.use(
                config => config, 
                error => { 
                    let err = null;
                    if(!error.response || error.response.status === 500){
                        err = "Could not connect to the internet!"
                    }else {
                        // if 422 show error in the form
                        if(error.response.status === 422) throw new Error(error.response.data);
                        // if 403 remove the token, aka log out
                        if(error.response.status === 403) {
                           err = "Please Log in!"
                        } else {
                            err = error.response.data.message;
                        }
                    }
                    if(err) {
                        this.setState({
                            error: err
                        });
                    }
                   
                    return Promise.reject(error);
            });
        }
        clearErrorHandler = e => {
            e.stopPropagation();
            this.setState({error: null})
        };
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render(){
            return (<WrappedComponent 
                clearAxError={this.clearErrorHandler} 
                axiosError={this.state.error} 
                { ...this.props} />)
        }
    }
}

export default withErrorHandler;
