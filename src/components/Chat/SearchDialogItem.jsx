import React from 'react';
import styles from './DialogItem.module.sass'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import { withRouter } from "react-router";

const SearchDialogItem = (props) => {
    const dialogId = props.location.pathname.split('/')[3];
    
    return (
        <ListItem 
            component={Link} 
            to={`/chat/user/${props.dialog._id}`} 
            key={props.dialog._id}
            style={{
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 5px',
                color: '#707070',
                borderBottom: '1px solid #B7B7B7',
                width: '100%',
                backgroundColor: `${dialogId === props.dialog._id ? '#F3F3F3' : 'white'}`,
                className: styles.dialogItem
            }}
        >
            <div className={styles.partnerName}>
                {props.dialog.secondName} {props.dialog.firstName}
            </div>
        </ListItem>
    )
}

export default withRouter(SearchDialogItem)

SearchDialogItem.propTypes = {
    dialog: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        secondName: PropTypes.string.isRequired,
    })
}
