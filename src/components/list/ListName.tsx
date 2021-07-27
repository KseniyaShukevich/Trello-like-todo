import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import CircleButton from '../../utils/CircleButton';
import List from '../../utils/List';
import EditListName from './EditListName';

const useStyles = makeStyles((theme) => ({
  name: {
    width: '300px',
    height: '36px',
    textAlign: 'center',
    lineHeight: '36px',
    background: alpha(theme.palette.secondary.main, 0.9),
    position: 'relative',
    marginBottom: theme.spacing(1),
  },
}))

interface IProps {
  list: List,
}

const ListName: React.FC<IProps> = ({
  list,
}) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const hundleEdit = (): void => {
    setIsEdit(true);
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
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {list.name}
            {
              isHover && (
                <CircleButton
                  onClick={hundleEdit}
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
