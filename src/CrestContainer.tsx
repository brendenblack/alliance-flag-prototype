import { createStyles, WithStyles, withStyles, Typography, Theme } from "@material-ui/core";
import React from "react";
import { render } from "react-dom";

export interface CrestContainerProps extends WithStyles<typeof styles> {
    background?: string;
    sigil?: JSX.Element;
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
    sigil: {
        width: 240,
        height: 240,
    }
});


const CrestContainer = withStyles(styles)(
    class extends React.Component<CrestContainerProps, CrestContainerState> {
        constructor(props: CrestContainerProps) {
            super(props);
        
            this.modifyChildren = this.modifyChildren.bind(this);
        }
    
        modifyChildren(child: any) {
            // const className = classNames(
            //     child.props.className,
            //     this.props.classes.sigil,
            // );
    
            // const props = {
            //     className
            // };
    
            // return React.cloneElement(child, props);
        }

        onComponentDidMount() {
            
        }

        render() {
            return (
                <section className={this.props.classes.root} style={{ backgroundColor: this.props.background }}>
                    <div className={this.props.classes.sigil}>{this.props.sigil}</div>

                    {React.Children.forEach(this.props.children, function(child) {
                    })}
                </section>
            );
        }
    }
);

export default CrestContainer;