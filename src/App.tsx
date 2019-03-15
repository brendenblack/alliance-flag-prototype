import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Theme, WithStyles, createStyles, withStyles, TextField, Select, Divider, FormControl, InputLabel, OutlinedInput, Grid, Icon } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import CrestContainer from './CrestContainer';
import { SketchPicker, CompactPicker, SliderPicker, SwatchesPicker, BlockPicker, GithubPicker } from 'react-color';
import SigilPicker from './SigilPicker';


const styles = (theme: Theme) => createStyles({
  container: {
    padding: theme.spacing.unit, // '1em',
  },
  colourPicker: {

  },
  sigilPicker: {

  }
});

export interface AppProps extends WithStyles<typeof styles> {

}

export interface AppState {
  selectedBackgroundColour: string;
  selectedIcon?: JSX.Element
}

const App = withStyles(styles)(
  class extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
      super(props);

      this.state = {
        selectedBackgroundColour: '#1273de',
      };
      
      this.handleColourChange = this.handleColourChange.bind(this);
      this.handleSigilChange = this.handleSigilChange.bind(this);
    }  

  handleColourChange(color: any) {
    console.log('setting background colour', color.hex);

    this.setState({
      ...this.state,
      selectedBackgroundColour: color.hex
    });
  }

  handleSigilChange(icon: JSX.Element) {
    this.setState({
      ...this.state,
        selectedIcon: icon
    });
  }

  render() {
    return (
      <div className={this.props.classes.container}>

          <CrestContainer 
            background={this.state.selectedBackgroundColour} />

          <section className={this.props.classes.colourPicker}>
            <GithubPicker
              color={this.state.selectedBackgroundColour} 
              onChangeComplete={this.handleColourChange} />
          </section>

          <section className={this.props.classes.sigilPicker}>
            <SigilPicker onSigilChange={this.handleSigilChange} />
          </section>

      </div>
    );
  }
}

);

export default App;
