import React from "react";
import { withStyles, createStyles, IconButton, Theme, WithStyles, SvgIcon } from "@material-ui/core";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AlarmIcon from '@material-ui/icons/Alarm';
import CastIcon from '@material-ui/icons/Cast';
import ComputerIcon from '@material-ui/icons/Computer';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';

export interface SigilPickerProps extends WithStyles<typeof styles> {
    onSigilChange(icon: React.ComponentType<SvgIcon>): void;
}

export interface SigilPickerState {

    canMoveBackwards: boolean;
    canMoveForwards: boolean;
    index: number;
    sigils: React.ComponentType<SvgIcon>[];
    selectedIcon: React.ComponentType<SvgIcon>;
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

            const sigils = [
                AlarmIcon, 
                CastIcon, 
                DeviceHubIcon, 
                ComputerIcon,
            ];

            this.state = {
                canMoveBackwards: false,
                canMoveForwards: sigils.length > 0,
                index: 0,
                sigils: sigils,
                selectedIcon: sigils[0],
            }

            this.handleBackwardsClick = this.handleBackwardsClick.bind(this);
            this.handleForwardsClick = this.handleForwardsClick.bind(this);
            this.canMoveForward = this.canMoveForward.bind(this);
            this.canMoveBackward = this.canMoveBackward.bind(this);
        }

        handleBackwardsClick() {
            let currentIndex = this.state.index;
            let newIndex = currentIndex - 1;
            this.setState({
                ...this.state,
                index: newIndex,
                canMoveBackwards: this.canMoveBackward(newIndex),
                canMoveForwards: this.canMoveForward(newIndex),
            }, () => {
                this.props.onSigilChange(this.state.sigils[newIndex]);
                console.log(`index is set to ${this.state.index}`);
            });
        }

        handleForwardsClick() {
            let currentIndex = this.state.index;
            let newIndex = currentIndex + 1;
            console.log('new index is ' + newIndex);
             this.setState({
                ...this.state,
                index: newIndex,
                canMoveBackwards: this.canMoveBackward(newIndex),
                canMoveForwards: this.canMoveForward(newIndex),
            }, () => {
                this.props.onSigilChange(this.state.sigils[newIndex]);
                console.log(`index is set to ${this.state.index}`);
            });
        }

        canMoveForward(index: number): boolean {
            return (index + 1 < this.state.sigils.length);
        }

        canMoveBackward(index: number): boolean {
            return index > 0;
        }

        render() {
            return (
                <div className={this.props.classes.root}>
                <div>
                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.handleBackwardsClick}
                        disabled={!this.state.canMoveBackwards}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>

                    <div>
                        {this.state.sigils[this.state.index]}
                    </div> 

                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.handleForwardsClick}
                        disabled={!this.state.canMoveForwards}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
            </div>
            </div>);
        }
    }
)

export default SigilPicker;