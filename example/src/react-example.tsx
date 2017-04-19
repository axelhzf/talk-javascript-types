import React, {MouseEvent} from 'react';
import ReactDOM from 'react-dom';

type Props = {
  active?: boolean,
  label: string,
  onClick?: () => Promise<void>,
};

type State = {
  loading: boolean
};

class Button extends React.Component<Props, State> {

  state: State = {
    loading: true,
  };

  button: HTMLButtonElement;

  onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.props.onClick) {
      this.setState({loading: true});
      await this.props.onClick();
      this.setState({loading: false});
    }
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.onClick !== this.props.onClick) {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) return <div>Loading</div>;
    return <button ref={el => this.button = el} onClick={this.onClick}>Do Action</button>;
  }
}

async function onClick() {

}

ReactDOM.render(<Button label="a" onClick={onClick}/>, document.getElementById('#container'));


