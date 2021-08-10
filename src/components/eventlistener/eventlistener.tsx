import {ipcRenderer} from "electron";
import {connect} from "react-redux";
import {appStarted, saveInvoked} from "../../actions/actions";
import * as React from "react";

type Props = {
  saveInvoked: any;
  appStarted: any;
};

class EventListener extends React.Component<Props, any> {

  constructor(props: any) {
    super(props);
    this.handleSaveFile = this.handleSaveFile.bind(this);
    this.handleAppStarted = this.handleAppStarted.bind(this);
  }

  componentDidMount(): void {
    ipcRenderer.on('save-invoked', this.handleSaveFile);
    ipcRenderer.on('app-started', this.handleAppStarted);
  }

  componentWillUnmount(): void {
    ipcRenderer.removeListener('save-invoked', this.handleSaveFile);
    ipcRenderer.removeListener('app-started', this.handleAppStarted);
  }

  handleSaveFile(event: any, data: any) {
    this.props.saveInvoked(data['user-data-path']);
  }

  handleAppStarted(event: any, data: any) {
    // console.log('handling the stuff');
    // this.props.appStarted(data['user-data-path']);
  }

  render() {
    return (<div/>);
  }

}

export default connect(null, {saveInvoked, appStarted})(EventListener);


