import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class AlertDialog extends React.Component {
  // const [open, setOpen] = React.useState(false);
  constructor(props){
    super(props);
    this.state ={
      open: false
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };
  render(){
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <InfoIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.content}....
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Dong
            </Button>
            <Button href = {this.props.link_post} color="primary" autoFocus>
              Xem chi tiet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
}
export default AlertDialog;