import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi';

const withErrorHandler = (WrappedComponents, axios) =>{
    return class extends Component{
        state={
            error:null
        }

        UNSAFE_componentWillMount(){
            this.reqinterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resinterceptor = axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqinterceptor);
            axios.interceptors.response.eject(this.resinterceptor);

        }

        errorHandler=()=>{
            this.setState({error:null});
        }


        render() {
            return(
                <Aux>
                    <Modal show={this.state.error}
                            clicked={this.errorHandler}>
                            { this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponents  {...this.props}/>
                </Aux>
            );
        }
    }
}
export default withErrorHandler;