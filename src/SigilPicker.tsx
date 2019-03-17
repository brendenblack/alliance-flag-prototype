import React from "react";
import { withStyles, createStyles, IconButton, Theme, WithStyles, SvgIcon } from "@material-ui/core";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";


export interface SigilPickerProps extends WithStyles<typeof styles> {
    onSigilChange(icon: React.ComponentType<any>): void;
    sigils: React.ComponentType<SvgIconProps>[];
}

export interface SigilPickerState {

    canMoveBackwards: boolean;
    canMoveForwards: boolean;
    index: number;
    sigils: React.ComponentType<any>[];
    selectedIcon: React.ComponentType<any>;
}

const styles = (theme: Theme) => createStyles({
    root: { 
        display: 'inline-flex',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing.unit,
      },
    
});

const SigilPicker = withStyles(styles)(
    class extends React.Component<SigilPickerProps, SigilPickerState> {
        constructor(props: SigilPickerProps) {
            super(props);

            let initialSigil = this.props.sigils[0];

            this.state = {
                canMoveBackwards: false,
                canMoveForwards: this.props.sigils.length > 0,
                index: 0,
                sigils: this.props.sigils,
                selectedIcon: initialSigil,
            }

            this.canMoveForward = this.canMoveForward.bind(this);
            this.canMoveBackward = this.canMoveBackward.bind(this);

            this.props.onSigilChange(initialSigil);
        }

        navigate(change: number) {
            let currentIndex = this.state.index;
            let newIndex = currentIndex + change;
            console.log('new index from navigate method is ' + newIndex);
            this.setState({
                ...this.state,
                index: newIndex,
                canMoveBackwards: this.canMoveBackward(newIndex),
                canMoveForwards: this.canMoveForward(newIndex),
            }, () => {
                this.props.onSigilChange(this.state.sigils[newIndex]);
                console.log(`index is set to ${this.state.index} from navigate method`);
            });
        }

        canMoveForward(index: number): boolean {
            return (index + 1 < this.state.sigils.length);
        }

        canMoveBackward(index: number): boolean {
            return index > 0;
        }

        render() {
            let Sigil = this.state.sigils[this.state.index];

            return (
                <div className={this.props.classes.root}>

                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.navigate.bind(this, -1)}
                        disabled={!this.state.canMoveBackwards}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>

                        <Sigil />
             
                    <IconButton 
                        color="secondary" 
                        className={this.props.classes.button}
                        onClick={this.navigate.bind(this, 1)}
                        disabled={!this.state.canMoveForwards}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
 
            </div>);
        }
    }
)

export default SigilPicker;