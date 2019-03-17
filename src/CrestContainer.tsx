import { createStyles, WithStyles, withStyles, Typography, Theme } from "@material-ui/core";
import React, { ReactComponentElement } from "react";
import { render } from "react-dom";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import { red } from "@material-ui/core/colors";

export interface CrestContainerProps extends WithStyles<typeof styles> {
    background?: string;
    foreground?: string;
    sigil?: React.ComponentType<any>;
}

export interface CrestContainerState {
    background: string;
}

const boxWidth = 600;
const boxHeight = 600;

const sigilHeight = 240;
const sigilWidth = 240;

const styles = (theme:Theme) => createStyles({
    root: {
        width: boxWidth,
        height: boxHeight,
        backgroundColor: theme.palette.background.default,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        // marginTop: `calc(50vh - ${boxHeight / 2}px)`
    },
    sigil: {
        width: sigilWidth,
        height: sigilHeight,
        margin: 'auto',
    },
    centered: {

    }
});


const CrestContainer = withStyles(styles)(
    class extends React.Component<CrestContainerProps, CrestContainerState> {
        constructor(props: CrestContainerProps) {
            super(props);
        
          
        }

        render() {
            if (this.props.sigil) {
                
                let s: JSX.Element;
                if (this.props.sigil) {
                    let Sigil = this.props.sigil;
                    s = <Sigil className={this.props.classes.sigil} style={{color: this.props.foreground}} />
                } else {
                    s = <span>?</span>
                }

                return (
                    <section className={this.props.classes.root} style={{ backgroundColor: this.props.background }}>
                        {s}
                    </section>
                );
            } else {
                return <section className={this.props.classes.root} style={{ backgroundColor: this.props.background }}></section>
            }
            
        }
    }
);

export default CrestContainer;