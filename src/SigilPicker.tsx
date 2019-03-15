import React from "react";
import { withStyles, createStyles, IconButton, Theme, WithStyles, Icon } from "@material-ui/core";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AlarmIcon from '@material-ui/icons/Alarm';
import CastIcon from '@material-ui/icons/Cast';
import ComputerIcon from '@material-ui/icons/Computer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

export interface SigilPickerProps extends WithStyles<typeof styles> {
    onSigilChange(icon: JSX.Element): void;
}

export interface SigilPickerState {

    canMoveBackwards: boolean;
    canMoveForwards: boolean;
    index: number;
    sigils: JSX.Element[];
    selectedIcon: JSX.Element;
}

const styles = (theme: Theme) => createStyles({
    root: { 
        display: 'inline',
    },
    button: {
        margin: theme.spacing.unit,
      },
});

const SigilPicker = withStyles(styles)(
    class extends React.Component<SigilPickerProps, SigilPickerState> {
        constructor(props: SigilPickerProps) {
            super(props);

            this.state = {
                canMoveBackwards: false,
                canMoveForwards: true,
                index: 0,
                sigils: [ <AlarmIcon />, <CastIcon />, <DeviceHubIcon /> ],
                selectedIcon: <AlarmIcon />
            }

            this.handleBackwardsClick = this.handleBackwardsClick.bind(this);
            this.handleForwardsClick = this.handleForwardsClick.bind(this);
        }

        handleBackwardsClick() {
            let currentIndex = this.state.index;
            if (currentIndex > 0) {
                let newSelectedIcon = this.state.sigils[currentIndex - 1];

                this.setState({
                    ...this.state,
                    selectedIcon: newSelectedIcon,
                    index: currentIndex - 1
                });

                this.props.onSigilChange(newSelectedIcon);
            }
        }

        handleForwardsClick() {
            let currentIndex = this.state.index;
            if (currentIndex < this.state.sigils.length) {
                let newSelectedIcon = this.state.sigils[currentIndex + 1];
                this.setState({
                    ...this.state,
                    selectedIcon: newSelectedIcon,
                    index: currentIndex - 1
                });

                this.props.onSigilChange(newSelectedIcon);
            }
        }

        render() {
            return (
                <div className={this.props.classes.root}>
                <div>
                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.handleBackwardsClick}
                        disabled={this.state.index <= 0}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>

                    <div>
                        {this.state.selectedIcon}
                    </div> 

                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.handleForwardsClick}
                        disabled={this.state.index >= this.state.sigils.length}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
            </div>
            </div>);
        }
    }
)

export default SigilPicker;