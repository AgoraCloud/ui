import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { inject, observer } from 'mobx-react'
import { WORKSPACES_STORE } from 'app/constants'
import { WorkspacesStore } from 'app/stores'
import { MoreMenu } from 'app/components/Inputs'
import { EditTaskDialog } from "app/components/Inputs/Modal"
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export const CardOptions = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const project = store.selectedProject
  
    if(!project) return null
  
    const lane = project.lanes.getById(props.laneId)
  
    if (!lane) return null
  
    const task = lane.tasks.getById(props.id)
  
    if (!task) return null
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return <>
      <MoreMenu options={[
                {
                    name: "Edit",
                    onClick: () => {
                        handleClickOpen()
                    }
                },
                {
                    name: "Delete",
                    onClick: () => {
                        task.delete()
                    }
                }
            ]} />
            <EditTaskDialog isOpen={open} close={handleClose} task={task} />
      </>
  }))

  export const CustomCardHeader = (props) => {
    return <div>
        <Grid justify="space-between" container spacing={3}>
          <Grid item >
            <Typography gutterBottom variant="h6" component="h4">
              {props.title}
            </Typography>
          </Grid>
          <Grid item >
            <div style={{marginRight:'-16px', marginTop:'-9px'}}>
            <CardOptions id={props.id} laneId={props.laneId} />
            </div>
          </Grid>
        </Grid>
          
      </div>
  }

export const CustomCard = (props) => {
  const classes = useStyles();

  return <>
    <Card className={classes.root}>
      <CardContent>
        <CustomCardHeader title={props.title} id={props.id} laneId={props.laneId} />
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  </>
}