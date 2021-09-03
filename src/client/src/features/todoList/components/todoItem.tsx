import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { completeTodoAsync, deleteTodoAsync, TodoResponse } from '../todoSlice'
import {
  IconButton,
  Menu,
  MenuItem,
  Theme,
  withStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { green, grey, red } from '@material-ui/core/colors'
import { ListItemIcon } from '@material-ui/core'

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  newProjectBtn: {
    marginBottom: '10px'
  },
  boderCheckBox: {
    borderRight: `solid 2px ${theme.palette.primary.main}`
  },
  todoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoNumber: {
    display: 'inline-block',
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(255, 25, 67, 0.1)',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: theme.typography.fontWeightBold
  },
  todoTime: {
    color: 'lightslategrey',
    fontWeight: theme.typography.fontWeightBold
  },
  todoDescr: {
    fontWeight: theme.typography.fontWeightBold
  },
  todoNumberGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteTodo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  cardContent: {
    backgroundColor: ({ isCompleted }) => (isCompleted ? '#c9f8de' : 'white')
  },
  test: {
    padding: 0
  }
}))

const CardContentStyled = withStyles({
  root: {
    padding: '10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
})(CardContent)

const IconButtonStyled = withStyles((theme) => ({
  root: {
    padding: '2px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
}))(IconButton)

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)

export interface TodoItemProps {
  index: number
  item: TodoResponse
}

export interface StyleProps {
  isCompleted?: boolean
}

const TodoItem: FC<TodoItemProps> = ({ index, item }) => {
  const styleProps: StyleProps = {
    isCompleted: item.isCompleted
  }
  const classes = useStyles(styleProps)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCompleteTodo = async (id: string) => {
    handleClose()
    try {
      const result = await dispatch(completeTodoAsync(id)).unwrap()
      if (result) {
        dispatch(
          flashAlert({
            message: 'Đã cập nhật thành công!',
            type: FlashType.Success
          })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const handleDeleteTodo = async (id: string) => {
    handleClose()
    try {
      const result = await dispatch(deleteTodoAsync(id)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContentStyled className={classes.cardContent}>
          <Grid container>
            <Grid md={1} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
            </Grid>
            <Grid md={10} xs={8} className={classes.todoContent}>
              <Typography component='p' className={classes.todoTime}>
                {item.time}
              </Typography>
              <Typography component='p' className={classes.todoDescr}>
                {item.description}
              </Typography>
            </Grid>
            <Grid md={1} className={classes.deleteTodo}>
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                className={classes.test}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleCompleteTodo(item._id)}>
                  <ListItemIconStyled>
                    <CheckCircleOutlineIcon style={{ color: green[500] }} />
                  </ListItemIconStyled>
                  <Typography>
                    {item.isCompleted ? 'Chưa hoàn thành' : 'Hoàn thành'}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIconStyled>
                    <EditIcon style={{ color: grey[500] }} />
                  </ListItemIconStyled>
                  <Typography>Chỉnh sửa</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteTodo(item._id)}>
                  <ListItemIconStyled>
                    <DeleteForeverIcon style={{ color: red[500] }} />
                  </ListItemIconStyled>
                  <Typography>Xóa</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default TodoItem
