import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircleButton from '../../utils/CircleButton';
import IList from './IList';
import EditListName from './EditListName';

const useStyles = makeStyles((theme) => ({
  name: {
    width: `calc(250px - ${theme.spacing(6)}px)`,
    minHeight: 36,
    lineHeight: '36px',
    background: theme.palette.secondary.main,
    position: 'relative',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(5),
  },
}))

interface IProps {
  list: IList,
}

const ListName: React.FC<IProps> = ({
  list,
}) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleEdit = (): void => {
    setIsEdit(true);
  }

  const onMouseEnter = (): void => {
    setIsHover(true);
  }

  const onMouseLeave = (): void => {
    setIsHover(false);
  }

  return (
    <>
      {
        isEdit ? (
          <EditListName 
            list={list}
            setIsEdit={setIsEdit}
          />
        ) : (
          <Paper 
            className={classes.name}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {list.name}
            {
              isHover && (
                <CircleButton
                  onClick={handleEdit}
                  Child={EditIcon}
                />
              )
            }
          </Paper>
        )
      }
    </>
  )
}

export default ListName;
