import React from 'react';

interface Props {
    children: React.ReactElement
}

interface State {
  hasError: boolean;
}

class ErrorBoundry extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
           hasError: false
        }
    }

    componentDidCatch(error: any
    ): void {
        console.log(error);
        this.setState({ hasError:true})
    }

    render() {

        if(this.state.hasError) {
           return <div className="">An Error occured</div> 
        }
        return this.props.children
        
    }


}

export default ErrorBoundry;
