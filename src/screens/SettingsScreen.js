import React, { PureComponent } from "react";
import Screen from "../components/Screen";

export default class SettingsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Screen title="Paramètres" />;
  }
}
