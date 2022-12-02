import React, {PureComponent} from 'react';
import Screen from '../components/Screen';

export default class HistoryScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Screen title="Historique" />;
  }
}
