import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class SimpleSnackbar1 extends React.Component {
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.props.closeSnackbar();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          open={this.props.snackbar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.props.closeSnackbar}
          message={
            <span id="message-id" style={{ fontSize: "16px" }}>
              {this.props.snakbarmaterial}
            </span>
          }
          action={[
            <Button key="undo" color="secondary" onClick={this.handleClose} />,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
          className="snackbar"
        />
      </div>
    );
  }
}

SimpleSnackbar1.propTypes = {
  classes: PropTypes.object.isRequired
};

export const SimpleSnackbar = withStyles(styles)(SimpleSnackbar1);
