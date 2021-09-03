import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import { styled, withStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'
import { Collapse } from '@material-ui/core'
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons'
import List from '@material-ui/core/List'
import { useState } from 'react'

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#e0dede',
      color: '#e62739',
      '& .MuiListItemIcon-root': {
        color: '#e62739'
      },
      '&:before': {
        top: '0',
        right: '0',
        bottom: '0',
        width: '3px',
        content: '""',
        position: 'absolute',
        backgroundColor: '#e62739',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px'
      }
    },
    '&$selected:hover': {
      backgroundColor: '#e0dede',
      color: '#e62739',
      '& .MuiListItemIcon-root': {
        color: '#e62739'
      }
    },
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
      color: '#637381',
      '& .MuiListItemIcon-root': {
        color: '#637381'
      }
    }
  },
  selected: {}
})(MuiListItem)

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    paddingLeft: `23px`
  }
}))

const ListItems = () => {
  const history = useHistory()
  const location = useLocation()

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItemStyle
        button
        selected={location.pathname === '/'}
        onClick={() => history.push('/')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Bảng điều khiển' />
      </ListItemStyle>
      <ListItemStyle
        button
        selected={location.pathname === '/todos'}
        onClick={() => history.push('/todos')}
      >
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary='Danh sách todo' />
      </ListItemStyle>
      <ListItemStyle
        button
        selected={location.pathname === '/projects'}
        onClick={() => history.push('/projects')}
      >
        <ListItemIcon>
          <CodeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Quản lí dự án' />
      </ListItemStyle>
      <ListItemStyle button onClick={handleClick}>
        <ListItemIcon>
          <TrackChangesRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Thiết lập mục tiêu' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyle>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemStyle button>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </ListItemStyle>
        </List>
      </Collapse>
      <ListItemStyle button>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Cài đặt' />
      </ListItemStyle>
    </div>
  )
}
export default ListItems
