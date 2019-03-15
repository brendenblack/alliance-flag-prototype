import { createStyles, WithStyles, withStyles, Typography, Theme } from "@material-ui/core";
import React from "react";
import { render } from "react-dom";

export interface CrestContainerProps extends WithStyles<typeof styles> {
    background?: string;
}

export interface CrestContainerState {
    background: string;
}

const boxWidth = 600;
const boxHeight = 600;

const styles = (theme:Theme) => createStyles({
    root: {
        width: boxWidth,
        height: boxHeight,
        backgroundColor: theme.palette.background.default,
        margin: 'auto',
        // marginTop: `calc(50vh - ${boxHeight / 2}px)`
    },
});


const CrestContainer = withStyles(styles)(
    class extends React.Component<CrestContainerProps, CrestContainerState> {
        constructor(props: CrestContainerProps) {
            super(props);
        }



        render() {
            return (
                <section className={this.props.classes.root} style={{ backgroundColor: this.props.background }}>
                    <Typography variant="h2">{this.props.background}</Typography>
                </section>
            );
        }
    }
);

export default CrestContainer;