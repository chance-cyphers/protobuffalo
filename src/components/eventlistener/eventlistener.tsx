import {ipcRenderer} from "electron";
import {connect} from "react-redux";
import {saveInvoked} from "../../actions/actions";
import * as React from "react";

type Props = {
  saveInvoked: any;
};

class EventListener extends React.Component<Props, any> {

  constructor(props: any) {
    super(props);
    this.handleSaveFile = this.handleSaveFile.bind(this);
  }

  componentDidMount(): void {
    ipcRenderer.on('save-invoked', this.handleSaveFile);
  }

  componentWillUnmount(): void {
    ipcRenderer.removeListener('save-invoked', this.handleSaveFile);
  }

  handleSaveFile(event: any, message: any) {
    this.props.saveInvoked();
  }

  render() {
    return (<div/>);
  }

}

export default connect(null, {saveInvoked})(EventListener);


