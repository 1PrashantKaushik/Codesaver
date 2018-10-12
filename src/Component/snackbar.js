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

class SimpleSnackbar extends React.Component {
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
            horizontal: "left"
          }}
          autoHideDuration={6000}
          onClose={this.props.closeSnackbar}
          message={
            <span id="message-id" style={{ fontSize: "16px" }}>
              {this.props.snakbarmaterial}
            </span>
          }
          action={[
            <Button key="undo" color="secondary" onClick={this.handleClose}>
              <span style={{ fontSize: "14px" }}>Undo</span>
            </Button>,
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

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
