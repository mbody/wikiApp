import React, {PureComponent} from 'react';
import {Button, Title} from 'react-native-paper';
import Screen from '../components/Screen';
import {I18n} from '../i18n/i18n';

export default class SettingsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <Screen>
        <Title>{I18n.t('settings.selectLanguage')}</Title>
        <Button onPress={this.onSwitchTo('fr')}>Français</Button>
        <Button onPress={this.onSwitchTo('en')}>English</Button>
      </Screen>
    );
  }

  // --------------------------------------------------- handlers
  onSwitchTo = newLocale => () => {
    I18n.locale = newLocale;
    this.forceUpdate();
  };
}
