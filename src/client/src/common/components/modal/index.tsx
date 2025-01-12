import React, { FC } from 'react'
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

interface ModalProps {
  title: string
  submitText?: string
  isInfoModal?: boolean
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: 'space-between'
  }
}))(MuiDialogActions)

const useStyles = makeStyles(() => ({
  infoModalAction: {
    justifyContent: 'end'
  }
}))

const Modal: FC<ModalProps> = ({
  title,
  submitText,
  isInfoModal,
  open,
  onClose,
  onSubmit,
  children
}) => {
  const classes = useStyles()
  return (
    <div>
      <Dialog
        maxWidth='sm'
        fullWidth={true}
        onClose={onClose}
        aria-labelledby='modal'
        open={open}
      >
        <DialogTitle id='modal' onClose={onClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions className={isInfoModal ? classes.infoModalAction : ''}>
          {!isInfoModal && (
            <Button
              variant='text'
              color='default'
              size='small'
              onClick={onClose}
            >
              Hủy
            </Button>
          )}
          <Button
            variant={isInfoModal ? 'text' : 'outlined'}
            color='secondary'
            size='small'
            onClick={onSubmit}
          >
            {submitText ? submitText : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
