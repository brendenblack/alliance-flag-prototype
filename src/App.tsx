import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Theme, WithStyles, createStyles, withStyles, TextField, Select, Divider, FormControl, InputLabel, OutlinedInput, Grid, Icon, Paper, Typography } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import CrestContainer from './CrestContainer';
import { SketchPicker, CompactPicker, SliderPicker, SwatchesPicker, BlockPicker, GithubPicker } from 'react-color';
import SigilPicker from './SigilPicker';
import AlarmIcon from '@material-ui/icons/Alarm';
import CastIcon from '@material-ui/icons/Cast';
import ComputerIcon from '@material-ui/icons/Computer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';


const styles = (theme: Theme) => createStyles({
  container: {
    padding: theme.spacing.unit, // '1em',
  },
  colourPicker: {

  },
  sigilPicker: {

  },
  crestContainer: {
    margin: 'auto',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    
  },
  controlsPaper: {
    padding: '2em',
    '& section': {
      marginBottom: '1em',
    }
  },
});

export interface AppProps extends WithStyles<typeof styles> {

}

export interface AppState {
  selectedBackgroundColour: string;
  selectedIcon?: any;
  icons: React.ComponentType<SvgIconProps>[];
  selectedSigilColour: string;
}

const App = withStyles(styles)(
  class extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
      super(props);

      const icons = [
        AlarmIcon, 
        CastIcon, 
        DeviceHubIcon, 
        ComputerIcon,
      ];

      this.state = {
        selectedBackgroundColour: '#1273de',
        icons: icons,
        selectedSigilColour: red[500],
      };
      
      this.handleColourChange = this.handleColourChange.bind(this);
      this.handleSigilChange = this.handleSigilChange.bind(this);
      this.handleSigilColourChange = this.handleSigilColourChange.bind(this);
    }  

  handleColourChange(color: any) {
    console.log('setting background colour', color.hex);

    this.setState({
      ...this.state,
      selectedBackgroundColour: color.hex
    });
  }

  handleSigilChange(icon: React.ComponentType<any>) {
    const Icon = icon;
    // https://stackoverflow.com/questions/49832457/how-to-add-additional-props-to-a-react-element-passed-in-as-a-prop
    this.setState({
      ...this.state,
        selectedIcon: icon
    },
    () => {
      console.log('sigil is set', this.state);
    });
  }

  handleSigilColourChange(color: any) {
    this.setState({
      ...this.state,
      selectedSigilColour: color.hex
    });
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={4} className={this.props.classes.controls}>
          <Paper className={this.props.classes.controlsPaper}>
            <section className={this.props.classes.colourPicker}>
              <Typography component='h2' variant='h5'>Background Colour</Typography>
              <GithubPicker
                color={this.state.selectedBackgroundColour} 
                onChangeComplete={this.handleColourChange} />
            </section>

            <section className={this.props.classes.sigilPicker}>
            <Typography component='h2' variant='h5'>Sigil</Typography>
              <SigilPicker
                sigils={this.state.icons} 
                onSigilChange={this.handleSigilChange} />
            </section>

            <section className={this.props.classes.colourPicker}>
              <Typography component='h2' variant='h5'>Sigil Colour</Typography>
              <GithubPicker
                color={this.state.selectedSigilColour} 
                onChangeComplete={this.handleSigilColourChange} />
            </section>
          </Paper>
        </Grid>
        <Grid item xs='auto' className={this.props.classes.crestContainer}>
          <CrestContainer 
              background={this.state.selectedBackgroundColour}
              foreground={this.state.selectedSigilColour}
              sigil={this.state.selectedIcon} />
        </Grid>
      </Grid>
    );
  }
}

);

export default App;
