class Follow extends React.Component {
    // Initialize the component state.
    constructor(props) {
        super(props);
        this.state = { label: 'Follow'};
    }

    replace = () =>{
        this.setState({ label: 'Unfollow'});
    }


    render(){
        return (<button onClick={this.replace}>{this.state.label}</button>)
    }
}


ReactDOM.render(<Follow/>, document.querySelector("#follow"));
